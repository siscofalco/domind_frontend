
import React from 'react'
import { Redirect, Route } from 'react-router'
import { withAuth } from './../../context/auth.context';
import CachedIcon from '@material-ui/icons/Cached';

function PrivateRoute(routeProps) {
  // Value viene del AuthProvider
  const { isLoggedIn, isLoading } = routeProps;

  // props provienen del componente PrivateRoute
  const { exact, path } = routeProps;
  const ComponentToShow = routeProps.component;

  // AuthProvider todavía esta cargando la infirmación de la API para comprobar si hay usuario en sesión
  if (isLoading) return <div className="loadingContainer"><CachedIcon /></div>;
  return (
    <Route 
      exact={exact}
      path={path}
      render={
        function(props) {
          if(!isLoggedIn) return <Redirect to="/login" />
          else if(isLoggedIn) return <ComponentToShow {...props} />
        }
      }
    />
  )
}

export default withAuth(PrivateRoute);