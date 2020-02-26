import React from "react"; 
import { connect } from "react-redux";
import { Redirect, Route, withRouter } from "react-router-dom";

const mapStateToProps = ({ session: { userId} }) => ({
  loggedIn: Boolean(userId)
});

// export const checkLoggedIn = () => {
//   let user;
//   axios.get('api/session/check')
//     .then(res => {
//       user = {userId: res.data.userId, firstName: res.data.firstName}
//       if (user) {
//         let preloadedState = {
//           session: user
//         }
//        console.log(preloadedState)
//        return preloadedState
//       }
//     })
// }


const Auth = ({ loggedIn, path, component: Component }) => (
  <Route
    path={path}
    render={props => (
      loggedIn ?
      <Redirect to='/transactions' /> :
      <Component {...props} />
    )}
  />
);

const Protected = ({ loggedIn, path, component: Component }) => (
  <Route
    path={path}
    render={props => (
      loggedIn ? 
      <Component {...props} /> :
      <Redirect to='/login' />
    )}
  />
);

export const AuthRoute = withRouter(
  connect(mapStateToProps)(Auth)
);

export const ProtectedRoute = withRouter(
  connect(mapStateToProps)(Protected)
);
