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

const Profile = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([
        { title: 'First Name', subTitle: 'Alex' },
        { title: 'Last Name', subTitle: 'Carry' },
        { title: 'Date Of Birth', subTitle: '2000-10-12' },
        { title: 'Gender', subTitle: 'Male' },
        { title: 'Phone', subTitle: '+1 222 2334 4' }
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
            <Image style={styles.userImage} source={appIcons.userPlaceholder} />
            <View style={{
                flexDirection: 'row', justifyContent: 'space-around',
                alignItems: "center", width: '100%',
                marginBottom:26
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
