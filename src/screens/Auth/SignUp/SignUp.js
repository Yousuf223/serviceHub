import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as EmailValidator from 'email-validator';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import Toast from 'react-native-toast-message';
import NavService from '../../../helpers/NavService';
import { colors } from '../../../utils';
import { appIcons, appLogos } from '../../../assets/index';
import { signUpUser } from '../../../redux/actions/authAction';
import { getDeviceToken } from '../../../redux/actions/appAction';
import styles from './styles';

const SignUp = ({route}) => {
 const {role} = route.params
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Redux dispatch and selector
  const dispatch = useDispatch();
  const location = useSelector(state => state.appReducer?.currentUserLocation);

  // Form submission handler
  const onSubmit = async () => {
    if (!email) {
      Toast.show({
        text1: `Email field can't be empty`,
        type: 'error',
        visibilityTime: 3000,
      });
      return;
    }

    if (!EmailValidator.validate(email)) {
      Toast.show({
        text1: 'You have entered an invalid email address.',
        type: 'error',
        visibilityTime: 3000,
      });
      return;
    }

    if (!password || !confirmPassword) {
      Toast.show({
        text1: 'Password fields can\'t be empty.',
        type: 'error',
        visibilityTime: 3000,
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        text1: 'Passwords do not match.',
        type: 'error',
        visibilityTime: 3000,
      });
      return;
    }  

    const payload = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      role: role
    };

    dispatch(signUpUser(payload));

  };

  return (
    <CustomBackground showLogo={false} titleText={'Sign Up'}>
      <View style={styles.container}>
        <View style={[styles.container]}>
        <View style={styles.container1}>
            {/* Circle Icon */}
            <View style={styles.icon}>
              <Text style={styles.iconText}>🔧</Text>{' '}
              {/* Wrench Icon as Service Representation */}
            </View>

            {/* Logo Text */}
            <Text style={styles.logoText}>Service Hub</Text>
          </View>
          {/* <View>
            <Image style={styles.applogo} source={appLogos.appLogo} />
          </View> */}

          <Text style={styles.title}>Email</Text>
          <CustomTextInput
            leftIcon={appIcons.email}
            placeholder={'Enter Email Address'}
            value={email}
            keyboardType={'email-address'}
            onChangeText={setEmail}
            maxLength={35}
          />
          <Text style={styles.title}>Password</Text>
          <CustomTextInput
            leftIcon={appIcons.lock}
            placeholder={'New Password'}
            value={password}
            onChangeText={setPassword}
            rightIcon
            isPassword
            maxLength={30}
          />
          <Text style={styles.title}>Confirm Password</Text>
          <CustomTextInput
            leftIcon={appIcons.lock}
            placeholder={'Confirm Password'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            rightIcon
            isPassword
            maxLength={30}
          />

          <TouchableOpacity
            onPress={() => NavService.navigate('ForgotPassword')}
            activeOpacity={0.8}
          >
            <Text style={styles.subText}>Forgot Password?</Text>
          </TouchableOpacity>

          <CustomButton
            title="Sign Up"
            onPress={onSubmit}
            buttonStyle={{ borderRadius: 10, marginTop: 20, alignSelf: "center" }}
            textStyle={{ fontSize: 17 }}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => NavService.navigate('Login')}
          style={styles.bottomView}
        >
          <Text style={styles.textNormal}>
            Already Have an Account? <Text style={{ color: colors.primary }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </CustomBackground>
  );
};

export default SignUp;
