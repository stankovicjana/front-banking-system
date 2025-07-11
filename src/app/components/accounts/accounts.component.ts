import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { AccountService } from '../../services/account.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../models/transaction.model';
import { TransactionFilter } from '../../models/transaction-filter.model';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Recipient } from '../../models/recipient.model';
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, RouterModule ],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];
  allTransactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  showFilter = false;
  userFullName: string = '';
  userName: string = '';
  initials: string = '';
  filter = {
    date: '',
    type: '',
    amount: null,
    recipient: '',
  };

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    /*this.accountService.getAccounts().subscribe({
      next: (data) => {
        this.accounts = data.map((acc) => ({ ...acc, showBalance: false }));
      },
      error: (err) => console.error(err),
    });
    this.accountService.getTransactions().subscribe((trans) => {
      this.transactions = trans;
    });
    this.filteredTransactions = this.transactions;*/
    this.authService.getCurrentUser().subscribe((user) => {
      this.userFullName = user.firstName + ' ' + user.lastName;
      this.userName = user.firstName;
      this.initials = this.getInitials(this.userFullName);
    });

    this.accountService.getAccounts().subscribe((data) => {
      this.accounts = data;
    });

    this.accountService.getTransactions().subscribe((tx) => {
      this.allTransactions = tx;
      this.filteredTransactions = [...tx]; // Prikaži sve inicijalno
    });
  }
  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  applyFilter() {
    this.filteredTransactions = this.allTransactions.filter((tr) => {
      const matchDate =
        !this.filter.date || tr.executionDate === this.filter.date;
      const matchType =
        !this.filter.type ||
        tr.transactionType
          ?.toLowerCase()
          .includes(this.filter.type.toLowerCase());
      const matchAmount =
        this.filter.amount == null || tr.amount == this.filter.amount;
      const matchRecipient =
        !this.filter.recipient ||
        tr.recipientName
          ?.toLowerCase()
          .includes(this.filter.recipient.toLowerCase());
      return matchDate && matchType && matchAmount && matchRecipient;
    });
  }

  /*loadAllTransactions(): void {
    this.accountService.getTransactions().subscribe({
      next: (res) => (this.transactions = res),
      error: (err) => console.error(err),
    });
  }

  applyFilter(): void {
    this.accountService.getFilteredTransactions(this.filter).subscribe({
      next: (res) => (this.transactions = res),
      error: (err) => console.error(err),
    });
  }*/
  toggleBalance(acc: any): void {
    acc.showBalance = !acc.showBalance;
  }
  getInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  }

  addNewPayment(account: Account) {
     this.router.navigate(['/home']);
  }

  /*applyFilter() {
    this.filteredTransactions = this.transactions.filter((t) => {
      return (
        (!this.filter.date || t.executionDate === this.filter.date) &&
        (!this.filter.type ||
          t.transactionType
            .toLowerCase()
            .includes(this.filter.type.toLowerCase())) &&
        (!this.filter.amount || t.amount == this.filter.amount) &&
        (!this.filter.recipient ||
          t.recipientName
            .toLowerCase()
            .includes(this.filter.recipient.toLowerCase()))
      );
    });
  }*/
  
}
