import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recipient } from '../../models/recipient.model';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-new-recipient-dialog',
  imports: [
    MatSlideToggleModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-recipient-dialog.component.html',
  styleUrl: './new-recipient-dialog.component.scss',
})
export class NewRecipientDialogComponent implements OnInit {
  recipientForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<NewRecipientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recipient
  ) {
    this.recipientForm = this.fb.group({
      name: ['', Validators.required],
      recipientAccount: ['', Validators.required],
      recipientType: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.data) {
      this.recipientForm.patchValue({
        name: this.data.name,
        recipientAccount: this.data.recipientAccount,
        recipientType: this.data.recipientType,
      });
    }
  }
  onSubmit(): void {
    /*if (this.recipientForm.invalid) return;

    const formData = this.recipientForm.value;

    this.http.post('http://localhost:8081/api/recipients', formData).subscribe({
      next: () => {
        this.dialogRef.close('refresh');
      },
      error: (err) => {
        console.error('Greška prilikom kreiranja primaoca:', err);
        // možeš dodati i snackbar poruku ako koristiš Angular Material Snackbar
      },
    });*/
    const recipient = this.recipientForm.value;
    console.log(recipient);
    if (this.data) {
      // UPDATE
      this.http
        .put(`http://localhost:8081/api/recipients/${this.data.id}`, recipient)
        .subscribe({
          next: () => this.dialogRef.close('refresh'),
          error: () =>
            this.snackBar.open('Greška prilikom izmene primaoca', 'Zatvori', {
              duration: 3000,
            }),
        });
    } else {
      // CREATE
      this.http
        .post('http://localhost:8081/api/recipients', recipient)
        .subscribe({
          next: () => this.dialogRef.close('refresh'),
          error: () =>
            this.snackBar.open(
              'Greška prilikom dodavanja primaoca',
              'Zatvori',
              { duration: 3000 }
            ),
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
