export interface Bill {
  n: string;
  nit: string;
  billNumber: string;
  authorization: string;
  amount: string;
  date: string;
  controlCode: string;
}
  
export interface BillsSlice {
  name: string;
  bills: Array<Bill>
};