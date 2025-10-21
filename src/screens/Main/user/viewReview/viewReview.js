import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppBackground from '../../../../components/AppBackground';
import CustomButton from '../../../../components/CustomButton';
import CustomImagePicker from '../../../../components/CustomImagePicker';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';
import { BASE_URL } from '../../../../config/WebService';
import { createBooking, createRating, loaderStart, loaderStop, viewReview } from '../../../../redux/actions/appAction';
import { colors } from '../../../../utils';
import NavService from '../../../../helpers/NavService';
import { AirbnbRating, Rating } from 'react-native-ratings';
import styles from './styles';



const ViewReview = ({ route }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.authReducer.userToken);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [review, setReview] = useState([])
    const rateId = route.params?.id
    console.log('asdsad', rateId)

    useEffect(() => {
        const param = {
            key: "businessId",
            value: rateId
        };
        dispatch(viewReview(param, response => {
            console.log('rating----', response)
            setReview(response);
        }));
    }, [rateId])




    return (
        <AppBackground appLogo={false} onBack={() => NavService.navigate('BottomTabs', { name: 'Home' })} title="Rating">
            <FlatList
                data={review}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.reviewContainer}>
                        <Text style={styles.reviewUserName}>{item?.givenBy?.firstName + ' ' + item?.givenBy?.lastName}</Text>
                             <AirbnbRating
                            count={5}
                            defaultRating={item.rating}
                            size={15}
                            isDisabled
                            showRating={false} 
                            starContainerStyle={{ alignSelf: 'flex-start', marginVertical: 5 }}

                        />
                        <Text style={{color:colors.black,fontSize:13}}>{item.review}</Text>
                   
                    </View>
                )}
                keyExtractor={(item) => item?._id?.toString()}
            />
        </AppBackground>
    );
};

export default ViewReview;
