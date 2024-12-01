import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actions-sheet';
import { Image as ImageCompressor } from 'react-native-compressor';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

const CustomImagePicker = ({
  children,
  onImageChange = () => {},
  style,
  isMultiple = false,
}) => {
  const actionSheetRef = useRef(null);

  const imageChange = (method = 'gallery') => {
    if (method === 'camera') {
      ImageCropPicker.openCamera({
        mediaType: 'photo',
        cropping: true,
        multiple: isMultiple,
        freeStyleCropEnabled: true,
      }).then(async image => {
        actionSheetRef.current.hide();
        const result = await ImageCompressor.compress(image.path, {
          maxHeight: 400,
          maxWidth: 400,
          quality: 1,
        });
        onImageChange(result, image.mime, 'image');
      });
    } else {
      ImageCropPicker.openPicker({
        mediaType: 'photo',
        cropping: true,
        freeStyleCropEnabled: true,
      }).then(async image => {
        actionSheetRef.current.hide();
        const result = await ImageCompressor.compress(image.path, {
          maxHeight: 400,
          maxWidth: 400,
          quality: 1,
        });
        onImageChange(result, image.mime, 'image');
      });
    }
  };

  const selectVideo = (method = 'gallery') => {
    if (method === 'camera') {
      ImageCropPicker.openCamera({
        mediaType: 'video',
        multiple: isMultiple,
      }).then(async video => {
        actionSheetRef.current.hide();
        const result = await ImageCompressor.compress(video.path, {
          maxHeight: 400,
          maxWidth: 400,
          quality: 1,
        });
        onImageChange(result, video.mime, 'video');
      });
    } else {
      ImageCropPicker.openPicker({
        multiple: isMultiple,
        mediaType: 'video',
      }).then(async video => {
        actionSheetRef.current.hide();
        let result;
        if (isMultiple) {
          onImageChange(video, video[0]?.mime, 'video');
        } else {
          result = await ImageCompressor.compress(video.path, {
            maxHeight: 400,
            maxWidth: 400,
            quality: 1,
          });
          onImageChange(result, video.mime, 'video');
        }
      });
    }
  };

  const videoMaker = () => {
    ImageCropPicker.openPicker({
      mediaType: 'video',
      multiple: isMultiple,
    }).then(async video => {
      console.log('video', video);
      actionSheetRef.current.hide();
      onImageChange(video.path, video.mime, 'video');
    });
  };

  return (
    <TouchableOpacity
      onPress={() => actionSheetRef.current.show()}
      style={style}
      activeOpacity={0.8}>
      <ActionSheet ref={actionSheetRef} containerStyle={{ backgroundColor: 'transparent' }}>
        <View style={{ padding: 10 }}>
          <View style={{ backgroundColor: 'rgba(241,241,241,0.8)', borderRadius: 10, marginBottom: 10 }}>
            <View style={{ borderBottomWidth: 1.5, borderBottomColor: '#ccc', paddingVertical: 10 }}>
              <Text style={{ color: 'grey', textAlign: 'center' }}>
                Choose an option to pick an Image
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => imageChange('camera')}
              style={{ paddingVertical: 12, alignItems: 'center', borderBottomWidth: 1.5, borderBottomColor: '#ccc' }}>
              <Text style={{ color: 'rgb(0,88,200)', fontSize: 18 }}>
                Take Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => imageChange('gallery')}
              style={{ paddingVertical: 12, alignItems: 'center' }}>
              <Text style={{ color: 'rgb(0,88,200)', fontSize: 18 }}>
                Choose Photo from Library
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => actionSheetRef.current.hide()}
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              paddingVertical: 12,
              alignItems: 'center',
            }}>
            <Text style={{ color: 'rgb(0,88,200)', fontSize: 18, fontWeight: '600' }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
      {children}
    </TouchableOpacity>
  );
};

export default CustomImagePicker;
