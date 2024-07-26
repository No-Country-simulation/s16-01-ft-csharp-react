import { createSlice } from '@reduxjs/toolkit'
import type { Item, NewItem } from '../models/types.d'
import type { PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE: Item[] = []
export const DEFAULT_ITEM: Item = { 
  item_id: '',
  name: '',
  price: 0,
  description: '',
  category: '',
  keywords: [''],
  portion: 0,
  nutritional_value: 0,
  prep_time: 0,
  max_queries: 0,
  image_url: ''}

const isValidUserState = (state: any): state is Item => {
  return Object.keys(DEFAULT_STATE).every(key => key in state);
};

const initialState: Item[] = (() => {
  const persistedState = window.localStorage.getItem('session_state')
  return persistedState ? (isValidUserState(JSON.parse(persistedState).items) ? JSON.parse(persistedState).items: DEFAULT_STATE) : DEFAULT_STATE
})()

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    initItems: (_state, action: PayloadAction<Item[]>) => {
      return [...action.payload]
    },
    addItem: (state, action: PayloadAction<Item>) => {
      return [...state, { ...action.payload }]
    },
    updateItemById: (state, action: PayloadAction<NewItem>) => {
      const { id, newData } = action.payload
      return state.map(item => (item.item_id === id ? { ...item, ...newData } : item))
    },
    deleteItemById: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.item_id !== action.payload)
    },
    resetItems: () => {
      return DEFAULT_STATE
    }
  }
})

export default itemsSlice.reducer
export const { initItems, addItem, updateItemById, deleteItemById, resetItems } = itemsSlice.actions
