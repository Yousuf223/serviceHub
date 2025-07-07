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

const MessageComponent = ({ onPress,item, cardStyle }) => {
  const [like, setLike] = useState(false);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.card, cardStyle]}>
        <View style={{flex:1,}}>
        <Image style={styles.userImg} source={{uri: item?.otherParticipant?.profilePicture}} />
        </View>
      
        <View style={{flex:6,paddingLeft:20,top:12}}>
            <Text style={styles.title}>{item?.otherParticipant?.firstName + ' ' + item?.otherParticipant?.lastName}</Text>
            <Text style={styles.dec}>{item?.message}</Text>
        </View>
        <View style={{flex:3}}>
            <Text style={styles.time}>{moment(item?.createdAt).fromNow()}</Text>
        </View>
    </TouchableOpacity>
  );
};

export default MessageComponent;

const styles = StyleSheet.create({
  card: {
    // ...Shadows.shadow3,
    borderRadius: 10,
    //  backgroundColor: colors.lightGray1,
    width: '90%',
    marginHorizontal: 6,
    marginVertical:8,
    alignSelf:"center",
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center",
    borderBottomWidth:2,
    borderBottomColor:colors.lightGray1
  },
  dec:{
    color:colors.lightGray2,
    fontSize:size.xtiny,
    paddingBottom:27,
    maxWidth:'90%',
    paddingLeft:10,
    lineHeight:18
  },
  title:{
    color:colors.black,
    fontWeight:'500',
    // paddingTop:10,
    paddingLeft:10
  },
  userImg:{
    width:55,
    height:55,
    borderRadius:60
  },
  time:{
    color:colors.black,
    fontSize:14
  },
  round:{
    width:25,
    height:25,
    backgroundColor:colors.primary,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center',
  }
});
