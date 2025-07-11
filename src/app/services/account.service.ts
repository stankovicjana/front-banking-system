import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { TransactionFilter } from '../models/transaction-filter.model';
import { Transaction } from '../models/transaction.model';
import { Card } from '../models/card.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  
  apiUrl: any;

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>('http://localhost:8081/api/accounts');
  }
  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8081/api/transactions/all');
  }
  getFilteredTransactions(filter: TransactionFilter): Observable<any[]> {
    return this.http.post<Transaction[]>(
      'http://localhost:8081/api/transactions/filter',
      filter
    );
  }
  createTransaction(transactionData: any): Observable<any> {
    return this.http.post(
      `http://localhost:8081/api/transactions/create`,
      transactionData
    );
  }
  getUserCards(): Observable<Card[]> {
    return this.http.get<Card[]>('http://localhost:8081/api/cards');
  }
  getTransactionsByCardId(cardId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`http://localhost:8081/api/cards`);
  }
}
