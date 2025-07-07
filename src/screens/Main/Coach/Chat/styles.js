import { Dimensions, StyleSheet } from "react-native";
import appStyles from "../../../appStyles";
import { colors } from "../../../../utils";

const { width } = Dimensions.get("window");


const styles = StyleSheet.create({
    cont: {
        ...appStyles.mainContainer
    },

    flexRow: {
        ...appStyles.directionRow,
        ...appStyles.alignCenter,
        marginBottom:0
    },

    search: {
        width: "90%"
    },

    flatListCont: {
        flexGrow: 1,
        paddingHorizontal: 3,
        marginHorizontal: 20,
        paddingTop: width * 0.04,
    },

    flatListStyle: {
        flex: 1,
        marginBottom: 10
    },

    messageView: {
        height: 63,
        backgroundColor: colors.lightGray2,
        paddingHorizontal: 0,
        // borderTopRightRadius: 10,
        // borderTopLeftRadius: 10,
        // paddingRight: 20,
        ...appStyles.justifyCenter,
        ...appStyles.alignCenter,
        width:'92%',alignSelf:"center",
        borderRadius:10
    },

    inputCont: {
        width: "90%",
        height: 45,
         backgroundColor: colors.lightGray2,
        marginLeft: 10,
        paddingHorizontal: 10,
        borderRadius: 8
    },

    textInput: {
        flex: 1,
        height: '100%',
        color: colors.white,
        ...appStyles.font13,
        ...appStyles.family_Oswald_Regular
    },

    attachmentIcon: {
        width: 20,
        height: 20,
    },

    icon: {
        width: 15,
        height: 15,
    },

    sendCont: {
        width: 28,
        height: 28,
        backgroundColor: colors.white,
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
        borderRadius: 100,
    },

    userImage: {
        width: 48,
        height: 48,
        borderColor: colors.primary,
        borderWidth: 2,
        borderRadius: 100,
        marginHorizontal: 5,
    },
    mainCont: {
        flex: 1,
        width: '100%'
    },
});

export default styles;