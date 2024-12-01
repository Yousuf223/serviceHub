import React, { useState, useEffect, createRef } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import styles from './styles';
import MessageComponent from '../../../../components/messageComponent';
import NavService from '../../../../helpers/NavService';

const Message = (props) => {

const [data,setData] = useState([{},{},{},{},{},{}])
  return (
    <AppBackground notification title={'Chats'} menu marginHorizontal={false}>
      <FlatList 
               data={data}
               showsVerticalScrollIndicator={false}
               contentContainerStyle={{ flexGrow: 1, paddingBottom: '20%' }}
               renderItem={({ item, index }) => {
                 return (
                   <MessageComponent onPress={()=> NavService.navigate('Chat')} item={item} />
                 )
               }}
      >

      </FlatList>
    </AppBackground>
  );
};



export default Message;
