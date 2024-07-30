import { createSlice } from '@reduxjs/toolkit';
import { User, UserAndOrder, UserSimple, UserAndPreference } from '../models/types.d';
import type { PayloadAction } from '@reduxjs/toolkit';

export const DEFAULT_USER: User = {
  user_id: '',
  username: '',
  preferences: [],
  quantity_pay: 0,
  order_list: []
}

export const DEFAULT_PEER: User = {
  user_id: '10',
  username: 'John',
  preferences: [],
  quantity_pay: 0,
  order_list: [{
    order_id: "0",
    item_id: "5",
    order_status: 2
  }]
  
};

const DEFAULT_STATE: User[] = [];

const isValidUserState = (state: any): state is User[] => {
  return Array.isArray(state) && state.every(user => {
    return 'user_id' in user && 'username' in user && 'preferences' in user && 'quantity_pay' in user && 'order_list' in user;
  });
};

const initialState = (() => {
  const persistedState = window.localStorage.getItem('session_state');
  return persistedState ? (isValidUserState(JSON.parse(persistedState).users) ? JSON.parse(persistedState).users : DEFAULT_STATE) : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (_state: User[], action: PayloadAction<User[]>) => {
      return [...action.payload];
    },
    setUserSimple: (state: User[], action: PayloadAction<UserSimple>) => {
      const { user_id, username, quantity_pay } = action.payload;
      const userIndex = state.findIndex(user => user.user_id === user_id);
      if (userIndex !== -1) {
        state[userIndex] = { ...state[userIndex], username, quantity_pay };
      } else {
        state.push({ user_id, username, quantity_pay, preferences: [], order_list: [] });
      }
    },
    setUserSimpleList: (state: User[], action: PayloadAction<UserSimple[]>) => {
      const updatedUsers = action.payload;
      const updatedUserIds = updatedUsers.map(u => u.user_id);
      return updatedUsers.map(update => {
        const existingUser = state.find(user => user.user_id === update.user_id);
        return existingUser ? { ...existingUser, ...update } : update;
      }).concat(state.filter(user => !updatedUserIds.includes(user.user_id)));
    },
    setUserPreferences: (state: User[], action: PayloadAction<UserAndPreference>) => {
      return state.map(user =>
        user.user_id === action.payload.user_id
          ? { ...user, preferences: action.payload.preferences }
          : user
      );
    },
    setUserPreferencesList: (state: User[], action: PayloadAction<UserAndPreference[]>) => {
      return state.map(user => {
        const update = action.payload.find(u => u.user_id === user.user_id);
        return update ? { ...user, preferences: update.preferences } : user;
      });
    },
    setUserOrder: (state: User[], action: PayloadAction<UserAndOrder>) => {
      return state.map(user => {
        if (user.user_id === action.payload.user_id) {
          return {
            ...user,
            order_list: user.order_list ? 
            [...user.order_list, 
              { order_id: action.payload.order_id, 
                item_id: action.payload.item_id, order_status: action.payload.order_status }] : 
            [{ order_id: action.payload.order_id, 
              item_id: action.payload.item_id, order_status: action.payload.order_status }]
          };
        }
        return user;
      });
    },
    setUserOrderList: (state: User[], action: PayloadAction<UserAndOrder[]>) => {
      return state.map(user => {
        const userUpdates = action.payload.filter(update => update.user_id === user.user_id);
        return {
          ...user, order_list: [
            ...userUpdates.map(({ order_id, item_id, order_status }) => ({
              order_id, item_id, order_status }))]
        };
      });
    },
    resetUsers: () => {
      return DEFAULT_STATE;
    }
  }
});

export default usersSlice.reducer;
export const { 
  setUsers, 
  setUserSimple,
  setUserSimpleList,
  setUserPreferences, 
  setUserPreferencesList,
  setUserOrder,
  setUserOrderList, 
  resetUsers 
} = usersSlice.actions;
