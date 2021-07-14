import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";

function RestrictedRoute({
  isAdminRoute,
  currentUser,
  component: C,
  ...otherProps
}) {
  let renderComponent;
  if (isAdminRoute) {
    renderComponent =
      currentUser && currentUser.role === "admin" ? (
        <C />
      ) : (
        <Redirect to="/users/signin" />
      );
  } else {
    renderComponent = currentUser ? <C /> : <Redirect to="/users/signin" />;
  }

  return <Route {...otherProps} render={() => renderComponent} />;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(RestrictedRoute);
