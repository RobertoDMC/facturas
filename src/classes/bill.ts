import { Bill as BillInterface } from '../interfaces';

export class Bill {
  static getBill(text: string): BillInterface {
    const billSplit = text.split('|');
    const dateSplit = billSplit[3].split('/');
    if (dateSplit[0].length === 1) {
    dateSplit[0] = `0${dateSplit[0]}`;
    }
    if (dateSplit[1].length === 1) {
    dateSplit[1] = `0${dateSplit[1]}`;
    }
    const date = dateSplit.join('/')
    return {
      n: '',
      amount: billSplit[4],
      nit: billSplit[0],
      billNumber: billSplit[1],
      authorization: billSplit[2],
      controlCode: billSplit[6],
      date: date
    };
  }
}