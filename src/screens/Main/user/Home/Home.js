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
import { loaderStop } from '../../../../redux/actions/appAction';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(loaderStop())

  },)
  const [search, setSearch] = useState('');
  const [data, setData] = useState([{ image: appIcons.event, title: 'Health', dec: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
  { image: appIcons.event, title: 'Health', dec: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' }, { image: appIcons.event, title: 'Health', dec: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' }])
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
