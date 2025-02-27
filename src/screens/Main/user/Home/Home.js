import React, { useEffect, useRef, useState } from 'react';
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
import { getAddList, loaderStop } from '../../../../redux/actions/appAction';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('');
  const [data, setData] = useState([])

  useEffect(() => {
    dispatch(getAddList(response => {
      console.log('Resend OTP Response:', response);
      setData(response)

    }));
  }, [])
  return (
    <AppBackground
      menu
      title={'Home'}
      Cart={true}
      notification
      // video={true}
      onVideoPress={() => togglePopUp()}
      marginHorizontal={false}>
      <CustomTextInput
        leftIcon={appIcons.search}
        placeholder={'Search'}
        value={search}
        keyboardType={'email-address'}
        onChangeText={setSearch}
        maxLength={35}
        containerStyle={styles.containerStyle}
      />
      <View style={styles.cardData}>
        <Text style={styles.title}>How Can Help You</Text>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item,index) => index?.toString()} 
          contentContainerStyle={{ flexGrow: 1, paddingBottom: '20%' }}
          renderItem={({ item, index }) => {
            console.log('itemitem',item?.userId?.profilePicture)
            return (
              <Card
              userName={item?.userId?.firstName + ' ' + item?.userId?.lastName}
               userImage={item?.userId?.profilePicture ? {uri:item?.userId?.profilePicture}:appIcons.userPlaceholder } item={item} />
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

export default Home;
