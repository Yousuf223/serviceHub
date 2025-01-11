import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import NavService from '../helpers/NavService';
import Shadows from '../helpers/Shadows';
import { colors, size } from '../utils';
import { appIcons } from '../assets';
import moment from 'moment';
import { T } from 'ramda';

const { width } = Dimensions.get('screen');

const Card = ({ onPress, item,userName,userImage, cardStyle }) => {
  const [like, setLike] = useState(false);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.card, cardStyle]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingLeft: 20 }}>
        <Image style={styles.userImg} source={userImage} />
        <Text>{userName }</Text>
      </View>
      <Image style={styles.post} source={{uri:item?.media[0]?.mediaUrl}} />
      <View style={{ paddingHorizontal: 10, paddingVertical: 0 }}>
        <Text style={styles.title}>{item?.category}</Text>
        <Text numberOfLines={3} style={styles.dec}>{item?.caption}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    // ...Shadows.shadow5,
    borderRadius: 10,
    backgroundColor: '#ffffff20',
    width: '90%',
    // marginHorizontal: 6,
    marginVertical: 6,
    alignSelf: "center",
    shadowColor:colors.secondary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

  },
  post: {
    width: '96%',
    height: 220,
    marginTop: 20,
    alignSelf:'center'
    // borderTopRightRadius:7,
    // borderTopLeftRadius:7,
    // resizeMode:'contain',
  },
  dec: {
    color: colors.black,
    fontSize: size.xtiny,
    paddingBottom: 27,
    maxWidth: '90%',
    paddingLeft: 10,
    lineHeight: 18
  },
  title: {
    color: colors.black,
    fontWeight: '500',
    paddingTop: 20,
    paddingLeft: 10
  },
  icon: {
    width: 16, height: 16,
    resizeMode: "contain"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    width: '100%'
  },
  dateTime: {
    color: colors.white,
    fontSize: size.xtiny,
    marginLeft: 6
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginRight:10
  }
});
