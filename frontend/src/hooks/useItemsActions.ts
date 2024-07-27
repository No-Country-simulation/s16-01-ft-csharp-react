import {
    initItems,
    addItem,
    updateItemById,
    deleteItemById,
    resetItems
  } from '../store/itemsSlice'
  import { useAppDispatch, useAppSelector } from './store'
  import { Item, NewItem } from '../models/types.d'
  
  export const useItemsActions = () => {
    const items = useAppSelector(state => state.items)
    const dispatch = useAppDispatch()
  
    /**
     * This method add a List of Items
     * @param {[]} data This parameter required a array of Items
     */
    const useInitItems = (data: Item[]) => {
      dispatch(initItems(data))
    }
  
    /**
     * This method add a Item
     * @param {object} data This parameter required a Item Object
     */
    const useAddItem = (data: Item) => {
      dispatch(addItem(data))
    }
  
    /**
     * This method update a Item by Id
     * @param {object} param This parameter requiered an object with id and newData
     */
    const useUpdateItemById = ({ id, newData }: NewItem) => {
      dispatch(updateItemById({ id, newData }))
    }
  
    /**
     * This method delete a Item by Id
     * @param {number} id This parameter required a Id
     */
    const useDeleteItemById = (id: string) => {
      dispatch(deleteItemById(id))
    }
  
    /**
     * This method reset the List of Items
     */
    const useResetItems = () => {
      dispatch(resetItems())
    }
  
    return {
      useInitItems,
      useAddItem,
      useUpdateItemById,
      useDeleteItemById,
      useResetItems,
      items
    }
  }
  