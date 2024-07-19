import { useAppDispatch, useAppSelector } from './store'
import { resetUser, setUser } from '../store/userSlice'
import type { User } from '../models/types.d'

export const useUserActions = () => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  /**
   * This method reset the Context
   */
  const useResetUser = () => {
    dispatch(resetUser())
  }

  /**
   * This method set a User in the Context
   * @param {*} data This parameter required a User
   */
  const useSetUser = (data: User) => {
    dispatch(setUser(data))
  }

  return { useResetUser, useSetUser, user }
}
