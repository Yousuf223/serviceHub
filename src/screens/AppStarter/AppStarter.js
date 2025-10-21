import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import CustomBackground from '../../components/CustomBackground';
import CustomButton from '../../components/CustomButton';
import Toast from 'react-native-toast-message';
import NavService from '../../helpers/NavService';
import styles from './styles';
import { setRole, loginCurrentUser } from '../../redux/actions/authAction';
import { loaderStop } from '../../redux/actions/appAction';

const RoleSelection = ({ loaderStopWithDispatch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <CustomBackground back={false} showLogo={false}>
      <View style={styles.container}>
        <View style={styles.container1}>
          <View style={styles.icon}>
            <Text style={styles.iconText}>🔧</Text>
          </View>
          <Text style={styles.logoText}>Service Hub</Text>
        </View>

        <View style={{ flex: 1 }}>
          <CustomButton
            buttonStyle={styles.buttonStyle}
            onPress={() =>
              NavService.navigate('Login', { role: 'USER' })
            }
            title={'User'}
          />

          <CustomButton
            textStyle={styles.textStyle}
            onPress={() =>
              NavService.navigate('Login', { role: 'SERVICEPROVIDER' })
            }
            title={'Service Provider'}
          />
        </View>
      </View>
    </CustomBackground>
  );
};

const actions = { loginCurrentUser, setRole };
export default connect(null, actions)(RoleSelection);
