import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Account } from '../../models/account.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Recipient } from '../../models/recipient.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-transaction-dialog',
  imports: [CommonModule, MatIconModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule  ],
  templateUrl: './transaction-dialog.component.html',
  styleUrl: './transaction-dialog.component.scss'
})
export class TransactionDialogComponent {
addNewRecipient() {
throw new Error('Method not implemented.');
}
  form = {
    amount: null,
    paymentPurpose: '',
    paymentCode: '',
    modelReferenceNumber: '',
    accountId: null,
    recipientId: null
  };
  accounts: Account[] = [];
  recipients: Recipient[] = [];
  transactionForm!: FormGroup;
  showRecipientForm: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { accounts: Account[], recipients: Recipient[] },
    private fb: FormBuilder,
    private accountService: AccountService
  ) {}
  
  ngOnInit(): void {
    this.accounts = this.data.accounts;
    this.recipients = this.data.recipients;

    this.transactionForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      paymentPurpose: ['', Validators.required],
      paymentCode: ['', Validators.required],
      modelReferenceNumber: [''],
      accountId: ['', Validators.required],
      recipientId: [''],
      recipientName: [''],
      recipientAccount: [''],
      recipientType: [''],
    });
  }

  toggleNewRecipient(): void {
    this.showRecipientForm = !this.showRecipientForm;
    if (this.showRecipientForm) {
      this.transactionForm.get('recipientId')?.reset();
    } else {
      this.transactionForm.get('recipientName')?.reset();
      this.transactionForm.get('recipientAccount')?.reset();
      this.transactionForm.get('recipientType')?.reset();
    }
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) return;

    const formValue = this.transactionForm.value;

    const payload: any = {
      amount: formValue.amount,
      paymentPurpose: formValue.paymentPurpose,
      paymentCode: formValue.paymentCode,
      modelReferenceNumber: formValue.modelReferenceNumber,
      accountId: formValue.accountId,
      transactionType: 'TRANSFER'
    };

    if (this.showRecipientForm) {
      payload.recipientName = formValue.recipientName;
      payload.recipientAccount = formValue.recipientAccount;
      payload.recipientType = formValue.recipientType;
    } else {
      payload.recipientId = formValue.recipientId;
    }

    this.accountService.createTransaction(payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error(err)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  
}

