import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvestmentService } from '../../service/investment-service';
import { Investment } from '../../model/investment.model';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

type InvestmentFormModel = {
  id: FormControl<number>;
  name: FormControl<string>;
  type: FormControl<'Equity' | 'Debt' | 'Mutual Fund'>;
  amount: FormControl<number>;
  purchaseDate: FormControl<string>;
  currentValue: FormControl<number>;
}

@Component({
  selector: 'app-add-investment-reactive',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './add-investment-reactive.html',
  styleUrl: './add-investment-reactive.css',
})

export class AddInvestmentReactive {

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly investmentService = inject(InvestmentService);

  successMsg = signal<string | null>(null);
  serverError = signal<string | null>(null);
  isSubmitting = signal<boolean>(false);

  investmentForm = this.fb.group<InvestmentFormModel>({
    id: this.fb.control(0, { validators: [Validators.required, Validators.min(1)] }),
    name: this.fb.control('', { validators: [Validators.required, Validators.minLength(3)] }),
    type: this.fb.control('Equity', { validators: [Validators.required] }),
    amount: this.fb.control(0, { validators: [Validators.required, Validators.min(1)] }),
    purchaseDate: this.fb.control('', { validators: [Validators.required] }),
    currentValue: this.fb.control(0, { validators: [Validators.required, Validators.min(0)] }),
  });

  get f(){
    return this.investmentForm.controls;
  }
  onSubmit(){
    this.serverError.set(null);
    this.successMsg.set(null);

    if(this.investmentForm.invalid){
      this.investmentForm.markAllAsTouched();
      return;
    }

    const payload : Investment =  this.investmentForm.getRawValue();

    payload.id = Number(payload.id).toString();
    if(this.investmentService.investment().some(x => x.id == payload.id)){
      this.serverError.set(`Id ${payload.id} already exists. Choose a unique Id.`)
      return;
    }
    this.isSubmitting.set(true);

    this.investmentService.addInvestment(payload).subscribe({
      next: (created) => {
        this.isSubmitting.set(false);
        this.successMsg.set(`Investment ${created.name} added successfully (ID: ${created.id})`);

        this.investmentForm.reset({
          id:0,
          name:'',
          type:'Equity',
          amount:0,
          purchaseDate:'',
          currentValue:0

        })
      },
      error: () => {
        
      }
    })
  }
  
}
