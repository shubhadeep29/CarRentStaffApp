import React, {useState} from 'react';
import {
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import * as Colors from '../utils/Colors';
import AdaptiveStatusBar from '../component/AdaptiveStatusBar';
import Loader from '../component/Loader';
import CommonAppBar from '../component/CommonAppBar';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import Links from '../utils/Links';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../utils/Constants';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
export default class BondReturnEntryEditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNetworkAvailable: true,
      isLoading: false,
      driver: {},
      refundAmount: '',
      amountWantToReturn: '',
      showNoticeDate: false,
      noticeDate: '',
      showBoundRefundDueDate: false,
      boundRefundDueDate: '',
      referenceNumber: '',
      remark: '',
      refundTypeValue: '',
      paymentMethodValue: '',
      driverData: [
        // {
        //   id: 1,
        //   refund_type: 'Full Refund',
        //   status: 'Settled',
        //   name: 'Havir Singh',
        //   dc_no: '552427',
        //   total_bond_amount: '1000.00',
        //   bond_refund_remain: '1000.00',
        //   refund_amount: '1000.00',
        //   notice_date: '12/02/2022',
        //   refund_due_date: '12/09/2023',
        //   settlement_date: 'N/A',
        // },
        // {
        //   id: 2,
        //   refund_type: 'Partial Refund',
        //   status: 'Settle',
        //   name: 'Havir Singh',
        //   dc_no: '552427',
        //   total_bond_amount: '1000.00',
        //   bond_refund_remain: '1000.00',
        //   refund_amount: '1000.00',
        //   notice_date: '12/02/2022',
        //   refund_due_date: '12/09/2023',
        //   settlement_date: 'N/A',
        // },
        // {
        //   id: 3,
        //   refund_type: 'Full Refund',
        //   status: 'Settled',
        //   name: 'Havir Singh',
        //   dc_no: '552427',
        //   total_bond_amount: '1000.00',
        //   bond_refund_remain: '1000.00',
        //   refund_amount: '1000.00',
        //   notice_date: '12/02/2022',
        //   refund_due_date: '12/09/2023',
        //   settlement_date: 'N/A',
        // },
        // {
        //   id: 4,
        //   refund_type: 'Partial Refund',
        //   status: 'Settle',
        //   name: 'Havir Singh',
        //   dc_no: '552427',
        //   total_bond_amount: '1000.00',
        //   bond_refund_remain: '1000.00',
        //   refund_amount: '1000.00',
        //   notice_date: '12/02/2022',
        //   refund_due_date: '12/09/2023',
        //   settlement_date: 'N/A',
        // },
      ],
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
      paymentMethod: [
        {
          id: 1,
          key: 'Cash',
          value: 'Cash',
        },
        {
          id: 2,
          key: 'Bank Transfer',
          value: 'Bank Transfer',
        },
        {
          id: 3,
          key: 'EFT POS',
          value: 'EFT POS',
        },
      ],
    };
  }

  renderDriver = item => {
    return (
      <View>
        <Text style={styles.selectionListTextStyle}>
          {item.first_name}
          {item.middle_name ? ' ' + item.middle_name : ''}
          {item.last_name ? ' ' + item.last_name : ''} - {item.mobile}
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
  renderPaymentMethod = item => {
    return (
      <View>
        <Text style={styles.selectionListTextStyle}>{item.key}</Text>
      </View>
    );
  };

  willFocus = () => {
    console.log('log to console');
    this.driverListWithBond();
  };

  componentDidMount = async () => {
    this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
    this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);
    this.driverListWithBond();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.willFocus();
    });
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

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

  onValueChangeDriver = item => {
    this.setState({driver: item});
    this.setRefundType(this.state.refundTypeValue, item.driver_bond_amount);
  };

  driverListWithBond() {
    try {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          this.callGetDriverListWithBondApi();
        } else {
          Utils.showMessageAlert('No internet connection');
        }
      });
    } catch (error) {
      console.log('Error in webservice call : ' + error);
    }
  }

  callGetDriverListWithBondApi = async () => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: Platform.OS === 'android' ? 1 : 2,
      user_id: this.userId,
      token_key: this.apiKey,
    });

    try {
      //   console.log(
      //     'Call car list API Link ========>  ',
      //     Links.getBondRefundList,
      //   );
      //   console.log('Car list Input ========>  ', JSON.stringify(inputBody));
      const res = await fetch(Links.getDriverListWithBond, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();
      this.state.data = [];
      //   console.log(
      //     'Car list Response ===========>  ',
      //     JSON.stringify(responseJSON),
      //   );
      if (responseJSON) {
        this.setState({isLoading: false});
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          if (
            responseJSON.hasOwnProperty('driver_list') &&
            responseJSON.driver_list != null
          ) {
            this.setState({driverData: responseJSON.driver_list});
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

  setNoticeDate = (event, selectedDate) => {
    this.setState({
      showNoticeDate: false,
      noticeDate:
        selectedDate.getDate() +
        '/' +
        (selectedDate.getMonth() + 1) +
        '/' +
        selectedDate.getFullYear(),
    });
  };
  setBoundRefundDueDate = (event, selectedDate) => {
    this.setState({
      showBoundRefundDueDate: false,
      boundRefundDueDate:
        selectedDate.getDate() +
        '/' +
        (selectedDate.getMonth() + 1) +
        '/' +
        selectedDate.getFullYear(),
    });
  };

  onClickSubmitButton() {
    Keyboard.dismiss();
    if (Object.keys(this.state.driver).length < 1) {
      Toast.show('Please select a driver', Toast.SHORT);
      return false;
    }
    if (this.state.refundTypeValue === '') {
      Toast.show('Please select a refund type', Toast.SHORT);
      return false;
    }
    if (parseFloat(this.state.refundAmount) < 1) {
      Toast.show('Please enter a valid amount', Toast.SHORT);
      return false;
    }
    if (
      parseFloat(this.state.refundAmount) >
      this.state?.driver?.driver_bond_amount
    ) {
      Toast.show(
        'Refund amount should be less than total bond amount',
        Toast.SHORT,
      );
      return false;
    }
    if (this.state.paymentMethodValue === '') {
      Toast.show('Please select a payment method', Toast.SHORT);
      return false;
    }
    if (this.state.noticeDate === '') {
      Toast.show('Please select notice date', Toast.SHORT);
      return false;
    }
    if (this.state.boundRefundDueDate === '') {
      Toast.show('Please select bond refund due date', Toast.SHORT);
      return false;
    }
    if (this.state.remark === '') {
      Toast.show('Remarks should not be empty', Toast.SHORT);
      return false;
    }

    try {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          this.callAddBondRefund();
        } else {
          Utils.showMessageAlert('No internet connection');
        }
      });
    } catch (error) {
      console.log('Error in webservice call : ' + error);
    }
  }

  callAddBondRefund = async () => {
    this.setState({isLoading: true});

    var formData = new FormData();
    formData.append('token_key', this.apiKey);
    formData.append('device_type', Platform.OS === 'android' ? 1 : 2);
    formData.append('user_id', this.userId);
    formData.append('driver_id', this.state.driver.driver_id);
    formData.append('total_bond_amount', this.state.driver.driver_bond_amount);
    formData.append('refund_type', this.state.refundTypeValue);
    formData.append('amount_want_to_refund', this.state.refundAmount);
    formData.append('bond_payment_method', this.state.paymentMethodValue);
    formData.append('notice_date', this.state.noticeDate);
    formData.append('bond_refund_due_date', this.state.boundRefundDueDate);
    formData.append('bond_reference_no', this.state.referenceNumber);
    formData.append('remarks', this.state.remark);

    try {
      console.log('Call Car add API ========>  ', JSON.stringify(formData));
      const res = await fetch(Links.addBondRefund, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          //   'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      const responseJSON = await res.json();
      console.log(
        'Car add Response ===========>  ',
        JSON.stringify(responseJSON),
      );
      if (responseJSON) {
        this.setState({isLoading: false});
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          if (responseJSON.hasOwnProperty('message') && responseJSON.message) {
            Toast.show(responseJSON.message, Toast.SHORT);
          }
          // this.goToMainScreen();
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CommonAppBar
          title="Add New Bond Refund"
          navigation={this.props.navigation}
        />

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
                data={this.state.driverData}
                placeholder="Select Driver"
                maxHeight={300}
                labelField="first_name"
                valueField="driver_id"
                value={this.state.driverId}
                onChange={item => {
                  this.onValueChangeDriver(item);
                }}
                renderItem={this.renderDriver}
              />
            </View>

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Total Bond Amount *
            </Text>
            <View style={styles.editTextContainer}>
              <Text
                style={styles.emailIdEditTextStyle}
                multiline={false}
                // placeholderTextColor={Colors.placeholderColor}
                // placeholder="Email Id"
                // onChangeText={value => this.setState({totalBondAmount: value})}
                // onSubmitEditing={() => {
                //   this.driverBoundAmountTextInput.focus();
                // }}
                // ref={input => {
                //   this.totalBondAmountTextInput = input;
                // }}
                // blurOnSubmit={false}
              >
                {this.state?.driver?.driver_bond_amount}
              </Text>
            </View>

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Refund Type *
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
                value={this.state.driverId}
                onChange={item => {
                  this.setRefundType(
                    item.value,
                    this.state?.driver?.driver_bond_amount ?? 0,
                  );
                }}
                renderItem={this.renderRefundType}
              />
            </View>

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Amount Want to Refund *
            </Text>
            <View style={styles.editTextContainer}>
              <TextInput
                style={styles.remarksTextStyle}
                autoCapitalize="none"
                multiline={false}
                placeholderTextColor={Colors.placeholderColor}
                editable={this.state.refundTypeValue === 'FULL' ? false : true}
                value={this.state.refundAmount.toString()}
                onChangeText={value => this.setState({refundAmount: value})}
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
                data={this.state.paymentMethod}
                placeholder="Select Payment Method"
                maxHeight={300}
                labelField="key"
                valueField="value"
                value={this.state.driverId}
                onChange={item => {
                  this.setState({paymentMethodValue: item.value});
                }}
                renderItem={this.renderPaymentMethod}
              />
            </View>

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Notice Date *
            </Text>
            <TouchableOpacity
              style={styles.editTextContainer}
              onPress={value => this.setState({showNoticeDate: true})}>
              <Text
                style={
                  this.state.noticeDate
                    ? [
                        styles.remarksTextStyle,
                        {paddingVertical: Platform.OS == 'ios' ? 16 : 12},
                      ]
                    : styles.emailIdEditTextStyle
                }>
                {this.state.noticeDate ? this.state.noticeDate : 'DD/MM/YYYY'}
              </Text>
              <Image
                source={require('../images/calendar.png')}
                style={{alignSelf: 'center', height: 15, width: 15}}
              />
            </TouchableOpacity>
            {this.state.showNoticeDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                minimumDate={new Date()}
                mode="date"
                display={Platform.OS == 'android' ? 'calendar' : 'spinner'}
                onChange={this.setNoticeDate}
              />
            )}

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Bond Refund Due Date *
            </Text>
            <TouchableOpacity
              style={styles.editTextContainer}
              onPress={value => this.setState({showBoundRefundDueDate: true})}>
              <Text
                style={
                  this.state.boundRefundDueDate
                    ? [
                        styles.remarksTextStyle,
                        {paddingVertical: Platform.OS == 'ios' ? 16 : 12},
                      ]
                    : styles.emailIdEditTextStyle
                }>
                {this.state.boundRefundDueDate
                  ? this.state.boundRefundDueDate
                  : 'DD/MM/YYYY'}
              </Text>
              <Image
                source={require('../images/calendar.png')}
                style={{alignSelf: 'center', height: 15, width: 15}}
              />
            </TouchableOpacity>
            {this.state.showBoundRefundDueDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                minimumDate={new Date()}
                mode="date"
                display={Platform.OS == 'android' ? 'calendar' : 'spinner'}
                onChange={this.setBoundRefundDueDate}
              />
            )}

            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Reference Number
            </Text>
            <View style={styles.editTextContainer}>
              <TextInput
                style={{fontSize: 15, color: Colors.black}}
                value={this.state.referenceNumber}
                onChangeText={value => this.setState({referenceNumber: value})}
              />
            </View>
            <Text numberOfLines={1} style={styles.headingTextStyle}>
              Remark *
            </Text>
            <View style={styles.remarksStyle}>
              <TextInput
                style={styles.remarksTextStyle}
                autoCapitalize="none"
                multiline={true}
                placeholderTextColor={Colors.placeholderColor}
                placeholder="Enter your remarks"
                value={this.state.remark}
                onChangeText={value => this.setState({remark: value})}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancleStyle}
                onPress={() => navigation.goBack()}>
                <Text numberOfLines={1} style={styles.buttonText}>
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitStyle}
                onPress={() => this.onClickSubmitButton()}>
                <Text numberOfLines={1} style={styles.buttonText}>
                  Submit
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
    width: 50,
    resizeMode: 'contain',
    height: 50,
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
    paddingHorizontal: 25,
    marginHorizontal: 30,
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
  },
  emailIdEditTextStyle: {
    fontSize: 15,
    // fontFamily: fontSelector("regular"),
    color: Colors.placeholderColor,
    flex: 1,
    paddingVertical: Platform.OS == 'ios' ? 16 : 12,
  },
  headingTextStyle: {
    fontSize: 14,
    // fontFamily: fontSelector("regular"),
    color: Colors.placeholderColor,
    paddingHorizontal: 50,
    marginTop: 8,
  },
  headingOneTextStyle: {
    fontSize: 16,
    // fontFamily: fontSelector("regular"),
    color: Colors.black,
    paddingHorizontal: 50,
    marginTop: 25,
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

  headingTextStyleTwo: {
    fontSize: 15,
    // fontFamily: fontSelector("regular"),
    color: Colors.black,
  },

  optionTextStyle: {
    fontSize: 12,
    // fontFamily: fontSelector("regular"),
    color: Colors.textColor2,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 40,
  },
  submitStyle: {
    backgroundColor: Colors.textColor1,
    borderRadius: 30,
    paddingVertical: 10,
    marginStart: 10,
    flex: 1,
  },
  cancleStyle: {
    backgroundColor: Colors.pink,
    borderRadius: 30,
    paddingVertical: 10,
    flex: 1,
  },
  buttonText: {
    fontSize: 15,
    // fontFamily: fontSelector("regular"),
    color: Colors.white,
    textAlign: 'center',
  },
  dropdownIcon: {
    alignSelf: 'center',
    height: 20,
    width: 20,
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
  dropdown: {
    height: 50,
    flex: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  selectionListTextStyle: {
    fontSize: 13,
    color: Colors.black,
    // fontFamily: fontSelector("regular"),
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
});
