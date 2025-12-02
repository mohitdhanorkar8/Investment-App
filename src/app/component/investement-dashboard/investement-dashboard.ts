import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InvestmentStore } from './investment.store';

@Component({
  selector: 'app-investement-dashboard',
  imports: [CommonModule],
  templateUrl: './investement-dashboard.html',
  styleUrl: './investement-dashboard.css',
  standalone: true
})
export class InvestementDashboard {
  readonly store = inject(InvestmentStore);
}
