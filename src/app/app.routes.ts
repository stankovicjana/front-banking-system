import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CardsComponent } from './components/cards/cards.component';
import { CreditsComponent } from './components/credits/credits.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth.guard'; 
import { RecipientsComponent } from './components/recipients/recipients.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { RegisterComponent } from './components/register/register.component';
import { ManageCreditsComponent } from './components/manage-credits/manage-credits.component';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget.component';

/*export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'credits', component: CreditsComponent },
  { path: 'accounts', component: AccountsComponent },
];*/

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'credits', component: CreditsComponent },
      { path: 'recipients', component: RecipientsComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'manage-credits', component: ManageCreditsComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' }
];
