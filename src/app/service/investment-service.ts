import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Investment } from '../model/investment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {

  http = inject(HttpClient);
  apiUrl = environment.apiUrl;
  investment = signal<Investment[]>([])

  loadInvestment() {
    this.http.get<Investment[]>(this.apiUrl).subscribe((data) => {
      this.investment.set(data);
    });
  };

  getInvestment(id: number): Observable<Investment> {
    return this.http.get<Investment>(`${this.apiUrl}/${id}`);
  };

  addInvestment(investment: Investment): Observable<Investment> {
    return this.http.post<Investment>(this.apiUrl, investment);
  }

  deleteInvestment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  };

  updateInvestment(investment: Investment): Observable<Investment> {
    return this.http.put<Investment>(`${this.apiUrl}/${investment.id}`, investment);
  }
}
