import React, {useState} from 'react';
import {
  Image,
  FlatList,
  Text,
  View,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import * as Colors from '../utils/Colors';
import AdaptiveStatusBar from '../component/AdaptiveStatusBar';
import Loader from '../component/Loader';
import CommonAppBar from '../component/CommonAppBar';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Constants from '../utils/Constants';
import Links from '../utils/Links';
import Utils from '../utils/Utils';
import LoaderView from '../component/LoaderView';
import DatePickerModel from '../component/DatePickerModel';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import {Button} from 'react-native-paper';

export default class AddReturnInVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.route.params.item,
      paymentMethodList: props.route.params.paymentMethodList,
      driverListRentOut: props.route.params.driverListRentOut,
      carListRent: props.route.params.carListRent,
      isNetworkAvailable: true,
      isLoading: false,
      deviceType: '1',
      driverId: '',
      carId: '',
      driver: '',
      rentOutDate: '',
      rentOutDateShow: new Date(),
      rentOutNo: '',
      rentOutID: '',
      rentInID: '',
      isDisplayRentOutDate: false,
      carNo: '',
      isDamageYes: false,
      isDamageNo: true,
      odometerReading: '',
      damageAmount: '',
      fuelAmount: '',
      isBondRefundRequestYes: false,
      isBondRefundRequestNo: true,
      bondRefundDate: '',
      bondRefundDateShow: new Date(),
      noticeDate: '',
      noticeDateShow: new Date(),
      isDisplayBondRefundDate: false,
      isDisplayNoticeDate: false,
      bondRefundAmount: '',
      referenceNumber: '',
      bondRemarks: '',
      paymentMethod: '',
      isPaymentMethodDropdownVisible: false,
      isDropdownVisible: false,
      notes: '',
      openImageGalleryFor: '',

      damageImageUri: '',
      damageImageName: '',
      damageImageSize: '',
      damageImageType: 'jpeg',

      frontImageUri: '',
      frontImageName: '',
      frontImageSize: '',
      frontImageType: 'jpeg',

      rearImageUri: '',
      rearImageName: '',
      rearImageSize: '',
      rearImageType: 'jpeg',

      driverSideImageUri: '',
      driverSideImageName: '',
      driverSideImageSize: '',
      driverSideImageType: 'jpeg',

      passengerSideImageUri: '',
      passengerSideImageName: '',
      passengerSideImageSize: '',
      passengerSideImageType: 'jpeg',

      odometerImageUri: '',
      odometerImageName: '',
      odometerImageSize: '',
      odometerImageType: 'jpeg',

      fuelGuageImageUri: '',
      fuelGuageImageName: '',
      fuelGuageImageSize: '',
      fuelGuageImageType: 'jpeg',

      driverDetailsData: '',

      refundType: [
        {
          id: 1,
          key: 'Full',
          value: 'FULL',
        },
        {
          id: 2,
          key: 'Partial',
          value: 'PARTIAL',
        },
      ],
      refundTypeValue: '',
      refundAmount: '',
      actual_bond_amount: '0.00',
      actual_bond_amount_to_show: '0.00',
      driverName: '',
    };
  }

  setBondRefundDate = (event, selectedDate) => {
    console.log('selectedDate' + selectedDate);
    this.setState({
      isDisplayBondRefundDate: false,
      bondRefundDateShow: selectedDate,
      bondRefundDate:
        selectedDate.getDate() +
        '/' +
        (selectedDate.getMonth() + 1) +
        '/' +
        selectedDate.getFullYear(),
    });
  };
  setNoticeDate = (event, selectedDate) => {
    console.log('selectedDate' + selectedDate);
    this.setState({
      isDisplayNoticeDate: false,
      noticeDateShow: selectedDate,
      noticeDate:
        selectedDate.getDate() +
        '/' +
        (selectedDate.getMonth() + 1) +
        '/' +
        selectedDate.getFullYear(),
    });
  };
  setRentOutDate = (event, selectedDate) => {
    console.log('selectedDate' + selectedDate);
    this.setState({
      isDisplayRentOutDate: false,
      rentOutDateShow: selectedDate,
      rentOutDate:
        selectedDate.getDate() +
        '/' +
        (selectedDate.getMonth() + 1) +
        '/' +
        selectedDate.getFullYear(),
    });
  };

  showBondRefundDate = () => {
    this.setState({
      isDisplayBondRefundDate: true,
    });
  };
  showNoticeDate = () => {
    this.setState({
      isDisplayNoticeDate: true,
    });
  };
  showRentOutDate = () => {
    this.setState({
      isDisplayRentOutDate: true,
    });
  };

  componentDidMount = async () => {
    this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
    this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);

    if (this.state.item != null) {
      console.log('123 -----', this.state.item);

      this.setState({
        carNo: this.state.item.car_no,
        carId: this.state.item.car_id,
        rentOutDate: this.state.item.rent_out_date,
        rentOutDateShow: Utils.getDate(this.state.item.rent_out_date),
        rentOutNo: this.state.item.rent_out_no,
        rentOutID: this.state.item.rent_out_id,
        rentInID: this.state.item.rent_in_id,
        isDamageYes: this.state.item.damage == 'Yes' ? true : false,
        isDamageNo: this.state.item.damage == 'No' ? true : false,
        damageAmount: this.state.item.damage_amount,
        driverId: this.state.item.driver_id,
        odometerReading: this.state.item.odometer_reading,
        bondRefundAmount: this.state.item.bond_refund_amount,
        bondRefundDate: this.state.item.bond_refund_date,
        isBondRefundRequestYes:
          this.state.item.bond_refund_request == 'Yes' ? true : false,
        isBondRefundRequestNo:
          this.state.item.bond_refund_request == 'No' ? true : false,
        notes: this.state.item.notes,
        fuelAmount: this.state.item.fuel,
        notes: this.state.item.notes,

        actual_bond_amount: this.state.item.bond_refund_amount ?? '',
        actual_bond_amount_to_show: this.state.item.bond_refund_amount ?? '',
        refundTypeValue: this.state.item.refund_type ?? '',
        refundAmount: this.state.item.amount_want_to_refund ?? '',
        paymentMethod: this.state.item.bond_payment_method ?? '',
        noticeDate: this.state.item.notice_date ?? '',
        noticeDateShow: Utils.getDate(this.state.item.notice_date) ?? '',
        bondRefundDate: this.state.item.bond_refund_due_date ?? '',
        bondRefundDateShow:
          Utils.getDate(this.state.item.bond_refund_due_date) ?? '',
        referenceNumber: this.state.item.bond_reference_no ?? '',
        bondRemarks: this.state.item.remarks ?? '',
        driverName: this.state.item.driverName ?? '',
      });

      if (
        this.state.item.driver_side_img != null &&
        this.state.item.driver_side_img != ''
      ) {
        this.setState({
          driverSideImageUri: Links.BASEURL + this.state.item.driver_side_img,
          driverSideImageName: this.state.item.driver_side_img.replace(
            /^.*[\\\/]/,
            '',
          ),
        });
      }

      if (
        this.state.item.front_img != null &&
        this.state.item.front_img != ''
      ) {
        this.setState({
          frontImageUri: Links.BASEURL + this.state.item.front_img,
          frontImageName: this.state.item.front_img.replace(/^.*[\\\/]/, ''),
        });
      }
      if (
        this.state.item.fuel_guage_img != null &&
        this.state.item.fuel_guage_img != ''
      ) {
        this.setState({
          fuelGuageImageUri: Links.BASEURL + this.state.item.fuel_guage_img,
          fuelGuageImageName: this.state.item.fuel_guage_img.replace(
            /^.*[\\\/]/,
            '',
          ),
        });
      }
      if (
        this.state.item.odometer_img != null &&
        this.state.item.odometer_img !== ''
      ) {
        this.setState({
          odometerImageUri: Links.BASEURL + this.state.item.odometer_img,
          odometerImageName: this.state.item.odometer_img.replace(
            /^.*[\\\/]/,
            '',
          ),
        });
      }
      if (
        this.state.item.passenger_side_img != null &&
        this.state.item.passenger_side_img != ''
      ) {
        this.setState({
          passengerSideImageUri:
            Links.BASEURL + this.state.item.passenger_side_img,
          passengerSideImageName: this.state.item.passenger_side_img.replace(
            /^.*[\\\/]/,
            '',
          ),
        });
      }
      if (this.state.item.rear_img != null && this.state.item.rear_img != '') {
        this.setState({
          rearImageUri: Links.BASEURL + this.state.item.rear_img,
          rearImageName: this.state.item.rear_img.replace(/^.*[\\\/]/, ''),
        });
      }
      if (
        this.state.item.damage_img != null &&
        this.state.item.damage_img != ''
      ) {
        this.setState({
          damageImageUri: Links.BASEURL + this.state.item.damage_img,
          damageImageName: this.state.item.damage_img.replace(/^.*[\\\/]/, ''),
        });
      }
    } else {
      this.setState({
        // driverId: this.state.driverListRentOut[0].driver_id,
        paymentMethod: this.state.paymentMethod[0],
      });
    }

    var paymentMethodListModified = [];
    for (var i = 0; i < this.state.paymentMethodList.length; i++) {
      paymentMethodListModified.push({value: this.state.paymentMethodList[i]});
    }

    this.setState({
      paymentMethodList: paymentMethodListModified,
    });
  };

  async onValueChangeCar(value) {
    this.setState({
      carNo: value.car_no,
      carId: value.car_id,
    });
    console.log('this.state.carId', value);
  }

  async onValueChangeDriver(value) {
    this.setState({
      driverId: value.driver_id,
    });
    if (this.state.item === null) {
      this.getDriverDetails(value);
    }
  }

  getDriverDetails(value) {
    this.setState({isLoading: true});
    try {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          this.callGetDriverDetailsApi(value);
        } else {
          Utils.showMessageAlert('No internet connection');
        }
      });
    } catch (error) {
      console.log('Error in api call : ' + error);
    }
  }

  callGetDriverDetailsApi = async value => {
    console.log('value ------', value);
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: Platform.OS === 'android' ? 1 : 2,
      user_id: this.userId,
      token_key: this.apiKey,
      rent_out_id: value.rent_out_id,
    });

    try {
      // console.log(
      //   'Call car list API Link ========>  ',
      //   Links.getBondRefundList,
      // );
      // console.log(
      //   'GetDriverDetails Input ========>  ',
      //   JSON.stringify(inputBody),
      // );
      const res = await fetch(Links.getDriverDetailsRentIn, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();
      this.state.data = [];

      console.log(
        'GetDriverDetails Response 123 ===========>  ',
        JSON.stringify(responseJSON),
      );
      if (responseJSON) {
        this.setState({isLoading: false});
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          this.setState({driverDetailsData: responseJSON});
          this.setState({
            carNo: responseJSON.driver_details.car_no,
            carId: value.car_id,
            rentOutDate: responseJSON.driver_details.rent_out_date,
            rentOutNo: responseJSON.driver_details.rent_out_no,
            actual_bond_amount: responseJSON.actual_bond_amount,
            actual_bond_amount_to_show: responseJSON.actual_bond_amount,
          });
        } else if (
          responseJSON.hasOwnProperty('status') &&
          responseJSON.status == 0
        ) {
          if (responseJSON.hasOwnProperty('message') && responseJSON.message) {
            Toast.show(responseJSON.message, Toast.SHORT);
          } else {
            Toast.show('something went wrong', Toast.SHORT);
          }
        } else if (
          responseJSON.hasOwnProperty('status') &&
          responseJSON.status == 2
        ) {
          await AsyncStorage.setItem(Constants.STORAGE_KEY_USER_ID, '');
          await AsyncStorage.setItem(Constants.STORAGE_KEY_API_KEY, '');
          await AsyncStorage.setItem(Constants.STORAGE_KEY_NAME, '');
          await AsyncStorage.setItem(Constants.STORAGE_KEY_EMAIL, '');
          await AsyncStorage.setItem(Constants.STORAGE_KEY_MOBILEL, '');

          if (responseJSON.hasOwnProperty('message') && responseJSON.message) {
            Toast.show(responseJSON.message, Toast.SHORT);
          }

          this.props.navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          });
        }
      }
    } catch (error) {
      this.setState({isLoading: false});
      Toast.show('something went wrong', Toast.SHORT);
      console.log('Exception in API call: ' + error);
    }
  };

  async onValueChangePayment(value) {
    this.setState({
      paymentMethod: value,
    });
    console.log('this.state.paymentMethod', value);
  }

  onClickSubmitButton() {
    this.props.navigation.goBack();
  }

  onClickDropdownItem(driver) {
    this.setState({
      isDropdownVisible: false,
      driver: driver,
    });
  }

  onClickPaymentMethodDropdownItem(paymentMethod) {
    this.setState({
      isPaymentMethodDropdownVisible: false,
      paymentMethod: paymentMethod,
    });
  }

  openImageGallery(type, openImageGalleryFor) {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    if (type === 1) {
      launchImageLibrary(options, res => {
        console.log('Response = ', res);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
          alert(res.customButton);
        } else {
          const source = {uri: res.uri};
          console.log('response', JSON.stringify(res));

          if (openImageGalleryFor == 'damageImageUri') {
            this.setState({
              resourcePath: res,
              damageImageUri: res.assets[0].uri,
              damageImageName: res.assets[0].fileName,
              damageImageSize: res.assets[0].fileSize,
              damageImageType: res.assets[0].type,
            });
          } else if (openImageGalleryFor == 'frontImageUri') {
            this.setState({
              resourcePath: res,
              frontImageUri: res.assets[0].uri,
              frontImageName: res.assets[0].fileName,
              frontImageSize: res.assets[0].fileSize,
              frontImageType: res.assets[0].type,
            });
          } else if (openImageGalleryFor == 'rearImageUri') {
            this.setState({
              resourcePath: res,
              rearImageUri: res.assets[0].uri,
              rearImageName: res.assets[0].fileName,
              rearImageSize: res.assets[0].fileSize,
              rearImageType: res.assets[0].type,
            });
          } else if (openImageGalleryFor == 'driverSideImageUri') {
            this.setState({
              resourcePath: res,
              driverSideImageUri: res.assets[0].uri,
              driverSideImageName: res.assets[0].fileName,
              driverSideImageSize: res.assets[0].fileSize,
              driverSideImageType: res.assets[0].type,
            });
          } else if (openImageGalleryFor == 'passengerSideImageUri') {
            this.setState({
              resourcePath: res,
              passengerSideImageUri: res.assets[0].uri,
              passengerSideImageName: res.assets[0].fileName,
              passengerSideImageSize: res.assets[0].fileSize,
              passengerSideImageType: res.assets[0].type,
            });
          } else if (openImageGalleryFor == 'odometerImageUri') {
            this.setState({
              resourcePath: res,
              odometerImageUri: res.assets[0].uri,
              odometerImageName: res.assets[0].fileName,
              odometerImageSize: res.assets[0].fileSize,
              odometerImageType: res.assets[0].type,
            });
          } else if (openImageGalleryFor == 'fuelGuageImageUri') {
            this.setState({
              resourcePath: res,
              fuelGuageImageUri: res.assets[0].uri,
              fuelGuageImageName: res.assets[0].fileName,
              fuelGuageImageSize: res.assets[0].fileSize,
              fuelGuageImageType: res.assets[0].type,
            });
          }

          console.log('fileData', JSON.stringify(res.assets[0].fileName));
          console.log('fileUri', JSON.stringify(res.assets[0].uri));
          console.log('fileType', JSON.stringify(res.assets[0].type));
        }
      });
    } else {
      launchCamera(options, res => {
        console.log('Response = ', res);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
          alert(res.customButton);
        } else {
          const source = {uri: res.uri};
          console.log('response', JSON.stringify(res));

          if (openImageGalleryFor == 'damageImageUri') {
            this.setState({
              resourcePath: res,
              damageImageUri: res.assets[0].uri,
              damageImageName: res.assets[0].fileName,
              damageImageSize: res.assets[0].fileSize,
              damageImageType: res.assets[0].type,
            });
          } else if (openImageGalleryFor == 'frontImageUri') {
            this.setState({
              resourcePath: res,
              frontImageUri: res.assets[0].uri,
              frontImageName: res.assets[0].fileName,
              frontImageSize: res.assets[0].fileSize,
              frontImageType: res.assets[0].type,
            });
          } else if (openImageGalleryFor == 'rearImageUri') {
            this.setState({
              resourcePath: res,
              rearImageUri: res.assets[0].uri,
              rearImageName: res.assets[0].fileName,
              rearImageSize: res.assets[0].fileSize,
              rearImageType: res.assets[0].type,
            });
          } else if (openImageGalleryFor == 'driverSideImageUri') {
            this.setState({
              resourcePath: res,
              driverSideImageUri: res.assets[0].uri,
              driverSideImageName: res.assets[0].fileName,
              driverSideImageSize: res.assets[0].fileSize,
              driverSideImageType: res.assets[0].type,
            });
          } else if (openImageGalleryFor == 'passengerSideImageUri') {
            this.setState({
              resourcePath: res,
              passengerSideImageUri: res.assets[0].uri,
              passengerSideImageName: res.assets[0].fileName,
              passengerSideImageSize: res.assets[0].fileSize,
              passengerSideImageType: res.assets[0].type,
            });
          } else if (openImageGalleryFor == 'odometerImageUri') {
            this.setState({
              resourcePath: res,
              odometerImageUri: res.assets[0].uri,
              odometerImageName: res.assets[0].fileName,
              odometerImageSize: res.assets[0].fileSize,
              odometerImageType: res.assets[0].type,
            });
          } else if (openImageGalleryFor == 'fuelGuageImageUri') {
            this.setState({
              resourcePath: res,
              fuelGuageImageUri: res.assets[0].uri,
              fuelGuageImageName: res.assets[0].fileName,
              fuelGuageImageSize: res.assets[0].fileSize,
              fuelGuageImageType: res.assets[0].type,
            });
          }

          console.log('fileData', JSON.stringify(res.assets[0].fileName));
          console.log('fileUri', JSON.stringify(res.assets[0].uri));
          console.log('fileType', JSON.stringify(res.assets[0].type));
        }
      });
    }
  }

  callAddReturnInVehicleValidation() {
    console.log(
      'this.state.remarks ------',
      this.state.isBondRefundRequestYes,
      this.state.bondRemarks,
    );
    Keyboard.dismiss();
    if (this.state.driverId == '') {
      Toast.show('Please select a Driver', Toast.SHORT);
    } else if (this.state.rentOutDate == '') {
      Toast.show('Please enter Rent out Date', Toast.SHORT);
    } else if (this.state.rentOutNo == '') {
      Toast.show('Please enter Rent out No', Toast.SHORT);
    } else if (this.state.carNo == '') {
      Toast.show('Please enter Car No', Toast.SHORT);
    } else if (
      this.state.odometerReading == '' ||
      this.state.odometerReading < 1
    ) {
      Toast.show('Please enter valid Odometer Reading', Toast.SHORT);
    } else if (
      this.state.isBondRefundRequestYes &&
      this.state.refundTypeValue === ''
    ) {
      Toast.show('Please select refund type', Toast.SHORT);
    } else if (this.state.isBondRefundRequestYes && !this.state.bondRemarks) {
      Toast.show('Please add remarks', Toast.SHORT);
    } else if (this.state.isBondRefundRequestYes && !this.state.paymentMethod) {
      Toast.show('Please select refund payment method', Toast.SHORT);
    } else if (
      this.state.isBondRefundRequestYes &&
      this.state.noticeDate === ''
    ) {
      Toast.show('Please select refund notice date', Toast.SHORT);
    } else if (
      this.state.isBondRefundRequestYes &&
      this.state.bondRefundDate === ''
    ) {
      Toast.show('Please select refund due date', Toast.SHORT);
    } else if (this.state.notes == '') {
      Toast.show('Please enter notes', Toast.SHORT);
    } else if (this.state.frontImageUri === '' && this.state.item === null) {
      Toast.show('Select front image', Toast.SHORT);
    } else if (this.state.rearImageUri === '' && this.state.item === null) {
      Toast.show('Select rear image', Toast.SHORT);
    } else if (
      this.state.driverSideImageUri === '' &&
      this.state.item === null
    ) {
      Toast.show('Select driver side image', Toast.SHORT);
    } else if (
      this.state.passengerSideImageUri === '' &&
      this.state.item === null
    ) {
      Toast.show('Select passenger side image', Toast.SHORT);
    } else if (this.state.odometerImageUri === '' && this.state.item === null) {
      Toast.show('Select odometer image', Toast.SHORT);
    } else if (
      this.state.fuelGuageImageUri === '' &&
      this.state.item === null
    ) {
      Toast.show('Select fuel guage image', Toast.SHORT);
    } else {
      // else if (
      //   this.state.isBondRefundRequestYes &&
      //   this.state.refundAmount === ''
      // ) {
      //   Toast.show('Please enter amount want to refund', Toast.SHORT);
      // }
      try {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            this.callAddReturnInVehicleApi();
          } else {
            Utils.showMessageAlert('No internet connection');
          }
        });
      } catch (error) {
        console.log('Error in webservice call : ' + error);
      }
    }
  }

  callAddReturnInVehicleApi = async () => {
    this.setState({isLoading: true});

    const rentOutID =
      this.state.item === null
        ? this.state.driverDetailsData.driver_details.rent_out_id
        : this.state.rentOutID;
    const rentInID =
      this.state.item === null
        ? this.state.driverDetailsData.driver_details.rent_in_id
        : this.state.rentInID;

    var formData = new FormData();
    formData.append('token_key', this.apiKey);
    formData.append('device_type', this.state.deviceType);
    formData.append('user_id', this.userId);
    formData.append('driver_id', this.state.driverId + '-' + rentOutID);
    formData.append('car_no', this.state.carNo);
    formData.append('car_id', this.state.carId);
    formData.append('odometer_reading', this.state.odometerReading);
    formData.append('damage', this.state.isDamageYes ? 'Yes' : 'No');
    formData.append('damage_amount', this.state.damageAmount);
    formData.append('fuel', this.state.fuelAmount);
    formData.append(
      'bond_refund_amount',
      this.state.actual_bond_amount_to_show,
    );
    formData.append('amount_want_to_refund', this.state.refundAmount);
    formData.append('refund_type', this.state.refundTypeValue);
    formData.append('bond_payment_method', this.state.paymentMethod);
    formData.append(
      'bond_refund_request',
      this.state.isBondRefundRequestYes ? 'Yes' : 'No',
    );
    formData.append('notice_date', this.state.noticeDate);
    formData.append('bond_refund_due_date', this.state.bondRefundDate);
    formData.append('bond_reference_no', this.state.referenceNumber);
    formData.append('remarks', this.state.bondRemarks);
    formData.append('rent_in_id', rentInID);
    formData.append('notes', this.state.notes);

    if (this.state.damageImageSize != null && this.state.damageImageSize != '')
      formData.append('damage_img', {
        uri:
          Platform.OS === 'ios'
            ? this.state.damageImageUri.replace('file://', '')
            : this.state.damageImageUri,
        name: this.state.damageImageName,
        type: this.state.damageImageType,
      });
    if (this.state.frontImageSize != null && this.state.frontImageSize != '')
      formData.append('front_img', {
        uri:
          Platform.OS === 'ios'
            ? this.state.frontImageUri.replace('file://', '')
            : this.state.frontImageUri,
        name: this.state.frontImageName,
        type: this.state.frontImageType,
      });
    if (this.state.rearImageSize != null && this.state.rearImageSize != '')
      formData.append('rear_img', {
        uri:
          Platform.OS === 'ios'
            ? this.state.rearImageUri.replace('file://', '')
            : this.state.rearImageUri,
        name: this.state.rearImageName,
        type: this.state.rearImageType,
      });
    if (
      this.state.driverSideImageSize != null &&
      this.state.driverSideImageSize != ''
    )
      formData.append('driver_side_img', {
        uri:
          Platform.OS === 'ios'
            ? this.state.driverSideImageUri.replace('file://', '')
            : this.state.driverSideImageUri,
        name: this.state.driverSideImageName,
        type: this.state.driverSideImageType,
      });
    if (
      this.state.passengerSideImageSize != null &&
      this.state.passengerSideImageSize != ''
    )
      formData.append('passenger_side_img', {
        uri:
          Platform.OS === 'ios'
            ? this.state.passengerSideImageUri.replace('file://', '')
            : this.state.passengerSideImageUri,
        name: this.state.passengerSideImageName,
        type: this.state.passengerSideImageType,
      });
    if (
      this.state.odometerImageSize != null &&
      this.state.odometerImageSize != ''
    )
      formData.append('odometer_img', {
        uri:
          Platform.OS === 'ios'
            ? this.state.odometerImageUri.replace('file://', '')
            : this.state.odometerImageUri,
        name: this.state.odometerImageName,
        type: this.state.odometerImageType,
      });
    if (
      this.state.fuelGuageImageSize != null &&
      this.state.fuelGuageImageSize != ''
    )
      formData.append('fuel_guage_img', {
        uri:
          Platform.OS === 'ios'
            ? this.state.fuelGuageImageUri.replace('file://', '')
            : this.state.fuelGuageImageUri,
        name: this.state.fuelGuageImageName,
        type: this.state.fuelGuageImageType,
      });

    try {
      res = null;
      if (this.state.item == null) {
        console.log(
          'Call Add Return In Vehicle API ========>  ',
          JSON.stringify(formData),
        );
        formData.append('bond_payment_method', this.state.paymentMethod);

        res = await fetch(Links.ADD_NEW_RENT_IN, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            //   'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        console.log(
          'Call Edit Return In Vehicle API ========>  ',
          JSON.stringify(formData),
        );
        res = await fetch(Links.EDIT_RENT_IN, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            //   'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      const responseJSON = await res.json();
      console.log(
        'Car Add/Edit Return In Vehicle Response ===========>  ',
        JSON.stringify(responseJSON),
      );
      if (responseJSON) {
        this.setState({isLoading: false});
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          if (responseJSON.hasOwnProperty('message') && responseJSON.message) {
            Toast.show(responseJSON.message, Toast.SHORT);
          }
          this.props.navigation.goBack();
        } else if (
          responseJSON.hasOwnProperty('status') &&
          responseJSON.status == 0
        ) {
          if (responseJSON.hasOwnProperty('message') && responseJSON.message) {
            Toast.show(responseJSON.message, Toast.SHORT);
          } else {
            Toast.show('something went wrong', Toast.SHORT);
          }
        }
      }
    } catch (error) {
      console.log('error', error);
      this.setState({isLoading: false});
      Toast.show('something went wrong', Toast.SHORT);
      console.log('Exception in API call: 123' + error);
    }
  };

  renderDriver = item => {
    return (
      <View>
        <Text style={styles.selectionListTextStyle}>
          {item.concat_driver_name}
        </Text>
      </View>
    );
  };

  renderRefundType = item => {
    return (
      <View>
        <Text style={styles.selectionListTextStyle}>{item.key}</Text>
      </View>
    );
  };

  setRefundType = (refundTypeValue, driver_bond_amount) => {
    if (refundTypeValue === 'FULL' && driver_bond_amount) {
      this.setState({
        refundTypeValue: refundTypeValue,
        refundAmount: driver_bond_amount,
      });
    } else {
      this.setState({refundAmount: 0, refundTypeValue: refundTypeValue});
    }
  };

  renderCar = item => {
    return (
      <View>
        <Text style={styles.selectionListTextStyle}>{item.car_no}</Text>
      </View>
    );
  };

  renderPayment = item => {
    return (
      <View>
        <Text style={styles.selectionListTextStyle}>{item.value}</Text>
      </View>
    );
  };
  renderCompany = item => {
    return (
      <View>
        <Text style={styles.selectionListTextStyle}>{item.company_name}</Text>
      </View>
    );
  };

  calculateActualBond = () => {
    const actual_bond_amount =
      this.state.actual_bond_amount > 0 ? this.state.actual_bond_amount : 0;
    const damageAmount =
      this.state.damageAmount > 0 ? this.state.damageAmount : 0;
    const fuelAmount = this.state.fuelAmount > 0 ? this.state.fuelAmount : 0;

    this.setState(
      {
        actual_bond_amount_to_show:
          actual_bond_amount - damageAmount - fuelAmount > 0
            ? actual_bond_amount - damageAmount - fuelAmount
            : 0,
      },
      () => {
        if (this.state.refundTypeValue === 'FULL')
          this.setRefundType(
            'FULL',
            this.state.actual_bond_amount_to_show ?? 0,
          );
      },
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.isLoading && <LoaderView />}
        {this.state.item != null ? (
          <CommonAppBar
            title="Edit Return In Vehicle"
            navigation={this.props.navigation}
          />
        ) : (
          <CommonAppBar
            title="Add Return In Vehicle"
            navigation={this.props.navigation}
          />
        )}

        <ScrollView>
          <View style={styles.bottomViewContainer}>
            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Driver <Text style={{color: Colors.red}}>*</Text>
            </Text>

            <View style={styles.editTextContainer}>
              {this.state.item === null ? (
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={this.state.driverListRentOut}
                  disable={!this.state.driverListRentOut.length}
                  placeholder={
                    this.state.driverListRentOut.length
                      ? 'Select Driver'
                      : 'No driver found'
                  }
                  maxHeight={300}
                  labelField="concat_driver_name"
                  valueField="driver_id"
                  value={this.state.driverId}
                  onChange={item => {
                    this.onValueChangeDriver(item);
                  }}
                  renderItem={this.renderDriver}
                />
              ) : (
                <Text
                  style={[styles.emailIdEditTextStyle]}
                  autoCapitalize="none"
                  multiline={false}
                  editable={false}
                  placeholderTextColor={Colors.placeholderColor}
                  // placeholder="Email Id"
                  // value={this.state.driverName}
                >
                  {this.state.driverName}
                </Text>
              )}
            </View>
            <View
              style={{
                marginTop: 20,
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Rent out Date <Text style={{color: Colors.red}}>*</Text>
            </Text>
            <TouchableOpacity onPress={this.showRentOutDate} disabled>
              <View style={styles.editTextContainer}>
                <TextInput
                  style={styles.emailIdEditTextStyle}
                  autoCapitalize="none"
                  multiline={false}
                  placeholderTextColor={Colors.placeholderColor}
                  placeholder="DD/MM/YYYY"
                  value={this.state.rentOutDate}
                  onChangeText={value => this.setState({rentOutDate: value})}
                  onSubmitEditing={() => {
                    this.rentOutNoTextInput.focus();
                  }}
                  ref={input => {
                    this.rentOutDateTextInput = input;
                  }}
                  blurOnSubmit={false}
                  editable={false}
                />

                <Image
                  source={require('../images/calendar.png')}
                  style={styles.calenderIcon}
                />
              </View>
            </TouchableOpacity>

            {this.state.isDisplayRentOutDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={this.state.rentOutDateShow}
                mode="date"
                display={Platform.OS == 'android' ? 'calendar' : 'spinner'}
                onChange={this.setRentOutDate}
              />
            )}

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Rent Out No. <Text style={{color: Colors.red}}>*</Text>
            </Text>
            <View style={styles.editTextContainer}>
              <TextInput
                style={styles.emailIdEditTextStyle}
                autoCapitalize="none"
                multiline={false}
                placeholderTextColor={Colors.placeholderColor}
                // placeholder="Email Id"
                value={this.state.rentOutNo}
                onChangeText={value => this.setState({rentOutNo: value})}
                onSubmitEditing={() => {
                  this.carNoTextInput.focus();
                }}
                ref={input => {
                  this.rentOutNoTextInput = input;
                }}
                blurOnSubmit={false}
                editable={false}
              />
            </View>

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Car No. <Text style={{color: Colors.red}}>*</Text>
            </Text>
            <View style={styles.editTextContainer}>
              <TextInput
                style={styles.emailIdEditTextStyle}
                autoCapitalize="none"
                multiline={false}
                placeholderTextColor={Colors.placeholderColor}
                // placeholder="Email Id"
                value={this.state.carNo}
                onChangeText={value => this.setState({carNo: value})}
                onSubmitEditing={() => {
                  this.damageAmountTextInput.focus();
                }}
                ref={input => {
                  this.odometerReadingTextInput = input;
                }}
                editable={false}
              />
            </View>

            <View
              style={{
                marginTop: 20,
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Odometer Reading <Text style={{color: Colors.red}}>*</Text>
            </Text>
            <View style={styles.editTextContainer}>
              <TextInput
                style={styles.emailIdEditTextStyle}
                autoCapitalize="none"
                multiline={false}
                placeholderTextColor={Colors.placeholderColor}
                // placeholder="Email Id"
                value={this.state.odometerReading}
                onChangeText={value => this.setState({odometerReading: value})}
                onSubmitEditing={() => {
                  this.damageAmountTextInput.focus();
                }}
                ref={input => {
                  this.odometerReadingTextInput = input;
                }}
                blurOnSubmit={false}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.rowViewOptionStyle}>
              <Text numberOfLines={1} style={styles.headingTextStyleThree}>
                Damage
              </Text>

              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    isDamageYes: true,
                    isDamageNo: false,
                  })
                }>
                <Image
                  source={
                    this.state.isDamageYes
                      ? require('../images/ic_radio_check.png')
                      : require('../images/ic_radio_uncheck.png')
                  }
                  style={styles.checkUncheckIcon}
                />
              </TouchableOpacity>
              <Text numberOfLines={1} style={styles.optionTextStyle}>
                YES
              </Text>

              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    isDamageYes: false,
                    isDamageNo: true,
                  })
                }>
                <Image
                  source={
                    this.state.isDamageNo
                      ? require('../images/ic_radio_check.png')
                      : require('../images/ic_radio_uncheck.png')
                  }
                  style={styles.checkUncheckIcon}
                />
              </TouchableOpacity>
              <Text numberOfLines={1} style={styles.optionTextStyle}>
                NO
              </Text>
            </View>

            {this.state.isDamageYes ? (
              <>
                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Damage Amount
                </Text>
                <View
                  style={[
                    styles.editTextContainer,
                    {flexDirection: 'row', alignItems: 'center'},
                  ]}>
                  <Text style={{marginRight: 4}}>$</Text>
                  <TextInput
                    style={styles.emailIdEditTextStyle}
                    autoCapitalize="none"
                    multiline={false}
                    placeholderTextColor={Colors.placeholderColor}
                    // placeholder="Email Id"
                    value={this.state.damageAmount}
                    onChangeText={value => {
                      this.setState(
                        {
                          damageAmount: value,
                        },
                        () => {
                          this.calculateActualBond();
                        },
                      );
                    }}
                    onSubmitEditing={() => {
                      this.fuelAmountTextInput.focus();
                    }}
                    ref={input => {
                      this.damageAmountTextInput = input;
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Upload photo of Damage
                </Text>
                <View
                  style={styles.addImageViewStyle}
                  // onPress={() => this.openImageGallery('damageImageUri')}
                >
                  {this.state.damageImageUri != null &&
                  this.state.damageImageUri != '' ? (
                    <Image
                      source={{uri: this.state.damageImageUri}}
                      style={styles.logoIcon}
                    />
                  ) : (
                    <Image
                      source={require('../images/ic_add_camera.png')}
                      style={styles.logoIcon}
                    />
                  )}

                  {this.state.fileName != '' ? (
                    <Text numberOfLines={2} style={styles.uploadImageNameText}>
                      {this.state.damageImageName}
                    </Text>
                  ) : (
                    <Text numberOfLines={1} style={styles.uploadPhotoText}>
                      Upload Photo
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    marginTop: 4,
                    flexDirection: 'row',
                    marginHorizontal: 40,
                    justifyContent: 'space-between',
                  }}>
                  <Button
                    compact
                    mode="contained"
                    color={Colors.textColor1}
                    onPress={() => this.openImageGallery(1, 'damageImageUri')}>
                    Open gallery
                  </Button>
                  <Button
                    compact
                    mode="contained"
                    color={Colors.textColor1}
                    onPress={() => this.openImageGallery(2, 'damageImageUri')}>
                    Take Picture
                  </Button>
                </View>
              </>
            ) : null}

            <View
              style={{
                marginTop: 20,
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Fuel Amount
            </Text>
            <View
              style={[
                styles.editTextContainer,
                {flexDirection: 'row', alignItems: 'center'},
              ]}>
              <Text style={{marginRight: 4}}>$</Text>
              <TextInput
                style={styles.emailIdEditTextStyle}
                autoCapitalize="none"
                multiline={false}
                placeholderTextColor={Colors.placeholderColor}
                // placeholder="Email Id"
                value={this.state.fuelAmount}
                onChangeText={value =>
                  this.setState(
                    {
                      fuelAmount: value,
                    },
                    () => {
                      this.calculateActualBond();
                    },
                  )
                }
                onSubmitEditing={() => {
                  this.yearTextInput.focus();
                }}
                ref={input => {
                  this.fuelAmountTextInput = input;
                }}
                blurOnSubmit={false}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <View style={[styles.rowViewOptionStyle]}>
              <Text style={styles.headingTextStyleThree}>
                Bond Refund Request
              </Text>

              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    isBondRefundRequestYes: true,
                    isBondRefundRequestNo: false,
                  })
                }>
                <Image
                  source={
                    this.state.isBondRefundRequestYes
                      ? require('../images/ic_radio_check.png')
                      : require('../images/ic_radio_uncheck.png')
                  }
                  style={styles.checkUncheckIcon}
                />
              </TouchableOpacity>
              <Text numberOfLines={1} style={styles.optionTextStyle}>
                YES
              </Text>

              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    isBondRefundRequestYes: false,
                    isBondRefundRequestNo: true,
                  })
                }>
                <Image
                  source={
                    this.state.isBondRefundRequestNo
                      ? require('../images/ic_radio_check.png')
                      : require('../images/ic_radio_uncheck.png')
                  }
                  style={styles.checkUncheckIcon}
                />
              </TouchableOpacity>
              <Text numberOfLines={1} style={styles.optionTextStyle}>
                NO
              </Text>
            </View>

            {this.state.isBondRefundRequestYes ? (
              <>
                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Total Bond Amount <Text style={{color: Colors.red}}>*</Text>
                </Text>
                <View
                  style={[
                    styles.editTextContainer,
                    {flexDirection: 'row', alignItems: 'center'},
                  ]}>
                  <Text style={{marginRight: 4}}>$</Text>
                  <TextInput
                    style={styles.emailIdEditTextStyle}
                    autoCapitalize="none"
                    multiline={false}
                    placeholderTextColor={Colors.placeholderColor}
                    editable={false}
                    value={
                      this.state.actual_bond_amount_to_show.toString() ?? '0.00'
                    }
                    onChangeText={value => this.setState({refundAmount: value})}
                  />
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Refund Type <Text style={{color: Colors.red}}>*</Text>
                </Text>
                <View style={styles.editTextContainer}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={this.state.refundType}
                    placeholder="Select Refund Type"
                    maxHeight={300}
                    labelField="key"
                    valueField="value"
                    value={this.state.refundTypeValue}
                    onChange={item => {
                      this.setRefundType(
                        item.value,
                        this.state.actual_bond_amount_to_show ?? 0,
                      );
                    }}
                    renderItem={this.renderRefundType}
                  />
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Amount Want to Refund
                </Text>
                <View
                  style={[
                    styles.editTextContainer,
                    {flexDirection: 'row', alignItems: 'center'},
                  ]}>
                  <Text style={{marginRight: 4}}>$</Text>
                  <TextInput
                    style={styles.emailIdEditTextStyle}
                    autoCapitalize="none"
                    multiline={false}
                    placeholderTextColor={Colors.placeholderColor}
                    editable={
                      this.state.refundTypeValue === 'FULL' ? false : true
                    }
                    value={this.state.refundAmount.toString()}
                    onChangeText={value => this.setState({refundAmount: value})}
                  />
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Payment Method <Text style={{color: Colors.red}}>*</Text>
                </Text>

                <View style={styles.editTextContainer}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={this.state.paymentMethodList.filter(
                      elm => elm.value !== 'Direct Debit',
                    )}
                    placeholder="Select Payment Method"
                    maxHeight={300}
                    labelField="value"
                    valueField="value"
                    value={this.state.paymentMethod}
                    onChange={item => {
                      this.onValueChangePayment(item.value);
                    }}
                    renderItem={this.renderPayment}
                  />
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Notice Date <Text style={{color: Colors.red}}>*</Text>
                </Text>
                <TouchableOpacity onPress={this.showNoticeDate}>
                  <View style={styles.editTextContainer}>
                    <TextInput
                      style={styles.emailIdEditTextStyle}
                      autoCapitalize="none"
                      multiline={false}
                      placeholderTextColor={Colors.placeholderColor}
                      placeholder="DD/MM/YYYY"
                      value={this.state.noticeDate}
                      onChangeText={value => this.setState({noticeDate: value})}
                      onSubmitEditing={() => {
                        this.insuranceExpireDateTextInput.focus();
                      }}
                      ref={input => {
                        this.bondRefundDateTextInput = input;
                      }}
                      blurOnSubmit={false}
                      editable={false}
                    />

                    <Image
                      source={require('../images/calendar.png')}
                      style={styles.calenderIcon}
                    />
                  </View>
                </TouchableOpacity>

                {this.state.isDisplayNoticeDate && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.noticeDateShow}
                    mode="date"
                    display={Platform.OS == 'android' ? 'calendar' : 'spinner'}
                    onChange={this.setNoticeDate}
                    minimumDate={
                      this.state.item != null
                        ? this.state.noticeDateShow
                        : new Date()
                    }
                  />
                )}

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Bond Refund Due Date{' '}
                  <Text style={{color: Colors.red}}>*</Text>
                </Text>
                <TouchableOpacity onPress={this.showBondRefundDate}>
                  <View style={styles.editTextContainer}>
                    <TextInput
                      style={styles.emailIdEditTextStyle}
                      autoCapitalize="none"
                      multiline={false}
                      placeholderTextColor={Colors.placeholderColor}
                      placeholder="DD/MM/YYYY"
                      value={this.state.bondRefundDate}
                      onChangeText={value =>
                        this.setState({bondRefundDate: value})
                      }
                      onSubmitEditing={() => {
                        this.insuranceExpireDateTextInput.focus();
                      }}
                      ref={input => {
                        this.bondRefundDateTextInput = input;
                      }}
                      blurOnSubmit={false}
                      editable={false}
                    />

                    <Image
                      source={require('../images/calendar.png')}
                      style={styles.calenderIcon}
                    />
                  </View>
                </TouchableOpacity>

                {this.state.isDisplayBondRefundDate && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.bondRefundDateShow}
                    mode="date"
                    display={Platform.OS == 'android' ? 'calendar' : 'spinner'}
                    onChange={this.setBondRefundDate}
                    minimumDate={
                      this.state.item != null
                        ? this.state.bondRefundDateShow
                        : new Date()
                    }
                  />
                )}
                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Reference Number
                </Text>
                <View style={styles.editTextContainer}>
                  <TextInput
                    style={styles.remarksTextStyle}
                    autoCapitalize="none"
                    multiline={false}
                    placeholderTextColor={Colors.placeholderColor}
                    value={this.state.referenceNumber}
                    onChangeText={value =>
                      this.setState({referenceNumber: value})
                    }
                  />
                </View>
                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Remarks <Text style={{color: Colors.red}}>*</Text>
                </Text>
                <View style={styles.editTextContainer}>
                  <TextInput
                    style={styles.remarksTextStyle}
                    autoCapitalize="none"
                    multiline={false}
                    placeholderTextColor={Colors.placeholderColor}
                    value={this.state.bondRemarks}
                    onChangeText={value => this.setState({bondRemarks: value})}
                  />
                </View>
              </>
            ) : null}

            <View
              style={{
                marginTop: 20,
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text
              style={[
                styles.headingTextStyleThree,
                {padding: 10, color: Colors.textColor1},
              ]}>
              Upload 6 pictures of car being issued
            </Text>
            <View
              style={{
                marginTop: 0,
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Upload Photo of Front <Text style={{color: Colors.red}}>*</Text>
            </Text>
            <View
              style={styles.addImageViewStyle}
              // onPress={() => this.openImageGallery('frontImageUri')}
            >
              {this.state.frontImageUri != null &&
              this.state.frontImageUri != '' ? (
                <Image
                  source={{uri: this.state.frontImageUri}}
                  style={styles.logoIcon}
                />
              ) : (
                <Image
                  source={require('../images/ic_add_camera.png')}
                  style={styles.logoIcon}
                />
              )}

              {this.state.fileName != '' ? (
                <Text numberOfLines={2} style={styles.uploadImageNameText}>
                  {this.state.frontImageName}
                </Text>
              ) : (
                <Text numberOfLines={1} style={styles.uploadPhotoText}>
                  Upload Photo of Front
                </Text>
              )}
            </View>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                marginHorizontal: 40,
                justifyContent: 'space-between',
              }}>
              <Button
                compact
                mode="contained"
                color={Colors.textColor1}
                onPress={() => this.openImageGallery(1, 'frontImageUri')}>
                Open gallery
              </Button>
              <Button
                compact
                mode="contained"
                color={Colors.textColor1}
                onPress={() => this.openImageGallery(2, 'frontImageUri')}>
                Take Picture
              </Button>
            </View>

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Upload Photo of Rear <Text style={{color: Colors.red}}>*</Text>
            </Text>
            <View
              style={styles.addImageViewStyle}
              // onPress={() => this.openImageGallery('rearImageUri')}
            >
              {this.state.rearImageUri != null &&
              this.state.rearImageUri != '' ? (
                <Image
                  source={{uri: this.state.rearImageUri}}
                  style={styles.logoIcon}
                />
              ) : (
                <Image
                  source={require('../images/ic_add_camera.png')}
                  style={styles.logoIcon}
                />
              )}

              {this.state.fileName != '' ? (
                <Text numberOfLines={2} style={styles.uploadImageNameText}>
                  {this.state.rearImageName}
                </Text>
              ) : (
                <Text numberOfLines={1} style={styles.uploadPhotoText}>
                  Upload Photo of Rear
                </Text>
              )}
            </View>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                marginHorizontal: 40,
                justifyContent: 'space-between',
              }}>
              <Button
                compact
                mode="contained"
                color={Colors.textColor1}
                onPress={() => this.openImageGallery(1, 'rearImageUri')}>
                Open gallery
              </Button>
              <Button
                compact
                mode="contained"
                color={Colors.textColor1}
                onPress={() => this.openImageGallery(2, 'rearImageUri')}>
                Take Picture
              </Button>
            </View>

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Upload Photo of Driver Side{' '}
              <Text style={{color: Colors.red}}>*</Text>
            </Text>
            <View
              style={styles.addImageViewStyle}
              // onPress={() => this.openImageGallery('driverSideImageUri')}
            >
              {this.state.driverSideImageUri != null &&
              this.state.driverSideImageUri != '' ? (
                <Image
                  source={{uri: this.state.driverSideImageUri}}
                  style={styles.logoIcon}
                />
              ) : (
                <Image
                  source={require('../images/ic_add_camera.png')}
                  style={styles.logoIcon}
                />
              )}

              {this.state.fileName != '' ? (
                <Text numberOfLines={2} style={styles.uploadImageNameText}>
                  {this.state.driverSideImageName}
                </Text>
              ) : (
                <Text numberOfLines={1} style={styles.uploadPhotoText}>
                  Upload Photo of Driver Side
                </Text>
              )}
            </View>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                marginHorizontal: 40,
                justifyContent: 'space-between',
              }}>
              <Button
                compact
                mode="contained"
                color={Colors.textColor1}
                onPress={() => this.openImageGallery(1, 'driverSideImageUri')}>
                Open gallery
              </Button>
              <Button
                compact
                mode="contained"
                color={Colors.textColor1}
                onPress={() => this.openImageGallery(2, 'driverSideImageUri')}>
                Take Picture
              </Button>
            </View>

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Upload Photo of Passenger Side{' '}
              <Text style={{color: Colors.red}}>*</Text>
            </Text>
            <View
              style={styles.addImageViewStyle}
              // onPress={() => this.openImageGallery('passengerSideImageUri')}
            >
              {this.state.passengerSideImageUri != null &&
              this.state.passengerSideImageUri != '' ? (
                <Image
                  source={{uri: this.state.passengerSideImageUri}}
                  style={styles.logoIcon}
                />
              ) : (
                <Image
                  source={require('../images/ic_add_camera.png')}
                  style={styles.logoIcon}
                />
              )}

              {this.state.fileName != '' ? (
                <Text numberOfLines={2} style={styles.uploadImageNameText}>
                  {this.state.passengerSideImageName}
                </Text>
              ) : (
                <Text numberOfLines={1} style={styles.uploadPhotoText}>
                  Upload Photo of Passenger Side
                </Text>
              )}
            </View>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                marginHorizontal: 40,
                justifyContent: 'space-between',
              }}>
              <Button
                compact
                mode="contained"
                color={Colors.textColor1}
                onPress={() =>
                  this.openImageGallery(1, 'passengerSideImageUri')
                }>
                Open gallery
              </Button>
              <Button
                compact
                mode="contained"
                color={Colors.textColor1}
                onPress={() =>
                  this.openImageGallery(2, 'passengerSideImageUri')
                }>
                Take Picture
              </Button>
            </View>

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Upload Photo of Odometer{' '}
              <Text style={{color: Colors.red}}>*</Text>
            </Text>
            <View
              style={styles.addImageViewStyle}
              // onPress={() => this.openImageGallery('odometerImageUri')}
            >
              {this.state.odometerImageUri != null &&
              this.state.odometerImageUri != '' ? (
                <Image
                  source={{uri: this.state.odometerImageUri}}
                  style={styles.logoIcon}
                />
              ) : (
                <Image
                  source={require('../images/ic_add_camera.png')}
                  style={styles.logoIcon}
                />
              )}

              {this.state.fileName != '' ? (
                <Text numberOfLines={2} style={styles.uploadImageNameText}>
                  {this.state.odometerImageName}
                </Text>
              ) : (
                <Text numberOfLines={1} style={styles.uploadPhotoText}>
                  Upload Photo of Odometer
                </Text>
              )}
            </View>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                marginHorizontal: 40,
                justifyContent: 'space-between',
              }}>
              <Button
                compact
                mode="contained"
                color={Colors.textColor1}
                onPress={() => this.openImageGallery(1, 'odometerImageUri')}>
                Open gallery
              </Button>
              <Button
                compact
                mode="contained"
                color={Colors.textColor1}
                onPress={() => this.openImageGallery(2, 'odometerImageUri')}>
                Take Picture
              </Button>
            </View>

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Upload Photo of Fuel Guage{' '}
              <Text style={{color: Colors.red}}>*</Text>
            </Text>
            <View
              style={styles.addImageViewStyle}
              // onPress={() => this.openImageGallery('fuelGuageImageUri')}
            >
              {this.state.fuelGuageImageUri != null &&
              this.state.fuelGuageImageUri != '' ? (
                <Image
                  source={{uri: this.state.fuelGuageImageUri}}
                  style={styles.logoIcon}
                />
              ) : (
                <Image
                  source={require('../images/ic_add_camera.png')}
                  style={styles.logoIcon}
                />
              )}

              {this.state.fileName != '' ? (
                <Text numberOfLines={2} style={styles.uploadImageNameText}>
                  {this.state.fuelGuageImageName}
                </Text>
              ) : (
                <Text numberOfLines={1} style={styles.uploadPhotoText}>
                  Upload Photo of Fuel Guage
                </Text>
              )}
            </View>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                marginHorizontal: 40,
                justifyContent: 'space-between',
              }}>
              <Button
                compact
                mode="contained"
                color={Colors.textColor1}
                onPress={() => this.openImageGallery(1, 'fuelGuageImageUri')}>
                Open gallery
              </Button>
              <Button
                compact
                mode="contained"
                color={Colors.textColor1}
                onPress={() => this.openImageGallery(2, 'fuelGuageImageUri')}>
                Take Picture
              </Button>
            </View>

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Notes <Text style={{color: Colors.red}}>*</Text>
            </Text>
            <View style={styles.remarksStyle}>
              <TextInput
                style={styles.remarksTextStyle}
                autoCapitalize="none"
                multiline={true}
                placeholderTextColor={Colors.placeholderColor}
                // placeholder="Enter your remarks"
                value={this.state.notes}
                onChangeText={value => this.setState({notes: value})}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.approveButtonContainer}
                onPress={() => this.callAddReturnInVehicleValidation()}>
                <Text numberOfLines={1} style={styles.buttonText}>
                  Submit
                </Text>
              </TouchableOpacity>
              <View style={styles.boxGap} />

              <TouchableOpacity
                style={styles.cancelButtonContainer}
                onPress={() => this.onClickSubmitButton()}>
                <Text numberOfLines={1} style={styles.buttonText}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.splashScreenBgColor,
  },
  mainContainer: {
    flex: 1,
  },
  logoIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appbarContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  hambergerIcon: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  titleText: {
    fontSize: 22,
    // fontFamily: fontSelector("regular"),
    color: Colors.textColor1,
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
    fontWeight: 'bold',
  },
  bottomViewContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 10,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    paddingVertical: 10,
  },

  editTextContainer: {
    backgroundColor: Colors.editTextBgColor,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
  },
  emailIdEditTextStyle: {
    fontSize: 15,
    // fontFamily: fontSelector("regular"),
    color: Colors.black,
    flex: 1,
    paddingVertical: Platform.OS == 'ios' ? 16 : 12,
  },
  dropdownStyle: {
    fontSize: 15,
    // fontFamily: fontSelector("regular"),
    color: Colors.black,
    flex: 1,
  },
  headingTextStyle: {
    fontSize: 15,
    // fontFamily: fontSelector("regular"),
    color: Colors.black,
    paddingHorizontal: 50,
    marginTop: 10,
  },
  headingTextStyleThree: {
    fontSize: 16,
    // fontFamily: fontSelector("regular"),
    color: Colors.black,
    marginBottom: 5,
  },

  headingTextStyleTwo: {
    fontSize: 15,
    // fontFamily: fontSelector("regular"),
    color: Colors.black,
  },

  optionTextStyle: {
    fontSize: 12,
    // fontFamily: fontSelector("regular"),
    color: Colors.textColor2,
    // paddingHorizontal: 20,
  },
  buttonContainer: {
    backgroundColor: Colors.textColor1,
    borderRadius: 30,
    paddingVertical: 15,
    marginHorizontal: 30,
    marginTop: 25,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  buttonText: {
    fontSize: 15,
    // fontFamily: fontSelector("regular"),
    color: Colors.white,
    textAlign: 'center',
  },
  calenderIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  uploadPhotoText: {
    fontSize: 15,
    // fontFamily: fontSelector("regular"),
    color: Colors.textColor2,
  },
  uploadImageNameText: {
    fontSize: 11,
    // fontFamily: fontSelector("regular"),
    color: Colors.textColor2,
    paddingHorizontal: 15,
  },
  checkUncheckIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginStart: 20,
    marginEnd: 5,
  },
  addImageViewStyle: {
    borderColor: '#f1f1f1',
    borderWidth: 2,
    borderRadius: 10,
    height: 125,
    marginTop: 8,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  rowViewOptionStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 50,
  },
  buttonContainer: {
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 100,
    marginBottom: 20,
  },

  approveButtonContainer: {
    backgroundColor: Colors.textColor1,
    borderRadius: 30,
    paddingVertical: 13,
    flex: 1,
  },
  cancelButtonContainer: {
    backgroundColor: Colors.pink,
    borderRadius: 30,
    paddingVertical: 13,
    flex: 1,
  },
  boxGap: {
    width: 15,
  },
  dropdownIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginStart: 10,
  },

  dropdownContainer: {
    width: 150,
    // height: 150,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 8,
    elevation: 4,
    position: 'absolute',
    left: 0,
    top: 15,
    right: 0,
  },
  dropdownItemTextContainer: {
    paddingVertical: 15,
  },
  dropdownItemTextStyle: {
    fontSize: 11,
    // fontFamily: fontSelector("bold"),
    color: Colors.black,
    alignSelf: 'center',
  },
  divider: {
    backgroundColor: Colors.borderColor,
    height: 0.5,
  },
  remarksStyle: {
    backgroundColor: Colors.editTextBgColor,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 30,
    marginTop: 5,
    height: 100,
  },
  remarksTextStyle: {
    fontSize: 15,
    // fontFamily: fontSelector("regular"),
    color: Colors.black,
    flex: 1,
    textAlignVertical: 'top',
  },
  dropdown: {
    height: 60,
    flex: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.black,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: Colors.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  selectionListTextStyle: {
    fontSize: 13,
    color: Colors.black,
    // fontFamily: fontSelector("regular"),
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
});
