export interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  currency: string;
  type: string;
  savingPurpose?: string;
  openingDate: string;
  showBalance?: boolean; 
}
