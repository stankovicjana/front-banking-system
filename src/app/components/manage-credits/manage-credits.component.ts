import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreditRequest } from '../../models/creditrequest.model';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Card } from '../../models/card.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-manage-credits',
  imports: [
    MatIconModule,
    RouterModule,
    MatIconModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './manage-credits.component.html',
  styleUrl: './manage-credits.component.scss',
})
export class ManageCreditsComponent {
  credits: CreditRequest[] = [];
  selectedCredit: any = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadCredits();
  }

  loadCredits(): void {
  this.http.get<CreditRequest[]>(`http://localhost:8081/api/admin/credits`).subscribe({
    next: (res) => {
      this.credits = res.filter(credit => credit.creditStatus === 'UNPROCESSED');
    },
    error: () => {
      this.snackBar.open('Greška prilikom učitavanja kredita', 'Zatvori', { duration: 3000 });
    }
  });
}

  updateStatus(id: number, status: string) {
    this.http
      .put(`http://localhost:8081/api/admin/credits/${id}/status`, { status })
      .subscribe({
        next: () => {
          this.snackBar.open(`Status promenjen u ${status}`, 'Zatvori', {
            duration: 3000,
          });
          this.loadCredits();
        },
        error: () =>
          this.snackBar.open('Greška pri promeni statusa', 'Zatvori', {
            duration: 3000,
          }),
      });
  }
}
