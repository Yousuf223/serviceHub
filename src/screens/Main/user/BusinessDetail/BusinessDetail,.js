import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { appIcons } from '../../../../assets'; // Ensure the path is correct
import { colors } from '../../../../utils';
import NavService from '../../../../helpers/NavService';
import { useDispatch } from 'react-redux';
import { getServicesDetail, likeService } from '../../../../redux/actions/appAction';
import CustomButton from '../../../../components/CustomButton';
import styles from './styles';

const BusinessDetail = ({ route }) => {
    const dispatch = useDispatch();
    const { id } = route.params
    console.log('-sadsad', id)
    const [data, setData] = useState([
    ]);
    const [detail, setDetail] = useState(null)
    const [like, setLike] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    //   useEffect(() => {
    //     dispatch(
    //       getServicesDetail(id, response => {
    //         setDetail(response);
    //         setData(response?.listing?.media)
    //         setLike(response?.isFavourite)
    //       })
    //     );
    //   }, [])
    let a = 2
    console.log('type of', typeof a)
    const renderCard = ({ item }) => {
        console.log('itemitem', item)
        return (
            <View style={{ marginHorizontal: 10 }}>
                <Image
                    source={{ uri: item?.mediaPath }}
                    style={styles.headerImage}
                    resizeMode="cover"
                />
            </View>
        );
    };
    return (
        <>
            <ScrollView style={styles.container}>
                {/* Horizontal Image Gallery */}
                <View style={styles.header}>
                    <FlatList
                        data={data}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index?.toString()}
                        renderItem={renderCard}
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                    />
                    <View style={styles.iconContainer1}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => NavService.goBack()} style={styles.iconButton}>
                            <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: colors.black }} source={appIcons.back} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Content Section */}
                <View style={styles.content}>
                    <Text style={styles.title}>{detail?.listing?.name}</Text>
                    <Text style={styles.location}>
                        {detail?.listing?.address}
                    </Text>
                    <Text style={styles.sectionTitle}>About Us</Text>
                    <Text style={styles.description}>
                        {detail?.listing?.description}        </Text>
                    <Text style={styles.sectionTitle}>Services & Facilities</Text>
                </View>


            </ScrollView>

        </>
    );
};

export default BusinessDetail;
