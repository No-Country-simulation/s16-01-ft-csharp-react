import { createSlice } from '@reduxjs/toolkit'
import { Order, User, UserState, UserStateState } from '../models/types.d'
import type { PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE: User = {
  user_id: '',
  username: '',
  preferences: [],
  quantity_pay: 0,
  user_state: { state: UserStateState[''], path: '', parameter: '', message: '' },
  order_list: []
}

const isValidUserState = (state: any): state is User => {
  return Object.keys(DEFAULT_STATE).every(key => key in state);
};

const initialState = (() => {
  const persistedState = window.localStorage.getItem('session_state')
  return persistedState ? (isValidUserState(JSON.parse(persistedState).user) ? JSON.parse(persistedState).user: DEFAULT_STATE) : DEFAULT_STATE
})()

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<User>) => {
      return {...action.payload }
    },
    setUserState: (state, action: PayloadAction<UserState>) => {
      return {...state, user_state: { ...action.payload} }
    },
    setUserOrderList: (state, action: PayloadAction<Order[]>) => {
      return {...state, order_list: [...action.payload] }
    },
    resetUser: () => {
      return DEFAULT_STATE
    }
  }
})

export default userSlice.reducer
export const { resetUser, setUser, setUserState, setUserOrderList } = userSlice.actions
