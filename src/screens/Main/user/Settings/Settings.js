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
import { deleteProfile, logoutUser } from '../../../../redux/actions/authAction';
import ConfirmationModal from '../../../../containers/Popup/ConfirmationModal/ConfirmationModal';

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
                onToggle={() => this.setState({ notification: !notification })}
                trackOnStyle={styles.trackonstyle}
                trackOffStyle={styles.trackoff}
                thumbOnStyle={styles.thumb}
                thumbOffStyle={styles.thumboff}
                onColor={colors.white}
                offColor={colors.white}
                circleColor={notification ? colors.secondary : colors.black}
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
    user: authReducer?.user,
  };
}
const actions = { deleteProfile, logoutUser };
export default connect(mapStateToProps, actions)(Settings);
