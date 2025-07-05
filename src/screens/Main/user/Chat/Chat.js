import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
  LayoutAnimation,
  Text,
  Platform,
} from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import styles from './styles';
import { appIcons } from '../../../../assets';
import { colors } from '../../../../utils';
import Img from '../../../../components/Img';
import { connect, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import {
  loaderStartWithDispatch,
  loaderStopWithDispatch,
  chatImage,
  getChatMessages,
} from '../../../../redux/actions/appAction';
import Chats from '../../../../components/Chats';
import ImagePicker from '../../../../components/ImagePicker'; // Assuming this is your custom component

const Chat = ({ route, socket, user, chatImage }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([
  ]);

  const messageInputRef = useRef(null);
  const messageText = useRef('');
  const [currentChatId, setCurrentChatId] = useState(null);
  const { payload, userDetail } = route?.params;
  useEffect(() => {
    if (socket) {
      socket.on("joined-room", ({ chatId }) => {
        console.log("Joined chat room with ID:", chatId);
        if (chatId) {
          getMessages(chatId)
        }
        setCurrentChatId(chatId); // or dispatch to Redux

        socket.on("new-message", (data) => {
          console.log('00jjjjjj', data)
          if (data) {
            loaderStopWithDispatch()
            setMessages((prevMessages) => [...prevMessages, data?.newMessage]);
          }
        });
        socket.on("error", (error) => {
          loaderStopWithDispatch()
          console.error("Error:", error);
        });
      });
    }


    return () => {
      socket.off("joined-room");
    };
  }, [socket, currentChatId]);

  useEffect(() => {
    loaderStartWithDispatch();

    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    // response(); // Optional socket logic

    loaderStopWithDispatch();

    return () => {
      setMessages([]);
    };
  }, []);
  const getMessages = (chatId) => {
    const param = {
      key: "chatId",
      value: chatId
    };
    dispatch(getChatMessages(param, response => {
      setMessages(response);
    }));
  }
  const sendNewMessage = (messageType, image) => {
    if (!socket || typeof socket.emit !== 'function') return;
    if (messageText.current.trim()) {
      loaderStartWithDispatch();
      const data = {
        message: messageText.current.trim(),
        chatId: currentChatId,
      };
      console.log('datadata', data)
      socket.emit('send-message', data);
      messageText.current = '';
      if (messageInputRef.current) {
        messageInputRef.current.clear();
      }
      LayoutAnimation.linear();
    } else {
      Toast.show({
        text1: 'Please enter a message',
        type: 'error',
        visibilityTime: 3000,
      });
    }
  };

  // const SendImage = (path, mime, type) => {
  //   const formData = new FormData();
  //   if (path?.length) {
  //     formData.append('message_image', {
  //       uri: path,
  //       type: mime,
  //       name: `post${Date.now()}.${mime?.split('/').pop()}`,
  //     });
  //   }
  //   chatImage(formData, response => {
  //     if (response) sendNewMessage('image', response);
  //   });
  // };

  return (
    <AppBackground back title={userDetail?.firstName + ' ' + userDetail?.lastName}>
      <View style={styles.cont}>
        <FlatList
          data={messages}
          inverted
          showsVerticalScrollIndicator={false}
          style={styles.flatListStyle}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.flatListCont}
          renderItem={({ item }) => <Chats item={item} />}
        />

        <View style={[styles.flexRow, styles.messageView]}>


          <View style={[styles.flexRow, styles.inputCont]}>
            <TextInput
              ref={messageInputRef}
              numberOfLines={4}
              multiline
              style={styles.textInput}
              placeholder="Type Message"
              placeholderTextColor={colors.white}
              onChangeText={text => (messageText.current = text)}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => sendNewMessage('text')}
              style={styles.sendCont}>
              <Img
                local
                src={appIcons.send}
                style={styles.icon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AppBackground>
  );
};

const mapStateToProps = ({ authReducer: { user }, appReducer: { socket } }) => ({
  user,
  socket,
});

export default connect(mapStateToProps, { chatImage })(Chat);
