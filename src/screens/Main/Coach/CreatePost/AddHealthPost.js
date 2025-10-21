import React, { useRef, useState } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    Platform,
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

const HealthCard = ({ }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.authReducer.userToken);
    const educationClassesTypeRef = useRef();
    const [activeTab, setActiveTab] = useState('teacherVacancy');
    const [testDescription, setTestDescription] = useState('');
    const [minQualification, setMinQualification] = useState('');
    const [forClass, setForClass] = useState('');
    const [salaryPackage, setSalaryPackage] = useState('');
    const [admissionDate, setAdmissionDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [totalSeats, setTotalSeats] = useState('');
    const [image, setImage] = useState([]);

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) setAdmissionDate(selectedDate);
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
        if (
            activeTab === 'teacherVacancy' && (!testDescription || !minQualification || !forClass || !salaryPackage || image.length === 0) ||
            activeTab === 'admissionOpen' && (!admissionDate || !totalSeats || image.length === 0)
        ) {
            return Toast.show({ text1: 'Please fill all fields', type: 'error', visibilityTime: 3000 });
        }

        dispatch(loaderStart());
        const payload = new FormData();
        
        if (activeTab === 'teacherVacancy') {
            payload.append('details', testDescription);
            payload.append('minQualification', minQualification);
            payload.append('forClass', forClass);
            payload.append('salaryPackage', salaryPackage);
        } else {
            payload.append('admissionDate', admissionDate.toISOString().split('T')[0]);
            payload.append('totalSeats', totalSeats);
        }
        
        image.forEach(img => payload.append('AddMedia', img));
        
        axios.post(`${BASE_URL}educationist/${activeTab === 'teacherVacancy' ? 'teacher-add' : 'admission-open'}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        }).then(response => {
            Toast.show({ text1: response?.data?.message, type: 'success', visibilityTime: 3000 });
            dispatch(loaderStop());
            NavService.navigate('BottomTabs', { name: 'Home' });
        }).catch((error) => {
            console.log('AHJHagdas',error)
            dispatch(loaderStop());
            Toast.show({ text1: 'Failed to create post. Try again.', type: 'error', visibilityTime: 3000 });
        });
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: '10%' }}>
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => setActiveTab('teacherVacancy')} style={[styles.tabButton, activeTab === 'teacherVacancy' && styles.activeTab]}>
                    <Text style={activeTab === 'teacherVacancy' && { textAlign: 'center', color: colors.white }}>Teacher Vacancy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('admissionOpen')} style={[styles.tabButton, activeTab === 'admissionOpen' && styles.activeTab]}>
                    <Text style={activeTab === 'admissionOpen' && { textAlign: 'center', color: colors.white }}>Admission Open</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'teacherVacancy' ? (
                <>
                    <CustomTextInput placeholder="Details" value={testDescription} onChangeText={setTestDescription} containerStyle={styles.containerStyle} />
                    <CustomTextInput keyboardType='numeric' placeholder="Min Qualification" value={minQualification} onChangeText={setMinQualification} containerStyle={styles.containerStyle} />
                    <CustomTextInput keyboardType='numeric' placeholder="For Class" value={forClass} onChangeText={setForClass} containerStyle={styles.containerStyle} />
                    <CustomTextInput keyboardType='numeric' placeholder="Salary Package" value={salaryPackage} onChangeText={setSalaryPackage} keyboardType="numeric" containerStyle={styles.containerStyle} />
                </>
            ) : (
                <>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <CustomTextInput placeholder="Admission Date" value={admissionDate.toDateString()} editable={false} containerStyle={styles.containerStyle} />
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker value={admissionDate} mode="date" display="default" onChange={onChangeDate} />
                    )}
                    <CustomTextInput placeholder="Total Seats" value={totalSeats} onChangeText={setTotalSeats} keyboardType="numeric" containerStyle={styles.containerStyle} />
                </>
            )}
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
        </ScrollView>
    );
};

export default HealthCard;
