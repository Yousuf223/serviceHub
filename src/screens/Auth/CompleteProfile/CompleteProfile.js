import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Keyboard,
  TextInput,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import PhoneInput from 'react-native-phone-number-input';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import ImagePicker from '../../../components/ImagePicker';
import ProfileImage from '../../../components/ProfileImage';
import {appIcons} from '../../../assets/index';
import {
  completeProfile,
  addProfilePicture,
  loginUser,
} from '../../../redux/actions/authAction';
import ActionSheet from 'react-native-actionsheet';
import styles from './styles';
import {colors} from '../../../utils';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import NavService from '../../../helpers/NavService';
import {cities, states} from '../../../utils/dummyData';
import ActionSheetComponent from '../../../components/ActionSheetComponent';
import AppBackground from '../../../components/AppBackground';
import GooglePlaceAutocomplete from '../../../components/GooglePlaceAutocomplete';

const CompleteProfile = ({route}) => {
  const actionSheetGenderRef = useRef();
  const actionSheetServiceRef = useRef();
  const phoneInput = useRef();
  const dispatch = useDispatch()
  // Separate state for each form field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [service, setService] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [lienceImage, setLienceImage] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [gender, setGender] = useState(null);
  const [city, setCity] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [stateField, setStateField] = useState('');
  const {role} = useSelector(state => state?.authReducer);
  const [message, setMessage] = useState('');

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
    if (!address) return 'Address field can’t be empty';
    if (!profileImage) return 'Please Select Profile Image';
    return null;
  };

  const onSubmit = async () => {
    // const validationError = validateForm();
    // if (validationError) {
    //   Toast.show({text1: validationError, type: 'error', visibilityTime: 3000});
    //   return;
    // }

    // Form submission logic (example)
    // const payload = new FormData();
    // if (profileImage) {
    //   payload.append('profile', {
    //     uri: profileImage?.path,
    //     name: `Profile${Date.now()}.${profileImage?.mime?.slice(profileImage?.mime?.lastIndexOf('/') + 1)}`,
    //     type: profileImage?.mime,
    //   });
    // }
    // try {
    //   loaderStartWithDispatch();
    //   const response = await fetch('API_URL', { method: 'POST', body: payload });
    //   const result = await response.json();
    //   if (result.status.success) {
    //     const data = { firstName, lastName, dateOfBirth: selectDate, gender, bio: about, address, country: stateField, experience, phoneNumber: formattedValue };
    //     completeProfile(data);
    //   } else {
    //     console.error('Failed to upload profile picture:', result);
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // } finally {
    //   loaderStopWithDispatch();
    // }

    if(role == 'User'){
      const payload ={
      email:'abc@g.com',
      password:'123456'
      }
      dispatch(loginUser(payload));
    }else{
      NavService.navigate('ServiceProviderDetail')
    }
    
  };

  const updateImageInGallery = (path, mime, type) => {
    setProfileImage({path, mime, type});
  };

  const lienceImageInGallery = (path, mime, type) => {
    setLienceImage({path, mime, type});
  };

  const saveAddress = address => {
    setAddress(address);
  };

  const saveCountry = (city, country) => {
    setCity(city);
    setStateField(country);
  };

  const {email} = route?.params;

  return (
    <CustomBackground showLogo={false} titleText={'Create Profile'}>
      <View style={{marginHorizontal: 6,marginTop:20}}>
        <View style={{alignItems: 'center', alignSelf: 'center'}}>
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
          contentContainerStyle={{flexGrow: 1, paddingBottom: '69%'}}
          showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 20}}>
            <Text style={styles.title}>First Name</Text>
            <CustomTextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <Text style={styles.title}>Last Name</Text>
            <CustomTextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <Text style={styles.title}>Phone Number</Text>
            <CustomTextInput
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
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
