import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Investment, InvestmentType } from '../../model/investment.model';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../../service/investment-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-investment',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-investment.html',
  styleUrl: './add-investment.css',
})
export class AddInvestment implements OnInit {
  investmentService = inject(InvestmentService);
  router = inject(Router);
  activateRoute = inject(ActivatedRoute)
  investmentId = signal<number | null>(null);
  investment = signal <Partial<Investment>>({
    name: '',
    type: undefined,
    amount: undefined,
    purchaseDate: undefined,
    currentValue: undefined,
  });

  investmentTypes: InvestmentType[] = ['Equity', 'Debt', 'Mutual Fund'];

  ngOnInit(): void {
    const investmentId = this.activateRoute.snapshot.params['id'] ?? null;
    if (investmentId) {
      this.investmentId.set(investmentId);
      this.getInvestmentDetails(investmentId)
    }
    console.log(this.investmentId)
  }

  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Submitted Investment:', this.investment);
      this.investmentService.addInvestment(this.investment() as Investment).subscribe({
        next: (data) => {
          console.log('Investment added successfully:', data);
          this.router.navigate(['/investment-list']);

        },
        error: (error) => {
          console.error('Error adding investment:', error);
        }
      })
    }
  };

  getInvestmentDetails(id: number) {
    this.investmentService.getInvestment(id).subscribe({
      next: (data) => {
        console.log('Fetched investment details:', data);
        this.investment.set(data);
      },
      error: (error) => {
        console.error('Error fetching investment details:', error);
      }
    })
  }

  onUpdate():void{
    this.investmentService.updateInvestment(this.investment() as Investment).subscribe({
      next: (data) => {
        console.log('Investment updated successfully:', data);
        this.router.navigate(['/investment-list']);
      },
      error: (error) => {
        console.error('Error updating investment:', error);
      }
    })
  }
}
