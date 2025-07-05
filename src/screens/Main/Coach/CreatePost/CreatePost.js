import React, { useRef, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect, useDispatch, useSelector } from 'react-redux';
import AppBackground from '../../../../components/AppBackground';
import NavService from '../../../../helpers/NavService';
import { appIcons } from '../../../../assets';
import styles from './styles';
import CustomButton from '../../../../components/CustomButton';
import CustomImagePicker from '../../../../components/CustomImagePicker';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';
import { BASE_URL } from '../../../../config/WebService';
import CustomTextInput from '../../../../components/CustomTextInput';
import { loaderStart, loaderStop } from '../../../../redux/actions/appAction';
import { colors } from '../../../../utils';
import ActionSheetComponent from '../../../../components/ActionSheetComponent';
import HealthCard from './AddHealthPost';
import RealState from './RealState';

const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const sampleOptions = [
  'Blood', 'Urine', 'Saliva', 'Stool', 'Sputum', 'Swab', 'Skin Scraping',
  'Tissue', 'Cerebrospinal Fluid', 'Amniotic Fluid', 'Hair', 'Nail Clipping',
  'Sweat', 'Breath', 'Semen'
];

const CreatePost = ({ }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.userToken);
  const categoryType = useSelector((state) => state.appReducer?.categoryType);
  const [doctorName, setDoctorName] = useState('');
  const [speciality, setSpeciality] = useState('');

  const educationClassesTypeRef = useRef();
  const [fees, setFees] = useState('');
  const [days, setDays] = useState([]);
  const [activeTab, setActiveTab] = useState('Appointment');
  const [image, setImage] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [testDescription, setTestDescription] = useState('');
  const [sampleRequired, setSampleRequired] = useState('');
  const [urgentFees, setUrgentFees] = useState('');
  const [normalFees, setNormalFees] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const toggleDaySelection = (day) => {
    setDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

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
    if (activeTab === 'Appointment') {
      if (!doctorName || !speciality || !fees || days.length === 0 || image.length === 0) {
        return Toast.show({ text1: 'Please fill all fields', type: 'error', visibilityTime: 3000 });
      }
      submitData('health-care/doctor-appointment', {
        doctorName, speciality, fees,
        timings: `${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`,
        days,
      });
    } else {
      if (!testDescription || !sampleRequired || !urgentFees || !normalFees || image.length === 0) {
        return Toast.show({ text1: 'Please fill all fields', type: 'error', visibilityTime: 3000 });
      }
      submitData('health-care/lab-test', {
        testDescription, sampleRequired: sampleRequired, urgentFees, normalFees,
      });
    }
  };

  const submitData = (endpoint, data) => {
    console.log('datadata', data)
    dispatch(loaderStart());
    const payload = new FormData();

    Object.keys(data).forEach(key => payload.append(key, data[key]));
    image.forEach(img => payload.append('AddMedia', img));

    image.forEach(img => payload.append('AddMedia', img));
    axios.post(`${BASE_URL}${endpoint}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    }).then(response => {
      Toast.show({ text1: response?.data?.message, type: 'success', visibilityTime: 3000 });
      dispatch(loaderStop());
      NavService.navigate('BottomTabs', { name: 'Home' });
    }).catch(() => {
      dispatch(loaderStop());
      Toast.show({ text1: 'Failed to create post. Try again.', type: 'error', visibilityTime: 3000 });
    });
  };


  const gymSubmit = () => {
    if (!testDescription || image.length === 0) {
      return Toast.show({ text1: 'Please fill all fields', type: 'error', visibilityTime: 3000 });
    }
    else{
      dispatch(loaderStart());
      const payload = new FormData();
      payload.append('details', testDescription)
      image.forEach(img => payload.append('AddMedia', img));
      axios.post(`${BASE_URL}gym/create-add`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      }).then(response => {
        Toast.show({ text1: response?.data?.message, type: 'success', visibilityTime: 3000 });
        dispatch(loaderStop());
        NavService.navigate('BottomTabs', { name: 'Home' });
      }).catch((error) => {
        console.log('sahashfkashdkjsahdjkhdkjsa',error)
        dispatch(loaderStop());
        Toast.show({ text1: 'Failed to create post. Try again.', type: 'error', visibilityTime: 3000 });
      });
    }

  };


  const advocasySubmit = () => {
    if (!testDescription || image.length === 0) {
      return Toast.show({ text1: 'Please fill all fields', type: 'error', visibilityTime: 3000 });
    }
    else{
      dispatch(loaderStart());
      const payload = new FormData();
      payload.append('caption', testDescription)
      image.forEach(img => payload.append('AddMedia', img));
      console.log('payload',payload)
      axios.post(`${BASE_URL}${categoryType == 'Hostel' ? 'hostel' : 'advocasy'}/create-add`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      }).then(response => {
        Toast.show({ text1: response?.data?.message, type: 'success', visibilityTime: 3000 });
        dispatch(loaderStop());
        NavService.navigate('BottomTabs', { name: 'Home' });
      }).catch((error) => {
      console.error('Error uploading form data:', error?.response?.data?.message || error);
        dispatch(loaderStop());
        // Toast.show({ text1: 'Failed to create post. Try again.', type: 'error', visibilityTime: 3000 });
      });
    }

  };
  console.log('categoryType:', categoryType);
  return (
    <AppBackground title={'Create Post'} onBack={() => NavService.goBack()}>
      {categoryType == 'RealEstate' && <RealState />}
      {categoryType == "Educationist" && <HealthCard />}
      {categoryType == "Healthcare" && <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: "10%" }}>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('Appointment')} style={[styles.tabButton, activeTab === 'Appointment' && styles.activeTab]}>
            <Text style={activeTab === 'Appointment' && { textAlign: 'center', color: colors.white }}>Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('LabTest')} style={[styles.tabButton, activeTab === 'LabTest' && styles.activeTab]}>
            <Text style={activeTab === 'LabTest' && { textAlign: 'center', color: colors.white }}>Lab Test</Text>
          </TouchableOpacity>
        </View>
        {activeTab == "Appointment" && <View>      <CustomTextInput placeholder="Doctor Name" value={doctorName} onChangeText={setDoctorName} containerStyle={styles.containerStyle} />
          <CustomTextInput placeholder="Speciality" value={speciality} onChangeText={setSpeciality} containerStyle={styles.containerStyle} />
          <CustomTextInput placeholder="Fees" value={fees} onChangeText={setFees} keyboardType="numeric" containerStyle={styles.containerStyle} />
          <Text style={{ marginHorizontal: 20, marginBottom: 10, color: '#000', fontWeight: '500' }}>Select Days</Text>
          <View style={styles.selectedDaysContainer}>
            {daysList.map(day => (
              <TouchableOpacity key={day} onPress={() => toggleDaySelection(day)} style={[styles.dayButton, days.includes(day) && styles.selectedDay]}>
                <Text>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={{ marginHorizontal: 20, marginBottom: 10, color: '#000', fontWeight: '500' }}>Select Timing</Text>
          <View style={{ flexDirection: 'row', width: '92%', justifyContent: 'space-between', marginHorizontal: 0, alignSelf: 'center' }}>
            <TouchableOpacity style={{
              width: '48%', borderRadius: 10, height: 55, justifyContent: 'center', alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.black,
            }} onPress={() => setShowStartPicker(true)}><Text>Start Time: {startTime.toLocaleTimeString()}</Text></TouchableOpacity>
            {showStartPicker && <DateTimePicker value={startTime} mode="time" onChange={(e, date) => { setShowStartPicker(false); if (date) setStartTime(date); }} />}

            <TouchableOpacity style={{
              width: '48%', borderRadius: 10, height: 55, justifyContent: 'center', alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.black,
            }} onPress={() => setShowEndPicker(true)}><Text>End Time: {endTime.toLocaleTimeString()}</Text></TouchableOpacity>
            {showEndPicker && <DateTimePicker value={endTime} mode="time" onChange={(e, date) => { setShowEndPicker(false); if (date) setEndTime(date); }} />}
          </View></View>}
        {activeTab == "LabTest" && <View>
          <CustomTextInput placeholder="Test Description" value={testDescription} onChangeText={setTestDescription} containerStyle={styles.containerStyle} />
          <CustomTextInput placeholder="Urgent Fees" value={urgentFees} onChangeText={setUrgentFees} keyboardType="numeric" containerStyle={styles.containerStyle} />
          <CustomTextInput placeholder="Normal Fees" value={normalFees} onChangeText={setNormalFees} keyboardType="numeric" containerStyle={styles.containerStyle} />
          <TouchableOpacity
            activeOpacity={0}
            style={styles.inputstyle}
            onPress={() => educationClassesTypeRef.current.show()}>
            <Text style={styles.dateOfbirth}>
              {sampleRequired || 'Select Sample'}
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
            ref={educationClassesTypeRef}
            title="Select Sample Options"
            dataset={sampleOptions}
            onPress={setSampleRequired}
          />
        </View>}
        <CustomImagePicker isMultiple onImageChange={updateImageInGallery}>
          <Text style={{ marginHorizontal: 20, marginBottom: 10, color: '#000', fontWeight: '500', marginTop: 10 }}>Add Photos</Text>
        </CustomImagePicker>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: 20, }}>
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
        </View>
        <CustomButton buttonStyle={styles.buttonStyle} onPress={onSubmit} title="Post" />
      </ScrollView>}
      {categoryType == "Gym" && <View>
        <TextInput style={{
          height: 200,
          textAlignVertical: 'top',
          width: '90%',
          alignSelf: 'center',
          marginBottom: 15,
          borderWidth: 1,
          borderColor: colors.lightGray,
          borderRadius: 8,
          paddingHorizontal: 10,
          backgroundColor: colors.white,
          marginTop:10
        }} multiline={true}
          placeholder="Details" value={testDescription} onChangeText={setTestDescription}
          numberOfLines={4} />
        <CustomImagePicker isMultiple onImageChange={updateImageInGallery}>
          <Text style={{ marginHorizontal: 20, marginBottom: 10, color: '#000', fontWeight: '500', marginTop: 10 }}>Add Photos</Text>
        </CustomImagePicker>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: 20, }}>
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
        </View>
        <CustomButton buttonStyle={styles.buttonStyle} onPress={gymSubmit} title="Post" />

      </View>}
      {categoryType == "Advocasy" || categoryType == 'Hostel' && <View>
        <TextInput style={{
          height: 200,
          textAlignVertical: 'top',
          width: '90%',
          alignSelf: 'center',
          marginBottom: 15,
          borderWidth: 1,
          borderColor: colors.lightGray,
          borderRadius: 8,
          paddingHorizontal: 10,
          backgroundColor: colors.white,
          marginTop:10
        }} multiline={true}
        placeholderTextColor={'#000'}
          placeholder="Caption" value={testDescription} onChangeText={setTestDescription}
          numberOfLines={4} />
        <CustomImagePicker isMultiple onImageChange={updateImageInGallery}>
          <Text style={{ marginHorizontal: 20, marginBottom: 10, color: '#000', fontWeight: '500', marginTop: 10 }}>Add Photos</Text>
        </CustomImagePicker>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: 20, }}>
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
        </View>
        <CustomButton buttonStyle={styles.buttonStyle} onPress={advocasySubmit} title="Post" />

      </View>}
    </AppBackground>
  );
};

export default CreatePost;
