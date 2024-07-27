import { createSlice } from '@reduxjs/toolkit'
import { OrderStatus, OtherUser } from '../models/types.d'
import type { PayloadAction } from '@reduxjs/toolkit'

const DEFAULT: OtherUser = {
  user_id: '2',
  username: 'John',
  preferences: ['aji'],
  quantity_pay: 0,
  order_list: [ { 
    order_id: "0",
    item_id: "5",
    order_status: OrderStatus.pending 
    } 
  ]
}
const DEFAULT_STATE: OtherUser[] = [
    DEFAULT
]

const isValidUserState = (state: any): state is OtherUser[] => {
  return Object.keys(DEFAULT_STATE).every(key => key in state);
};

const initialState = (() => {
  const persistedState = window.localStorage.getItem('session_state')
  return persistedState ? (isValidUserState(JSON.parse(persistedState).user) ? JSON.parse(persistedState).user: DEFAULT_STATE) : DEFAULT_STATE
})()

export const othersSlice = createSlice({
  name: 'others',
  initialState,
  reducers: {
    setOthers: (_state, action: PayloadAction<OtherUser[]>) => {
      return {...action.payload }
    },
    resetOthers: () => {
      return DEFAULT_STATE
    }
  }
})

export default othersSlice.reducer
export const { setOthers, resetOthers } = othersSlice.actions
