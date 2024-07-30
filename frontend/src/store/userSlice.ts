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

const expectedUserStateKeys = ['user_id', 'username', 'state', 'waiter_name'];
const expectedUserStateStateKeys = ['status', 'path', 'parameter', 'message', 'timeout'];

const isValidUserStateState = (state: any): state is UserStateState => {
  return expectedUserStateStateKeys.every(key => key in state);
};

const isValidUserState = (state: any): state is UserState => {
  if (!expectedUserStateKeys.every(key => key in state)) {
    return false;
  }
  return isValidUserStateState(state.state);
};

const initialState = (() => {
  const persistedState = window.localStorage.getItem('session_state');
  return persistedState ? (isValidUserState(JSON.parse(persistedState).user) ? JSON.parse(persistedState).user : DEFAULT_STATE) : DEFAULT_STATE;
})();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<UserState>) => {
      return { ...action.payload }
    },
    setUserState: (state, action: PayloadAction<UserStateState>) => {
      return { ...state, state: { ...action.payload } }
    },
    resetUser: () => {
      return DEFAULT_STATE
    }
  }
})

export default userSlice.reducer
export const { resetUser, setUser, setUserState } = userSlice.actions
