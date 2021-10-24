import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit'
import { Bill as BillClass } from '../../classes/bill';
import { BillsSlice, Bill } from '../../interfaces';
import { setItem } from '../../services/storage';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Toast } from '@ionic-native/toast';

export const billsSlice = createSlice<BillsSlice, SliceCaseReducers<BillsSlice>>({
  name: 'bills',
  initialState: {
    name: '',
    bills: []
  },
  reducers: {
    addBill: (state, action) => {
      if (action.payload.length > 0) {
        const bill = BillClass.getBill(action.payload);
        bill.n = (state.bills.length + 1 ).toString();
        state.bills.push(bill);
        setItem('bills', JSON.stringify(state));
      }
    },
    removeBill: (state, action: { payload: Bill }) => {
      const index = state.bills.findIndex(item => item.controlCode === action.payload.controlCode);
      if (index >= 0) {
        state.bills.splice(index, 1);
      }
      setItem('bills', JSON.stringify(state));
    },
    clearAllBills: (state) => {
      state.bills = [];
      setItem('bills', JSON.stringify(state));
    },
    exportBills: (state) => {
      let billsString = 'N,NIT Proveedor,N Factura,N Autorizacion,Fecha Emision,Importe Total,Codigo Control'
      const bills = state.bills;
      bills.forEach(bill => {
        billsString = billsString.concat('\n')
        billsString = billsString.concat(`${bill.n},${bill.nit},${bill.billNumber},${bill.authorization},${bill.date},${bill.amount},${bill.controlCode}`);
      });
      Filesystem.writeFile({
        path: 'facturas.csv',
        data: billsString,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      }).then(() => {
        Toast.show('Se creo el archivo facturas con exito, encuentrelo en Documentos', '2000', 'bottom');
      }).catch(() => {
        Toast.show('Hubo un error al crear el archivo facturas', '2000', 'bottom');
      });
    }
  },
})

// Action creators are generated for each case reducer function
export const { addBill, removeBill, clearAllBills, exportBills } = billsSlice.actions

export default billsSlice.reducer