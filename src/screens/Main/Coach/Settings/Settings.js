import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import styles from './styles';
import AppBackground from '../../../../components/AppBackground';
import Img from '../../../../components/Img';
import { appIcons } from '../../../../assets';
import { colors } from '../../../../utils';
import NavService from '../../../../helpers/NavService';
import { connect } from 'react-redux';
import { deleteProfile, logoutUser, } from '../../../../redux/actions/authAction';
import ConfirmationModal from '../../../../containers/Popup/ConfirmationModal/ConfirmationModal';
import { loaderStart, loaderStop, toggleNotification } from '../../../../redux/actions/appAction';
import axios from 'axios';
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: false,
      modalVisible: false
    };
  };

  render() {
    const { notification, modalVisible } = this.state;
    const { user } = this?.props;

    const token = this.props.userToken
    const onToggle = async () => {
      try {
        this.props.loaderStart()
        const response = await axios.patch(
          'https://sn6jm18m-5000.inc1.devtunnels.ms/api/v1/auth/toggle-notifications',
          null,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        if (response?.data?.data) {
          this.props.loaderStop()
          this.setState({ notification: !response?.data?.data?.isNotify })
        }
        console.log('API Response:', response?.data?.data);
      } catch (error) {
        this.props.loaderStop()
        console.error('Error during API request:', error);
      }
    };



    return (
      <AppBackground
        back
        title={'Settings'}
        marginHorizontal={false}
      >
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <View style={[styles.flexRow, styles.cont]}>
              <View style={[styles.flexRow]}>
                <Img
                  local
                  src={appIcons.notification}
                  style={styles.icon}
                  resizeMode={"contain"}
                  tintColor={colors.white}
                />
                <Text style={styles.contTitle}>
                  Push Notifications
                </Text>
              </View>
              <ToggleSwitch
                isOn={notification}
                onToggle={() => onToggle()}
                trackOnStyle={styles.trackonstyle}
                trackOffStyle={styles.trackoff}
                thumbOnStyle={styles.thumb}
                thumbOffStyle={styles.thumboff}
                onColor={colors.white}
                offColor={colors.white}
                circleColor={notification ? colors.primary : colors.black}
                size="small"
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.flexRow, styles.cont]}
              onPress={() => { NavService.navigate("ChangePassword") }}
            >
              <View style={[styles.flexRow]}>
                <Img
                  local
                  src={appIcons.lock}
                  style={styles.icon}
                  resizeMode={"contain"}
                  tintColor={colors.white}
                />
                <Text style={styles.contTitle}>
                  Change Password
                </Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </AppBackground>
    );
  }
};

function mapStateToProps({ authReducer }) {
  return {
    userToken: authReducer?.userToken,
  };
}
const actions = { deleteProfile, logoutUser, toggleNotification, loaderStop, loaderStart };
export default connect(mapStateToProps, actions)(Settings);
