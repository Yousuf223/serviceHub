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
import { addType, loaderStart, loaderStop } from '../../../redux/actions/appAction';

const ServiceProviderDetail = ({ route }) => {
  const educationInstituteTypeRef = useRef();
  const educationClassesTypeRef = useRef();
  const actionSheetServiceRef = useRef();
  const actionHospitalTypeRef = useRef();
  const dispatch = useDispatch()
  const phoneInput = useRef();
  const token = useSelector((state) => state.authReducer.userToken)
  const category = route?.params?.data?.category
  const [businessName, setBusinessName] = useState('');
  const [lastName, setLastName] = useState('');
  const [educationType, setEducationType] = useState('');
  const [educationClassesType, setEducationClassesType] = useState('');
  const [educationInstituteType, setEducationInstituteType] = useState("")
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [hospitalType, setHospitalType] = useState('');
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
   
    if (category === 'Educationist') {
      if (!businessName) return 'Business Name field can’t be empty';
      if (!message) return 'Description field can’t be empty';
      if (!educationType) return 'Education Type field can’t be empty';
      if (!educationClassesType) return 'Education Classes field can’t be empty';
      if (!educationInstituteType) return 'Education Institute Type field can’t be empty';
    }
    if (category === 'Healthcare') {
      if (!hospitalName) return 'Hospital Name field can’t be empty';
      if (!hospitalAddress) return 'Hospital Address field can’t be empty';
      if (!hospitalType) return 'Hospital Type field can’t be empty';
    }
    return null;
  };

  const onSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      Toast.show({ text1: validationError, type: 'error', visibilityTime: 3000 });
      return;
    }

    const payload = category === 'Educationist' ? {
      businessName,
      educationType,
      educationInstituteType,
      educationClassesType,
      description: message,
    } : {
      hospitalName,
      hospitalAddress,
      hospitalType
    };

    const endpoint = category === 'Educationist'
      ? 'educationist/complete-profile'
      : 'health-care/complete-business-details';

    try {
      dispatch(loaderStart());
      const response = await axios.post(`${BASE_URL}${endpoint}`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      dispatch(loaderStop());
      console.log('response?.data?.data',response?.data?.data)
      dispatch(loginUser(response?.data?.data?.user));
      dispatch(addType(category));
      Toast.show({ text1: response?.data?.message, type: 'success', visibilityTime: 3000 });
    } catch (error) {
      console.error('Error uploading form data:', error?.response?.data?.message || error);
      dispatch(loaderStop());
    }
  };



  const saveAddress = (address, geometry) => {
    console.log('addressaddress', address)
    // setLat(geometry.location.lat)
    // setLong(geometry.location.lng)
    setHospitalAddress(address);
  };

  const saveCountry = (city, country) => {
    setCity(city);
    setStateField(country);
  };

  const { email } = route?.params;

  return (
    <CustomBackground showLogo={false} titleText={'Business Details'}>
      <View style={{ marginHorizontal: 4,marginTop: 20, }}>
          {category == "Educationist" && <View>
            <Text style={styles.title}>Business Name</Text>
            <CustomTextInput
              placeholder="First Name"
              value={businessName}
              onChangeText={setBusinessName}
              containerStyle={styles.containerStyle}
            />
            <>
              <Text style={[styles.title, { paddingTop: 10 }]}>
                Education Type
              </Text>
              <TouchableOpacity
                activeOpacity={0}
                style={styles.inputstyle}
                onPress={() => actionSheetServiceRef.current.show()}>
                <Text style={styles.dateOfbirth}>
                  {educationType || 'Select Education Type'}
                </Text>
                <Image
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: 'contain',
                    tintColor: colors.primary,
                  }}
                  source={appIcons.arrowDown}
                />
              </TouchableOpacity>
              <Text style={[styles.title, { paddingTop: 10 }]}>
                Education Institute Type
              </Text>
              <TouchableOpacity
                activeOpacity={0}
                style={styles.inputstyle}
                onPress={() => educationInstituteTypeRef.current.show()}>
                <Text style={styles.dateOfbirth}>
                  {educationInstituteType || 'Select Education Institute Type'}
                </Text>
                <Image
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: 'contain',
                    tintColor: colors.primary,
                  }}
                  source={appIcons.arrowDown}
                />
              </TouchableOpacity>

              <Text style={[styles.title, { paddingTop: 10 }]}>
                Education Classes Type
              </Text>
              <TouchableOpacity
                activeOpacity={0}
                style={styles.inputstyle}
                onPress={() => educationClassesTypeRef.current.show()}>
                <Text style={styles.dateOfbirth}>
                  {educationClassesType || 'Select Education Classes Type'}
                </Text>
                <Image
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: 'contain',
                    tintColor: colors.primary,
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
                dataset={['School', 'College', 'Tution']}
                onPress={setEducationType}
              />
              <ActionSheetComponent
                ref={educationInstituteTypeRef}
                title="Select Service"
                dataset={['Government', 'Private', 'NGO']}
                onPress={setEducationInstituteType}
              />
              <ActionSheetComponent
                ref={educationClassesTypeRef}
                title="Select Service"
                dataset={['Primary', 'Secondary', 'Both']}
                onPress={setEducationClassesType}
              />
            </>
          </View>}
         
       {category == "Healthcare"&&   <View>
            <Text style={styles.title}>Hospital Name</Text>
            <CustomTextInput
              placeholder="Hospital Name"
              value={hospitalName}
              onChangeText={setHospitalName}
              containerStyle={styles.containerStyle}
            />
            <Text style={styles.title}>Address</Text>
            <GooglePlaceAutocomplete
              placeholder={'Address'}
              callback={saveAddress}
              rightIcon={true}
              cityCountry={saveCountry}
            />
                        <Text style={[styles.title, { paddingTop: 10 }]}>
                        Hospital Type
              </Text>
              <TouchableOpacity
                activeOpacity={0}
                style={styles.inputstyle}
                onPress={() => actionHospitalTypeRef.current.show()}>
                <Text style={styles.dateOfbirth}>
                  {hospitalType || 'Select Hospital Type'}
                </Text>
                <Image
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: 'contain',
                    tintColor: colors.primary,
                  }}
                  source={appIcons.arrowDown}
                />
              </TouchableOpacity>
              <ActionSheetComponent
                ref={actionHospitalTypeRef}
                title="Select Service"
                dataset={['Government', 'Private', 'NGO']}
                onPress={setHospitalType}
              />
          </View>}
          <CustomButton
            buttonStyle={styles.buttonStyle}
            title="Submit"
            onPress={onSubmit}
          />
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
