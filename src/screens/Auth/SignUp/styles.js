import {StyleSheet,Dimensions} from 'react-native';
import {colors, HP, WP, size} from '../../../utils';
const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
    marginVertical: '8%',
  },
  bottomView: {
    marginBottom: 40,
    marginTop:"20%",
    alignSelf:"center"
  },
  subText: {
    fontSize: 14,
    fontWeight: '300',
    color: colors.white,
    marginVertical: 20,
    textAlign:"right",
    textDecorationLine:"underline",
    marginTop:32
  },
  textNormal: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.black,
    textAlign:"center",

  },
  textNormalWithColor: {
    color: colors.black,
    fontSize: 13,
    fontWeight: '400',
    textAlign:"center",
    textDecorationLine:"underline"
  },
  applogo:{
    width:244,
    height:200,
     resizeMode:"contain",
    marginBottom:"6%",
    alignSelf:"center"
  },
  title:{
    color:colors.black,
    fontWeight:'500',
    paddingHorizontal:20
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
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,  // Space between icon and text
  },
  iconText: {
    fontSize: 40,
    color: '#fff',  // White color for the icon text
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,  // Blue color for the logo text
  },
});

export default styles;
