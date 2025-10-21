import { StyleSheet, Dimensions } from 'react-native';
import { colors, HP, WP, size } from '../../../utils';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
    marginVertical: '8%',
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: "20%"
  },
  textNormal: {
    marginVertical: 20,
  },
  applogo: {
    width: 244,
    height: 200,
    marginBottom: "6%", marginTop: '8%',
    resizeMode: "contain",
  },
  upload: {
    position: 'absolute',
    alignSelf: 'center',
    top: '74%',
    zIndex: 20,
    right: '28%',
    //   backgroundColor:"red",
    //   // paddingVertical:1,
    //  borderRadius: 30
  },
      container1: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:"center",
    marginVertical:22
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,  // Blue color for the circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,  // Space between icon and text
  },
  iconText: {
    fontSize: 40,
    color: '#fff', 
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color:  colors.primary, // Blue color for the logo text
  },
});

export default styles;
