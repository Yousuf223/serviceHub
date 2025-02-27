import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import AppBackground from '../../../../components/AppBackground';
import NavService from '../../../../helpers/NavService';
import { appIcons, appImages } from '../../../../assets';
import { colors } from '../../../../utils';
import styles from './styles';
import CustomButton from '../../../../components/CustomButton';
import CustomImagePicker from '../../../../components/CustomImagePicker';
import { Image as ImageCompressor, Video as VideoCompressor } from 'react-native-compressor';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { createPost, loaderStart, loaderStop } from '../../../../redux/actions/appAction';
import axios from 'axios';
import { BASE_URL } from '../../../../config/WebService';
const CreatePost = ({ route, createPost }) => {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch()
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const token = useSelector((state) => state.authReducer.userToken)
  const updateImageInGallery = async (path, mime, type) => {
    let multipleImages = [];
    if (Array.isArray(path)) {
      const arr = path.map(async (item) => {
        const result = await ImageCompressor.compress(item.path, {
          maxHeight: 400,
          maxWidth: 400,
          quality: 1,
        });
        let imageObject = {
          uri: result,
          name: `image${Date.now()}${item.filename}.${item.mime.slice(item.mime.lastIndexOf('/') + 1)}`,
          type: item.mime,
          tempType: 'image',
        };
        multipleImages.push(imageObject);
      });
      await Promise.all(arr);
      setImage((prevImage) => [...prevImage, ...multipleImages]);
    } else {
      const imageObject = {
        uri: path,
        name: `image${Date.now()}.${mime.slice(mime.lastIndexOf('/') + 1)}`,
        type: mime,
        tempType: type,
      };
      setImage((prevImage) => [...prevImage, imageObject]);
    }
  };

  const removeSelectedAsset = (asset) => {
    setImage((prevImage) => prevImage.filter((item) => item.uri !== asset));
  };



  const onSubmit = () => {
    if (description === '' && image.length === 0) {
      Toast.show({
        text1: 'Please post something',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (image.length > 10) {
      Toast.show({
        text1: 'Images cannot exceed from 10',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      dispatch(loaderStart());
      const payload = new FormData();
      payload.append('caption', description);
      image.forEach((item) => {
        delete item?.tempType;
        payload.append('AddMedia', item);
      });
      axios.post(`${BASE_URL}service-provider/adds`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log('responseresponse',response?.data)
           Toast.show({
             text1: response?.data?.message,
             type: 'success',
             visibilityTime: 3000,
           });
          console.log(response.data);
          dispatch(loaderStop());
          setTimeout(() => {
            NavService.navigate('BottomTabs', { name: 'Home' });
          }, 3500);
        })
        .catch(error => {
          console.log('errorerror', error?.response)
          dispatch(loaderStop());
          Toast.show({
            text1: 'Failed to create post. Try again.',
            type: 'error',
            visibilityTime: 3000,
          });
        });
    }
  };




  return (
    <AppBackground
      title={'Create Post'}
      onBack={() => NavService.navigate('BottomTabs', { name: 'Home' })}
      marginHorizontal={false}>
      <View>

        <TextInput
          maxLength={275}
          style={styles.dec}
          textAlignVertical="top"
          multiline
          editable
          blurOnSubmit={true}
          placeholder={'Write something.'}
          placeholderTextColor={colors.white}
          value={description}
          onChangeText={(value) => setDescription(value)}
        />
        <ScrollView
          style={{
            // position: 'absolute',
            // zIndex: 100,
            // bottom: 10,
            marginHorizontal: 10,
            paddingRight: Platform.OS === 'android' ? 36 : 25,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {image.length > 0 &&
            image.map((item, index) => (
              <View key={index + 1} style={{ position: 'relative' }}>
                <TouchableOpacity
                  onPress={() => removeSelectedAsset(item.uri)}
                  style={styles.crossContainer}>
                  <Text style={styles.cross}>X</Text>
                </TouchableOpacity>
                <Image source={{ uri: item.uri }} style={styles.videoStyle} />
              </View>
            ))}
        </ScrollView>
      </View>

      <View style={styles.row}>
        <CustomImagePicker
          isMultiple={true}
          onImageChange={(path, mime, type) => {
            updateImageInGallery(path, mime, type);
          }}
          style={{ justifyContent: 'flex-end' }}>
          {image.length < 10 && (
            <View style={styles.rowIcons}>
              <Image style={styles.icons} source={appIcons.photos} />
              <Text style={styles.title}>Photos</Text>
            </View>
          )}
        </CustomImagePicker>
      </View>
      <CustomButton buttonStyle={styles.buttonStyle} onPress={onSubmit} title="Post" />
    </AppBackground>
  );
};

const actions = { createPost };
export default connect(null, actions)(CreatePost);
