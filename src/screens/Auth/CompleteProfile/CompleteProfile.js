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
import { BASE_URL } from '../../../config/WebService';
import axios from 'axios';
import { loaderStart, loaderStop } from '../../../redux/actions/appAction';

const CompleteProfile = ({ route }) => {
  const role = route?.params?.role
  console.log('rolerole', role)
  const actionSheetGenderRef = useRef();
  const phoneInput = useRef();
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authReducer.userToken)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [lienceImage, setLienceImage] = useState(null);
  const [gender, setGender] = useState(null);
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
    if (!firstName) return 'First Name field can’t be empty';
    if (!lastName) return 'Last Name field can’t be empty';
    if (!gender) return 'Gender field can’t be empty';
    if (!phoneNumber) return 'Phone Number field can’t be empty';
    if (!profileImage) return 'Please Select Profile Image';
    return null;
  };

  const onSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      Toast.show({
        text1: validationError,
        type: 'error',
        visibilityTime: 3000
      });
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('gender', gender == 'Male' ? 'male' : 'female');
    formData.append('contactNumber', phoneNumber);
    if (profileImage) {
      formData.append('userProfilePicture', {
        uri: profileImage?.path,
        name: `Profile${Date.now()}.${profileImage?.mime?.split('/').pop()}`,
        type: profileImage?.mime,
      });
    } else {
      console.log('No profile image provided');
    }
    try {
      dispatch(loaderStart())
      const response = await axios.post(`${BASE_URL}auth/user-complete-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response) {
        console.log('sadsada',response?.data)
        if (role === 'USER') {
          NavService.navigate('Login',{
            role: role
        })
          dispatch(loaderStop())
          // dispatch(loginUser(response.data))
        }else{
          dispatch(loaderStop())
          NavService.navigate('ServiceProviderDetail')
        }
     
      }

    } catch (error) {
      console.error('Error uploading form data:', error?.response?.data);
      dispatch(loaderStop())
      // You could also show an error notification to the user here
    }
  };


  const updateImageInGallery = (path, mime, type) => {
    setProfileImage({ path, mime, type });
  };

  const lienceImageInGallery = (path, mime, type) => {
    setLienceImage({ path, mime, type });
  };

  const saveAddress = address => {
    setAddress(address);
  };

  const saveCountry = (city, country) => {
    setCity(city);
    setStateField(country);
  };

  const { email } = route?.params;

  return (
    <CustomBackground showLogo={false} titleText={'Create Profile'}>
      <View style={{ marginHorizontal: 6, marginTop: 20 }}>
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

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: '69%' }}
          showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.title}>First Name</Text>
            <CustomTextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              containerStyle={styles.containerStyle}
            />
            <Text style={styles.title}>Last Name</Text>
            <CustomTextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              containerStyle={styles.containerStyle}
            />
            <Text style={styles.title}>Phone Number</Text>
            <CustomTextInput
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              containerStyle={styles.containerStyle}
            />
            <Text style={styles.title}>Gender</Text>
            <TouchableOpacity
              activeOpacity={0}
              style={styles.inputstyle}
              onPress={() => actionSheetGenderRef.current.show()}>
              <Text style={styles.dateOfbirth}>
                {gender || 'Select Gender'}
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

            <ActionSheetComponent
              ref={actionSheetGenderRef}
              title="Select Gender"
              dataset={['Male', 'Female', 'Other']}
              onPress={setGender}
            />
            {/* <Text style={styles.title}>Address</Text>
            <GooglePlaceAutocomplete
              placeholder={'Address'}
              callback={saveAddress}
              rightIcon={true}
              cityCountry={saveCountry}
            /> */}
            <CustomButton
              buttonStyle={styles.buttonStyle}
              title="Submit"
              onPress={onSubmit}
            />
          </View>
        </ScrollView>
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
})(CompleteProfile);
