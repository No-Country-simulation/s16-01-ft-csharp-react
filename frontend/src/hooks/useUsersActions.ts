import { useAppDispatch, useAppSelector } from './store'
import {
    setUsers,
    resetUsers,
    setUserSimple,
    setUserSimpleList,
    setUserPreferences,
    setUserPreferencesList,
    setUserOrder,
    setUserOrderList,
    DEFAULT_USER
} from '../store/usersSlice'
import type { User, UserAndOrder, UserAndPreference, UserSimple } from '../models/types.d'

export const useUsersActions = () => {
  const users: User[] = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()
  /* const { user } = useUserActions() */
  const myUser: User = users.find((PerUser: User) => PerUser.user_id === '0' /* user.user_id */ ) || DEFAULT_USER

  /**
   * This method set a User List in the Context
   * @param {*} data This parameter required a User List
   */
  const useSetUsers = (data: User[]) => {
    dispatch(setUsers(data))
  }

  /**
   * This method reset the User List
   */
  const useResetUsers = () => {
    dispatch(resetUsers())
  }

  const useSetUserSimple = (data: UserSimple) => {
    dispatch(setUserSimple(data))
  }

  const useSetUserSimpleList = (data: UserSimple[]) => {
    dispatch(setUserSimpleList(data))
  }

  const useSetUserPreferences = (data: UserAndPreference) => {
    dispatch(setUserPreferences(data))
  }

  const useSetUserPreferencesList = (data: UserAndPreference[]) => {
    dispatch(setUserPreferencesList(data))
  }

  const useSetUserOrder = (data: UserAndOrder) => {
    dispatch(setUserOrder(data))
  }

  const useSetUserOrderList = (data: UserAndOrder[]) => {
    dispatch(setUserOrderList(data))
  }

  return {
    useSetUsers,
    useResetUsers,
    useSetUserSimple,
    useSetUserSimpleList,
    useSetUserPreferences,
    useSetUserPreferencesList,
    useSetUserOrder,
    useSetUserOrderList,
    users,
    myUser
  }
}
