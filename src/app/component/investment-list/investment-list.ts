import { Component, inject, OnInit, signal } from '@angular/core';
import { Investment } from '../../model/investment.model';
import { InvestmentService } from '../../service/investment-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investment-list',
  imports: [CommonModule],
  templateUrl: './investment-list.html',
  styleUrl: './investment-list.css',
})
export class InvestmentList implements OnInit {

  allInvestmentList = signal<Investment[]>([]);
  investmentService = inject(InvestmentService);
  router = inject(Router)

  ngOnInit(): void {
    this.loadInvestments()
  };

  displayAllMyInvestments() {
    this.allInvestmentList.set(this.investmentService.investment());
  };

  loadInvestments() {
    this.investmentService.loadInvestment();
    setTimeout(() => {
      this.allInvestmentList.set(this.investmentService.investment());
    }, 50)
  }
  searchInvestment(id: number) { }

  deleteInvestment(investmentId: string) {
    console.log(`Deleting investment with id: ${investmentId}`);
    this.investmentService.deleteInvestment(investmentId).subscribe({
      next: () => {
        console.log(`Investment with id ${investmentId} deleted successfully.`);
        this.loadInvestments()
      },
      error: (error) => {
        console.error('Error deleting investment:', error);
      }
    })
  };

  updateInvestment(id: string) {
    this.router.navigate(['/update-investment/' + id]);
  }

}
