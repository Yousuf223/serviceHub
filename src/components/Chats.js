import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { colors, size } from '../utils';
import appStyles from '../screens/appStyles';
import moment from 'moment';
import Img from './Img';
import { ASSETS_URL } from '../config/WebService';
import { appIcons } from '../assets';
import NavService from '../helpers/NavService';
import { Image } from 'react-native';

const { width } = Dimensions.get('window');

const Chats = ({ item, currentUser }) => {
  const isMine = item.isMime

  const [imageModal, setImageModal] = useState(false);
  const [chatImage, setChatImage] = useState(false);
  return (
    <View
      style={{
        // ...appStyles.w100,
        marginBottom: 15,
        alignItems: 'center',
        flexDirection: isMine ? 'row-reverse' : 'row',
      }}>
      {!isMine && (
        <TouchableOpacity
          activeOpacity={0.8}
        // onPress={() =>
        //   NavService.navigate('OtherProfile', {
        //     id: item?.receiver_id?._id,
        //   })
        // }
        >
          {/* <Image
            source={
              appIcons.userPlaceholder
            }
            style={{
              width: 30,
              height: 30,
              marginTop: 20,
              bottom: 5,
              borderRadius: 50,
            }}
          />
          <Text numberOfLines={2} style={styles.username}>
            {!isMine && item?.name}
          </Text> */}
        </TouchableOpacity>
      )}
      <View
        style={{
          alignItems: isMine ? 'flex-end' : 'flex-start',
          top: 25,
        }}>
        <View
          style={{
            backgroundColor: isMine ?  colors.primary :colors.black,
            borderRadius: 10,
            width: width - 100,
            padding: 10,
          }}>

          <TouchableOpacity
          // onPress={() => {
          //   setChatImage(item?.message);
          //   setTimeout(() => {
          //     setImageModal(true);
          //   });
          // }}
          >
            {/* <Image
              source={appIcons.userPlaceholder}
              resizeMode={'contain'}
              style={{
                width: 50,
                height: 50,
                // backgroundColor: theme.grey,
                borderRadius: 15,
              }}
            /> */}
          </TouchableOpacity>
          <View>
            <Text style={{ color: colors.white, fontSize: size.small }}>
              {item?.message}
            </Text>
          </View>
          <View
            style={{
              alignSelf: 'flex-end',
            }}>
            <Text
              style={{
                color: colors.white,
                ...appStyles.font12,
                ...appStyles.family_SofiaPro_Regular,
              }}>
              12:20:PM
            </Text>
          </View>
        </View>
        {/* <View style={{
                    width: width - 160,
                    flexDirection: isMine ? "row-reverse" : "row",
                    justifyContent: "space-between",
                }}>
                </View> */}
      </View>
      {/* <ImagesModal
        isModalVisible={imageModal}
        image={chatImage}
        togglePopup={() => {
          setChatImage(null);
          setImageModal(false);
        }}
        closeBtn={() => {
          setChatImage(null);
          setImageModal(false);
        }}
      /> */}
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  username: {
    color: colors.black,
    ...appStyles.font13,
    ...appStyles.family_Oswald_Regular,
    textAlign: 'center',
    bottom: 5,
    maxWidth: 45,
  },
});
