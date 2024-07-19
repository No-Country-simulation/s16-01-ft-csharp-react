import { useLocation, useNavigate } from 'react-router-dom'
import { useUserActions } from './useUserActions'
import { useEffect } from 'react'

/**
 * Hook to redirect on Protected Routes
 */
export default function useProtectedRoutes () {
  const { useCheckRealUser, user } = useUserActions()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if ((location.pathname === '/login' || location.pathname === '/home') && useCheckRealUser(user)) {
      navigate('/dashboard')
    } else if (!(location.pathname === '/login' || location.pathname === '/home') &&
      !useCheckRealUser(user)) {
      navigate('/login')
    }
  }, [user])
}
