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
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getChatList } from '../../../../redux/actions/appAction';

const Message = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [data, setData] = useState([])
  const socket = useSelector(state => state.appReducer.socket);
  const joinRoom = (targetUserId) => {
    socket.emit("join-room", { userId: targetUserId?.otherParticipant?._id });
    NavService.navigate('Chat', { userId: targetUserId?.otherParticipant?._id, userDetail:targetUserId?.otherParticipant,chatIds:targetUserId?.chatId });
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getChatList(response => {
        setData(response);
      }));
    }
  }, [isFocused]);
  return (
    <AppBackground menu title={'Chats'} marginHorizontal={false}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index?.toString()}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: '20%' }}
        renderItem={({ item, index }) => {
          return (
            <MessageComponent onPress={() => joinRoom(item)} item={item} />
          )
        }}
      >

      </FlatList>
    </AppBackground>
  );
};



export default Message;
