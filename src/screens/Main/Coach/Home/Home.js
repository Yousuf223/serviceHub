import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import CustomTextInput from '../../../../components/CustomTextInput';
import { appIcons } from '../../../../assets';
import styles from './styles';
import Card from '../../../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getEventList } from '../../../../redux/actions/appAction';
import { useIsFocused } from '@react-navigation/native';

const Home = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const userData = useSelector((state) => state?.authReducer?.user)
  console.log(userData, 'userDatauserData')
  useEffect(() => {
    if (isFocused) {
      dispatch(getEventList(response => {
        setData(response);
      }));
    }
  }, [isFocused]);

  return (
    <AppBackground
      menu
      title={'Home'}
      Cart={true}
      notification
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
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: '20%' }}
          renderItem={({ item }) => (
            <Card
            userName={userData?.firstName + ' ' + userData?.lastName}
             userImage={userData?.profilePicture ? { uri: userData?.profilePicture } : appIcons.userPlaceholder} 
             item={item} />
          )}
          ListEmptyComponent={() => (
            <View style={styles.listempty}>
              <Text style={styles.txtlistempty}>No Service Found</Text>
            </View>
          )}
        />
      </View>
    </AppBackground>
  );
};

export default Home;
