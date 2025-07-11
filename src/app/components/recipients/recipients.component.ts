import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Recipient } from '../../models/recipient.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewRecipientDialogComponent } from '../new-recipient-dialog/new-recipient-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipients',
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
  templateUrl: './recipients.component.html',
  styleUrl: './recipients.component.scss',
})
export class RecipientsComponent {
  recipients: Recipient[] = [];
  recipient!: Recipient;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRecipients();
  }

  loadRecipients(): void {
    this.http
      .get<Recipient[]>('http://localhost:8081/api/recipients')
      .subscribe({
        next: (res) => (this.recipients = res),
        error: (err) => console.error('Greška pri učitavanju primaoca:', err),
      });
  }

  selectRecipient(recipient: Recipient): void {
    this.recipient = recipient;
  }
  openNewRecipientForm(): void {
    const dialogRef = this.dialog.open(NewRecipientDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.loadRecipients();
      }
    });
  }

  deleteRecipient(recipient: Recipient): void {
    this.http
      .delete(`http://localhost:8081/api/recipients/${recipient.id}`)
      .subscribe({
        next: () => {
          this.snackBar.open('Primalac je obrisan', 'Zatvori', {
            duration: 3000,
          });
          this.loadRecipients();
        },
        error: () => {
          this.snackBar.open('Greška prilikom brisanja primaoca', 'Zatvori', {
            duration: 3000,
          });
        },
      });
  }

  editRecipient(recipient: Recipient): void {
    const dialogRef = this.dialog.open(NewRecipientDialogComponent, {
      width: '500px',
      data: recipient,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.loadRecipients();
      }
    });
  }
  addRecipient(): void {
    const dialogRef = this.dialog.open(NewRecipientDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.loadRecipients();
      }
    });
  }
}
