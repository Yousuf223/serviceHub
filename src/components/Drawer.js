import React, { Component } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Linking,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, family, size } from '../utils';
import { appIcons, appImages } from '../assets';
import ProfileImage from '../components/ProfileImage';
import { logoutUser, logoutCurrentUser,logoutUserWithDispatch } from '../redux/actions/authAction';
import Img from './Img';
import appStyles from '../screens/appStyles';
import NavService from '../helpers/NavService';
import ConfirmationModal from '../containers/Popup/ConfirmationModal/ConfirmationModal';
import { ASSETS_URL } from '../config/WebService';
import LinearGradient from 'react-native-linear-gradient';

const userMenuItems = [
  {
    icon: appIcons.home,
    title: 'Home',
    nav: 'BottomTabs',
    screen: 'Home',
  },
  {
    icon: appIcons.setting,
    title: 'Settings',
    nav: 'Settings',
    screenName: 'Settings',
  },
  {
    icon: appIcons.help,
    title: 'Help & Feedback',
    nav: 'HelpAndFeedback',
    screenName: 'HelpAndFeedback',
  }
];
const serviceMenuItems = [
  {
    icon: appIcons.home,
    title: 'Home',
    nav: 'BottomTabs',
    screen: 'Home',
  },
  {
    icon: appIcons.user,
    title: 'Message',
    nav: 'Message',
    screenName: 'Message',
  },
  {
    icon: appIcons.help,
    title: 'Help & Feedback',
    nav: 'HelpAndFeedback',
    screenName: 'HelpAndFeedback',
  }
];
class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      profileImage: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({ profileImage: null });
    }
  }

  handleLogout = () => {
    // Close drawer and show modal
    NavService.closeDrawer();
    this.setState({ modalVisible: true });
  };

  confirmLogout = () => {
    this.setState({ modalVisible: false });
    this.props.logoutUser();
    // this.props.navigation.navigate('AuthNavigation');
  };

  renderItem = ({ item, index }) => {
    const { title, icon, nav, screenName, screen } = item;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (title === 'Logout') {
            this.handleLogout();
          } else {
            // Handle other navigation cases
            if (item?.browser) {
              Linking.openURL(item?.browser);
            } else {
              if (screenName) {
                NavService.navigate(nav, { screenName });
              } else if (screen) {
                NavService.navigate(nav, { screen });
              }
              this.props.navigation.closeDrawer();
            }
          }
        }}
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            paddingVertical: 10,
            borderRadius: 7,
            marginLeft: 10,
          }}
        >
          <Image
            source={icon}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
              tintColor: colors.white,
            }}
          />
        </View>
        <Text
          style={{
            marginLeft: 20,
            color: colors.white,
            fontSize: 16,
            ...appStyles.family_Oswald_Regular,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { modalVisible, profileImage } = this.state;
    const { user } = this.props;
    console.log('useruser',user?.role)
    // const menuItems = user ? userMenuItems : [
    //   { icon: appIcons.login, title: 'Login' }
    // ];

    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[colors.primary, colors.secondary]}
        style={{
          paddingTop: getStatusBarHeight(),
          flex: 1,
          backgroundColor: colors.primary,
        }}
      >
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 12,
            marginTop: 20,
            marginBottom: '15%',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('BottomTabs', {
                screen: 'Profile',
              });
            }}
          >
            <ProfileImage
              name={'UserName'}
              size={90}
              innerAsset={profileImage == null ? true : false}
              imageUri={appIcons.userPlaceholder}
              // imageUri={
              //   profileImage == null && user?.profilePicture == null
              //     ? appIcons.userPlaceholder
              //     : user?.profilePicture !== '' && profileImage == null
              //     ? { uri: user?.profilePicture }
              //     : profileImage?.path
              // }
              darwerImg
              viewStyle={{
                width: 115,
                height: 115,
                borderRadius: 70,
              }}
              style={{
                borderWidth: 2,
                borderColor: colors.secondary,
                borderRadius: 70,
              }}
            />
          </TouchableOpacity>
          <View>
            <Text
              numberOfLines={1}
              style={{
                color: colors.white,
                fontSize: size.medium,
                marginTop: 5,
                textTransform: 'capitalize',
                fontWeight: '600',
              }}
            >
              {user?.firstName} {user?.lastName}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: colors.white,
                fontSize: size.xsmall,
                marginTop: 3,
              }}
            >
              {user?.email}
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, width: '100%' }}>
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item,index) => index?.toString()} 
            data={user?.role == 'SERVICEPROVIDER' ? serviceMenuItems : userMenuItems}
            style={{
              height: '100%',
              paddingHorizontal: 20,
            }}
            renderItem={this.renderItem}
          />
        </View>

        {/* Logout Button */}
        {user && (
          <TouchableOpacity onPress={this.handleLogout} activeOpacity={0.8}>
            <LinearGradient
              style={{
                height: 60,
                alignItems: 'center',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: '20%',
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#fff', '#fff']}
            >
              <Image
                source={appIcons.logout}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  marginRight: 20,
                  tintColor: colors.primary,
                }}
              />
              <Text
                style={{
                  color: colors.primary,
                  fontSize: size.large,
                  fontWeight: '500',
                }}
              >
                Logout
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <ConfirmationModal
          isModalVisible={modalVisible}
          togglePopup={() => this.setState({ modalVisible: false })}
          Title={'Logout'}
          SubTitle={'Are you sure you want to Logout?'}
          onPress={this.confirmLogout}
          btnTitle={'Logout'}
          close
          logout
          onPress2={() => this.setState({ modalVisible: false })}
        />
      </LinearGradient>
    );
  }
}

function mapStateToProps({ authReducer: { user } }) {
  return {
    user: user,
  };
}

const actions = { logoutUser, logoutCurrentUser,logoutUserWithDispatch };
export default connect(mapStateToProps, actions)(Drawer);
