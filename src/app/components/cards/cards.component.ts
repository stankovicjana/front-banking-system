import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-cards',
  imports: [
    MatIconModule,
    RouterModule,
    MatIconModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  private http = inject(HttpClient);
  cards: Card[] = [];
  selectedCard: any = null;
  transactions: any[] = [];
  blockMessage: string = '';

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.http.get<Card[]>('http://localhost:8081/api/cards').subscribe({
      next: (data) => {
        this.cards = data;
        if (this.cards.length > 0) {
          this.selectCard(this.cards[0]);
        }
      },
      error: (err) => {
        console.error('Failed to load cards', err);
      },
    });
  }

  selectCard(card: any): void {
    this.selectedCard = card;
    this.http
      .get<any[]>(`http://localhost:8081/api/transactions/card/${card.id}`)
      .subscribe({
        next: (data) => {
          this.transactions = data;
        },
        error: (err) => {
          console.error('Failed to load transactions for card', err);
        },
      });
  }
  toggleBlock(card: any): void {
    const newStatus = !card.blocked;
    const action = newStatus ? 'block' : 'unblock';
    const url = `http://localhost:8081/api/cards/${card.id}/${action}`;

    this.http.post(url, {}).subscribe({
      next: () => {
        card.blocked = newStatus;
        this.blockMessage = `Kartica je uspešno ${
          newStatus ? 'blokirana' : 'odblokirana'
        }.`;
        setTimeout(() => (this.blockMessage = ''), 3000); 
      },
      error: () => {
        this.blockMessage = 'Došlo je do greške. Pokušajte ponovo.';
        setTimeout(() => (this.blockMessage = ''), 3000);
      },
    });
  }
}
