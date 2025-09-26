import { Component, HostListener } from '@angular/core';
import { ChatService, ChatResponseWithSources, SourceItem } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

type Role = 'user' | 'assistant';

interface Msg {
  role: Role;
  text: string;
  model?: string;
  latencySec?: number;
  sources?: SourceItem[]; // prikaz citata uz asistentov odgovor
}

@Component({
  selector: 'app-chat-widget',
  imports: [CommonModule, FormsModule], 
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css']
})
export class ChatWidgetComponent {
  isOpen = false;
  input = '';
  loading = false;
  messages: Msg[] = [];

  constructor(private chat: ChatService) {}

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) setTimeout(() => this.scrollToBottom(), 0);
  }

  @HostListener('document:keydown.escape')
  onEsc() { this.isOpen = false; }

  send() {
    const q = this.input.trim();
    if (!q || this.loading) return;

    this.messages.push({ role: 'user', text: q });
    this.input = '';
    this.loading = true;
    this.scrollToBottom();

    this.chat.askWithContext(q).subscribe({
      next: (res: ChatResponseWithSources) => {
        this.messages.push({
          role: 'assistant',
          text: res.azure.answer,
          model: res.azure.model,
          latencySec: res.azure.latencySec,
          sources: res.sources || []
        });
        this.scrollToBottom();
      },
      error: _ => {
        this.messages.push({
          role: 'assistant',
          text: 'Došlo je do greške pri dohvatanju odgovora. Pokušajte ponovo.'
        });
        this.scrollToBottom();
      },
      complete: () => (this.loading = false)
    });
  }

  private scrollToBottom() {
    const el = document.getElementById('chat-scroll');
    if (el) el.scrollTop = el.scrollHeight;
  }
}
