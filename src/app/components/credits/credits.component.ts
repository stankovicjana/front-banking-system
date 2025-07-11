import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { CreditRequest } from '../../models/creditrequest.model';
// Angular Material moduli
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-credits',
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
    MatListModule,
    MatCardModule,
    MatSliderModule, 
    MatButtonModule
  ],
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss'],
})
export class CreditsComponent implements OnInit {
  creditForm!: FormGroup;
  creditRequests: CreditRequest[] = [];
  creditAmount: number = 300000;
  repaymentPeriod: number = 70;
  insurance: boolean = false;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.creditForm = this.fb.group({
      creditAmount: [null, [Validators.required, Validators.min(10000)]],
      repaymentPeriod: [null, [Validators.required, Validators.min(6)]],
    });

    this.loadCredits();
  }

  calculateMonthlyPayment(): number {
    const interestRate = 0.07; 
    const monthlyRate = interestRate / 12;
    const months = this.repaymentPeriod;
    const amount = this.creditAmount;

    return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  }

  loadCredits(): void {
    this.http
      .get<CreditRequest[]>('http://localhost:8081/api/credits')
      .subscribe({
        next: (res) => (this.creditRequests = res),
        error: (err) =>
          this.snackBar.open('Greška prilikom učitavanja kredita', 'Zatvori', {
            duration: 3000,
          }),
      });
  }

  submit(): void {
  const payload = {
    amount: this.creditAmount,
    repaymentPeriod: this.repaymentPeriod,
    userId: 15 
  };

  this.http
    .post('http://localhost:8081/api/credits/create', payload)
    .subscribe({
      next: () => {
        this.snackBar.open('Zahtev uspešno poslat', 'Zatvori', {
          duration: 3000,
        });
        this.loadCredits();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Greška prilikom slanja zahteva', 'Zatvori', {
          duration: 3000,
        });
      },
    });
}
}
