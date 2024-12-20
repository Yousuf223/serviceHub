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
import { useDispatch } from 'react-redux';
import { getEventList } from '../../../../redux/actions/appAction';

const Home = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('');
  const [data, setData] = useState([])

  useEffect(() => {
    dispatch(getEventList(response => {
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
          keyExtractor={(item, index) => index?.toString()}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: '20%' }}
          renderItem={({ item, index }) => {
            return (
              <Card item={item} />
            )
          }}
        />
      </View>
    </AppBackground>
  );
};

export default Home;
