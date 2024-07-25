import { createSlice } from '@reduxjs/toolkit'
import type { Item, NewItem } from '../models/types.d'
import type { PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE: Item[] = []

const initialState: Item[] = (() => {
  const persistedState = window.localStorage.getItem('session_state')
  return persistedState ? JSON.parse(persistedState).items : DEFAULT_STATE
})()

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    initItems: (state, action: PayloadAction<Item[]>) => {
      return [...state, ...action.payload]
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
