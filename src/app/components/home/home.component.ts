import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recipient } from '../../models/recipient.model';
import { NewRecipientDialogComponent } from '../new-recipient-dialog/new-recipient-dialog.component';

@Component({
  selector: 'app-home',
  imports: [
    MatSlideToggleModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  accounts: Account[] = [];
  account!: Account;
  transferForm: FormGroup;
  recipients: Recipient[] = [];
  selectedRecipient: Recipient | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private dialog: MatDialog
  ) {
    this.transferForm = this.fb.group({
      paymentCode: ['', Validators.required],
      recipientAccount: ['', Validators.required],
      paymentPurpose: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      model: [''],
      referenceNumber: [''],
    });
  }
  ngOnInit(): void {
    this.loadRecipients();
    this.accountService.getAccounts().subscribe((data) => {
      this.accounts = data;
      this.account = this.accounts[0];
    });
  }
  loadRecipients(): void {
    this.http
      .get<Recipient[]>('http://localhost:8081/api/recipients')
      .subscribe({
        next: (res) => (this.recipients = res),
        error: (err) =>
          console.error('Greška prilikom učitavanja primaoca:', err),
      });
  }
  submit(): void {
    console.log(1);
    if (!this.selectedRecipient) {
      this.snackBar.open('Izaberite primaoca', 'Zatvori', { duration: 3000 });
      return;
    }
    const formValue = this.transferForm.value;

    const payload = {
      recipientId: this.selectedRecipient.id,
      recipientName: this.selectedRecipient.name,
      recipientAccount: this.selectedRecipient.recipientAccount,
      recipientType: 'INDIVIDUAL',
      amount: formValue.amount,
      paymentPurpose: formValue.paymentPurpose,
      transactionType: 'TRANSFER',
      paymentCode: formValue.paymentCode,
      modelReferenceNumber: `${formValue.model}-${formValue.referenceNumber}`,
      accountId: this.account.id,
    };

    this.http
      .post('http://localhost:8081/api/transactions/create', payload)
      .subscribe({
        next: () => {
          this.snackBar.open('Uspešno ste izvršili transakciju', 'Zatvori', {
            duration: 3000,
          });
          this.transferForm.reset();
        },
        error: () => {
          this.snackBar.open(
            'Došlo je do greške prilikom izvršenja transakcije',
            'Zatvori',
            { duration: 3000 }
          );
        },
      });
  }
  openNewRecipientForm(): void {
    this.selectedRecipient = null;
    const dialogRef = this.dialog.open(NewRecipientDialogComponent, {
      width: '500px', 
      maxWidth: '90vw',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.loadRecipients();
      }
    });
  }
}
