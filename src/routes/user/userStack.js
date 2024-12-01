// @app
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserAppStack from './drawer/drawer';
import Home from '../../screens/Main/user/Home/Home';
import Profile from '../../screens/Main/user/Profile/Profie';
import Message from '../../screens/Main/user/Message';
import Chat from '../../screens/Main/user/Chat';

const Stack = createNativeStackNavigator();

const UserNavigation = ({ initialRoute }) => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureDirection: 'horizontal',
        gestureEnabled: true,
      }}>
      <Stack.Screen name="UserAppStack" component={UserAppStack} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default UserNavigation;