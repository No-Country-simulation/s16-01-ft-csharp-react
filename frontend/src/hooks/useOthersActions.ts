import { useAppDispatch, useAppSelector } from './store'
import { setOthers, resetOthers } from '../store/othersSlice'
import type { OtherUser } from '../models/types.d'

export const useOthersActions = () => {
  const others = useAppSelector(state => state.others)
  const dispatch = useAppDispatch()

  /**
   * This method set a Others List in the Context
   * @param {*} data This parameter required a OtherUser List
   */
  const useSetOthers = (data: OtherUser[]) => {
    dispatch(setOthers(data))
  }

  /**
   * This method reset the Others List
   */
  const useResetOthers = () => {
    dispatch(resetOthers())
  }

  return { useSetOthers, useResetOthers, others }
}
