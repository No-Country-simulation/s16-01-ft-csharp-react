import { createSlice } from '@reduxjs/toolkit'
import { User } from '../models/types.d'
import type { PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE: User = {
  user_id: '',
  username: '',
  preference: [],
  user_state: ''
}

const initialState = (() => {
  const persistedState = window.localStorage.getItem('session_state')
  return persistedState ? JSON.parse(persistedState).user : DEFAULT_STATE
})()

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload }
    },
    resetUser: () => {
      return DEFAULT_STATE
    }
  }
})

export default userSlice.reducer
export const { resetUser, setUser } = userSlice.actions
