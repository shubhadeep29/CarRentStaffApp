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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';

export default class AddRentOutVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.route.params.item,
      paymentMethodList: props.route.params.paymentMethodList,
      companyList: props.route.params.companyList,
      driverListRentOut: props.route.params.driverListRentOut,
      carListRent: props.route.params.carListRent,
      isNetworkAvailable: true,
      isLoading: false,
      deviceType: '1',
      driverId: '',
      carId: '',
      driver: '',
      car: '',
      odometerReading: '',
      basicExcess: '',
      ageExcess: '',
      overseasDLExcess: '',
      weeklyRent: '$',
      bond: '$',
      paymentMethod: '',
      isPaymentMethodDropdownVisible: false,
      referenceNumber: '',
      company: '',
      companyId: '',
      expire: '',
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
    console.log('selectedDate' + selectedDate);
    this.setState({
      isDisplayExpireDate: false,
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

    if (this.state.item != null) {
      console.log(this.state.item);

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
        carNo: this.state.item.car_no,
        carId: this.state.item.car_id,
        ageExcess: this.state.item.age_excess,
        basicExcess: this.state.item.basic_excess,
        overseasDLExcess: this.state.item.overseas_dL_excess,
        bond: this.state.item.bond_amount,
        company: this.state.item.company_name,
        companyId: this.state.item.company_id,

        coverNoteImageUri: Links.BASEURL + this.state.item.cover_note_img,

        driverId: this.state.item.driver_id,
        odometerReading: this.state.item.odometer_reading,

        expire: this.state.item.expire,
        weeklyRent: this.state.item.weekly_rent,

        notes: this.state.item.notes,
        rentOutId: this.state.item.rent_out_id,
        paymentReferenceNo: this.state.item.payment_reference_no,
        bondReferenceNo: this.state.item.bond_reference_no,
        bondPaymentMethod: this.state.item.bond_payment_method,
        paymentMethod: this.state.item.payment_method,
      });
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
    console.log('this.state.carId', value);
  }

  async onValueChangeDriver(value) {
    this.setState({
      driverId: value,
    });
    console.log('this.state.driverId', value);
  }

  async onValueChangeCompany(value, company_name) {
    this.setState({
      company: company_name,
      companyId: value,
    });
    console.log('this.state.companyId', value);
  }

  async onValueChangePayment(value) {
    this.setState({
      paymentMethod: value,
    });
    console.log('this.state.paymentMethod', value);
  }

  async onValueChangeBondPayment(value) {
    this.setState({
      bondPaymentMethod: value,
    });
    console.log('this.state.bondPaymentMethod', value);
  }

  onClickSubmitButton() {}

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

  openImageGallery(openImageGalleryFor) {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // ImagePicker.launchImageLibrary(options, (res) => {
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
  }

  callAddReturnInVehicleValidation() {
    Keyboard.dismiss();
    if (this.state.driverId == '') {
      Toast.show('Please enter Driver', Toast.SHORT);
    } else if (this.state.car == '') {
      Toast.show('Please enter Car', Toast.SHORT);
    } else if (this.state.odometerReading == '') {
      Toast.show('Please enter Odometer Reading', Toast.SHORT);
    } else if (this.state.weeklyRent == '') {
      Toast.show('Please enter Weekly Rent', Toast.SHORT);
    } else if (this.state.paymentMethod == '') {
      Toast.show('Please enter Payment Method', Toast.SHORT);
    } else if (this.state.company == '') {
      Toast.show('Please enter Company Name', Toast.SHORT);
    } else if (this.state.expire == '') {
      Toast.show('Please enter expire', Toast.SHORT);
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
    this.setState({isLoading: true});

    var formData = new FormData();
    formData.append('token_key', this.apiKey);
    formData.append('device_type', this.state.deviceType);
    formData.append('user_id', this.userId);
    formData.append('driver_id', this.state.driverId);
    formData.append('car_id', this.state.carId);
    formData.append('odometer_reading', this.state.odometerReading);
    formData.append('basic_excess', this.state.basicExcess);
    formData.append('age_excess', this.state.ageExcess);
    formData.append('overseas_dL_excess', this.state.overseasDLExcess);
    formData.append('weekly_rent', this.state.weeklyRent);
    formData.append('company_id', this.state.companyId);
    formData.append('insurance_company', this.state.company);
    formData.append('expire', this.state.expire);
    formData.append('notes', this.state.notes);
    formData.append('payment_method', this.state.paymentMethod);
    formData.append('payment_reference_no', this.state.paymentReferenceNo);
    formData.append('bond_amount', this.state.bond);
    formData.append('bond_payment_method', this.state.bondPaymentMethod);
    formData.append('bond_reference_no', this.state.bondReferenceNo);
    if (this.state.item != null) {
      formData.append('rent_out_id', this.state.rentOutId);
    }
    console.log(
      'Call Add Return Out Vehicle API ========>  ',
      JSON.stringify(formData),
    );

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
    console.log(
      'Call Add Return Out Vehicle API ========>  ',
      JSON.stringify(this.state.coverNoteImageName),
    );
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
    console.log(
      'Call Add Return Out Vehicle API ========>  ',
      JSON.stringify(formData),
    );

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
        <Text style={styles.selectionListTextStyle}>{item.first_name}</Text>
      </View>
    );
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.isLoading && <LoaderView />}
        {this.state.item != null ? (
          <CommonAppBar
            title="Edit Return Out Vehicle"
            navigation={this.props.navigation}
          />
        ) : (
          <CommonAppBar
            title="Add Return Out Vehicle"
            navigation={this.props.navigation}
          />
        )}

        <ScrollView>
          <View style={styles.bottomViewContainer}>
            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Driver *
            </Text>
            <View style={styles.editTextContainer}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={this.state.driverListRentOut}
                placeholder="Select Driver"
                maxHeight={300}
                labelField="first_name"
                valueField="driver_id"
                value={this.state.driverId}
                onChange={item => {
                  this.onValueChangeDriver(item.driver_id);
                }}
                renderItem={this.renderDriver}
              />
            </View>

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Car *
            </Text>
            <View style={styles.editTextContainer}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={this.state.carListRent}
                placeholder="Select Car"
                maxHeight={300}
                labelField="car_no"
                valueField="car_id"
                value={this.state.carId}
                onChange={item => {
                  this.onValueChangeCar(item);
                }}
                renderItem={this.renderCar}
              />
            </View>

            <View>
              <Text numberOfLines={1} style={styles.headingTextStyle}>
                Odometer Reading *
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

              <Text numberOfLines={1} style={styles.headingTextStyle}>
                Overseas DL Excess
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
                Weekly Rent *
              </Text>
              <View style={styles.editTextContainer}>
                <TextInput
                  style={styles.emailIdEditTextStyle}
                  autoCapitalize="none"
                  multiline={false}
                  placeholderTextColor={Colors.placeholderColor}
                  // placeholder="Email Id"
                  value={this.state.weeklyRent}
                  onChangeText={value => this.setState({weeklyRent: value})}
                  onSubmitEditing={() => {
                    this.yearTextInput.focus();
                  }}
                  ref={input => {
                    this.weeklyRentTextInput = input;
                  }}
                  blurOnSubmit={false}
                />
              </View>

              <Text numberOfLines={1} style={styles.headingTextStyle}>
                Payment Method *
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
                />
              </View>

              <Text numberOfLines={1} style={styles.headingTextStyle}>
                Bond
              </Text>
              <View style={styles.editTextContainer}>
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
                />
              </View>

              <Text numberOfLines={1} style={styles.headingTextStyle}>
                Bond Payment Method
              </Text>
              <View style={styles.editTextContainer}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={this.state.paymentMethodList}
                  placeholder="Select Bond Payment Method"
                  maxHeight={300}
                  labelField="value"
                  valueField="value"
                  value={this.state.bondPaymentMethod}
                  onChange={item => {
                    this.onValueChangeBondPayment(item.value);
                  }}
                  renderItem={this.renderPayment}
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
                />
              </View>

              <Text
                numberOfLines={1}
                style={[
                  styles.rowViewOptionStyle,
                  styles.headingTextStyleThree,
                ]}>
                Insurance Details
              </Text>

              <Text numberOfLines={1} style={styles.headingTextStyle}>
                Company *
              </Text>

              <View style={styles.editTextContainer}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={this.state.companyList}
                  placeholder="Select Company"
                  maxHeight={300}
                  labelField="company_name"
                  valueField="company_id"
                  value={this.state.companyId}
                  onChange={item => {
                    this.onValueChangeCompany(
                      item.company_id,
                      item.company_name,
                    );
                  }}
                  renderItem={this.renderCompany}
                />
              </View>

              <Text numberOfLines={1} style={styles.headingTextStyle}>
                Expire *
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
                  testID="dateTimePicker"
                  value={new Date()}
                  mode="date"
                  display={Platform.OS == 'android' ? 'calendar' : 'spinner'}
                  onChange={this.setExpireDate}
                />
              )}

              <Text numberOfLines={1} style={styles.headingTextStyle}>
                Upload photo of cover note
              </Text>
              <TouchableOpacity
                style={styles.addImageViewStyle}
                onPress={() => this.openImageGallery('coverNoteImageUri')}>
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
              </TouchableOpacity>

              <Text
                numberOfLines={1}
                style={[
                  styles.rowViewOptionStyle,
                  styles.headingTextStyleThree,
                ]}>
                Upload 7 pictures of car being issued
              </Text>

              <Text numberOfLines={1} style={styles.headingTextStyle}>
                Upload Photo of Front
              </Text>
              <TouchableOpacity
                style={styles.addImageViewStyle}
                onPress={() => this.openImageGallery('frontImageUri')}>
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
              </TouchableOpacity>

              <Text numberOfLines={1} style={styles.headingTextStyle}>
                Upload Photo of Rear
              </Text>
              <TouchableOpacity
                style={styles.addImageViewStyle}
                onPress={() => this.openImageGallery('rearImageUri')}>
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
              </TouchableOpacity>

              <Text numberOfLines={1} style={styles.headingTextStyle}>
                Upload Photo of Driver Side
              </Text>
              <TouchableOpacity
                style={styles.addImageViewStyle}
                onPress={() => this.openImageGallery('driverSideImageUri')}>
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

              <Text numberOfLines={1} style={styles.headingTextStyle}>
                Upload Photo of Passenger Side
              </Text>
              <TouchableOpacity
                style={styles.addImageViewStyle}
                onPress={() => this.openImageGallery('passengerSideImageUri')}>
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
              </TouchableOpacity>

              <Text numberOfLines={1} style={styles.headingTextStyle}>
                Upload Photo of Odometer
              </Text>
              <TouchableOpacity
                style={styles.addImageViewStyle}
                onPress={() => this.openImageGallery('odometerImageUri')}>
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
              </TouchableOpacity>

              <Text numberOfLines={1} style={styles.headingTextStyle}>
                Upload Photo of Service Sticker
              </Text>
              <TouchableOpacity
                style={styles.addImageViewStyle}
                onPress={() => this.openImageGallery('serviceStickerImageUri')}>
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
              </TouchableOpacity>

              <Text numberOfLines={1} style={styles.headingTextStyle}>
                Upload Photo of Fuel Guage
              </Text>
              <TouchableOpacity
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
              </TouchableOpacity>

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
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.approveButtonContainer}
                onPress={() => this.callAddReturnInVehicleApi()}>
                <Text numberOfLines={1} style={styles.buttonText}>
                  SUBMIT
                </Text>
              </TouchableOpacity>
              <View style={styles.boxGap} />

              <TouchableOpacity
                style={styles.cancelButtonContainer}
                onPress={() => this.onClickSubmitButton()}>
                <Text numberOfLines={1} style={styles.buttonText}>
                  CANCLE
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
    height: 50,
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
    fontSize: 16,
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
