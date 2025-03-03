import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Img from './Img';
import { colors } from '../utils';
import moment from 'moment';

const { width } = Dimensions.get('screen');

const Card = ({ onPress, item, userName, userImage, cardStyle }) => {
  console.log('item?.typeitem?.type',item?.education)
  return (
    <View style={[styles.card, cardStyle]}>
      <TouchableOpacity onPress={onPress} style={styles.headerContainer}>
        <Img local={true} style={styles.userImg} src={userImage} />
        <Text style={styles.userName}>{userName}</Text>
      </TouchableOpacity>
      <Img local={true} style={styles.post} src={{ uri: item?.media[0]?.mediaUrl }} />
      <View style={styles.contentContainer}>
        <Text style={styles.category}>{item?.category}</Text>
        {item?.type === 'DOCTOR_APPOINTMENT' && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Doctor: {item?.healthcare?.doctorAppointment?.doctorName}</Text>
            <Text style={styles.detailText}>Fees: {item?.healthcare?.doctorAppointment?.fees}</Text>
            <Text style={styles.detailText}>Speciality: {item?.healthcare?.doctorAppointment?.speciality}</Text>
            <Text style={styles.detailText}>Timings: {item?.healthcare?.doctorAppointment?.timings}</Text>
            <View style={styles.daysContainer}>
              {item?.healthcare?.doctorAppointment?.days?.map((day, index) => (
                <View key={index} style={styles.dayChip}>
                  <Text style={styles.dayText}>{day}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        {item?.type === "LAB_TEST" &&      <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Test Description: {item?.healthcare?.labTests?.testDescription}</Text>
            <Text style={styles.detailText}>Urgent Fees: {item?.healthcare?.labTests?.urgentFees}</Text>
            <Text style={styles.detailText}>Normal Fees: {item?.healthcare?.labTests?.normalFees}</Text>
            <Text style={styles.detailText}>Sample: {item?.healthcare?.labTests?.sampleRequired}</Text>
          </View>}
          {item?.type == "TEACHER_ADD" && <View>
            <Text style={styles.detailText}>Clsss: {item?.education?.teacherVacancy?.forClass}</Text>
            <Text style={styles.detailText}>Qualification: {item?.education?.teacherVacancy?.minQualification}</Text>
            <Text style={styles.detailText}>Salary: {item?.education?.teacherVacancy?.salaryPackage}</Text>
            </View>}

            {item?.type == "ADMISSION_OPEN" && <View>
            <Text style={styles.detailText}>Numbers Of Seats: {item?.education?.admissionOpen?.totalSeats}</Text>
            <Text style={styles.detailText}>Date: {moment(item?.education?.admissionOpen?.admissionDate).format("MMM-DD-YYYY")}</Text>
            </View>}
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#ffffff',
    width: '90%',
    marginVertical: 8,
    alignSelf: 'center',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  post: {
    width: '100%',
    height: 220,
  },
  contentContainer: {
    padding: 15,
  },
  category: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.black,
    marginVertical: 2,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
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
});
