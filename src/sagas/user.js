import { take, put, call, fork } from 'redux-saga/effects';
import ActionTypes from '../redux/constants';
import {
  loginUser,
  saveTokenForLoginUser,
  logoutUser,
  loginCurrentUser,
} from '../redux/actions/authAction';
import { loaderStart, loaderStop , removeDataForLogoutUser,} from '../redux/actions/appAction';
import API_URL, {
  LOGIN,
  callRequest,
  COMPLETE_PROFILE,
  UPDATE_PROFILE,
  LOGOUT,
  CHANGE_PASSWORD,
  DELETE_USER,
  SIGNUP,
  VERIFY_OTP,
  RESEND_PASSWORD,
  FORGOT_PASSWORD,
  RESEND_OTP,
  SOCIAL_LOGIN,
  WEB_SOCKET_URL,ADD_PROFILE_PICTURE
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../utils/Utils';
import NavService from '../helpers/NavService';


function* login() {
  while (true) {
    const { payload } = yield take(ActionTypes.LOGIN_USER.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        LOGIN,
        payload,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        console.log('responseresponse', response);
        if (response.status.success === true) {
         if (response?.data?.user.isProfileComplete == false) {
          yield put(saveTokenForLoginUser(response?.data?.token));
            NavService.navigate('CompleteProfile',{email:payload?.email});
            Util.DialogAlert(response.message, 'success');
          } else {
            console.log('login response', response.data);
            yield put(saveTokenForLoginUser(response?.data?.token));
            yield put(loginUser(response?.data));
            Util.DialogAlert('Login Successfully', 'success');
          }
        } 
      } 
    } catch (error) {
      console.log('-----errorerror----', error);
      yield put(loaderStop());
       Util.DialogAlert(error.error);
    }
  }
}
function* signUp() {
  while (true) {
    const { payload, role } = yield take(ActionTypes.SIGNUP_USER.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        SIGNUP,
        payload,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        Util.DialogAlert(response.message, 'success');
        NavService.navigate('Otp', {
          user_id: response?.data?.user_id,
          role: role,
          screenName: 'signup',
        });
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error=======errror', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* oTPVerify() {
  while (true) {
    const { payload, role, user_id, screenName } = yield take(
      ActionTypes.VERIFY_OTP.REQUEST,
    );
    console.log('screenNamescreenName', screenName);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        VERIFY_OTP,
        payload,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      console.log('responseresponse',response)
      if (response.status.success === true) {
        yield put(saveTokenForLoginUser(response?.data?.token));
        Util.DialogAlert(response.message,'success');
        NavService.navigate('ChangePassword');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.error);
    }
  }
}
function* resendOTP() {
  while (true) {
    const { payload,responseCallback} = yield take(ActionTypes.RESEND_OTP.REQUEST);
    console.log('payload', payload);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        RESEND_OTP,
        payload,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status.success === true) {
        NavService.navigate('Otp', {
          otp:response.data.otp
        });
      if(responseCallback){
        responseCallback(response.data.otp)
      }
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.error);
    }
  }
}

function* deleteProfile() {
  while (true) {
    const { payload, responseCallback } = yield take(
      ActionTypes.DELETE_USER.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        DELETE_USER,
        payload,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      console.log('responseeeeeeeeee', response)
      if (response.status.success === true) {
        console.log('responseofdelete', response?.message)
        yield put(loginUser())
        Util.DialogAlert(response?.message, 'success');
        if (responseCallback) {
          responseCallback(true);
        }
      }
      else {
        console.log('errrorr-logged')
      }
    } catch (error) {
      console.log('errorofdeleteprofile', error);
      Util.DialogAlert(error?.error);
      yield put(loaderStop());
    }
  }
}
function* completeProfile() {
  while (true) {
    const { payload } = yield take(ActionTypes.COMPLETE_PROFILE.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        COMPLETE_PROFILE,
        payload,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      console.log('=====response',response)
      if (response) {
        const data  = {
          email:'abc@g.com',
          password:1233455
        }
        yield put(loginUser(data));
        Util.DialogAlert('Profile Completed Successfully', 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
  console.log('errorerrorerror',error)
      yield put(loaderStop());
      Util.DialogAlert(error.error);
    }
  }
}
function* updateProfile() {
  while (true) {
    const { payload ,responseCallback} = yield take(ActionTypes.UPDATE_PROFILE.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        UPDATE_PROFILE,
        payload,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response) {
        if (responseCallback) {
          responseCallback(response);
        }
      
        Util.DialogAlert('Profile updated Successfully', 'success');
      } else {
        // Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('errorofupdateprofile', error?.error);
      yield put(loaderStop());
      Util.DialogAlert(error.error);
    }
  }
}
function* userLogout() {
  while (true) {
    const { payload } = yield take(ActionTypes.USER_LOGOUT.REQUEST);
    console.log('payloadoflogoutuser')
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        LOGOUT,
        payload,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('responseoflogoutuser', response);
        if (
          payload?.user_social_token !== null &&
          payload?.user_social_type == 'google'
        ) {
          yield put(removeDataForLogoutUser());
        }
        yield put(logoutUser());
        yield put(removeDataForLogoutUser());
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('erroroflogoutuser', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* resetPassword() {
  while (true) {
    const { payload } = yield take(ActionTypes.RESEND_PASSWORD.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        RESEND_PASSWORD,
        payload,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      console.log('payloadofresendpassword', response);
      if (response.status.success === true) {   
        Util.DialogAlert(response.message, 'success')
        NavService.navigate('Login');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('errorofresetpassword', error);
      yield put(loaderStop());
      Util.DialogAlert(error.error);
    }
  }
}
function* forgotPassword() {
  while (true) {
    const { payload } = yield take(ActionTypes.FORGOT_PASSWORD.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        FORGOT_PASSWORD,
        payload,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response?.status?.success == true) {
        NavService.navigate('Otp', {
          screenName: 'forgot',
          email: payload,
          otp:response.data.otp
        });
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* changePassword() {
  while (true) {
    const { payload } = yield take(ActionTypes.CHANGE_PASSWORD.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        CHANGE_PASSWORD,
        payload,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('payloadofChangepassword', response);
        Util.DialogAlert(response.message, 'success')

      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('errorofChangepassword', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* addProfilePicture() {
  while (true) {
    const { payload,responseCallback } = yield take(ActionTypes.ADD_PROFILE_PICTURE.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        ADD_PROFILE_PICTURE,
        payload,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status.success === true) {
        if(responseCallback){
          responseCallback(response)
        }
        console.log('payloadofChangepassword', response);
        // Util.DialogAlert(response.message, 'success')

      }
    } catch (error) {
      console.log('errorofChangepassword', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
export default function* root() {
  yield fork(login);
  yield fork(completeProfile);
  yield fork(updateProfile);
  yield fork(userLogout);
  yield fork(deleteProfile);
  yield fork(signUp);
  yield fork(oTPVerify);
  yield fork(resendOTP);
  yield fork(resetPassword);
  yield fork(forgotPassword);
  yield fork(changePassword);
  yield fork(addProfilePicture);
}
