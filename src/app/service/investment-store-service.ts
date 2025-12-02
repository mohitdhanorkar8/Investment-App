import { Injectable } from '@angular/core';
import { Investment } from '../model/investment.model';

@Injectable({
  providedIn: 'root',
})
export class InvestmentStoreService {
  private readonly baseUrl = 'http://localhost:4500/investments';

  async getAll(): Promise<Investment[]>{
    const res = await fetch(this.baseUrl);
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as Investment[];
  }
}
