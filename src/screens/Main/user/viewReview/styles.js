import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../../../utils';


const styles = StyleSheet.create({
 reviewContainer:{
  backgroundColor:colors.lightGray3,
  width:'90%',
  alignSelf:'center',
  borderRadius:8,
  marginTop:10,
  paddingHorizontal:14,
  paddingVertical:10
 },
 reviewUserName:{
  color:colors.black,
  fontWeight:'600',
  fontSize:15,
  textTransform:'capitalize'
 }
});

export default styles;
