import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const useNavigateAndScroll = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateAndScroll = useCallback((path: string) => {
    const isHashLink = path.startsWith('/#');

    if (isHashLink) {
      const targetId = path.substring(2);
      
      if (location.pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/', { state: { scrollTo: targetId } });
      }
    } else {
      navigate(path);
    }
  }, [navigate, location.pathname]);

  return navigateAndScroll;
};
