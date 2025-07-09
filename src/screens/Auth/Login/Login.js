import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, Image, Platform} from 'react-native';
import { useDispatch} from 'react-redux';
import * as EmailValidator from 'email-validator';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import Toast from 'react-native-toast-message';
import NavService from '../../../helpers/NavService';
import { loginCurrentUser} from '../../../redux/actions/authAction';
import {appIcons, appLogos} from '../../../assets/index';
import {colors} from '../../../utils';
import styles from './styles';

const Login = ({ navigation,route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {role}  = route?.params
  const dispatch = useDispatch();
  const onSubmit = async () => {
    if (!email && !password) {
      Toast.show({
        text1: `Fields can't be empty`,
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!email) {
      Toast.show({
        text1: `Email field can't be empty`,
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!EmailValidator.validate(email)) {
      Toast.show({
        text1: 'You have entered an invalid email address.',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!password) {
      Toast.show({
        text1: `Password field can't be empty`,
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      let payload = {
        email:email,
        password:password,
        role:role
      };
      dispatch(loginCurrentUser(payload));
    }
  };

  return (
    <CustomBackground showLogo={false} titleText={'Sign In'}>
      <View style={styles.container}>
        <View style={[styles.container, {marginTop: "10%"}]}>
          <View style={styles.container1}>
            <View style={styles.icon}>
              <Text style={styles.iconText}>🔧</Text>
            </View>
            <Text style={styles.logoText}>Smart World</Text>
          </View>
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
            placeholder={'Password'}
            value={password}
            onChangeText={setPassword}
            rightIcon
            isPassword
            maxLength={30}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            activeOpacity={0.8}>
            <Text style={styles.subText}>Forgot Password?</Text>
          </TouchableOpacity>
          <CustomButton
            title="Login"
            onPress={onSubmit}
            buttonStyle={{borderRadius: 10, marginTop: 20, alignSelf: 'center'}}
            textStyle={{fontSize: 17}}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => NavService.navigate('SignUp',{
            role
          })}
          style={styles.bottomView}>
          <Text style={styles.textNormal}>
            Create New Account?{' '}
            <Text style={{color: colors.primary}}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </CustomBackground>
  );
};



export default Login;
