// @app
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import UserAppStack from './drawer/drawer';
import Home from '../../screens/Main/Coach/Home/Home';
import Profile from '../../screens/Main/Coach/Profile/Profile';
import Message from '../../screens/Main/Coach/Message';
import Chat from '../../screens/Main/Coach/Chat';
import CreatePost from '../../screens/Main/Coach/CreatePost';



const Stack = createNativeStackNavigator();

const CoachNavigation = ({ initialRoute }) => {
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
      <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
  );
};

export default CoachNavigation;
