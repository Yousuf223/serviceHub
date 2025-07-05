import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import CustomTextInput from '../../../../components/CustomTextInput';
import { appIcons } from '../../../../assets';
import styles from './styles';
import Card from '../../../../components/Card';
import { getAddList, getProfileDetail, loaderStop } from '../../../../redux/actions/appAction';
import { useDispatch, useSelector } from 'react-redux';
import ActionSheetComponent from '../../../../components/ActionSheetComponent';
import { colors } from '../../../../utils';
import axios from 'axios';
import NavService from '../../../../helpers/NavService';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
const ProfileDetail = ({ route }) => {
    const userId = route?.params?.id;
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [userDetail, setUserDetail] = useState(null)
    const focus = useIsFocused();
    const actionSheetServiceRef = useRef();
    const socket = useSelector(state => state.appReducer.socket);
    
    useEffect(() => {
        const param = {
            id: userId,
        };
        dispatch(getProfileDetail(param, response => {
            console.log('Resend OTP:', response);
            setUserDetail(response?.data)
            setData(response?.data?.adds);
        }));
        return
    }, [focus]);
    const joinRoom = (targetUserId) => {
        socket.emit("join-room", { userId: targetUserId });
        NavService.navigate('Chat', { userId: targetUserId, userDetail: userDetail });
    };
    return (
        <AppBackground
            back
            title={userDetail?.firstName + ' ' + userDetail?.lastName}
            Cart={true}
            dot={true}
            onDotPress={() => joinRoom(userId)}
            // video={true}
            onVideoPress={() => togglePopUp()}
            marginHorizontal={false}>
            <View style={styles.cardData}>
                <Text style={styles.title}>Post</Text>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index?.toString()}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: '20%' }}
                    renderItem={({ item, index }) => {
                        return (
                            <Card
                                onPress={() => NavService.navigate('BusinessDetail', { id: item?._id })}
                                item={item} />
                        )
                    }}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.listempty}>
                                <Text style={styles.txtlistempty}>No Service Found</Text>
                            </View>
                        );
                    }}
                />
            </View>
        </AppBackground>
    );
};

export default ProfileDetail;
