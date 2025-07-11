export interface Transaction {
  transactionNumber: number;
  executionDate: string;
  receivingDate: string;
  amount: number;
  fee: number;
  status: string;
  paymentCode: string;
  paymentPurpose: string;
  modelReferenceNumber: string;
  transactionType: string;
  accountNumber: string;
  recipientName: string;
}
