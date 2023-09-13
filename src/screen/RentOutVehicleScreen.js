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
} from 'react-native';
import Toast from 'react-native-simple-toast';
import * as Colors from '../utils/Colors';
import AdaptiveStatusBar from '../component/AdaptiveStatusBar';
import Loader from '../component/Loader';
import AppBarWithMenu from '../component/AppBarWithMenu';
import Links from '../utils/Links';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../utils/Constants';
import NetInfo from '@react-native-community/netinfo';
import Moment from 'moment';
import CarDetailsViewModal from '../component/CarDetailsViewModal';
import AuthorizeModal from '../component/AuthorizeModal';
import Utils from '../utils/Utils';

export default class RentOutVehicleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isNetworkAvailable: true,
      isLoading: false,
      searchText: '',
      data: [],
      paymentMethodList: [],
      driverListRentOut: [],
      carListRent: [],
      companyList: [],
      direct_debit_response: {},
      rent_out_id: '',
      // data: [
      //     {
      //         id: 1,
      //         date: "28/09/2022",
      //         name: "Harvir Singh",
      //         rent_unique_id: "SG 102 L12365",
      //         rent_out_no: "123456",
      //         odometer_reading: "1000.00",
      //         weekly_rent: "$ 00.00",
      //         bond: "$ 00.00",
      //     },
      //     {
      //         id: 2,
      //         date: "29/09/2022",
      //         name: "Harvir Singh",
      //         rent_unique_id: "SG 102 L12365",
      //         rent_out_no: "123456",
      //         odometer_reading: "1000.00",
      //         weekly_rent: "$ 00.00",
      //         bond: "$ 00.00",
      //     },
      //     {
      //         id: 3,
      //         date: "28/09/2022",
      //         name: "Harvir Singh",
      //         rent_unique_id: "SG 102 L12365",
      //         rent_out_no: "123456",
      //         odometer_reading: "1000.00",
      //         weekly_rent: "$ 00.00",
      //         bond: "$ 00.00",
      //     },
      //     {
      //         id: 4,
      //         date: "29/09/2022",
      //         name: "Harvir Singh",
      //         rent_unique_id: "SG 102 L12365",
      //         rent_out_no: "123456",
      //         odometer_reading: "1000.00",
      //         weekly_rent: "$ 00.00",
      //         bond: "$ 00.00",
      //     },
      //     {
      //         id: 5,
      //         date: "28/09/2022",
      //         name: "Harvir Singh",
      //         rent_unique_id: "SG 102 L12365",
      //         rent_out_no: "123456",
      //         odometer_reading: "1000.00",
      //         weekly_rent: "$ 00.00",
      //         bond: "$ 00.00",
      //     },
      //     {
      //         id: 6,
      //         date: "29/09/2022",
      //         name: "Harvir Singh",
      //         rent_unique_id: "SG 102 L12365",
      //         rent_out_no: "123456",
      //         odometer_reading: "1000.00",
      //         weekly_rent: "$ 00.00",
      //         bond: "$ 00.00",
      //     },
      // ],
    };
  }

  componentDidMount = async () => {
    Moment.locale('en');
    this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
    this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);
    this.getRentOutList();
    this.getDriverListRentOut();
    this.getCompanyListRentOut();
    this.getPaymentMethod();
    this.getCarListRent();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.willFocus();
    });
  };

  willFocus = () => {
    this.getRentOutList();
    this.getDriverListRentOut();
    this.getCompanyListRentOut();
    this.getPaymentMethod();
    this.getCarListRent();
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  sendAuth = () => {
    try {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          this.sendAuthApi();
        } else {
          Utils.showMessageAlert('No internet connection');
        }
      });
    } catch (error) {
      console.log('Error in webservice call : ' + error);
    }
  };

  sendAuthApi = async () => {
    this.setState({isLoading: true, showModal: false});

    var inputBody = JSON.stringify({
      device_type: '1',
      user_id: this.userId,
      token_key: this.apiKey,
      rent_out_id: this.state.rent_out_id,
    });

    try {
      // console.log(
      //   'Call Rent Out list API Link ========>  ',
      //   Links.getCarListRent,
      // );
      console.log('sendAuth Input ========>  ', JSON.stringify(inputBody));
      const res = await fetch(Links.sendAuth, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();
      console.log(
        'sendAuth Response ===========>  ',
        JSON.stringify(responseJSON),
      );
      if (responseJSON) {
        this.setState({isLoading: false});
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          Utils.showMessageAlert(
            'Direct debit authorization mail has been sent successfully',
          );
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

  getRentOutList() {
    try {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          this.getRentOutListApi();
        } else {
          Utils.showMessageAlert('No internet connection');
        }
      });
    } catch (error) {
      console.log('Error in webservice call : ' + error);
    }
  }

  getRentOutListApi = async () => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: '1',
      user_id: this.userId,
      token_key: this.apiKey,
      search_text: this.state.searchText,
    });

    try {
      const res = await fetch(Links.RENT_OUT_LIST, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();
      console.log('responseJSON.rentout_list ---', responseJSON);
      if (responseJSON) {
        this.setState({isLoading: false});
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          if (
            responseJSON.hasOwnProperty('rentout_list') &&
            responseJSON.rentout_list != null
          ) {
            this.setState({data: responseJSON.rentout_list});
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
        }
      }
    } catch (error) {
      this.setState({isLoading: false});
      Toast.show('something went wrong', Toast.SHORT);
      console.log('Exception in API call: ' + error);
    }
  };

  getDriverListRentOut() {
    try {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          this.getDriverListRentOutApi();
        } else {
          Utils.showMessageAlert('No internet connection');
        }
      });
    } catch (error) {
      console.log('Error in webservice call : ' + error);
    }
  }

  getDriverListRentOutApi = async () => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: '1',
      user_id: this.userId,
      token_key: this.apiKey,
    });

    try {
      const res = await fetch(Links.getDriverListRentOut, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();
      if (responseJSON) {
        this.setState({isLoading: false});
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          if (
            responseJSON.hasOwnProperty('driver_list') &&
            responseJSON.driver_list != null
          ) {
            this.setState({driverListRentOut: responseJSON.driver_list});
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
        }
      }
    } catch (error) {
      this.setState({isLoading: false});
      Toast.show('something went wrong', Toast.SHORT);
      console.log('Exception in API call: ' + error);
    }
  };

  getCompanyListRentOut() {
    try {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          this.getCompanyListRentOutApi();
        } else {
          Utils.showMessageAlert('No internet connection');
        }
      });
    } catch (error) {
      console.log('Error in webservice call : ' + error);
    }
  }

  getCompanyListRentOutApi = async () => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: '1',
      user_id: this.userId,
      token_key: this.apiKey,
    });

    try {
      const res = await fetch(Links.getCompanyList, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();
      if (responseJSON) {
        this.setState({isLoading: false});
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          if (
            responseJSON.hasOwnProperty('company_list') &&
            responseJSON.company_list != null
          ) {
            this.setState({companyList: responseJSON.company_list});
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
        }
      }
    } catch (error) {
      this.setState({isLoading: false});
      Toast.show('something went wrong', Toast.SHORT);
      console.log('Exception in API call: ' + error);
    }
  };

  getPaymentMethod() {
    try {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          this.getPaymentMethodApi();
        } else {
          Utils.showMessageAlert('No internet connection');
        }
      });
    } catch (error) {
      console.log('Error in webservice call : ' + error);
    }
  }

  getPaymentMethodApi = async () => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: '1',
      user_id: this.userId,
      token_key: this.apiKey,
    });

    try {
      const res = await fetch(Links.getPaymentMethod, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();
      if (responseJSON) {
        this.setState({isLoading: false});
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          if (
            responseJSON.hasOwnProperty('payment_method_list') &&
            responseJSON.payment_method_list != null
          ) {
            this.setState({
              paymentMethodList: responseJSON.payment_method_list,
            });
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
        }
      }
    } catch (error) {
      this.setState({isLoading: false});
      Toast.show('something went wrong', Toast.SHORT);
      console.log('Exception in API call: ' + error);
    }
  };

  getCarListRent() {
    try {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          this.getCarListRentApi();
        } else {
          Utils.showMessageAlert('No internet connection');
        }
      });
    } catch (error) {
      console.log('Error in webservice call : ' + error);
    }
  }

  getCarListRentApi = async () => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: '1',
      user_id: this.userId,
      token_key: this.apiKey,
    });

    try {
      const res = await fetch(Links.getCarListRent, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();
      if (responseJSON) {
        this.setState({isLoading: false});
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          if (
            responseJSON.hasOwnProperty('car_list') &&
            responseJSON.car_list != null
          ) {
            this.setState({carListRent: responseJSON.car_list});
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
        }
      }
    } catch (error) {
      this.setState({isLoading: false});
      Toast.show('something went wrong', Toast.SHORT);
      console.log('Exception in API call: ' + error);
    }
  };

  openModal = () => {
    if (
      Object.keys(this.state.direct_debit_response).length &&
      this.state.direct_debit_response?.AuthorisationLink?.Link
    ) {
      this.setState({showModal: true});
    }
  };

  setRenderItemView = ({item, index}) => {
    const direct_debit_response = JSON.parse(item.direct_debit_status_response);
    // console.log('item -----', direct_debit_response);
    return (
      <TouchableOpacity
        style={styles.listItemContainer}
        activeOpacity={1}
        key={item.rent_out_id}
        // onPress={() => this.props.navigation.navigate('CourseLearningSelectionDetails', { pageTitle: item.book_name })}
      >
        <View style={styles.rowView}>
          <View style={styles.mainContainer}>
            <Text style={styles.dateTextStyle}>
              {Moment(item.created_ts).format('DD/MM/yyyy')}
            </Text>
          </View>

          {item.payment_method === 'Direct Debit' &&
          Object.keys(direct_debit_response).length &&
          direct_debit_response?.AuthorisationLink?.Link ? (
            <TouchableOpacity
              style={{marginRight: 8}}
              onPress={() =>
                this.setState(
                  {
                    direct_debit_response: direct_debit_response,
                    rent_out_id: item.rent_out_id,
                  },
                  this.openModal,
                )
              }>
              <View style={styles.editContainer}>
                <Text style={styles.editTextStyle}>Authorize</Text>
              </View>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('AddRentOutVehicle', {
                item: item,
                paymentMethodList: this.state.paymentMethodList,
                driverListRentOut: this.state.driverListRentOut,
                carListRent: this.state.carListRent,
                companyList: this.state.companyList,
              })
            }>
            <View style={styles.editContainer}>
              <Text style={styles.editTextStyle}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.nameAndRentUniqueIdContainer}>
          <Text style={styles.nameTextStyle}>
            {item.first_name + ' ' + item.middle_name + ' ' + item.last_name} |{' '}
          </Text>
          <Text style={styles.rentUniqueIdTextStyle}>{item.rent_out_id}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoHeadingTextStyle}>Rent Out No</Text>
          <Text style={styles.infoTextStyle}>{item.rent_out_no}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoHeadingTextStyle}>Odometer Reading</Text>
          <Text style={styles.infoTextStyle}>{item.odometer_reading}</Text>
        </View>

        <View style={styles.rowView}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoHeadingTextStyleTwo}>Weekly Rent</Text>
            <Text style={styles.infoTextStyleTwo}>{item.weekly_rent}</Text>
          </View>

          <View style={styles.infoContainerTwo}>
            <Text style={styles.infoHeadingTextStyleTwo}>Bond</Text>
            <Text style={styles.infoTextStyleTwo}>{item.bond_amount}</Text>
          </View>
        </View>
        <View style={{}}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoHeadingTextStyleTwo}>Payment Method</Text>
            <Text style={styles.infoTextStyleTwo}>{item.payment_method}</Text>
          </View>

          {item.payment_method === 'Direct Debit' ? (
            <View
              style={[
                {
                  flexDirection: 'row',
                  marginTop: 4,
                },
              ]}>
              {item.is_deleted_direct_debit === '1' ? (
                <View style={[styles.editContainer, {backgroundColor: 'red'}]}>
                  <Text style={styles.editTextStyle}>Deleted</Text>
                </View>
              ) : item.is_authorised === '0' ? (
                <View
                  style={[styles.editContainer, {backgroundColor: '#2196F3'}]}>
                  <Text style={styles.editTextStyle}>Draft</Text>
                </View>
              ) : item.is_authorised === '2' ? (
                <>
                  <View
                    style={[
                      styles.editContainer,
                      {backgroundColor: '#2196F3', marginRight: 8},
                    ]}>
                    <Text style={styles.editTextStyle}>Draft</Text>
                  </View>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 16, marginRight: 8}}>
                    {'➔'}
                  </Text>
                  <View
                    style={[
                      styles.editContainer,
                      {backgroundColor: '#E8E752'},
                    ]}>
                    <Text style={styles.editTextStyle}>Pending</Text>
                  </View>
                </>
              ) : item.is_authorised === '1' ? (
                <>
                  <View
                    style={[
                      styles.editContainer,
                      {backgroundColor: '#2196F3', marginRight: 8},
                    ]}>
                    <Text style={styles.editTextStyle}>Draft</Text>
                  </View>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 16, marginRight: 8}}>
                    {'➔'}
                  </Text>
                  <View
                    style={[
                      styles.editContainer,
                      {backgroundColor: '#E8E752', marginRight: 8},
                    ]}>
                    <Text style={styles.editTextStyle}>Pending</Text>
                  </View>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 16, marginRight: 8}}>
                    {'➔'}
                  </Text>
                  <View
                    style={[
                      styles.editContainer,
                      {backgroundColor: '#5AB114'},
                    ]}>
                    <Text style={styles.editTextStyle}>Active</Text>
                  </View>
                </>
              ) : null}

              {/* <View style={styles.editContainer}>
                <Text style={styles.editTextStyle}>Edit</Text>
              </View>
              <View style={styles.editContainer}>
                <Text style={styles.editTextStyle}>Edit</Text>
              </View> */}
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  emptyPlaceHolderView = () => {
    return (
      <View style={styles.noDataPlaceHolderContainer}>
        <Text style={styles.noDataPlaceHolderTextStyle}>No Data Found</Text>
      </View>
    );
  };

  handleUpdateViewModalState = value => {
    this.setState({showModal: value});
  };

  onPressViewModalConfirmButton = value => {
    this.setState({showModal: value});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AppBarWithMenu
          title="List of Rent Out Vehicle"
          navigation={this.props.navigation}
        />

        <View style={styles.bottomViewContainer}>
          <View style={styles.filterMainContainer}>
            <View style={styles.searchEditTextContainer}>
              <TextInput
                numberOfLines={1}
                style={styles.searchEditTextStyle}
                autoCapitalize="none"
                multiline={false}
                placeholderTextColor={Colors.placeholderColor}
                placeholder="Search by Driver Name, Car no"
                value={this.state.searchText}
                onChangeText={value =>
                  this.setState({searchText: value}, this.getRentOutList)
                }
                onSubmitEditing={() => {
                  this.passwordTextInput.focus();
                }}
                blurOnSubmit={false}
              />

              <Image
                source={require('../images/ic_search.png')}
                style={styles.searchIcon}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('AddRentOutVehicle', {
                item: null,
                paymentMethodList: this.state.paymentMethodList,
                driverListRentOut: this.state.driverListRentOut,
                carListRent: this.state.carListRent,
                companyList: this.state.companyList,
              })
            }>
            <View style={styles.addNewRentContainer}>
              <Text style={styles.editTextStyle}>
                {' '}
                Add New Rent out Vehicle
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.mainContainer}>
            {this.state.isNetworkAvailable ? (
              <View style={styles.mainContainer}>
                {this.state.isLoading && <Loader />}
                {this.state.data.length > 0 ? (
                  <FlatList
                    data={this.state.data}
                    renderItem={(item, index) =>
                      this.setRenderItemView(item, index)
                    }
                    listKey={(item, index) => 'LC' + item.id}
                    keyExtractor={(item, index) => item.id}
                    style={styles.flatListStyle}
                    showsVerticalScrollIndicator={false}
                  />
                ) : (
                  this.emptyPlaceHolderView()
                )}
              </View>
            ) : null}
          </View>
        </View>

        {this.state.showModal ? (
          <AuthorizeModal
            isModalVisible={this.state.showModal}
            title="Customer Authorization Required"
            item={this.state.direct_debit_response}
            buttonName="confirm"
            updateModalState={this.handleUpdateViewModalState}
            buttonOperation={this.onPressViewModalConfirmButton}
            sendAuth={this.sendAuth}
          />
        ) : null}
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
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // appbarContainer: {
  //     flexDirection: 'row',
  //     paddingVertical: 15,
  //     paddingHorizontal: 15
  // },
  // hambergerIcon: {
  //     width: 23,
  //     height: 23,
  //     resizeMode: 'contain',
  //     alignSelf: 'center'
  // },
  // titleText: {
  //     fontSize: 22,
  //     // fontFamily: fontSelector("regular"),
  //     color: Colors.textColor1,
  //     alignItems: "center",
  //     textAlign: 'center',
  //     textAlignVertical: 'center',
  //     flex: 1,
  //     fontWeight: 'bold'
  // },
  bottomViewContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 10,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
  },
  noDataPlaceHolderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataPlaceHolderTextStyle: {
    fontSize: 17,
    // fontFamily: fontSelector("bold"),
    color: Colors.black,
  },
  flatListStyle: {
    marginTop: 8,
    marginBottom: 15,
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    // flex: 1
  },
  listItemContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: Colors.editTextBgColor,
    padding: 12,
  },
  editContainer: {
    // flex: 1,
    borderRadius: 20,
    backgroundColor: Colors.textColor1,
    // alignSelf: 'baseline',
  },
  editTextStyle: {
    fontSize: 12,
    // fontFamily: fontSelector("bold"),
    color: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 3,
  },
  nameAndRentUniqueIdContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  nameTextStyle: {
    fontSize: 15,
    // fontFamily: fontSelector("bold"),
    color: Colors.black,
    fontWeight: 'bold',
  },
  rentUniqueIdTextStyle: {
    fontSize: 15,
    // fontFamily: fontSelector("bold"),
    color: Colors.black,
    fontWeight: 'bold',
  },
  infoTextStyle: {
    fontSize: 14,
    // fontFamily: fontSelector("bold"),
    color: '#7F8C8D',
    marginTop: 2,
  },
  infoContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 3,
  },
  infoContainerTwo: {
    flexDirection: 'row',
    marginTop: 3,
  },
  infoHeadingTextStyleTwo: {
    fontSize: 13,
    // fontFamily: fontSelector("bold"),
    color: '#7F8C8D',
  },
  infoTextStyleTwo: {
    fontSize: 13,
    // fontFamily: fontSelector("bold"),
    color: Colors.black,
    fontWeight: 'bold',
    marginStart: 8,
    // flex: 1,
  },

  infoHeadingTextStyle: {
    fontSize: 13,
    // fontFamily: fontSelector("bold"),
    color: '#7F8C8D',
    flex: 1,
  },
  infoTextStyle: {
    fontSize: 13,
    // fontFamily: fontSelector("bold"),
    color: Colors.black,
    fontWeight: 'bold',
    alignSelf: 'baseline',
  },
  rowView: {
    flexDirection: 'row',
  },
  dateTextStyle: {
    fontSize: 13,
    // fontFamily: fontSelector("bold"),
    color: Colors.blue,
    marginStart: 4,
  },

  filterMainContainer: {
    paddingTop: 25,
    // paddingBottom: 12,
  },
  searchEditTextContainer: {
    backgroundColor: Colors.editTextBgColor,
    borderRadius: 30,
    paddingHorizontal: 18,
    marginHorizontal: 20,
    flexDirection: 'row',
    height: 40,
  },
  searchEditTextStyle: {
    fontSize: 13,
    // fontFamily: fontSelector("regular"),
    color: Colors.black,
    flex: 1,
  },
  filterText: {
    fontSize: 12,
    // fontFamily: fontSelector("regular"),
    color: Colors.black,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  searchIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginStart: 10,
  },
  addNewRentContainer: {
    backgroundColor: Colors.dark_shade_pink_red,
    borderRadius: 30,
    paddingHorizontal: 18,
    marginHorizontal: 20,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
  },
});
