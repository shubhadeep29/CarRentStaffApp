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
import {TextInput as TextInputPaper} from 'react-native-paper';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import {Button, Checkbox, HelperText} from 'react-native-paper';

export default class AddRentOutVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      onProceed: false,
      showExtraData: false,
      item: props.route.params.item,
      paymentMethodList: props.route.params.paymentMethodList,
      companyList: props.route.params.companyList,
      driverListRentOut: props.route.params.driverListRentOut,
      carListRent: props.route.params.carListRent,
      isNetworkAvailable: true,
      deviceType: '1',
      driverId: '',
      driverName: '',
      carId: '',
      displayCarName: '',
      driver: '',
      car: '',
      odometerReading: '',
      basicExcess: '',
      ageExcess: '',
      overseasDLExcess: '',
      weeklyRent: '',
      bond: '',
      paymentMethod: '',
      isPaymentMethodDropdownVisible: false,
      referenceNumber: '',
      company: '',
      companyId: '',
      insurance_company: '',
      insurance_username: '',
      insurance_password: '',
      actual_bond_amount: '',
      expire: '',
      expireShow: new Date(),
      notes: '',
      rentOutId: '',
      paymentReferenceNo: '',
      bondReferenceNo: '',
      bondPaymentMethod: '',

      coverNoteImageUri: null,
      coverNoteImageName: '',
      coverNoteImageSize: '',
      coverNoteImageType: '',

      frontImageUri: null,
      frontImageName: '',
      frontImageSize: '',
      frontImageType: '',

      rearImageUri: null,
      rearImageName: '',
      rearImageSize: '',
      rearImageType: '',

      driverSideImageUri: null,
      driverSideImageName: '',
      driverSideImageSize: '',
      driverSideImageType: '',

      passengerSideImageUri: null,
      passengerSideImageName: '',
      passengerSideImageSize: '',
      passengerSideImageType: '',

      odometerImageUri: null,
      odometerImageName: '',
      odometerImageSize: '',
      odometerImageType: '',

      serviceStickerImageUri: null,
      serviceStickerImageName: '',
      serviceStickerImageSize: '',
      serviceStickerImageType: '',

      fuelGuageImageUri: null,
      fuelGuageImageName: '',
      fuelGuageImageSize: '',
      fuelGuageImageType: '',

      advantagePayCustomerId: '',
      countryData: [],
      driverDetailsData: {},
      driverFirstName: '',
      driverLastName: '',
      driverCustomerReference: '',
      driverEmail: '',
      driverCountryCode: '',
      driverMobile: '',
      totalBondHeld: '',

      sendPaymentReceiptEmails: true,
      sendDirectDebitErrorEmails: true,
      driverOutstandingNotification: true,

      directDebitDescription: '',
      directDebitUpfrontAmount: '',
      directDebitUpfrontDate: '',
      directDebitUpfrontDateShow: new Date(),
      isDisplayDirectDebitUpfrontDate: false,
      directDebitRecurringAmount: '',
      directDebitFrequencyData: [
        {
          key: 'Weekly',
          value: 'weekly',
        },
        {
          key: 'Fortnightly',
          value: 'fortnightly',
        },
        {
          key: 'Monthly',
          value: 'monthly',
        },
        {
          key: 'Quarterly',
          value: 'quarterly',
        },
      ],
      directDebitFrequency: '',
      directDebitRecurringStartDate: '',
      directDebitRecurringStartDateShow: new Date(),
      isDisplayDirectDebitRecurringStartDate: false,
      directDebitPaymentFailOptionsData: [
        {
          key: 'Pause',
          value: 'pause',
        },
        {
          key: 'Add to next instalment',
          value: 'next',
        },
        {
          key: 'Debit in 3 days',
          value: '3days',
        },
      ],
      directDebitPaymentFailOptions: 'pause',
      dishonor: true,
      perDebit: false,
      onChargedFees: [],
      carNo: '',
    };
  }

  setBondRefundDate = (event, selectedDate) => {
    console.log('selectedDate' + selectedDate);
    this.setState({
      isDisplayBondRefundDate: false,
      bondRefundDate:
        selectedDate.getDate() +
        '/' +
        (selectedDate.getMonth() + 1) +
        '/' +
        selectedDate.getFullYear(),
    });
  };
  setExpireDate = (event, selectedDate) => {
    this.setState({
      isDisplayExpireDate: false,
      expireShow: selectedDate,
      expire:
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
  showExpireDate = () => {
    this.setState({
      isDisplayExpireDate: true,
    });
  };

  componentDidMount = async () => {
    this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
    this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);

    this.callGetCountryCodeApi();

    if (this.state.item != null) {
      console.log('item ---- 123', this.state.item);
      this.setState({onProceed: true});
      if (
        this.state.item.front_img != null &&
        this.state.item.front_img != ''
      ) {
        this.setState({
          frontImageUri: Links.BASEURL + this.state.item.front_img,
        });
      }

      if (
        this.state.item.driver_side_img != null &&
        this.state.item.driver_side_img != ''
      ) {
        this.setState({
          driverSideImageUri: Links.BASEURL + this.state.item.driver_side_img,
        });
      }
      if (
        this.state.item.fuel_guage_img != null &&
        this.state.item.fuel_guage_img != ''
      ) {
        this.setState({
          fuelGuageImageUri: Links.BASEURL + this.state.item.fuel_guage_img,
        });
      }
      if (
        this.state.item.odometer_img != null &&
        this.state.item.odometer_img != ''
      ) {
        this.setState({
          odometerImageUri: Links.BASEURL + this.state.item.odometer_img,
        });
      }
      if (
        this.state.item.passenger_side_img != null &&
        this.state.item.passenger_side_img != ''
      ) {
        this.setState({
          passengerSideImageUri:
            Links.BASEURL + this.state.item.passenger_side_img,
        });
      }
      if (this.state.item.rear_img != null && this.state.item.rear_img != '') {
        this.setState({
          rearImageUri: Links.BASEURL + this.state.item.rear_img,
        });
      }
      if (
        this.state.item.service_sticker_img != null &&
        this.state.item.service_sticker_img != ''
      ) {
        this.setState({
          serviceStickerImageUri:
            Links.BASEURL + this.state.item.service_sticker_img,
        });
      }

      this.setState({
        driver_id: this.state.item.driver_id,
        driverName:
          this.state.item.first_name +
          ' ' +
          this.state.item.middle_name +
          ' ' +
          this.state.item.last_name,
        displayCarName:
          this.state.item.car_no +
          ' | ' +
          this.state.item.make +
          ' | ' +
          this.state.item.model,
        carNo: this.state.item.car_no,
        carId: this.state.item.car_id,
        ageExcess: this.state.item.age_excess,
        basicExcess: this.state.item.basic_excess,
        overseasDLExcess: this.state.item.overseas_dL_excess,
        bond: this.state.item.bond_amount,
        company: this.state.item.company_name,
        companyId: this.state.item.company_id,
        insurance_company: this.state.item.insurance_company,
        insurance_username: this.state.item.insurance_username,
        insurance_password: this.state.item.insurance_password,
        actual_bond_amount: this.state.item.actual_bond_amount,

        coverNoteImageUri: Links.BASEURL + this.state.item.cover_note_img,

        driverId: this.state.item.driver_id,
        odometerReading: this.state.item.odometer_reading,

        expire: this.state.item.expire,
        expireShow: Utils.getDate(this.state.item.expire),
        weeklyRent: this.state.item.weekly_rent,

        notes: this.state.item.notes,
        rentOutId: this.state.item.rent_out_id,
        paymentReferenceNo: this.state.item.payment_reference_no,
        bondReferenceNo: this.state.item.bond_reference_no,
        bondPaymentMethod: this.state.item.bond_payment_method,
        paymentMethod: this.state.item.payment_method,

        showExtraData:
          this.state.item.payment_method === 'Direct Debit' ? true : false,
      });
      if (this.state.item.payment_method === 'Direct Debit') {
        const advantage_pay_customer_response = JSON.parse(
          this.state.item.advantage_pay_customer_response,
        );
        const direct_debit_status_response = JSON.parse(
          this.state.item.direct_debit_status_response,
        );
        const dishonorIndex =
          direct_debit_status_response.OnchargedFees.findIndex(
            element => element === 'dishonour',
          );
        const perDebitIndex =
          direct_debit_status_response.OnchargedFees.findIndex(
            element => element === 'perdebit',
          );
        this.setState({
          advantagePayCustomerId: advantage_pay_customer_response.Code,
          driverFirstName: advantage_pay_customer_response.FirstName,
          driverLastName: advantage_pay_customer_response.LastName,
          driverCustomerReference: advantage_pay_customer_response.CustomRef,
          driverEmail: advantage_pay_customer_response.Email,
          driverCountryCode: this.state.item.country_code,
          driverMobile: this.state.item.mobile,

          directDebitDescription: direct_debit_status_response.Description,
          directDebitUpfrontAmount: direct_debit_status_response.UpfrontAmount
            ? direct_debit_status_response.UpfrontAmount.toString()
            : '0.00',
          directDebitUpfrontDate: direct_debit_status_response.UpfrontDate,
          directDebitUpfrontDateShow: Utils.getDate(
            direct_debit_status_response.UpfrontDate,
          ),
          directDebitRecurringAmount:
            direct_debit_status_response.RecurringAmount
              ? direct_debit_status_response.RecurringAmount.toString()
              : '0.00',
          directDebitRecurringStartDateShow: Utils.getDate(
            direct_debit_status_response.RecurringDateStart,
          ),
          directDebitRecurringStartDate:
            direct_debit_status_response.RecurringDateStart,
          directDebitFrequency: direct_debit_status_response.Frequency,
          directDebitPaymentFailOptions:
            direct_debit_status_response.FailureOption,

          onChargedFees: direct_debit_status_response.OnchargedFees,
          dishonor: dishonorIndex >= 0 ? true : false,
          perDebit: perDebitIndex >= 0 ? true : false,
        });
      }
    } else {
      // this.setState({
      //     driverId: this.state.driverListRentOut[0].driver_id,
      //     companyId: this.state.companyList[0].company_id,
      //     carId: this.state.carListRent[0].car_id,
      //     paymentMethod: this.state.paymentMethod[0],
      // })
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
  }

  async onValueChangeDriver(value) {
    this.setState({
      driverId: value,
    });
  }

  async onValueChangeCompany(value, company_name) {
    this.setState({
      company: company_name,
      companyId: value,
    });
    console.log('this.state.companyId', value);
  }

  async onValueChangePayment(value) {
    if (value === 'Direct Debit') {
      this.setState({
        showExtraData: true,
      });
    } else {
      this.setState({
        showExtraData: false,
      });
    }
    this.setState({
      paymentMethod: value,
    });
  }

  async onValueChangeBondPayment(value) {
    this.setState({
      bondPaymentMethod: value,
    });
    console.log('this.state.bondPaymentMethod', value);
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
  onClickCarDropdownItem(car) {
    this.setState({
      isCarDropdownVisible: false,
      car: car,
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

          if (openImageGalleryFor == 'coverNoteImageUri') {
            this.setState({
              resourcePath: res,
              coverNoteImageUri: res.assets[0].uri,
              coverNoteImageName: res.assets[0].fileName,
              coverNoteImageSize: res.assets[0].fileSize,
              coverNoteImageType: res.assets[0].type,
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
          } else if (openImageGalleryFor == 'serviceStickerImageUri') {
            this.setState({
              resourcePath: res,
              serviceStickerImageUri: res.assets[0].uri,
              serviceStickerImageName: res.assets[0].fileName,
              serviceStickerImageSize: res.assets[0].fileSize,
              serviceStickerImageType: res.assets[0].type,
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

          if (openImageGalleryFor == 'coverNoteImageUri') {
            this.setState({
              resourcePath: res,
              coverNoteImageUri: res.assets[0].uri,
              coverNoteImageName: res.assets[0].fileName,
              coverNoteImageSize: res.assets[0].fileSize,
              coverNoteImageType: res.assets[0].type,
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
          } else if (openImageGalleryFor == 'serviceStickerImageUri') {
            this.setState({
              resourcePath: res,
              serviceStickerImageUri: res.assets[0].uri,
              serviceStickerImageName: res.assets[0].fileName,
              serviceStickerImageSize: res.assets[0].fileSize,
              serviceStickerImageType: res.assets[0].type,
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
    Keyboard.dismiss();
    if (this.state.driverId == '') {
      Toast.show('Please enter Driver', Toast.SHORT);
    } else if (this.state.odometerReading == '') {
      Toast.show('Please enter Odometer Reading', Toast.SHORT);
    } else if (this.state.weeklyRent == '') {
      Toast.show('Please enter Weekly Rent', Toast.SHORT);
    } else if (this.state.paymentMethod == '') {
      Toast.show('Please enter Payment Method', Toast.SHORT);
    } else if (this.state.insurance_company === '') {
      Toast.show('Please enter Company Name', Toast.SHORT);
    } else if (this.state.insurance_username === '') {
      Toast.show('Please enter insurance username', Toast.SHORT);
    } else if (this.state.bondPaymentMethod === '') {
      Toast.show('Please select bond payment method', Toast.SHORT);
    } else if (this.state.insurance_password === '') {
      Toast.show('Please enter insurance password', Toast.SHORT);
    } else if (this.state.expire == '') {
      Toast.show('Please enter expire', Toast.SHORT);
    } else if (
      this.state.coverNoteImageName === '' &&
      this.state.item === null
    ) {
      Toast.show('Select cover note image', Toast.SHORT);
    } else if (this.state.frontImageName === '' && this.state.item === null) {
      Toast.show('Select front image', Toast.SHORT);
    } else if (this.state.rearImageName === '' && this.state.item === null) {
      Toast.show('Select rear image', Toast.SHORT);
    } else if (
      this.state.driverSideImageName === '' &&
      this.state.item === null
    ) {
      Toast.show('Select driver side image', Toast.SHORT);
    } else if (
      this.state.paymentMethod === 'Direct Debit' &&
      this.state.item === null &&
      this.state.driverCountryCode === ''
    ) {
      Toast.show('Select country code', Toast.SHORT);
    } else if (
      this.state.passengerSideImageName === '' &&
      this.state.item === null
    ) {
      Toast.show('Select passenger side image', Toast.SHORT);
    } else if (
      this.state.odometerImageName === '' &&
      this.state.item === null
    ) {
      Toast.show('Select odometer image', Toast.SHORT);
    } else if (
      this.state.serviceStickerImageName === '' &&
      this.state.item === null
    ) {
      Toast.show('Select service sticker image', Toast.SHORT);
    } else if (
      this.state.fuelGuageImageName === '' &&
      this.state.item === null
    ) {
      Toast.show('Select fuel guage image', Toast.SHORT);
    } else {
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
    console.log(
      "this.state.carId + '$#' + this.state.carNo ----",
      this.state.carId + '$#' + this.state.carNo,
    );
    this.setState({isLoading: true});
    var formData = new FormData();
    formData.append('token_key', this.apiKey);
    formData.append('device_type', this.state.deviceType);
    formData.append('user_id', this.userId);
    formData.append('driver_id', this.state.driverId);
    formData.append('car_id', this.state.carId + '$#' + this.state.carNo);
    formData.append('odometer_reading', this.state.odometerReading);
    formData.append('basic_excess', this.state.basicExcess);
    formData.append('age_excess', this.state.ageExcess);
    formData.append('overseas_dL_excess', this.state.overseasDLExcess);
    formData.append('weekly_rent', this.state.weeklyRent);
    formData.append('company_id', this.state.companyId);
    formData.append('insurance_company', this.state.insurance_company);
    formData.append('insurance_username', this.state.insurance_username);
    formData.append('insurance_password', this.state.insurance_password);
    formData.append('expire', this.state.expire);
    formData.append('notes', this.state.notes);
    formData.append('payment_method', this.state.paymentMethod);

    if (
      this.state.paymentMethod === 'Direct Debit' &&
      this.state.item === null
    ) {
      formData.append('FirstName', this.state.driverFirstName);
      formData.append('LastName', this.state.driverLastName);
      formData.append('CustomRef', this.state.driverCustomerReference);
      formData.append('Email', this.state.driverEmail);
      formData.append('CountryISO', this.state.driverCountryCode);
      formData.append('Number', this.state.driverMobile);
      formData.append(
        'SendDirectDebitErrorEmails',
        this.state.sendDirectDebitErrorEmails ? 1 : 0,
      );
      formData.append(
        'SendPaymentReceiptEmails',
        this.state.SendPaymentReceiptEmails ? 1 : 0,
      );
      formData.append('Description', this.state.directDebitDescription);
      formData.append('UpfrontAmount', this.state.directDebitUpfrontAmount);
      formData.append('UpfrontDate', this.state.directDebitUpfrontDate);
      formData.append(
        'RecurringDateStart',
        this.state.directDebitRecurringStartDate,
      );
      formData.append('Frequency', this.state.directDebitFrequency);
      formData.append(
        'FailureOption',
        this.state.directDebitPaymentFailOptions,
      );
      let onChargedFees = [];
      if (this.state.dishonor) {
        onChargedFees.push('dishonour');
      }
      if (this.state.perDebit) {
        onChargedFees.push('perdebit');
      }
      formData.append('OnchargedFees', onChargedFees);
    }

    formData.append('payment_reference_no', this.state.paymentReferenceNo);
    formData.append('bond_amount', this.state.bond);
    formData.append('bond_payment_method', this.state.bondPaymentMethod);
    formData.append('bond_reference_no', this.state.bondReferenceNo);
    if (this.state.item != null) {
      formData.append('rent_out_id', this.state.rentOutId);
    }

    if (this.state.coverNoteImageName != '') {
      formData.append('cover_note_img', {
        uri:
          Platform.OS === 'ios'
            ? this.state.coverNoteImageUri.replace('file://', '')
            : this.state.coverNoteImageUri,
        name: this.state.coverNoteImageName,
        type: this.state.coverNoteImageType,
      });
    }
    if (this.state.frontImageName != '') {
      formData.append('front_img', {
        uri:
          Platform.OS === 'ios'
            ? this.state.frontImageUri.replace('file://', '')
            : this.state.frontImageUri,
        name: this.state.frontImageName,
        type: this.state.frontImageType,
      });
    }

    if (this.state.rearImageName != '') {
      formData.append('rear_img', {
        uri:
          Platform.OS === 'ios'
            ? this.state.rearImageUri.replace('file://', '')
            : this.state.rearImageUri,
        name: this.state.rearImageName,
        type: this.state.rearImageType,
      });
    }

    if (this.state.driverSideImageName != '') {
      formData.append('driver_side_img', {
        uri:
          Platform.OS === 'ios'
            ? this.state.driverSideImageUri.replace('file://', '')
            : this.state.driverSideImageUri,
        name: this.state.driverSideImageName,
        type: this.state.driverSideImageType,
      });
    }

    if (this.state.passengerSideImageName != '') {
      formData.append('passenger_side_img', {
        uri:
          Platform.OS === 'ios'
            ? this.state.passengerSideImageUri.replace('file://', '')
            : this.state.passengerSideImageUri,
        name: this.state.passengerSideImageName,
        type: this.state.passengerSideImageType,
      });
    }
    if (this.state.serviceStickerImageName != '') {
      formData.append('service_sticker_img', {
        uri:
          Platform.OS === 'ios'
            ? this.state.serviceStickerImageUri.replace('file://', '')
            : this.state.serviceStickerImageUri,
        name: this.state.serviceStickerImageName,
        type: this.state.serviceStickerImageType,
      });
    }
    if (this.state.odometerImageName != '') {
      formData.append('odometer_img', {
        uri:
          Platform.OS === 'ios'
            ? this.state.odometerImageUri.replace('file://', '')
            : this.state.odometerImageUri,
        name: this.state.odometerImageName,
        type: this.state.odometerImageType,
      });
    }
    if (this.state.fuelGuageImageName != '') {
      formData.append('fuel_guage_img', {
        uri:
          Platform.OS === 'ios'
            ? this.state.fuelGuageImageUri.replace('file://', '')
            : this.state.fuelGuageImageUri,
        name: this.state.fuelGuageImageName,
        type: this.state.fuelGuageImageType,
      });
    }

    try {
      res = null;
      if (this.state.item == null) {
        console.log(
          'Call Add Return Out Vehicle API ========>  ',
          JSON.stringify(formData),
        );
        res = await fetch(Links.ADD_NEW_RENT_OUT, {
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
          'Call Edit Return Out Vehicle API ========>  ',
          JSON.stringify(formData),
        );
        res = await fetch(Links.EDIT_RENT_OUT, {
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
        'Car Add/Edit Return Out Vehicle Response ===========>  ',
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
      this.setState({isLoading: false});
      Toast.show('something went wrong', Toast.SHORT);
      console.log('Exception in API call: ' + error);
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

  renderCar = item => {
    return (
      <View>
        <Text style={styles.selectionListTextStyle}>{item.concat_car_no}</Text>
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
  renderList = item => {
    return (
      <View>
        <Text style={styles.selectionListTextStyle}>{item.key}</Text>
      </View>
    );
  };
  renderCountry = item => {
    return (
      <View>
        <Text style={styles.selectionListTextStyle}>
          {item.concat_contry_code}
        </Text>
      </View>
    );
  };
  onProceed = () => {
    if (!this.state.driverId || !this.state.carId) {
      Utils.showMessageAlert('Please select Driver and Car first!');
      return;
    }

    this.getDriverDetails();
  };

  getDriverDetails() {
    this.setState({isLoading: true});
    try {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          this.callGetDriverDetailsApi();
          this.callGetCountryCodeApi();
        } else {
          Utils.showMessageAlert('No internet connection');
        }
      });
    } catch (error) {
      console.log('Error in api call : ' + error);
    }
  }

  callGetDriverDetailsApi = async () => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: Platform.OS === 'android' ? 1 : 2,
      user_id: this.userId,
      token_key: this.apiKey,
      driver_id: this.state.driverId,
      car_id: this.state.carId,
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
      const res = await fetch(Links.getDriverDetailsRentOut, {
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
          if (responseJSON.driver_details.advantage_pay_customer_id) {
            const advantage_pay_customer_response = JSON.parse(
              responseJSON.driver_details.advantage_pay_customer_response,
            );
            this.setState({
              advantagePayCustomerId:
                response.driver_details.advantage_pay_customer_id,
              driverFirstName: advantage_pay_customer_response.FirstName,
              driverLastName: advantage_pay_customer_response.LastName,
              driverCustomerReference:
                advantage_pay_customer_response.CustomRef,
              driverEmail: advantage_pay_customer_response.Email,
            });
          } else {
            this.setState({
              advantagePayCustomerId: '',
              driverFirstName: responseJSON.driver_details.first_name,
              driverLastName: responseJSON.driver_details.last_name,
              driverCustomerReference: responseJSON.car_details.car_no,
              driverEmail: responseJSON.driver_details.email,
            });
          }
          this.setState({
            driverCountryCode: responseJSON.driver_details.country_code,
            driverMobile: responseJSON.driver_details.mobile,
            totalBondHeld: responseJSON.driver_details.actual_bond_amount,
            actual_bond_amount: responseJSON.actual_bond_amount
              ? responseJSON.actual_bond_amount.toString()
              : '0.00',
          });
          this.onValueChangePayment('Direct Debit');
          this.setState({onProceed: true});
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

  callGetCountryCodeApi = async () => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: Platform.OS === 'android' ? 1 : 2,
      user_id: this.userId,
      token_key: this.apiKey,
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
      const res = await fetch(Links.getCountryList, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();
      this.state.data = [];
      // console.log(
      //   'getCountryList Response 123 ===========>  ',
      //   // JSON.stringify(responseJSON),
      // );
      if (responseJSON) {
        this.setState({isLoading: false});
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          if (
            responseJSON.hasOwnProperty('country_list') &&
            responseJSON.country_list != null
          ) {
            this.setState({countryData: responseJSON.country_list});
          }
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

  setDirectDebitRecurringStartDate = (event, selectedDate) => {
    this.setState({
      isDisplayDirectDebitRecurringStartDate: false,
      directDebitRecurringStartDateShow: selectedDate,
      directDebitRecurringStartDate:
        selectedDate.getDate() +
        '/' +
        (selectedDate.getMonth() + 1) +
        '/' +
        selectedDate.getFullYear(),
    });
  };
  showDirectDebitRecurringStartDate = () => {
    this.setState({
      isDisplayDirectDebitRecurringStartDate: true,
    });
  };
  setDirectDebitUpfrontDate = (event, selectedDate) => {
    this.setState({
      isDisplayDirectDebitUpfrontDate: false,
      directDebitUpfrontDateShow: selectedDate,
      directDebitUpfrontDate:
        selectedDate.getDate() +
        '/' +
        (selectedDate.getMonth() + 1) +
        '/' +
        selectedDate.getFullYear(),
    });
  };
  showDirectDebitUpfrontDate = () => {
    this.setState({
      isDisplayDirectDebitUpfrontDate: true,
    });
  };

  render() {
    console.log(
      'this.state.directDebitUpfrontDate ----',
      this.state.directDebitUpfrontDate,
    );
    return (
      <SafeAreaView style={styles.container}>
        {this.state.isLoading && <LoaderView />}
        {this.state.item != null ? (
          <CommonAppBar
            title="Edit Rent Out Vehicle"
            navigation={this.props.navigation}
          />
        ) : (
          <CommonAppBar
            title="Add Rent Out Vehicle"
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
                  placeholder="Select Driver"
                  // maxHeight={300}
                  labelField="concat_driver_name"
                  valueField="driver_id"
                  value={this.state.driverId}
                  onChange={item => {
                    this.onValueChangeDriver(item.driver_id);
                    this.setState({onProceed: false});
                  }}
                  renderItem={this.renderDriver}
                />
              ) : (
                <TextInput
                  style={styles.emailIdEditTextStyle}
                  autoCapitalize="none"
                  multiline={false}
                  editable={false}
                  placeholderTextColor={Colors.placeholderColor}
                  // placeholder="Email Id"
                  value={this.state.driverName}
                />
              )}
            </View>

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Car <Text style={{color: Colors.red}}>*</Text>
            </Text>
            <View style={styles.editTextContainer}>
              {this.state.item === null ? (
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={this.state.carListRent}
                  placeholder="Select Car"
                  maxHeight={300}
                  labelField="concat_car_no"
                  valueField="car_id"
                  value={this.state.carId}
                  onChange={item => {
                    this.onValueChangeCar(item);
                    this.setState({onProceed: false});
                  }}
                  renderItem={this.renderCar}
                />
              ) : (
                <TextInput
                  style={styles.emailIdEditTextStyle}
                  autoCapitalize="none"
                  multiline={false}
                  editable={false}
                  placeholderTextColor={Colors.placeholderColor}
                  // placeholder="Email Id"
                  value={this.state.displayCarName}
                />
              )}
            </View>
            {this.state.onProceed ? (
              <View>
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
                    onChangeText={value =>
                      this.setState({odometerReading: value})
                    }
                    onSubmitEditing={() => {
                      this.damageAmountTextInput.focus();
                    }}
                    ref={input => {
                      this.odometerReadingTextInput = input;
                    }}
                    blurOnSubmit={false}
                  />
                </View>
                {this.state.driverDetailsData?.car_details
                  ?.total_odometer_reading ? (
                  <HelperText
                    type="info"
                    visible={true}
                    style={{paddingHorizontal: 50}}>
                    {this.state.driverDetailsData?.car_details
                      ?.total_odometer_reading
                      ? '(Last Odometer :: ' +
                        this.state.driverDetailsData?.car_details
                          ?.total_odometer_reading +
                        ')'
                      : ''}
                  </HelperText>
                ) : null}

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Basic Excess
                </Text>
                <View style={styles.editTextContainer}>
                  <TextInput
                    style={styles.emailIdEditTextStyle}
                    autoCapitalize="none"
                    multiline={false}
                    placeholderTextColor={Colors.placeholderColor}
                    // placeholder="Email Id"
                    value={this.state.basicExcess}
                    onChangeText={value => this.setState({basicExcess: value})}
                    onSubmitEditing={() => {
                      this.yearTextInput.focus();
                    }}
                    ref={input => {
                      this.basicExcessTextInput = input;
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Age Excess
                </Text>
                <View style={styles.editTextContainer}>
                  <TextInput
                    style={styles.emailIdEditTextStyle}
                    autoCapitalize="none"
                    multiline={false}
                    placeholderTextColor={Colors.placeholderColor}
                    // placeholder="Email Id"
                    value={this.state.ageExcess}
                    onChangeText={value => this.setState({ageExcess: value})}
                    onSubmitEditing={() => {
                      this.yearTextInput.focus();
                    }}
                    ref={input => {
                      this.ageExcessTextInput = input;
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <Text style={styles.headingTextStyle}>
                  Overseas DL / Less Than 2yrs Local DL Excess
                </Text>
                <View style={styles.editTextContainer}>
                  <TextInput
                    style={styles.emailIdEditTextStyle}
                    autoCapitalize="none"
                    multiline={false}
                    placeholderTextColor={Colors.placeholderColor}
                    // placeholder="Email Id"
                    value={this.state.overseasDLExcess}
                    onChangeText={value =>
                      this.setState({overseasDLExcess: value})
                    }
                    onSubmitEditing={() => {
                      this.yearTextInput.focus();
                    }}
                    ref={input => {
                      this.overseasDLExcessTextInput = input;
                    }}
                    blurOnSubmit={false}
                  />
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Weekly Rent <Text style={{color: Colors.red}}>*</Text>
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
                    value={this.state.weeklyRent}
                    onChangeText={value => {
                      this.setState({
                        weeklyRent: value,
                        directDebitRecurringAmount: value,
                      });
                    }}
                    onSubmitEditing={() => {
                      this.yearTextInput.focus();
                    }}
                    ref={input => {
                      this.weeklyRentTextInput = input;
                    }}
                    blurOnSubmit={false}
                    keyboardType="decimal-pad"
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
                    data={this.state.paymentMethodList}
                    placeholder="Select Payment Method"
                    maxHeight={300}
                    labelField="value"
                    valueField="value"
                    value={this.state.paymentMethod}
                    onChange={item => {
                      this.onValueChangePayment(item.value);
                    }}
                    renderItem={this.renderPayment}
                    disable={this.state.item !== null}
                  />
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Payment Reference No
                </Text>
                <View style={styles.editTextContainer}>
                  <TextInput
                    style={styles.emailIdEditTextStyle}
                    autoCapitalize="none"
                    multiline={false}
                    placeholderTextColor={Colors.placeholderColor}
                    // placeholder="Email Id"
                    value={this.state.paymentReferenceNo}
                    onChangeText={value =>
                      this.setState({paymentReferenceNo: value})
                    }
                    blurOnSubmit={false}
                    editable={this.state.item === null}
                  />
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Total Bond Held
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
                    value={this.state.actual_bond_amount}
                    onChangeText={value =>
                      this.setState({actual_bond_amount: value})
                    }
                    onSubmitEditing={() => {
                      this.yearTextInput.focus();
                    }}
                    ref={input => {
                      this.bondTextInput = input;
                    }}
                    blurOnSubmit={false}
                    editable={false}
                    keyboardType="decimal-pad"
                  />
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Bond
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
                    value={this.state.bond}
                    onChangeText={value => this.setState({bond: value})}
                    onSubmitEditing={() => {
                      this.yearTextInput.focus();
                    }}
                    ref={input => {
                      this.bondTextInput = input;
                    }}
                    blurOnSubmit={false}
                    editable={this.state.item === null}
                    keyboardType="decimal-pad"
                  />
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Bond Payment Method <Text style={{color: Colors.red}}>*</Text>
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
                    placeholder="Select Bond Payment Method"
                    maxHeight={300}
                    labelField="value"
                    valueField="value"
                    value={this.state.bondPaymentMethod}
                    onChange={item => {
                      this.onValueChangeBondPayment(item.value);
                    }}
                    renderItem={this.renderPayment}
                    disable={this.state.item !== null}
                  />
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Bond Reference Number
                </Text>
                <View style={styles.editTextContainer}>
                  <TextInput
                    style={styles.emailIdEditTextStyle}
                    autoCapitalize="none"
                    multiline={false}
                    placeholderTextColor={Colors.placeholderColor}
                    // placeholder="Email Id"
                    value={this.state.bondReferenceNo}
                    onChangeText={value =>
                      this.setState({bondReferenceNo: value})
                    }
                    blurOnSubmit={false}
                    editable={this.state.item === null}
                  />
                </View>

                {this.state.showExtraData ? (
                  <View>
                    <>
                      <View
                        style={{
                          marginTop: 20,
                          borderBottomColor: 'black',
                          borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                      />
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.headingTextStyleThree,
                          {padding: 10, color: Colors.textColor1},
                        ]}>
                        Direct Debit Customer Details
                      </Text>
                      {this.state.advantagePayCustomerId ? (
                        <Text
                          style={[
                            styles.headingTextStyleThree,
                            {
                              padding: 10,
                              color: Colors.textColor1,
                              marginTop: -20,
                            },
                          ]}>
                          (Advantage Pay Customer ID :{' '}
                          {this.state.advantagePayCustomerId} )
                        </Text>
                      ) : null}

                      <View
                        style={{
                          borderBottomColor: 'black',
                          borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                      />
                      <Text numberOfLines={1} style={styles.headingTextStyle}>
                        First Name <Text style={{color: Colors.red}}>*</Text>
                      </Text>
                      <View style={styles.editTextContainer}>
                        <TextInput
                          style={styles.emailIdEditTextStyle}
                          autoCapitalize="none"
                          multiline={false}
                          placeholderTextColor={Colors.placeholderColor}
                          // placeholder="Email Id"
                          value={this.state.driverFirstName}
                          onChangeText={value =>
                            this.setState({driverFirstName: value})
                          }
                          blurOnSubmit={false}
                          editable={this.state.item === null}
                        />
                      </View>
                      <Text numberOfLines={1} style={styles.headingTextStyle}>
                        Last Name <Text style={{color: Colors.red}}>*</Text>
                      </Text>
                      <View style={styles.editTextContainer}>
                        <TextInput
                          style={styles.emailIdEditTextStyle}
                          autoCapitalize="none"
                          multiline={false}
                          placeholderTextColor={Colors.placeholderColor}
                          // placeholder="Email Id"
                          value={this.state.driverLastName}
                          onChangeText={value =>
                            this.setState({driverLastName: value})
                          }
                          blurOnSubmit={false}
                          editable={this.state.item === null}
                        />
                      </View>
                      <Text numberOfLines={1} style={styles.headingTextStyle}>
                        Customer Reference{' '}
                        <Text style={{color: Colors.red}}>*</Text>
                      </Text>
                      <View style={styles.editTextContainer}>
                        <TextInput
                          style={styles.emailIdEditTextStyle}
                          autoCapitalize="none"
                          multiline={false}
                          placeholderTextColor={Colors.placeholderColor}
                          // placeholder="Email Id"
                          value={this.state.driverCustomerReference}
                          onChangeText={value =>
                            this.setState({driverCustomerReference: value})
                          }
                          blurOnSubmit={false}
                          editable={this.state.item === null}
                        />
                      </View>
                      <Text numberOfLines={1} style={styles.headingTextStyle}>
                        Email <Text style={{color: Colors.red}}>*</Text>
                      </Text>
                      <View style={styles.editTextContainer}>
                        <TextInput
                          style={styles.emailIdEditTextStyle}
                          autoCapitalize="none"
                          multiline={false}
                          placeholderTextColor={Colors.placeholderColor}
                          // placeholder="Email Id"
                          value={this.state.driverEmail}
                          onChangeText={value =>
                            this.setState({driverEmail: value})
                          }
                          blurOnSubmit={false}
                          editable={this.state.item === null}
                        />
                      </View>
                      <Text numberOfLines={1} style={styles.headingTextStyle}>
                        Country Code <Text style={{color: Colors.red}}>*</Text>
                      </Text>
                      <View style={styles.editTextContainer}>
                        <Dropdown
                          style={styles.dropdown}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={this.state.countryData}
                          placeholder="Select Country Code"
                          maxHeight={300}
                          labelField="concat_contry_code"
                          valueField="iso"
                          value={this.state.driverCountryCode}
                          onChange={item => {
                            this.setState({
                              driverCountryCode: item.iso,
                            });
                          }}
                          renderItem={this.renderCountry}
                          disable={this.state.item !== null}
                        />
                      </View>
                      <Text numberOfLines={1} style={styles.headingTextStyle}>
                        Mobile <Text style={{color: Colors.red}}>*</Text>
                      </Text>
                      <View style={styles.editTextContainer}>
                        <TextInput
                          style={styles.emailIdEditTextStyle}
                          autoCapitalize="none"
                          multiline={false}
                          placeholderTextColor={Colors.placeholderColor}
                          // placeholder="Email Id"
                          value={this.state.driverMobile}
                          onChangeText={value =>
                            this.setState({driverMobile: value})
                          }
                          blurOnSubmit={false}
                          editable={this.state.item === null}
                        />
                      </View>
                    </>

                    <>
                      <View
                        style={{
                          marginTop: 20,
                          borderBottomColor: 'black',
                          borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                      />
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.headingTextStyleThree,
                          {padding: 10, color: Colors.textColor1},
                        ]}>
                        Email Notifications
                      </Text>
                      <View
                        style={{
                          borderBottomColor: 'black',
                          borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                      />
                      <Text
                        style={[
                          styles.headingTextStyleTwo,
                          {marginTop: 10, paddingHorizontal: 50},
                        ]}>
                        Send when a payment has been processed
                      </Text>
                      <View style={styles.rowViewOptionStyle}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({
                              sendPaymentReceiptEmails: true,
                              // isHybridNo: false,
                            })
                          }>
                          <Image
                            source={
                              this.state.sendPaymentReceiptEmails
                                ? require('../images/ic_radio_check.png')
                                : require('../images/ic_radio_uncheck.png')
                            }
                            style={styles.checkUncheckIcon}
                          />
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={styles.optionTextStyle}>
                          On
                        </Text>

                        <TouchableOpacity
                          disabled
                          onPress={() =>
                            this.setState({
                              sendPaymentReceiptEmails: false,
                              // isHybridNo: true,
                            })
                          }>
                          <Image
                            source={
                              !this.state.sendPaymentReceiptEmails
                                ? require('../images/ic_radio_check.png')
                                : require('../images/ic_radio_uncheck.png')
                            }
                            style={styles.checkUncheckIcon}
                          />
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={styles.optionTextStyle}>
                          Off
                        </Text>
                      </View>

                      <Text
                        style={[
                          styles.headingTextStyleTwo,
                          {marginTop: 25, paddingHorizontal: 50},
                        ]}>
                        Send when a direct debit payment fails
                      </Text>
                      <View style={styles.rowViewOptionStyle}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({
                              sendDirectDebitErrorEmails: true,
                              // isHybridNo: false,
                            })
                          }>
                          <Image
                            source={
                              this.state.sendDirectDebitErrorEmails
                                ? require('../images/ic_radio_check.png')
                                : require('../images/ic_radio_uncheck.png')
                            }
                            style={styles.checkUncheckIcon}
                          />
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={styles.optionTextStyle}>
                          On
                        </Text>

                        <TouchableOpacity
                          disabled
                          onPress={() =>
                            this.setState({
                              sendDirectDebitErrorEmails: false,
                              // isHybridNo: true,
                            })
                          }>
                          <Image
                            source={
                              !this.state.sendDirectDebitErrorEmails
                                ? require('../images/ic_radio_check.png')
                                : require('../images/ic_radio_uncheck.png')
                            }
                            style={styles.checkUncheckIcon}
                          />
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={styles.optionTextStyle}>
                          Off
                        </Text>
                      </View>

                      <Text
                        style={[
                          styles.headingTextStyleTwo,
                          {marginTop: 25, paddingHorizontal: 50},
                        ]}>
                        Send reminders for outstanding debit authorizations or
                        payment requests
                      </Text>
                      <View style={styles.rowViewOptionStyle}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({
                              isHybridYes: true,
                              // isHybridNo: false,
                            })
                          }>
                          <Image
                            source={
                              true
                                ? require('../images/ic_radio_check.png')
                                : require('../images/ic_radio_uncheck.png')
                            }
                            style={styles.checkUncheckIcon}
                          />
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={styles.optionTextStyle}>
                          On
                        </Text>

                        <TouchableOpacity
                          disabled
                          onPress={() =>
                            this.setState({
                              isHybridYes: false,
                              // isHybridNo: true,
                            })
                          }>
                          <Image
                            source={
                              false
                                ? require('../images/ic_radio_check.png')
                                : require('../images/ic_radio_uncheck.png')
                            }
                            style={styles.checkUncheckIcon}
                          />
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={styles.optionTextStyle}>
                          Off
                        </Text>
                      </View>
                    </>

                    <>
                      <View
                        style={{
                          marginTop: 20,
                          borderBottomColor: 'black',
                          borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                      />
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.headingTextStyleThree,
                          {padding: 10, color: Colors.textColor1},
                        ]}>
                        Create a Direct Debit
                      </Text>
                      <View
                        style={{
                          borderBottomColor: 'black',
                          borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                      />
                      <Text numberOfLines={1} style={styles.headingTextStyle}>
                        Description <Text style={{color: Colors.red}}>*</Text>
                      </Text>
                      <View style={styles.editTextContainer}>
                        <TextInput
                          style={styles.emailIdEditTextStyle}
                          autoCapitalize="none"
                          multiline={false}
                          placeholderTextColor={Colors.placeholderColor}
                          // placeholder="Email Id"
                          value={this.state.directDebitDescription}
                          onChangeText={value =>
                            this.setState({directDebitDescription: value})
                          }
                          blurOnSubmit={false}
                          editable={this.state.item === null}
                        />
                      </View>
                      <Text numberOfLines={1} style={styles.headingTextStyle}>
                        Upfront Amount
                      </Text>
                      <View style={styles.editTextContainer}>
                        <TextInput
                          style={styles.emailIdEditTextStyle}
                          autoCapitalize="none"
                          multiline={false}
                          placeholderTextColor={Colors.placeholderColor}
                          // placeholder="Email Id"
                          value={this.state.directDebitUpfrontAmount}
                          onChangeText={value =>
                            this.setState({directDebitUpfrontAmount: value})
                          }
                          blurOnSubmit={false}
                          editable={this.state.item === null}
                        />
                      </View>
                      <Text numberOfLines={1} style={styles.headingTextStyle}>
                        Upfront Date
                      </Text>
                      <TouchableOpacity
                        disabled={this.state.item !== null}
                        onPress={this.showDirectDebitUpfrontDate}>
                        <View style={styles.editTextContainer}>
                          <TextInput
                            style={styles.emailIdEditTextStyle}
                            autoCapitalize="none"
                            multiline={false}
                            editable={false}
                            placeholderTextColor={Colors.placeholderColor}
                            placeholder="DD/MM/YYYY"
                            value={this.state.directDebitUpfrontDate}
                            onChangeText={value =>
                              this.setState({directDebitUpfrontDate: value})
                            }
                            onSubmitEditing={() => {
                              this.rentOutNoTextInput.focus();
                            }}
                            ref={input => {
                              this.expireTextInput = input;
                            }}
                            blurOnSubmit={false}
                          />

                          <Image
                            source={require('../images/calendar.png')}
                            style={styles.calenderIcon}
                          />
                        </View>
                      </TouchableOpacity>
                      <HelperText
                        type="error"
                        visible={true}
                        style={{paddingHorizontal: 50}}>
                        (For hassle free operation please select 7 days future
                        date)
                      </HelperText>
                      {this.state.isDisplayDirectDebitUpfrontDate && (
                        <DateTimePicker
                          testID="dateTimePicker1"
                          value={this.state.directDebitUpfrontDateShow}
                          mode="date"
                          minimumDate={
                            this.state.item != null
                              ? this.state.directDebitUpfrontDateShow
                              : new Date()
                          }
                          display={
                            Platform.OS == 'android' ? 'calendar' : 'spinner'
                          }
                          onChange={this.setDirectDebitUpfrontDate}
                        />
                      )}
                      <Text numberOfLines={1} style={styles.headingTextStyle}>
                        Recurring Amount{' '}
                        <Text style={{color: Colors.red}}>*</Text>
                      </Text>
                      <View style={styles.editTextContainer}>
                        <TextInput
                          style={styles.emailIdEditTextStyle}
                          autoCapitalize="none"
                          multiline={false}
                          placeholderTextColor={Colors.placeholderColor}
                          // placeholder="Email Id"
                          value={this.state.directDebitRecurringAmount}
                          // onChangeText={value =>
                          //   this.setState({directDebitRecurringAmount: value})
                          // }
                          blurOnSubmit={false}
                          editable={false}
                        />
                      </View>
                      <Text numberOfLines={1} style={styles.headingTextStyle}>
                        Frequency <Text style={{color: Colors.red}}>*</Text>
                      </Text>

                      <View style={styles.editTextContainer}>
                        <Dropdown
                          style={styles.dropdown}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={this.state.directDebitFrequencyData}
                          placeholder="Select Frequency"
                          maxHeight={300}
                          labelField="key"
                          valueField="value"
                          value={this.state.directDebitFrequency}
                          onChange={item => {
                            this.setState({
                              directDebitFrequency: item.value,
                            });
                          }}
                          renderItem={this.renderList}
                          disable={this.state.item !== null}
                        />
                      </View>
                      <Text numberOfLines={1} style={styles.headingTextStyle}>
                        Recurring Start Date{' '}
                        <Text style={{color: Colors.red}}>*</Text>
                      </Text>
                      <TouchableOpacity
                        disabled={this.state.item !== null}
                        onPress={this.showDirectDebitRecurringStartDate}>
                        <View style={styles.editTextContainer}>
                          <TextInput
                            style={styles.emailIdEditTextStyle}
                            autoCapitalize="none"
                            multiline={false}
                            editable={false}
                            placeholderTextColor={Colors.placeholderColor}
                            placeholder="DD/MM/YYYY"
                            value={this.state.directDebitRecurringStartDate}
                            onChangeText={value =>
                              this.setState({
                                directDebitRecurringStartDate: value,
                              })
                            }
                            onSubmitEditing={() => {
                              this.rentOutNoTextInput.focus();
                            }}
                            ref={input => {
                              this.expireTextInput = input;
                            }}
                            blurOnSubmit={false}
                          />

                          <Image
                            source={require('../images/calendar.png')}
                            style={styles.calenderIcon}
                          />
                        </View>
                      </TouchableOpacity>
                      <HelperText
                        type="error"
                        visible={true}
                        style={{paddingHorizontal: 50}}>
                        (For hassle free operation please select 7 days future
                        date)
                      </HelperText>
                      {this.state.isDisplayDirectDebitRecurringStartDate && (
                        <DateTimePicker
                          testID="dateTimePicker2"
                          value={this.state.directDebitRecurringStartDateShow}
                          mode="date"
                          minimumDate={
                            this.state.item != null
                              ? this.state.directDebitRecurringStartDateShow
                              : new Date()
                          }
                          display={
                            Platform.OS == 'android' ? 'calendar' : 'spinner'
                          }
                          onChange={this.setDirectDebitRecurringStartDate}
                        />
                      )}

                      <Text numberOfLines={1} style={styles.headingTextStyle}>
                        On-charged Fees
                      </Text>
                      <View
                        style={[
                          styles.rowViewOptionStyle,
                          {marginTop: 8, justifyContent: 'space-between'},
                        ]}>
                        <View style={{flexDirection: 'row'}}>
                          <Text numberOfLines={1} style={{color: 'black'}}>
                            Dishonor
                          </Text>
                          <TouchableOpacity
                            disabled={this.state.item !== null}
                            onPress={() =>
                              this.setState({
                                dishonor: !this.state.dishonor,
                                // isHybridNo: false,
                              })
                            }>
                            <Image
                              source={
                                this.state.dishonor
                                  ? require('../images/ic_radio_check.png')
                                  : require('../images/ic_radio_uncheck.png')
                              }
                              style={styles.checkUncheckIcon}
                            />
                          </TouchableOpacity>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                          <Text numberOfLines={1} style={{color: 'black'}}>
                            Per Debit
                          </Text>
                          <TouchableOpacity
                            disabled={this.state.item !== null}
                            onPress={() =>
                              this.setState({
                                perDebit: !this.state.perDebit,
                                // isHybridNo: true,
                              })
                            }>
                            <Image
                              source={
                                this.state.perDebit
                                  ? require('../images/ic_radio_check.png')
                                  : require('../images/ic_radio_uncheck.png')
                              }
                              style={styles.checkUncheckIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <Text numberOfLines={1} style={styles.headingTextStyle}>
                        When a Payment Fails...{' '}
                        <Text style={{color: Colors.red}}>*</Text>
                      </Text>

                      <View style={styles.editTextContainer}>
                        <Dropdown
                          style={styles.dropdown}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={this.state.directDebitPaymentFailOptionsData}
                          placeholder="Select"
                          maxHeight={300}
                          labelField="key"
                          valueField="value"
                          value={this.state.directDebitPaymentFailOptions}
                          onChange={item => {
                            this.setState({
                              directDebitPaymentFailOptions: item.value,
                            });
                          }}
                          disable={this.state.item !== null}
                          renderItem={this.renderList}
                        />
                      </View>
                    </>
                  </View>
                ) : null}

                <View
                  style={{
                    marginTop: 20,
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.headingTextStyleThree,
                    {padding: 10, color: Colors.textColor1},
                  ]}>
                  Insurance Details
                </Text>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Insurance Company <Text style={{color: Colors.red}}>*</Text>
                </Text>

                <View style={styles.editTextContainer}>
                  <TextInput
                    style={styles.remarksTextStyle}
                    autoCapitalize="none"
                    multiline={true}
                    placeholderTextColor={Colors.placeholderColor}
                    // placeholder="Enter your remarks"
                    value={this.state.insurance_company}
                    onChangeText={value =>
                      this.setState({insurance_company: value})
                    }
                    blurOnSubmit={false}
                  />
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Expire <Text style={{color: Colors.red}}>*</Text>
                </Text>
                <TouchableOpacity onPress={this.showExpireDate}>
                  <View style={styles.editTextContainer}>
                    <TextInput
                      style={styles.emailIdEditTextStyle}
                      autoCapitalize="none"
                      multiline={false}
                      editable={false}
                      placeholderTextColor={Colors.placeholderColor}
                      placeholder="DD/MM/YYYY"
                      value={this.state.expire}
                      onChangeText={value => this.setState({expire: value})}
                      onSubmitEditing={() => {
                        this.rentOutNoTextInput.focus();
                      }}
                      ref={input => {
                        this.expireTextInput = input;
                      }}
                      blurOnSubmit={false}
                    />

                    <Image
                      source={require('../images/calendar.png')}
                      style={styles.calenderIcon}
                    />
                  </View>
                </TouchableOpacity>
                {this.state.isDisplayExpireDate && (
                  <DateTimePicker
                    testID="dateTimePicker3"
                    value={this.state.expireShow}
                    mode="date"
                    minimumDate={
                      this.state.item != null
                        ? this.state.expireShow
                        : new Date()
                    }
                    display={Platform.OS == 'android' ? 'calendar' : 'spinner'}
                    onChange={this.setExpireDate}
                  />
                )}
                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Insurance Username <Text style={{color: Colors.red}}>*</Text>
                </Text>

                <View style={styles.editTextContainer}>
                  <TextInput
                    style={styles.remarksTextStyle}
                    autoCapitalize="none"
                    multiline={true}
                    placeholderTextColor={Colors.placeholderColor}
                    // placeholder="Enter your remarks"
                    value={this.state.insurance_username}
                    onChangeText={value =>
                      this.setState({insurance_username: value})
                    }
                    blurOnSubmit={false}
                  />
                </View>
                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Insurance Password <Text style={{color: Colors.red}}>*</Text>
                </Text>

                <View style={styles.editTextContainer}>
                  <TextInput
                    style={styles.remarksTextStyle}
                    autoCapitalize="none"
                    multiline={true}
                    placeholderTextColor={Colors.placeholderColor}
                    // placeholder="Enter your remarks"
                    value={this.state.insurance_password}
                    onChangeText={value =>
                      this.setState({insurance_password: value})
                    }
                    blurOnSubmit={false}
                  />
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Upload photo of cover note{' '}
                  <Text style={{color: Colors.red}}>*</Text>
                </Text>
                <View
                  style={styles.addImageViewStyle}
                  // onPress={() => this.openImageGallery('coverNoteImageUri')}
                >
                  {this.state.coverNoteImageUri != null ? (
                    <Image
                      source={{uri: this.state.coverNoteImageUri}}
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
                      {this.state.coverNoteImageName}
                    </Text>
                  ) : (
                    <Text numberOfLines={1} style={styles.uploadPhotoText}>
                      Upload Photo of cover note
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
                      this.openImageGallery(1, 'coverNoteImageUri')
                    }>
                    Open gallery
                  </Button>
                  <Button
                    compact
                    mode="contained"
                    color={Colors.textColor1}
                    onPress={() =>
                      this.openImageGallery(2, 'coverNoteImageUri')
                    }>
                    Take Picture
                  </Button>
                </View>

                <View
                  style={{
                    marginTop: 20,
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.headingTextStyleThree,
                    {padding: 10, color: Colors.textColor1},
                  ]}>
                  Upload 7 pictures of car being issued{' '}
                  <Text style={{color: Colors.red}}>*</Text>
                </Text>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />

                <Text
                  numberOfLines={1}
                  style={[styles.headingTextStyle, {marginTop: 20}]}>
                  Upload Photo of Front{' '}
                  <Text style={{color: Colors.red}}>*</Text>
                </Text>
                <View
                  style={styles.addImageViewStyle}
                  // onPress={() => this.openImageGallery('frontImageUri')}
                >
                  {this.state.frontImageUri != null ? (
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
                  Upload Photo of Rear{' '}
                  <Text style={{color: Colors.red}}>*</Text>
                </Text>
                <View
                  style={styles.addImageViewStyle}
                  // onPress={() => this.openImageGallery('rearImageUri')}
                >
                  {this.state.rearImageUri != null ? (
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
                <TouchableOpacity
                  style={styles.addImageViewStyle}
                  // onPress={() => this.openImageGallery('driverSideImageUri')}
                >
                  {this.state.driverSideImageUri != null ? (
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
                </TouchableOpacity>
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
                      this.openImageGallery(1, 'driverSideImageUri')
                    }>
                    Open gallery
                  </Button>
                  <Button
                    compact
                    mode="contained"
                    color={Colors.textColor1}
                    onPress={() =>
                      this.openImageGallery(2, 'driverSideImageUri')
                    }>
                    Take Picture
                  </Button>
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Upload Photo of Passenger Side{' '}
                  <Text style={{color: Colors.red}}>*</Text>
                </Text>
                <View
                  style={styles.addImageViewStyle}
                  // onPress={() =>
                  //   this.openImageGallery('passengerSideImageUri')
                  // }
                >
                  {this.state.passengerSideImageUri != null ? (
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
                  {this.state.odometerImageUri != null ? (
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
                    onPress={() =>
                      this.openImageGallery(1, 'odometerImageUri')
                    }>
                    Open gallery
                  </Button>
                  <Button
                    compact
                    mode="contained"
                    color={Colors.textColor1}
                    onPress={() =>
                      this.openImageGallery(2, 'odometerImageUri')
                    }>
                    Take Picture
                  </Button>
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Upload Photo of Service Sticker{' '}
                  <Text style={{color: Colors.red}}>*</Text>
                </Text>
                <View
                  style={styles.addImageViewStyle}
                  // onPress={() =>
                  //   this.openImageGallery('serviceStickerImageUri')
                  // }
                >
                  {this.state.serviceStickerImageUri != null ? (
                    <Image
                      source={{uri: this.state.serviceStickerImageUri}}
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
                      {this.state.serviceStickerImageName}
                    </Text>
                  ) : (
                    <Text numberOfLines={1} style={styles.uploadPhotoText}>
                      Upload Photo of Service Sticker
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
                      this.openImageGallery(1, 'serviceStickerImageUri')
                    }>
                    Open gallery
                  </Button>
                  <Button
                    compact
                    mode="contained"
                    color={Colors.textColor1}
                    onPress={() =>
                      this.openImageGallery(2, 'serviceStickerImageUri')
                    }>
                    Take Picture
                  </Button>
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Upload Photo of Fuel Guage{' '}
                  <Text style={{color: Colors.red}}>*</Text>
                </Text>
                <View
                  style={styles.addImageViewStyle}
                  onPress={() => this.openImageGallery('fuelGuageImageUri')}>
                  {this.state.fuelGuageImageUri != null ? (
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
                    onPress={() =>
                      this.openImageGallery(1, 'fuelGuageImageUri')
                    }>
                    Open gallery
                  </Button>
                  <Button
                    compact
                    mode="contained"
                    color={Colors.textColor1}
                    onPress={() =>
                      this.openImageGallery(2, 'fuelGuageImageUri')
                    }>
                    Take Picture
                  </Button>
                </View>

                <Text numberOfLines={1} style={styles.headingTextStyle}>
                  Notes
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
            ) : (
              <Button
                mode="contained"
                uppercase={false}
                onPress={() => {
                  this.onProceed();
                }}
                color={Colors.textColor1}
                style={{
                  marginHorizontal: 30,
                  marginVertical: 20,
                  borderRadius: 20,
                }}>
                Proceed
              </Button>
            )}
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
    fontSize: 18,
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
    alignContent: 'center',
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
    marginHorizontal: 40,
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
    height: 55,
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
    fontSize: 15,
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
