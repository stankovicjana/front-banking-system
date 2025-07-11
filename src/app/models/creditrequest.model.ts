import { RequestModel } from "./request.model";

export interface CreditRequest {
  id?: number;
  amount: number;
  repaymentPeriod: number;
  status: string;
  interestRate: string;
  creditStatus: string;
  approvedUntil: Date;
  request: RequestModel;
}