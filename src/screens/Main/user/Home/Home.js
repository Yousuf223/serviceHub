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
import { getAddList, loaderStop } from '../../../../redux/actions/appAction';
import { useDispatch } from 'react-redux';
import ActionSheetComponent from '../../../../components/ActionSheetComponent';
import { colors } from '../../../../utils';
import axios from 'axios';
import NavService from '../../../../helpers/NavService';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
const Home = () => {
  const dispatch = useDispatch()
  const [service, setService] = useState('');
  const [data, setData] = useState([])
  const focus = useIsFocused();
  const actionSheetServiceRef = useRef();
  useEffect(() => {
    const param = {
      key: "category",
      value: service || ""
    };
    dispatch(getAddList(service && param, response => {
      setData(response);
    }));
    return setService('')
  }, [service, focus]);
  return (
    <AppBackground
      menu
      title={'Home'}
      Cart={true}
      notification
      // video={true}
      onVideoPress={() => togglePopUp()}
      marginHorizontal={false}>
      <TouchableOpacity
        activeOpacity={0}
        style={styles.inputstyle}
        onPress={() => actionSheetServiceRef.current.show()}>
        <Text style={styles.dateOfbirth}>
          {service || 'Select Bussiness'}
        </Text>
        <Image
          style={{
            width: 15,
            height: 15,
            resizeMode: 'contain',
            tintColor: colors.primary,
          }}
          source={appIcons.arrowDown}
        />
      </TouchableOpacity>
      <ActionSheetComponent
        ref={actionSheetServiceRef}
        title="Select Service"
        dataset={['Educationist', 'Healthcare', 'Advocasy', 'RealEstate', 'Showroom', 'Salon', 'Gym', 'Hostel']}
        onPress={setService}
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
              <Card
                onPress={() => NavService.navigate('BusinessDetail', { id: item?._id })}
                onProfile={() => NavService.navigate('ProfileDetail', { id: item?.userId?._id })}
                userName={item?.userId?.firstName + ' ' + item?.userId?.lastName}
                userImage={item?.userId?.profilePicture ? { uri: item?.userId?.profilePicture } : appIcons.userPlaceholder} item={item} />
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
