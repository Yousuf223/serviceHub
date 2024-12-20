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
            // video={true}
            onVideoPress={() => togglePopUp()}
            marginHorizontal={false}>
            <Image style={styles.userImage} source={userData?.profilePicture ? { uri: userData?.profilePicture } : appIcons.userPlaceholder}  />
            <View style={{
                flexDirection: 'row', justifyContent: 'space-around',
                alignItems: "center", width: '100%',
                marginBottom: 26
            }}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Edit Business</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

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
