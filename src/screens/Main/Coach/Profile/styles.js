import { StyleSheet, Dimensions } from 'react-native';
import { colors, size, family } from '../../../../utils';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',

  },
  userImage:{
    width:130,
    height:130,
    alignSelf:"center",
    marginVertical:16,
     position:'relative',
     borderRadius:30
  },
  cardData:{
    backgroundColor:colors.white,
    flex:1,
    borderTopLeftRadius:28,
    borderTopRightRadius:28,
    paddingVertical:10
  },
  edit:{
    width:20,
    height:20,resizeMode:'contain',
    // position:'absolute',
    // bottom:0,
    // zIndex:100,
  },
  row:{
    flexDirection:"row",
    justifyContent:'space-between',
    width:'100%',
    paddingHorizontal:20,
    marginTop:20
  },
  subTitle:{
    color:colors.black,
    fontWeight:'500',
    fontSize:14
  },
  title:{
    color:colors.black,
    fontWeight:'600',
    fontSize:16
  },
  btn:{
    backgroundColor:colors.primary,
    borderRadius:10,
    width:140,
    height:50,
    alignItems:'center',
    justifyContent:'center',
  },
  btnText:{
    textAlign:'center',
    fontWeight:'600',
    color:colors.white,
    fontSize:15
  }
});
export default styles;
