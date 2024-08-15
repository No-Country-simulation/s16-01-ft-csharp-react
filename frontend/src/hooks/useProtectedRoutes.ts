import { useLocation, useNavigate } from 'react-router-dom';
import { useUserActions } from './useUserActions';
import { useEffect } from 'react';

/**
 * Hook to redirect on Protected Routes
 */
export default function useProtectedRoutes() {
  const { user } = useUserActions();
  const location = useLocation();
  const navigate = useNavigate();

  const externRoutes = ['/about', '/register'];
  const internRoutes = ['/home', '/preference', '/menu', '/orders', '/expenses', '/product/', '/payment', '/invoice', '/survey'];

  useEffect(() => {
    const isExternRoute = externRoutes.some(value => location.pathname.includes(value));
    const isInternRoute = internRoutes.some(value => location.pathname.includes(value));

    if (user.username && isExternRoute) {
      navigate('/home');
    } else if (!user.username && isInternRoute) {
      navigate('/about');
    }
  }, [user, location.pathname, navigate]);
}
