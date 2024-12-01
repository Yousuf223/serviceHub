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

const Profile = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([
        {title:'First Name',subTitle:'Alex'},
        {title:'Last Name',subTitle:'Carry'},
        {title:'Date Of Birth',subTitle:'2000-10-12'},
        {title:'Gender',subTitle:'Male'},
        {title:'Phone',subTitle:'+1 222 2334 4'}
    ])
    return (
        <AppBackground
            menu
            title={'Profile'}
            Cart={true}
            notification
            onVideoPress={() => togglePopUp()}
            marginHorizontal={false}>
            <Image style={styles.userImage} source={appIcons.userPlaceholder} />
            <TouchableOpacity style={{ width: 56, height: 39, alignSelf: "center",bottom:50,backgroundColor:colors.white,justifyContent:'center',
                alignItems:'center',borderRadius:10 ,right:-53}} >
                <Image style={styles.edit} source={appIcons.edit} />
            </TouchableOpacity>

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
