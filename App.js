import 'react-native-get-random-values';
/**
 * Boiler Plate React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React , {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  StatusBar,
  Platform,
  LogBox,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux';
import Loader from './src/helpers/Loader';
import MainNavigation from './src/routes';
import {colors} from './src/utils';
import LinearGradient from 'react-native-linear-gradient';
import { appImages } from './src/assets';
// ignore warnings
LogBox.ignoreAllLogs();

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      text1NumberOfLines={5}
      style={{
        borderLeftColor: colors.secondary,
        maxHeight: 120,
        height: '100%',
        paddingVertical: 20,
      }}
      text1Style={{
        fontSize: 14,
        color: colors.black,
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1NumberOfLines={5}
      style={{
        borderLeftColor: colors.red,
        maxHeight: 120,
        height: '100%',
        paddingVertical: 20,
      }}
      text1Style={{
        fontSize: 14,
        color: colors.black,
      }}
    />
  ),
};

const App = () => {
  // let socket = null;
  // const saveCurrebtSocket = () => {
  //   socket = io(WEB_SOCKET_URL);
  //   socket.on('connect', () => {
  //     if (socket.connected) {
  //       console.log('socket', socket);
  //       saveScoket(socket);
  //     } else {
  //       console.log('socket', socket);
  //       saveScoket(null);
  //     }
  //   });
  // };
  // useEffect(() => {
  //   saveCurrebtSocket();
  //   return () => {
  //     if (socket !== null) {
  //       socket?.disconnect();
  //     }
  //   };
  // }, []);
  return (
    <Wrapper>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={colors.white}
          barStyle="dark-content"

        />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Loader />
            <MainNavigation />
            <Toast config={toastConfig} />
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </Wrapper>
  );
};

export default App;

const Wrapper = ({children}) => {
  if (Platform.OS === 'ios')
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {/* <ImageBackground source={appImages.backgroundImage} style={styles.container} > */}
        <View style={[styles.container, styles.containerWhiteBackground]}>
          {children}
        </View>
        {/* </ImageBackground> */}
      </KeyboardAvoidingView>
    );
  return (
    <View style={[styles.container, styles.containerWhiteBackground]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerWhiteBackground: {
    backgroundColor: 'transparent',
  },
});
