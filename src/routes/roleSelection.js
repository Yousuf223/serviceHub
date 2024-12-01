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
    // const role = this.props.role
    return (
      <>
        {loggedInUser && loggedInUser?.role == 'User' ? (
          <UserNavigation initialRoute={undefined} />
        ) : loggedInUser && loggedInUser?.role == 'ServiceProvider' ? (
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

