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

export default class ReturnInVehicleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNetworkAvailable: true,
      isLoading: false,
      searchText: '',
      data: [],
      paymentMethodList: [],
      driverListRentOut: [],
      carListRent: [],
      // data: [
      //     {
      //         id: 1,
      //         date: "28/09/2022",
      //         name: "Harvir Singh",
      //         rent_unique_id: "SG 102 L12365",
      //         return_in_no: "123456",
      //         return_out_no: "123456",
      //         odometer_reading: "1000.00",
      //         damage_amount: "$ 00.00",
      //         bond_refund_amt: "$ 00.00",
      //         refund_date: "28/09/2022"
      //     },
      //     {
      //         id: 2,
      //         date: "28/09/2022",
      //         name: "Harvir Singh",
      //         rent_unique_id: "SG 102 L12365",
      //         return_in_no: "123456",
      //         return_out_no: "123456",
      //         odometer_reading: "1000.00",
      //         damage_amount: "$ 00.00",
      //         bond_refund_amt: "$ 00.00",
      //         refund_date: "28/09/2022"
      //     },
      //     {
      //         id: 3,
      //         date: "28/09/2022",
      //         name: "Harvir Singh",
      //         rent_unique_id: "SG 102 L12365",
      //         return_in_no: "123456",
      //         return_out_no: "123456",
      //         odometer_reading: "1000.00",
      //         damage_amount: "$ 00.00",
      //         bond_refund_amt: "$ 00.00",
      //         refund_date: "28/09/2022"
      //     },
      //     {
      //         id: 4,
      //         date: "28/09/2022",
      //         name: "Harvir Singh",
      //         rent_unique_id: "SG 102 L12365",
      //         return_in_no: "123456",
      //         return_out_no: "123456",
      //         odometer_reading: "1000.00",
      //         damage_amount: "$ 00.00",
      //         bond_refund_amt: "$ 00.00",
      //         refund_date: "28/09/2022"
      //     },
      // ],
    };
  }

  componentDidMount = async () => {
    Moment.locale('en');
    this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
    this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);
    this.getRentInList();
    this.getDriverListRentIn();
    this.getPaymentMethod();
    this.getCarListRent();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.willFocus();
    });
  };

  willFocus = () => {
    console.log('log to console');
    this.getRentInList();
    this.getDriverListRentIn();
    this.getPaymentMethod();
    this.getCarListRent();
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  getRentInList() {
    try {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          this.getRentInListApi();
        } else {
          Utils.showMessageAlert('No internet connection');
        }
      });
    } catch (error) {
      console.log('Error in webservice call : ' + error);
    }
  }

  getRentInListApi = async () => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: '1',
      user_id: this.userId,
      token_key: this.apiKey,
      search_text: this.state.searchText,
    });

    try {
      // console.log('Call Rent In list API Link ========>  ', Links.RENT_IN_LIST);
      // console.log('Rent In list Input ========>  ', JSON.stringify(inputBody));
      const res = await fetch(Links.RENT_IN_LIST, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();
      console.log(
        'Rent In list Response ===========>  ',
        JSON.stringify(responseJSON),
      );
      if (responseJSON) {
        this.setState({isLoading: false});
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          if (
            responseJSON.hasOwnProperty('rentin_list') &&
            responseJSON.rentin_list != null
          ) {
            this.setState({data: responseJSON.rentin_list});
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

  getDriverListRentIn() {
    try {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          this.getDriverListRentInApi();
        } else {
          Utils.showMessageAlert('No internet connection');
        }
      });
    } catch (error) {
      console.log('Error in webservice call : ' + error);
    }
  }

  getDriverListRentInApi = async () => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: '1',
      user_id: this.userId,
      token_key: this.apiKey,
    });

    try {
      // console.log(
      //   'Call Rent in list API Link ========>  ',
      //   Links.getDriverListRentIn,
      // );
      // console.log('Rent in list Input ========>  ', JSON.stringify(inputBody));
      const res = await fetch(Links.getDriverListRentIn, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();
      // console.log(
      //   'Rent in list Response ===========>  ',
      //   JSON.stringify(responseJSON),
      // );
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
      // console.log(
      //   'Rent in list Response ===========>  ',
      //   JSON.stringify(responseJSON),
      // );
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
      // console.log(
      //   'Call Rent Out list API Link ========>  ',
      //   Links.getCarListRent,
      // );
      // console.log('Rent Out list Input ========>  ', JSON.stringify(inputBody));
      const res = await fetch(Links.getCarListRent, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();
      // console.log(
      //   'Rent Out list Response ===========>  ',
      //   JSON.stringify(responseJSON),
      // );
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
  generatePdf(rent_out_id) {
    try {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          this.generatePdfApi(rent_out_id);
        } else {
          Utils.showMessageAlert('No internet connection');
        }
      });
    } catch (error) {
      console.log('Error in webservice call : ' + error);
    }
  }

  generatePdfApi = async rent_out_id => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: '1',
      user_id: this.userId,
      token_key: this.apiKey,
      rent_out_id: rent_out_id,
    });

    try {
      // console.log(
      //   'Call Rent Out list API Link ========>  ',
      //   Links.getCarListRent,
      // );
      // console.log('Rent Out list Input ========>  ', JSON.stringify(inputBody));
      const res = await fetch(Links.generatePdf, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();
      // console.log(
      //   'generate pdf Response ===========>  ',
      //   JSON.stringify(responseJSON),
      // );
      if (responseJSON) {
        this.setState({isLoading: false});
        if (
          responseJSON.hasOwnProperty('status') &&
          responseJSON.status == 1 &&
          responseJSON.rental_pdf_link !== ''
        ) {
          this.props.navigation.navigate(
            'PdfViewer',
            Links.BASEURL + responseJSON.rental_pdf_link,
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

  setRenderItemView = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.listItemContainer}
        activeOpacity={1}
        key={item.rent_in_id}
        // onPress={() => this.props.navigation.navigate('CourseLearningSelectionDetails', { pageTitle: item.book_name })}
      >
        <View style={styles.rowView}>
          <View style={styles.mainContainer}>
            <Text style={styles.dateTextStyle}>
              {Moment(item.created_ts).format('DD/MM/yyyy')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('AddReturnInVehicle', {
                item: item,
                paymentMethodList: this.state.paymentMethodList,
                driverListRentOut: this.state.driverListRentOut,
                // carListRent: this.state.carListRent,
              })
            }>
            <View style={styles.editContainer}>
              <Text style={styles.editTextStyle}>Edit</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.generatePdf(item.rent_out_id)}>
            <Image
              source={require('../images/ic_download.png')}
              style={styles.downloadIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.nameAndRentUniqueIdContainer}>
          <Text style={styles.nameTextStyle}>
            {item.first_name + ' ' + item.middle_name + ' ' + item.last_name} |{' '}
          </Text>
          <Text style={styles.rentUniqueIdTextStyle}>{item.rent_in_id}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoHeadingTextStyle}>Rent in No :</Text>
          <Text style={styles.infoTextStyle}>{item.rent_in_no}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoHeadingTextStyle}>Rent Out No :</Text>
          <Text style={styles.infoTextStyle}>{item.rent_out_no}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoHeadingTextStyle}>Odometer Reading :</Text>
          <Text style={styles.infoTextStyle}>{item.odometer_reading}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoHeadingTextStyle}>Damage Amount :</Text>
          <Text style={styles.infoTextStyle}>{item.damage_amount}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoHeadingTextStyle}>Bond Refund Amt. :</Text>
          <Text style={styles.infoTextStyle}>{item.amount_want_to_refund}</Text>
        </View>

        <View style={styles.infoContainerTwo}>
          <Text style={styles.infoHeadingTextStyle}>Refund Date :</Text>
          <Text style={styles.infoTextStyle}>{item.bond_refund_due_date}</Text>
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AppBarWithMenu
          title="List of Return In Vehicle"
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
                  this.setState({searchText: value}, this.getRentInList)
                }
              />

              <Image
                source={require('../images/ic_search.png')}
                style={styles.searchIcon}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('AddReturnInVehicle', {
                item: null,
                paymentMethodList: this.state.paymentMethodList,
                driverListRentOut: this.state.driverListRentOut,
                carListRent: this.state.carListRent,
              })
            }>
            <View style={styles.addNewRentContainer}>
              <Text style={styles.editTextStyle}>Add New Rent in Vehicle</Text>
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
                    listKey={(item, index) => item.rent_in_id}
                    keyExtractor={(item, index) => item.rent_in_id}
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
    alignSelf: 'center',
  },
  editTextStyle: {
    fontSize: 12,
    // fontFamily: fontSelector("bold"),
    color: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 3,
    alignSelf: 'center',
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
    textAlignVertical: 'center',
    flex: 1,
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
  downloadIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginStart: 8,
  },
});
