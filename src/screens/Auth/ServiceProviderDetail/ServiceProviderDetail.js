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
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import { appIcons } from '../../../assets/index';
import {
  completeProfile,
  addProfilePicture,
  loginUser,
} from '../../../redux/actions/authAction';
import ActionSheet from 'react-native-actionsheet';
import styles from './styles';
import { colors } from '../../../utils';
import NavService from '../../../helpers/NavService';
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
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.userToken);
  const category = route?.params?.data?.category;

  const [businessName, setBusinessName] = useState('');
  const [educationType, setEducationType] = useState('');
  const [educationClassesType, setEducationClassesType] = useState('');
  const [educationInstituteType, setEducationInstituteType] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [hospitalType, setHospitalType] = useState('');
  const [message, setMessage] = useState('');
  const [gymName, setGymName] = useState('');
  const [isTrainerAvailable, setIsTrainerAvailable] = useState(false);
  const [gymFacilities, setGymFacilities] = useState([]);
  const [servicesOffered, setServicesOffered] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  const [realStateType, setRealStateType] = useState('');

  const gymFacilitiesList = [
    'Cardio Equipment',
    'Strength Training Equipment',
    'Personal Training',
    'Group Fitness Classes',
    'Sauna/Steam Room',
    'Swimming Pool',
    'Locker Rooms with Showers',
    'Changing Rooms',
    'Cafeteria/Health Bar',
    'Parking Facility',
    'Kids Play Area/Daycare',
    'Indoor Sports Area',
    'Spa and Massage Services',
    '24/7 Access',
    'Wi-Fi Access',
  ];

  const realFacilitiesList = [
    "Buy",
    "Sell",
    "Rent",
    "Lease",
    "Property Management",
    "Real Estate Consultancy",
  ];

  const propertyTypesDealt = [
    "Residential",
    "Commercial",
    "Industrial",
    "Land/Plots",
    "Agricultural"
  ];
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => { });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => { });
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
    if (category === 'Gym') {
      if (!gymName) return 'Gym Name field can’t be empty';
      if (gymFacilities.length === 0) return 'Please select at least one Gym Facility';
    }

    if (category === 'RealEstate') {
      if (!realStateType) return 'Real State Type field can’t be empty';
      if (serviceType.length === 0) return 'Please select at least one Service Type';
      if (servicesOffered.length === 0) return 'Please select at least one Services Offered';
    }
    return null;
  };

  const onSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      Toast.show({ text1: validationError, type: 'error', visibilityTime: 3000 });
      return;
    }
  
    let payload = {};
    let endpoint = '';
  
    if (category === 'Educationist') {
      payload = {
        businessName,
        educationType,
        educationInstituteType,
        educationClassesType,
        description: message,
      };
      endpoint = 'educationist/complete-profile';
    } else if (category === 'Healthcare') {
      payload = {
        hospitalName,
        hospitalAddress,
        hospitalType,
      };
      endpoint = 'health-care/complete-business-details';
    } else if (category === 'Gym') {
      payload = {
        gymName,
        isTrainerAvailable,
        gymFacilities,
      };
      endpoint = 'gym/complete-business-details';
    } else if (category === 'RealEstate') {
      payload = {
        ownerType: realStateType,
        servicesOffered,
        propertyTypesDealt: serviceType,
      };
      endpoint = 'real-estate/complete-business-details';
    }
  
    try {
      dispatch(loaderStart());
      const response = await axios.post(`${BASE_URL}${endpoint}`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(loaderStop());
      dispatch(loginUser(response?.data?.data?.user));
      dispatch(addType(category));
      Toast.show({ text1: response?.data?.message, type: 'success', visibilityTime: 3000 });
    } catch (error) {
      console.error('Error uploading form data:', error?.response?.data?.message || error);
      dispatch(loaderStop());
    }
  };
  

  const saveAddress = (address, geometry) => {
    setHospitalAddress(address);
  };

  return (
    <CustomBackground showLogo={false} titleText={'Business Details'}>
      <View style={{ marginHorizontal: 4, marginTop: 20 }}>
        {category === 'Educationist' && (
          <>
            <Text style={styles.title}>Business Name</Text>
            <CustomTextInput
              placeholder="Business Name"
              value={businessName}
              onChangeText={setBusinessName}
              containerStyle={styles.containerStyle}
            />
            <Text style={styles.title}>Education Type</Text>
            <TouchableOpacity
              style={styles.inputstyle}
              onPress={() => actionSheetServiceRef.current.show()}>
              <Text style={styles.dateOfbirth}>{educationType || 'Select Education Type'}</Text>
              <Image source={appIcons.arrowDown} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Text style={styles.title}>Education Institute Type</Text>
            <TouchableOpacity
              style={styles.inputstyle}
              onPress={() => educationInstituteTypeRef.current.show()}>
              <Text style={styles.dateOfbirth}>
                {educationInstituteType || 'Select Institute Type'}
              </Text>
              <Image source={appIcons.arrowDown} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Text style={styles.title}>Education Classes Type</Text>
            <TouchableOpacity
              style={styles.inputstyle}
              onPress={() => educationClassesTypeRef.current.show()}>
              <Text style={styles.dateOfbirth}>
                {educationClassesType || 'Select Classes Type'}
              </Text>
              <Image source={appIcons.arrowDown} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Text style={styles.title}>Service Description</Text>
            <TextInput
              maxLength={275}
              style={[styles.Input, { height: 250, paddingTop: 15 }]}
              textAlignVertical="top"
              multiline
              placeholder={'Description'}
              placeholderTextColor={'#D3D3D3'}
              value={message}
              onChangeText={setMessage}
            />
            <ActionSheetComponent
              ref={actionSheetServiceRef}
              title="Select Service"
              dataset={['School', 'College', 'Tuition']}
              onPress={setEducationType}
            />
            <ActionSheetComponent
              ref={educationInstituteTypeRef}
              title="Select Institute Type"
              dataset={['Government', 'Private', 'NGO']}
              onPress={setEducationInstituteType}
            />
            <ActionSheetComponent
              ref={educationClassesTypeRef}
              title="Select Class Type"
              dataset={['Primary', 'Secondary', 'Both']}
              onPress={setEducationClassesType}
            />
          </>
        )}

        {category === 'Healthcare' && (
          <>
            <Text style={styles.title}>Hospital Name</Text>
            <CustomTextInput
              placeholder="Hospital Name"
              value={hospitalName}
              onChangeText={setHospitalName}
              containerStyle={styles.containerStyle}
            />
            <Text style={styles.title}>Address</Text>
            <GooglePlaceAutocomplete placeholder={'Address'} callback={saveAddress} />
            <Text style={styles.title}>Hospital Type</Text>
            <TouchableOpacity
              style={styles.inputstyle}
              onPress={() => actionHospitalTypeRef.current.show()}>
              <Text style={styles.dateOfbirth}>{hospitalType || 'Select Hospital Type'}</Text>
              <Image source={appIcons.arrowDown} style={styles.arrowIcon} />
            </TouchableOpacity>
            <ActionSheetComponent
              ref={actionHospitalTypeRef}
              title="Select Hospital Type"
              dataset={['Government', 'Private', 'NGO']}
              onPress={setHospitalType}
            />
          </>
        )}

        {category === 'Gym' && (
          <>
            <Text style={styles.title}>Gym Name</Text>
            <CustomTextInput
              placeholder="Gym Name"
              value={gymName}
              onChangeText={setGymName}
              containerStyle={styles.containerStyle1}
            />
            <Text style={styles.title}>Is Trainer Available?</Text>
            <TouchableOpacity
              onPress={() => setIsTrainerAvailable(!isTrainerAvailable)}
              style={[styles.inputstyle, { flexDirection: 'row', justifyContent: 'space-between' }]}>
              <Text>{isTrainerAvailable ? 'Yes' : 'No'}</Text>
              <Image source={appIcons.arrowDown} style={styles.arrowIcon} />
            </TouchableOpacity>

            <Text style={[styles.title, { paddingTop: 10 }]}>Gym Facilities</Text>

            <View style={styles.facilitiesContainer}>
              {gymFacilitiesList.map((facility, index) => {
                const isSelected = gymFacilities.includes(facility);
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.facilityItem,
                      isSelected && styles.selectedFacilityItem
                    ]}
                    onPress={() =>
                      isSelected
                        ? setGymFacilities(prev => prev.filter(f => f !== facility))
                        : setGymFacilities(prev => [...prev, facility])
                    }>
                    <Text style={[
                      styles.facilityText,
                      isSelected && styles.selectedFacilityText
                    ]}>
                      {facility}
                    </Text>
                    {isSelected && (
                      <Image
                        source={appIcons.checkmark}
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
        {category == 'RealEstate' && <View>
          <Text style={styles.title}>Owner Type</Text>
          <TouchableOpacity
            style={styles.inputstyle}
            onPress={() => actionHospitalTypeRef.current.show()}>
            <Text style={styles.dateOfbirth}>{realStateType || 'Select Your Type'}</Text>
            <Image source={appIcons.arrowDown} style={styles.arrowIcon} />
          </TouchableOpacity>
          <ActionSheetComponent
            ref={actionHospitalTypeRef}
            title="Select Your Type'"
            dataset={['Owner', 'Broker', 'Builder']}
            onPress={setRealStateType}
          />
          <Text style={[styles.title, { paddingTop: 10 }]}>Services Offered</Text>
          <View style={styles.facilitiesContainer}>
            {realFacilitiesList.map((facility, index) => {
              const isSelected = servicesOffered.includes(facility);
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.facilityItem,
                    isSelected && styles.selectedFacilityItem
                  ]}
                  onPress={() =>
                    isSelected
                      ? setServicesOffered(prev => prev.filter(f => f !== facility))
                      : setServicesOffered(prev => [...prev, facility])
                  }>
                  <Text style={[
                    styles.facilityText,
                    isSelected && styles.selectedFacilityText
                  ]}>
                    {facility}
                  </Text>
                  {isSelected && (
                    <Image
                      source={appIcons.checkmark}
                      style={styles.checkIcon}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.title, { paddingTop: 10 }]}>Property Types</Text>
          <View style={styles.facilitiesContainer}>
            {propertyTypesDealt.map((facility, index) => {
              const isSelected = serviceType.includes(facility);
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.facilityItem,
                    isSelected && styles.selectedFacilityItem
                  ]}
                  onPress={() =>
                    isSelected
                      ? setServiceType(prev => prev.filter(f => f !== facility))
                      : setServiceType(prev => [...prev, facility])
                  }>
                  <Text style={[
                    styles.facilityText,
                    isSelected && styles.selectedFacilityText
                  ]}>
                    {facility}
                  </Text>
                  {isSelected && (
                    <Image
                      source={appIcons.checkmark}
                      style={styles.checkIcon}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>}

        <CustomButton buttonStyle={styles.buttonStyle} title="Submit" onPress={onSubmit} />
      </View>
    </CustomBackground>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  completeProfile,
  addProfilePicture,
  loginUser,
})(ServiceProviderDetail);
