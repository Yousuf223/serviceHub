import { StyleSheet } from 'react-native';
import { colors } from '../../../../utils';

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  rowIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray2,
    padding: 10,
    borderRadius: 8,
  },
  icons: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf:'center',
    marginBottom:20
  },
  crossContainer: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    //  padding: 5
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    left: 73,
    top: 14,
    //  position:"absolute",
    zIndex: 100,
    // paddingRight:20
    // right:0

  },
  cross: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoStyle: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  timeBox: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  daysContainer:{
    flexWrap:'wrap',
    flexDirection:'row'
  },
  selectedDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    marginHorizontal:'12'
  },
  dayButton: {
    padding: 8,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedDay: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  unselectedDay: {
    backgroundColor: colors.white,
    borderColor: colors.lightGray,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedDayText: {
    color: colors.white,
  },
  unselectedDayText: {
    color: colors.black,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: colors.black,
    backgroundColor: colors.lightGray1,
    width:"40%"
  },
  activeTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
     width:"40%",
     justifyContent:"center"
  },
    inputstyle: {
      width: "89%",
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
      fontSize: 12,
      fontWeight: '300',
    },
});

export default styles;