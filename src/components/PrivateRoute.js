import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth); // Adjust this selector based on your Redux state
  
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
