// src/layout/publicLayout/HomeRedirect.tsx
import { Navigate } from 'react-router';
import { useAppSelector } from '../../hooks/hooks'; 
import Home from './Home'; 

const HomeRedirect = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser); 

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Home />;
};

export default HomeRedirect;
