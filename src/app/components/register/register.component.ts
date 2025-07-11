import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jmbg: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['CLIENT'] 
    });
  }

  onSubmit(): void {
    
    const formData = {
      ...this.registerForm.value,
      role: 'CLIENT'
    };

    this.http.post('http://localhost:8081/register', formData).subscribe({
      next: () => {
        this.snackBar.open('Korisnik uspešno registrovan!', 'Zatvori', { duration: 3000 });
        this.registerForm.reset();
      },
      error: () => {
        this.snackBar.open('Greška prilikom registracije korisnika.', 'Zatvori', { duration: 3000 });
      }
    });
  }
}
