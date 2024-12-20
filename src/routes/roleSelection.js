import React, {Component} from 'react';
import {connect} from 'react-redux';
// @navigations


import {_AppLayout} from '../redux/actions';
import AuthNavigation from './Auth/authNavigation';
import CoachNavigation from './coach/coachStack';
import UserNavigation from './user/userStack';



class RoleSelection extends Component {
  render() {
    const loggedInUser = this.props?.user;
    return (
      <>
        {loggedInUser?.role && loggedInUser?.role == 'USER' ? (
          <UserNavigation initialRoute={undefined} />
        ) : loggedInUser?.role && loggedInUser?.role == 'SERVICEPROVIDER' ? (
          <CoachNavigation />
        )  : (
          <AuthNavigation initialRoute={undefined} />
        )}
      </>
    );
  }
}
function mapStateToProps({authReducer: {user,role}}) {
  return {
    user: user,
    role:role
  };
}

export default connect(mapStateToProps)(RoleSelection);

