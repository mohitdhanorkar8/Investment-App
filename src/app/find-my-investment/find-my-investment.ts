import { Component, computed, inject, signal } from '@angular/core';
import { InvestmentService } from '../service/investment-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, finalize, of, switchMap, catchError, Observable } from 'rxjs';
import { Investment } from '../model/investment.model';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-find-my-investment',
  imports: [CommonModule],
  templateUrl: './find-my-investment.html',
  styleUrl: './find-my-investment.css',
})
export class FindMyInvestment {

  private svc = inject(InvestmentService);
  investmentForm =  new FormControl()

  id = signal<number | null>(null);
  loading = signal(false);
  error = signal<string>('');

  private id$ = toObservable(this.id).pipe(
    debounceTime(150),
    distinctUntilChanged()
  )

  investment = toSignal<Investment | null>(
    this.id$.pipe(
      switchMap(id => {
        this.error.set('');
        if (id === null || Number.isNaN(id)) {
          this.loading.set(false);
          return of(null);
        }

        this.loading.set(true);

        return this.svc.getInvestment(id).pipe(
          finalize(() => this.loading.set(false)),
          catchError((err: any) => {
            console.log('getInvestment Error: ', err);
            this.error.set('Investment not found');
            return of(null);
          })
        )

      })
    ),
    { initialValue: null }
  )


  fields = computed(() => {
    const inv = this.investment();
    if (!inv) {
      return [];
    }

    return [
      { label: 'ID', value: String(inv.id) },
      { label: 'Type', value: inv.type },
      { label: 'Amount', value: inv.amount },
      { label: 'Purchase Date', value: new Date(inv.purchaseDate).toLocaleDateString('en-IN') },
      { label: 'Current Value', value: String(inv.currentValue) },
    ];
  });

  onInputEvent(investment: HTMLInputElement): void {
    const raw = investment.value;
    const num = raw === '' ? null : Number(raw);
    this.id.set(Number.isFinite(num!) ? num : null);
  }
}
