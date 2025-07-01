import { StyleSheet, Dimensions } from 'react-native';
import { colors, size, family } from '../../../../utils';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',

  },
  containerStyle: {
    width: '90%',
    marginBottom: 30,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.lightGray1,
    marginTop: 20,
    borderRadius: 30
  },
  cardData: {
    backgroundColor: colors.white,
    flex: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  title: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 18,
    paddingLeft: 20,
    paddingBottom: 10
  },
  listempty: {
    // flex: 1,
    alignItems: 'center',
    marginTop: 75
  },
  txtlistempty: {
    color: colors.black,
    fontWeight: '500'
  },
  inputstyle: {
    width: width * 0.86,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 2,
    height: 55,
    borderWidth: 1,
    borderColor: colors.black,
    marginTop: 15,
    justifyContent: 'space-between',
    marginBottom: 7,
    alignSelf:'center'
    // backgroundColor:"red"
  },
  dateOfbirth: {
    color: colors.black,
    fontSize: size.tiny,
    fontWeight: '300',
  },
});
export default styles;
