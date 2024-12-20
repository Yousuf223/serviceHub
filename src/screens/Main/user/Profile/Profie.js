import React, { useRef, useState } from 'react';
import {
    FlatList,
    View,
    Image,
    Text,
    TouchableOpacity,
    Keyboard,
    TextInput,
    RefreshControl,
    TouchableHighlight,
    Platform,
} from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import CustomTextInput from '../../../../components/CustomTextInput';
import { appIcons } from '../../../../assets';
import styles from './styles';
import Card from '../../../../components/Card';
import { colors } from '../../../../utils';
import { useSelector } from 'react-redux';

const Profile = () => {
    const userData = useSelector((state) => state?.authReducer?.user)
    console.log('userDatauserData', userData)
    const [search, setSearch] = useState('');
    const [data, setData] = useState([
        { title: 'First Name', subTitle: userData?.firstName },
        { title: 'Last Name', subTitle: userData?.lastName },
        { title: 'Date Of Birth', subTitle: '10-20-204' },
        { title: 'Gender', subTitle: userData?.gender },
        { title: 'Phone', subTitle: userData?.contactNumber }
    ])

    return (
        <AppBackground
            menu
            title={'Profile'}
            Cart={true}
            notification
            onVideoPress={() => togglePopUp()}
            marginHorizontal={false}>
            <Image style={styles.userImage} source={userData?.profilePicture ? { uri: userData?.profilePicture } : appIcons.userPlaceholder} />
            <TouchableOpacity style={{
                width: 56, height: 39, alignSelf: "center", bottom: 50, backgroundColor: colors.white, justifyContent: 'center',
                alignItems: 'center', borderRadius: 10, right: -53
            }} >
                <Image style={styles.edit} source={appIcons.edit} />
            </TouchableOpacity>

            <View style={styles.cardData}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index?.toString()}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: '20%' }}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.subTitle}>{item.subTitle}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        </AppBackground>
    );
};

export default Profile;
