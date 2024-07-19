import { useLocation, useNavigate } from 'react-router-dom'
import { useUserActions } from './useUserActions'
import { useEffect } from 'react'

/**
 * Hook to redirect on Protected Routes
 */
export default function useProtectedRoutes () {
  const { user } = useUserActions()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if ((location.pathname === '/login' || location.pathname === '/home')) {
      navigate('/dashboard')
    } else if (!(location.pathname === '/login' || location.pathname === '/home')) {
      navigate('/login')
    }
  }, [user])
}
