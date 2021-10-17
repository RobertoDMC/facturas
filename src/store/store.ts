import { configureStore } from '@reduxjs/toolkit'
import billsReducer from './bills/billsSlice'

export default configureStore({
  reducer: billsReducer,
})