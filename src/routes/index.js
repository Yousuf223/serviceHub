import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { connect, useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';

// @navigations

import AuthNavigation from './Auth/authNavigation';
import NavService from '../helpers/NavService';
import RoleSelection from './roleSelection';


const MainNavigation = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
    const splashTimeout = setTimeout(() => {
      SplashScreen.hide();
    }, 2500);
    return () => clearTimeout(splashTimeout);
  }, []);
  const user = useSelector((state) => state?.authReducer?.user)
  console.log('sdfjshfds', user)
  return (
    <NavigationContainer ref={NavService.setTopLevelNavigator}>
      <View style={styles.container}>
        {/* Conditionally render RoleSelection or AuthNavigation based on the user's login status */}
        {user ?
         <RoleSelection initialRoute={undefined} /> 
        : <AuthNavigation initialRoute={undefined} />}
      </View>
    </NavigationContainer>
  );
};



export default MainNavigation


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});













