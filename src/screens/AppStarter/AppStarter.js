import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import * as EmailValidator from 'email-validator';
import CustomBackground from '../../components/CustomBackground';
import CustomButton from '../../components/CustomButton';
import Toast from 'react-native-toast-message';
import NavService from '../../helpers/NavService';
import styles from './styles';
import { setRole, loginCurrentUser } from '../../redux/actions/authAction';

class RoleSelection extends Component {
  state = {
    email: '',
    password: '',
  };
  componentDidMount() {
  }

  render() {



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
                 [NavService.navigate('Login',{
                     role: 'USER'
                 })]}
              title={'User'} />
            <CustomButton
              onPress={() => [NavService.navigate('Login', {
                role: 'SERVICEPROVIDER'
              })
           ]}
              textStyle={styles.textStyle}
             
              title={'Service Provider'}
            />
          </View>

        </View>
      </CustomBackground>
    );
  }
}

const actions = { loginCurrentUser, setRole };
export default connect(null, actions)(RoleSelection);
