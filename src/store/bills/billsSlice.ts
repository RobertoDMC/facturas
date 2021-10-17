import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit'
import { BillsSlice } from '../../interfaces';

export const billsSlice = createSlice<BillsSlice, SliceCaseReducers<BillsSlice>>({
  name: 'bills',
  initialState: {
    name: '',
    bills: []
  },
  reducers: {
    addBill: (state, action) => {
      state.bills.push({ ...action.payload, n: state.bills.length.toString() });
    },
    removeBill: (state, action) => {
      const index = state.bills.findIndex(item => item.nit === action.payload.nit && item.billNumber == action.payload.billNumber);
      if (index > 0) {
        state.bills.splice(index, 1);
      }
    },
    clearAllBills: (state) => {
      state.bills = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addBill, removeBill, clearAllBills } = billsSlice.actions

export default billsSlice.reducer