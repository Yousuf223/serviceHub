import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { appIcons } from '../../../../assets'; // Update path if needed
import { colors } from '../../../../utils';
import NavService from '../../../../helpers/NavService';
import { BASE_URL } from '../../../../config/WebService';
import { useSelector } from 'react-redux';
const { width } = Dimensions.get('window');
const BusinessDetail = ({ route }) => {
  const { id } = route.params;
  const token = useSelector((state) => state.authReducer.userToken);
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState(null);
  const [like, setLike] = useState(false);
 
  useEffect(() => {
    const fetchDetails = async () => {
      try {

  
        const response = await axios.get(
          `${BASE_URL}user/public-feed/details/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const detailData = response?.data?.data;
        setDetail(detailData);
        setData(detailData?.media || []);
      } catch (error) {
        console.error('Error fetching detail:', error);
      }
    };
  
    fetchDetails();
  }, []);
  ;

  const renderCard = ({ item }) => (
    <View style={{ marginHorizontal: 10,marginTop:10 }}>
      <Image
        source={{ uri: item?.mediaUrl }}
        style={styles.headerImage}
        resizeMode="cover"
      />
    </View>
  );

  const renderConditionalDetails = () => {
    const item = detail;
    console.log('itemitemitem',item)
    if (!item) return null;

    if (item?.type === 'DOCTOR_APPOINTMENT') {
      const doc = item?.healthcare?.doctorAppointment;
      return (
        <View>
          <Text style={styles.detailText}>Doctor: {doc?.doctorName}</Text>
          <Text style={styles.detailText}>Fees: {doc?.fees}</Text>
          <Text style={styles.detailText}>Speciality: {doc?.speciality}</Text>
          <Text style={styles.detailText}>Timings: {doc?.timings}</Text>
          <View style={styles.daysContainer}>
            {doc?.days?.map((day, index) => (
              <View key={index} style={styles.dayChip}>
                <Text style={styles.dayText}>{day}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    }

    if (item?.type === 'LAB_TEST') {
      const lab = item?.healthcare?.labTests;
      return (
        <View>
          <Text style={styles.detailText}>Test Description: {lab?.testDescription}</Text>
          <Text style={styles.detailText}>Urgent Fees: {lab?.urgentFees}</Text>
          <Text style={styles.detailText}>Normal Fees: {lab?.normalFees}</Text>
          <Text style={styles.detailText}>Sample: {lab?.sampleRequired}</Text>
        </View>
      );
    }

    if (item?.type === 'TEACHER_ADD') {
      const teacher = item?.education?.teacherVacancy;
      return (
        <View>
          <Text style={styles.detailText}>Class: {teacher?.forClass}</Text>
          <Text style={styles.detailText}>Qualification: {teacher?.minQualification}</Text>
          <Text style={styles.detailText}>Salary: {teacher?.salaryPackage}</Text>
        </View>
      );
    }

    if (item?.type === 'ADMISSION_OPEN') {
      const admission = item?.education?.admissionOpen;
      return (
        <View>
          <Text style={styles.detailText}>Number Of Seats: {admission?.totalSeats}</Text>
          <Text style={styles.detailText}>Date: {moment(admission?.admissionDate).format('MMM-DD-YYYY')}</Text>
        </View>
      );
    }

    if (item?.category === 'RealEstate') {
        const realEstate = item?.realEstate;
        const specs = realEstate?.propertySpecifications || {};
        const location = realEstate?.locationDetails || {};
      
        return (
          <View>
            <Text style={styles.detailText}>Title: {realEstate?.title}</Text>
            <Text style={styles.detailText}>Description: {realEstate?.description}</Text>
            <Text style={styles.detailText}>Property Type: {realEstate?.propertyType}</Text>
            <Text style={styles.detailText}>Transaction Type: {realEstate?.transactionType}</Text>
      
            <Text style={styles.sectionTitle}>Location</Text>
            <Text style={styles.detailText}>City: {location?.city}</Text>
            <Text style={styles.detailText}>State: {location?.state}</Text>
            <Text style={styles.detailText}>Full Address: {location?.fullAddress}</Text>
      
            <Text style={styles.sectionTitle}>Specifications</Text>
            <Text style={styles.detailText}>Bedrooms: {specs?.bedrooms}</Text>
            <Text style={styles.detailText}>Bathrooms: {specs?.bathrooms}</Text>
            <Text style={styles.detailText}>Area Size: {specs?.areaSize} {specs?.unitType}</Text>
            <Text style={styles.detailText}>Total Floors: {specs?.totalFloors}</Text>
            <Text style={styles.detailText}>Furnishing Status: {specs?.furnishingStatus}</Text>
            <Text style={styles.detailText}>Parking Available: {specs?.parkingAvailability ? 'Yes' : 'No'}</Text>
          </View>
        );
      }
      if (item?.category === 'Gym') {
        const gym = item?.gym;
      
        return (
          <View>
            <Text style={styles.sectionTitle}>Gym</Text>
            <Text style={styles.detailText}>Details: {gym?.details || 'No details available'}</Text>
          </View>
        );
      }
      

    return null;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Image Slider */}
      <View style={styles.header}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => NavService.goBack()} style={styles.iconButton}>
            <Image
              source={appIcons.back}
              style={{ width: 20, height: 20, tintColor: colors.black }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Details */}
      <View style={styles.content}>
        {/* <Text style={styles.title}>{detail?.listing?.name}</Text>
        <Text style={styles.location}>{detail?.listing?.address}</Text> */}

        {/* <Text style={styles.sectionTitle}>About Us</Text>
        <Text style={styles.description}>{detail?.listing?.description}</Text> */}

        <Text style={styles.sectionTitle}>Services & Facilities</Text>
        {renderConditionalDetails()}
      </View>
    </ScrollView>
  );
};

export default BusinessDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: 250,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
  },
  headerImage: {
    width: width - 40, 
    height: 250,
    borderRadius: 10, 
  },
  iconContainer: {
    position: 'absolute',
    top: 40,
    left: 15,
  },
  iconButton: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 20,
    elevation: 5,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
  },
  location: {
    fontSize: 14,
    color: colors.gray,
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
  },
  detailText: {
    fontSize: 14,
    color: colors.black,
    marginVertical: 2,
  },
  dayChip: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
  },
  dayText: {
    fontSize: 12,
    color: colors.white,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
});
