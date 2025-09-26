import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { ChatWidgetComponent } from "../chat-widget/chat-widget.component";

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule, RouterModule, MatIconModule, ChatWidgetComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
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
