import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { AuthService } from '../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  imports: [MatSlideToggleModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatToolbarModule,
    RouterModule ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})

export class AdminPanelComponent implements OnInit {
  userFullName: string = '';
  userName:string = '';
  initials: string = '';
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
    this.userFullName = user.firstName + ' ' + user.lastName;
    this.userName = user.firstName;
    this.initials = this.getInitials(this.userFullName);
    });
  }
 
  logout() {
    localStorage.clear(); 
    this.router.navigate(['/login']);
  }
  getInitials(fullName: string): string {
    if (!fullName) return '';
  
    const parts = fullName.trim().split(' ');
    let initials = '';

   for (let i = 0; i < parts.length && initials.length < 2; i++) {
      const part = parts[i];
      if (part.length > 0) {
       initials += part[0].toUpperCase();
      }
    }
    return initials;
  }
}
