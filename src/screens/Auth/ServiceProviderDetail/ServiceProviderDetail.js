import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Keyboard,
  TextInput,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import PhoneInput from 'react-native-phone-number-input';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import ImagePicker from '../../../components/ImagePicker';
import ProfileImage from '../../../components/ProfileImage';
import { appIcons } from '../../../assets/index';
import {
  completeProfile,
  addProfilePicture,
  loginUser,
} from '../../../redux/actions/authAction';
import ActionSheet from 'react-native-actionsheet';
import styles from './styles';
import { colors } from '../../../utils';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import NavService from '../../../helpers/NavService';
import { cities, states } from '../../../utils/dummyData';
import ActionSheetComponent from '../../../components/ActionSheetComponent';
import AppBackground from '../../../components/AppBackground';
import GooglePlaceAutocomplete from '../../../components/GooglePlaceAutocomplete';
import axios from 'axios';
import { BASE_URL } from '../../../config/WebService';
import { loaderStart, loaderStop } from '../../../redux/actions/appAction';

const ServiceProviderDetail = ({ route }) => {
  const actionSheetGenderRef = useRef();
  const actionSheetServiceRef = useRef();
  const dispatch = useDispatch()
  const phoneInput = useRef();
  const token = useSelector((state) => state.authReducer.userToken)
  console.log('tokentoken', token)
  const [businessName, setBusinessName] = useState('');
  const [lastName, setLastName] = useState('');
  const [service, setService] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [lienceImage, setLienceImage] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [gender, setGender] = useState(null);
  const { role } = useSelector(state => state?.authReducer);
  const [message, setMessage] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const validateForm = () => {
    if (!businessName) return 'Business Name field can’t be empty';
    if (!message) return 'Description field can’t be empty';
    if (!service) return 'Category field can’t be empty';
    // if (!address) return 'Address field can’t be empty';
    if (!profileImage) return 'Please add a liscense';
    return null;
  };


  const onSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      Toast.show({
        text1: validationError,
        type: 'error',
        visibilityTime: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append('businessName', businessName);
    formData.append('description', message);
    formData.append('category', service);
    formData.append('businessAdress', 'New York City');

    if (profileImage) {
      formData.append('bussinessLiscense', {
        uri: profileImage?.path,
        name: `Profile${Date.now()}.${profileImage?.mime?.split('/').pop()}`,
        type: profileImage?.mime,
      });
    }
    try {
      dispatch(loaderStart());
      const response = await axios.post(`${BASE_URL}service-provider/bussiness`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Response:', response.data);
      if (response) {
        dispatch(loaderStop());
        dispatch(loginUser(response.data));
        Toast.show({
          text1: response?.message,
          type: 'success',
          visibilityTime: 3000,
        });
      } else {
        throw new Error('No data returned from API');
      }
    } catch (error) {
      console.error('Error uploading form data:', error?.response || error);  // Better error logging
      dispatch(loaderStop());  // Stop loader even on failure
      Toast.show({
        text1: 'Error uploading data. Please try again.',
        type: 'error',
        visibilityTime: 3000,
      });
    }
  };

  const updateImageInGallery = (path, mime, type) => {
    setProfileImage({ path, mime, type });
  };

  const lienceImageInGallery = (path, mime, type) => {
    setLienceImage({ path, mime, type });
  };

  const saveAddress = (address) => {

    console.log('addressaddress', address)
    setAddress(address);
  };

  const saveCountry = (city, country) => {
    setCity(city);
    setStateField(country);
  };

  const { email } = route?.params;

  return (
    <CustomBackground showLogo={false} titleText={'Business Details'}>
      <View style={{ marginHorizontal: 6 }}>
        <View style={{ alignItems: 'center', alignSelf: 'center' }}>
          <ImagePicker
            onImageChange={(path, mime, type) =>
              updateImageInGallery(path, mime, type)
            }>
            <ProfileImage
              name="UserName"
              innerAsset={profileImage == null}
              imageUri={
                profileImage ? profileImage?.path : appIcons.userPlaceholder
              }
            />
            <Image source={appIcons.camera} style={styles.uploadStyle} />
          </ImagePicker>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.title}>Business Name</Text>
          <CustomTextInput
            placeholder="First Name"
            value={businessName}
            onChangeText={setBusinessName}
            containerStyle={styles.containerStyle}
          />
          <Text style={styles.title}>Address</Text>
          <GooglePlaceAutocomplete
            placeholder={'Address'}
            callback={saveAddress}
            rightIcon={true}
            cityCountry={saveCountry}
          />
          <>
            <Text style={[styles.title, { paddingTop: 10 }]}>
              Business Category
            </Text>
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
                  tintColor: colors.secondary,
                }}
                source={appIcons.arrowDown}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Service Decription</Text>
            <TextInput
              maxLength={275}
              style={[styles.Input, { height: 250, paddingTop: 15 }]}
              textAlignVertical="top"
              multiline
              editable
              blurOnSubmit={true}
              placeholder={'Decription'}
              placeholderTextColor={'#D3D3D3'} // Replace with colors.lightGray1 if you have it defined elsewhere
              value={message}
              onChangeText={value => setMessage(value)}
            />
            <ActionSheetComponent
              ref={actionSheetServiceRef}
              title="Select Service"
              dataset={['EDUCATIONIST', 'HEALTHCARE', 'ADVOCASY', 'REALESTATE', 'SHOWROOM', 'SALON', 'HOSTEL', 'GYM']}
              onPress={setService}
            />
          </>

          <CustomButton
            buttonStyle={styles.buttonStyle}
            title="Submit"
            onPress={onSubmit}
          />
        </View>
      </View>
    </CustomBackground>
  );
};

const mapStateToProps = state => ({
  // token: state.auth.token,
  // user: state.auth.user,
});

export default connect(mapStateToProps, {
  completeProfile,
  addProfilePicture,
  loginUser,
})(ServiceProviderDetail);
