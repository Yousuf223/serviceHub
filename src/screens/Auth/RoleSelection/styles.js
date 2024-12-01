import {StyleSheet, Dimensions} from 'react-native';
import {colors, HP, WP, size} from '../../../utils';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    // justifyContent:'center'
  },
  buttonStyle: {
    marginTop: 13,
  },
  container1: {
    // justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    top: '20%',
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary, // Blue color for the circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Space between icon and text
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
