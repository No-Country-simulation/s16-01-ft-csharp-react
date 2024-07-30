import { createSlice } from '@reduxjs/toolkit'
import { UserState, UserStateState, UserStatus } from '../models/types.d'
import type { PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE: UserState = {
  user_id: '',
  username: '',
  state: {
    status: UserStatus[''],
    path: '',
    parameter: '',
    message: '',
    timeout: 0
  },
  waiter_name: ''
}

const isValidUserState = (state: any): state is UserState => {
  return Object.keys(state).every(key => key in state);
};

const initialState = (() => {
  const persistedState = window.localStorage.getItem('session_state')
  return persistedState ? (isValidUserState(JSON.parse(persistedState).user) ? JSON.parse(persistedState).user: DEFAULT_STATE) : DEFAULT_STATE
})()

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<UserState>) => {
      return {...action.payload }
    },
    setUserState: (state, action: PayloadAction<UserStateState>) => {
      return {...state, state: { ...action.payload} }
    },
    resetUser: () => {
      return DEFAULT_STATE
    }
  }
})

export default userSlice.reducer
export const { resetUser, setUser, setUserState } = userSlice.actions
