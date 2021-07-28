import React, { useEffect, useState } from 'react';
import { BrowserRouter as Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getRole } from 'services/token-service';

const CustomRoute = ({ children, requiredRoles }) => {
  const token = useSelector((state) => state.token);
  const [role, setRole] = useState('');

  useEffect(() => {
    setRole(getRole(token.jwtToken));
  }, [token.jwtToken]);

  return (
    <Route>
      {requiredRoles.includes(role) ?
        children : 
        <Redirect to='/'/>
      }
    </Route>
  );
};

export default CustomRoute;