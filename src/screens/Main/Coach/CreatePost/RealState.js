import React, { useRef, useState } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    
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
    const setpropertyTypeRef = useRef();
    const unitTypeRef = useRef();
    const transactionTypeRef = useRef();
    const furnishingStatusRef = useRef()
    const [testDescription, setTestDescription] = useState('');
    const [title, setTitle] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [totalFloors, seTtotalFloors] = useState('');
    const [areaSize, setAreaSize] = useState('');
    const [image, setImage] = useState([]);
    const [propertyType, setpropertyType] = useState('')
    const [unitType, setunitType] = useState('')
    const [furnishingStatus, setfurnishingStatus] = useState('')
    const [transactionType, setTransactionType] = useState('')
    const [parking, setParking] = useState(false); // new checkbox state
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
    const handlePost = async () => {
        if (!title || !testDescription || !propertyType || !unitType || !furnishingStatus || image.length === 0) {
            Toast.show({ type: 'error', text1: 'Please fill all required fields' });
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', testDescription);
        formData.append('propertyType', propertyType);
        formData.append('unitType', unitType);
        formData.append('furnishingStatus', furnishingStatus);
        formData.append('transactionType', transactionType);
        formData.append('parkingAvailability', parking);
        formData.append('fullAddress', 'Karchi Sindh Pakistan');
        formData.append('city', 'Karachi');
        formData.append('state', 'Sindh');
        formData.append('latitude', '26126');
        formData.append('longitude', '26126');
        formData.append('areaSize',areaSize)
        if (bedrooms) formData.append('bedrooms', bedrooms);
        if (bathrooms) formData.append('bathrooms', bathrooms);
        if (totalFloors) formData.append('totalFloors', totalFloors);

        image.forEach(img => formData.append('AddMedia', img));

        dispatch(loaderStart());

        try {
            const res = await axios.post(`${BASE_URL}real-estate/create-add`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            Toast.show({ type: 'success', text1: 'Property added successfully!' });
            NavService.goBack(); // or reset fields here
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Error posting ad', text2: error?.response?.data?.message || 'Something went wrong' });
        } finally {
            dispatch(loaderStop());
        }
    };


    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: '10%' }}>
            <CustomTextInput placeholder="Title" value={title} onChangeText={setTitle} containerStyle={styles.containerStyle} />
            <CustomTextInput placeholder="description" value={testDescription} onChangeText={setTestDescription} containerStyle={styles.containerStyle} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 }}>

                <View style={{ width: '48%' }}>
                    <CustomTextInput
                        placeholder="Bedrooms"
                        value={bedrooms}
                        keyboardType="numeric"
                        onChangeText={setBedrooms}
                    />
                </View>
                <View style={{ width: '48%' }}>
                    <CustomTextInput
                        placeholder="Bathrooms"
                        value={bathrooms}
                        keyboardType="numeric"
                        onChangeText={setBathrooms}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20 }}>

                <View style={{ width: '48%' }}>
                    <CustomTextInput
                        placeholder="Area Size"
                        value={areaSize}
                        keyboardType="numeric"
                        onChangeText={setAreaSize}
                    />
                </View>
                <View style={{ width: '48%' }}>
                    <CustomTextInput placeholder="Floors" value={totalFloors} onChangeText={seTtotalFloors} containerStyle={styles.containerStyle} />
                </View>
            </View>
            <TouchableOpacity
                style={styles.inputstyle}
                onPress={() => setpropertyTypeRef.current.show()}>
                <Text style={styles.dateOfbirth}>{propertyType || 'Property Type'}</Text>
            </TouchableOpacity>
            <ActionSheetComponent
                ref={setpropertyTypeRef}
                title="Property Type'"
                dataset={["Residential",
                    "Commercial",
                    "Industrial",
                    "Land/Plots",
                    "Agricultural",]}
                onPress={setpropertyType}
            />

            <TouchableOpacity
                style={styles.inputstyle}
                onPress={() => unitTypeRef.current.show()}>
                <Text style={styles.dateOfbirth}>{unitType || 'Unit Type'}</Text>
            </TouchableOpacity>
            <ActionSheetComponent
                ref={unitTypeRef}
                title="Property Type'"
                dataset={["Sqft", "Sqm", "Acre", "Kanal", "Marla",]}
                onPress={setunitType}
            />

            <TouchableOpacity
                style={styles.inputstyle}
                onPress={() => furnishingStatusRef.current.show()}>
                <Text style={styles.dateOfbirth}>{furnishingStatus || 'Unit Type'}</Text>
            </TouchableOpacity>
            <ActionSheetComponent
                ref={furnishingStatusRef}
                title="Property Type'"
                dataset={["Furnished", "Semi-Furnished", "Unfurnished"]}
                onPress={setfurnishingStatus}
            />

            <TouchableOpacity
                style={styles.inputstyle}
                onPress={() => transactionTypeRef.current.show()}>
                <Text style={styles.dateOfbirth}>{transactionType || 'Unit Type'}</Text>
            </TouchableOpacity>
            <ActionSheetComponent
                ref={transactionTypeRef}
                title="Property Type'"
                dataset={["Buy", "Sell", "Rent", "Lease"]}
                onPress={setTransactionType}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 10 }}>
                {/* <CheckBox value={parking} onValueChange={setParking} /> */}
                <Text style={{ marginLeft: 10 }}>Parking Available</Text>
            </View>
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
            <CustomButton buttonStyle={styles.buttonStyle} onPress={handlePost} title="Post" />
        </ScrollView>
    );
};

export default HealthCard;
