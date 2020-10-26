import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  // const signed = false;
  const { user } = useAuth();
  if (!!user && isPrivate) {
    return <Redirect to="/" />;
  }

  if (user && !isPrivate) {
    return <Redirect to="/home" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
