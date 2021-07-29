import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

import { getRole } from 'services/token-service';

const CustomRoute = ({ path, children, requiredRoles }) => {
  const token = useSelector((state) => state.token);
  const role = getRole(token.jwtToken);

  return (
    <Route path={path}>
      {
        requiredRoles.includes(role) ?
        children : 
        <Redirect to='/'/>
      }
    </Route>
  );
};

export default CustomRoute;