import { useAppDispatch, useAppSelector } from './store'
import { resetUser, setUser, setUserState, setUserOrderList } from '../store/userSlice'
import type { Order, User, UserState } from '../models/types.d'

export const useUserActions = () => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  /**
   * This method set a User in the Context
   * @param {*} data This parameter required a User
   */
  const useSetUser = (data: User) => {
    dispatch(setUser(data))
  }

  /**
   * This method set a User State in the Context
   * @param {*} data This parameter required a User State
   */
  const useSetUserState = (data: UserState) => {
    dispatch(setUserState(data))
  }

  /**
   * This method set a User Order List in the Context
   * @param {*} data This parameter required a User State
   */
  const useSetUserOrderList = (data: Order[]) => {
    dispatch(setUserOrderList(data))
  }

  /**
   * This method reset the User
   */
  const useResetUser = () => {
    dispatch(resetUser())
  }

  return { useResetUser, useSetUser,useSetUserState, useSetUserOrderList, user }
}
