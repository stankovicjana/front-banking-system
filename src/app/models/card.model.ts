export interface Card {
  id: number;
  name: string;
  number: string;
  cardType: string;
  limit: number;
  status: string;
  validUntil: string;
  issueDate: string;
  blocked: boolean;
}
