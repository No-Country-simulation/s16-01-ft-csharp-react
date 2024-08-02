import { useAppDispatch, useAppSelector } from './store'
import { resetUser, setUser, setUserState,  } from '../store/userSlice'
import type { UserState, UserStateState } from '../models/types.d'

export const useUserActions = () => {
  const user: UserState = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  /**
   * This method set a User State in the Context
   * @param {*} data This parameter required a User State
   */
  const useSetUser = (data: UserState) => {
    dispatch(setUser(data))
  }

  /**
   * This method set a User State in the Context
   * @param {*} data This parameter required a User State State
   */
  const useSetUserStateState = (data: UserStateState) => {
    dispatch(setUserState(data))
  }

  /**
   * This method reset the User State
   */
  const useResetUser = () => {
    dispatch(resetUser())
  }

  return { useResetUser, useSetUser, useSetUserStateState, user }
}
