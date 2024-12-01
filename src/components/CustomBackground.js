import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {appIcons, appImages} from '../assets';
import NavService from '../helpers/NavService';
import {colors, family} from '../utils';
import Logo from './Logo';

export default ({
  children,
  showLogo = true,
  back = true,
  title = true,
  titleText,
  onBack = null,
}) => {
  return (
    <View
      style={{width: '100%', height: '100%', backgroundColor: colors.white}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1,
          paddingTop: showLogo ? 0 : getStatusBarHeight(),
        }}>
        {back && (
          <TouchableOpacity
            onPress={() => {
              if (onBack != null) {
                onBack();
              } else {
                NavService.goBack();
              }
            }}
            style={{
              position: 'absolute',
              zIndex: 99,
              top: getStatusBarHeight() + 13,
              left: 20,
              padding: 8,
              borderRadius: 100,
            }}>
            <Image
              source={appIcons.back}
              style={{width: 20, height: 20, resizeMode: 'contain',tintColor:colors.primary}}
            />
          </TouchableOpacity>
        )}
        {/* {title && (
          <View>
         <Image
              source={appIcons.smallLogo}
              style={{ width: 65, height: 65, resizeMode: 'contain' }}
            />
          </View>
        )} */}
        {titleText && (
          <Text
            style={{
              color: colors.black,
              fontSize: 14,
              marginTop: Platform.OS === 'ios' ? 35 : 20,
            }}>
            {titleText}
          </Text>
        )}
        {showLogo && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Logo size={220} />
          </View>
        )}
        <View style={{flex: 3}}>{children}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSignInText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    top: 8,
  },
  headerContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButtonContainer: {
    position: 'absolute',
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {width: 25, height: 25, tintColor: '#9c9c9c'},
});
