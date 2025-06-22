import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const authToken = localStorage.getItem('authToken');
  return authToken ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
