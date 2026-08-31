import { useAuth } from '@/context/auth';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';


const ProtectedRoute = () => {
  const { isAuth, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Checking authentication...</p>
        </div>
      </div>
    );
  }
 
  
  if (!isAuth) {

    
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  
  return <Outlet />;
};

export default ProtectedRoute;