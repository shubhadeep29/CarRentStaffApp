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
import * as Colors from '../utils/Colors';
import AdaptiveStatusBar from '../component/AdaptiveStatusBar';
import Loader from '../component/Loader';
import CarDetailsViewModal from '../component/CarDetailsViewModal';
import AppBarWithMenu from '../component/AppBarWithMenu';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Constants from '../utils/Constants';
import Links from '../utils/Links';
import Utils from '../utils/Utils';
import LoaderView from '../component/LoaderView';
import {color} from 'react-native-reanimated';
import {ScrollView} from 'react-native-gesture-handler';
import Moment from 'moment';

const imageUrl = 'https://images.unsplash.com/photo-1526045612212-70caf35c14df';

export default class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNetworkAvailable: true,
      isLoading: false,
      searchText: '',
      isCarDetailsViewModalVisible: false,
      data: [],
      pendingDriverValidate: [],
      availableVehicleList: [],
      totalVehicleCar: 0,
      totalVehicleVan: 0,
      onGoingVehicleCar: 0,
      onGoingVehicleVan: 0,
      availableVehicleCar: 0,
      availableVehicleVan: 0,

      isDropdownVisible: false,
    };
  }

  componentDidMount = async () => {
    this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
    this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);
    this.loadingList();
  };

  loadingList() {
    try {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          this.getVehicle();
        } else {
          Utils.showMessageAlert('No internet connection');
        }
      });
    } catch (error) {
      console.log('Error in webservice call : ' + error);
    }
  }

  getVehicle = async () => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: Platform.OS === 'android' ? 1 : 2,
      user_id: this.userId,
      token_key: this.apiKey,
    });

    try {
      const res = await fetch(Links.getVehicle, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();

      this.getOnGoingVehicle();
      if (responseJSON) {
        // this.setState({ isLoading: false });
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          if (
            responseJSON.hasOwnProperty('total_vehicle') &&
            responseJSON.total_vehicle != null
          ) {
            this.setState({
              totalVehicleCar: responseJSON.total_vehicle.total_car,
              totalVehicleVan: responseJSON.total_vehicle.total_van,
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

  getOnGoingVehicle = async () => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: Platform.OS === 'android' ? 1 : 2,
      user_id: this.userId,
      token_key: this.apiKey,
    });

    try {
      const res = await fetch(Links.getOnGoingVehicle, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();

      this.getPendingDriverValidate();
      if (responseJSON) {
        // this.setState({ isLoading: false });
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          if (
            responseJSON.hasOwnProperty('on_going_vehicle') &&
            responseJSON.on_going_vehicle != null
          ) {
            this.setState({
              onGoingVehicleCar: responseJSON.on_going_vehicle.total_car,
              onGoingVehicleVan: responseJSON.on_going_vehicle.total_van,
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
        // else if (responseJSON.hasOwnProperty("status") && responseJSON.status == 2) {
        //     await AsyncStorage.setItem(Constants.STORAGE_KEY_USER_ID, "");
        //     await AsyncStorage.setItem(Constants.STORAGE_KEY_API_KEY, "");
        //     await AsyncStorage.setItem(Constants.STORAGE_KEY_NAME, "");
        //     await AsyncStorage.setItem(Constants.STORAGE_KEY_EMAIL, "");
        //     await AsyncStorage.setItem(Constants.STORAGE_KEY_MOBILEL, "");

        //     if (responseJSON.hasOwnProperty("message") && responseJSON.message) {
        //         Toast.show(responseJSON.message, Toast.SHORT);
        //     }

        //     this.props.navigation.reset({
        //         index: 0,
        //         routes: [{ name: 'LoginScreen' }],
        //     });
        // }
      }
    } catch (error) {
      this.setState({isLoading: false});
      Toast.show('something went wrong', Toast.SHORT);
      console.log('Exception in API call: ' + error);
    }
  };

  getPendingDriverValidate = async () => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: Platform.OS === 'android' ? 1 : 2,
      user_id: this.userId,
      token_key: this.apiKey,
    });

    try {
      const res = await fetch(Links.getPendingDriverValidate, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();
      this.getAvailableVehicleList();
      if (responseJSON) {
        // this.setState({ isLoading: false });
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          if (
            responseJSON.hasOwnProperty('driver_list') &&
            responseJSON.driver_list != null
          ) {
            this.setState({pendingDriverValidate: responseJSON.driver_list});
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
        // else if (responseJSON.hasOwnProperty("status") && responseJSON.status == 2) {
        //     await AsyncStorage.setItem(Constants.STORAGE_KEY_USER_ID, "");
        //     await AsyncStorage.setItem(Constants.STORAGE_KEY_API_KEY, "");
        //     await AsyncStorage.setItem(Constants.STORAGE_KEY_NAME, "");
        //     await AsyncStorage.setItem(Constants.STORAGE_KEY_EMAIL, "");
        //     await AsyncStorage.setItem(Constants.STORAGE_KEY_MOBILEL, "");

        //     if (responseJSON.hasOwnProperty("message") && responseJSON.message) {
        //         Toast.show(responseJSON.message, Toast.SHORT);
        //     }

        //     this.props.navigation.reset({
        //         index: 0,
        //         routes: [{ name: 'LoginScreen' }],
        //     });
        // }
      }
    } catch (error) {
      this.setState({isLoading: false});
      Toast.show('something went wrong', Toast.SHORT);
      console.log('Exception in API call: ' + error);
    }
  };

  getAvailableVehicleList = async () => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: Platform.OS === 'android' ? 1 : 2,
      user_id: this.userId,
      token_key: this.apiKey,
    });

    try {
      const res = await fetch(Links.getAvailableVehicleList, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();
      if (responseJSON) {
        // this.getPendingDriverValidate()
        this.setState({isLoading: false});
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          if (
            responseJSON.hasOwnProperty('available_vehicle_list') &&
            responseJSON.available_vehicle_list != null
          ) {
            this.setState({
              availableVehicleList: responseJSON.available_vehicle_list,
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
        // else if (responseJSON.hasOwnProperty("status") && responseJSON.status == 2) {
        //     await AsyncStorage.setItem(Constants.STORAGE_KEY_USER_ID, "");
        //     await AsyncStorage.setItem(Constants.STORAGE_KEY_API_KEY, "");
        //     await AsyncStorage.setItem(Constants.STORAGE_KEY_NAME, "");
        //     await AsyncStorage.setItem(Constants.STORAGE_KEY_EMAIL, "");
        //     await AsyncStorage.setItem(Constants.STORAGE_KEY_MOBILEL, "");

        //     if (responseJSON.hasOwnProperty("message") && responseJSON.message) {
        //         Toast.show(responseJSON.message, Toast.SHORT);
        //     }

        //     this.props.navigation.reset({
        //         index: 0,
        //         routes: [{ name: 'LoginScreen' }],
        //     });
        // }
      }
    } catch (error) {
      this.setState({isLoading: false});
      Toast.show('something went wrong', Toast.SHORT);
      console.log('Exception in API call: ' + error);
    }
  };

  callLoadingCarListApi = async () => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: Platform.OS === 'android' ? 1 : 2,
      user_id: this.userId,
      token_key: this.apiKey,
    });

    try {
      console.log('Call car list API Link ========>  ', Links.CAR_LIST);
      console.log('Car list Input ========>  ', JSON.stringify(inputBody));
      const res = await fetch(Links.CAR_LIST, {
        method: 'POST',
        body: inputBody,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const responseJSON = await res.json();
      console.log(
        'Car list Response ===========>  ',
        JSON.stringify(responseJSON),
      );
      if (responseJSON) {
        this.setState({isLoading: false});
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          if (
            responseJSON.hasOwnProperty('car_list') &&
            responseJSON.car_list != null
          ) {
            this.setState({carList: responseJSON.car_list});
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

  goToValidatedScreen = item => {
    this.props.navigation.navigate('ValidateStepOneScreen', {
      item: item,
    });
  };
  openViewModal = () => {
    this.setState({isCarDetailsViewModalVisible: true});
  };

  setRenderItemView = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.listItemContainer}
        activeOpacity={1}
        key={item.id}
        // onPress={() => this.props.navigation.navigate('CourseLearningSelectionDetails', { pageTitle: item.book_name })}
      >
        <View>
          {item.car_image ? (
            <Image
              // source={require('../images/car_img.jpg')}
              source={{uri: item.car_image}}
              style={styles.carImage}
            />
          ) : null}

          {/* <View style={styles.indicatorContainer}>
                        {item.status == "0" ?
                            <View style={styles.activeIndicator} />
                            :
                            <View style={styles.inactiveIndicator} />
                        }
                    </View> */}

          {/* <View style={styles.editAndViewContainer}>
                        <TouchableOpacity style={styles.viewContainer} onPress={() => this.openViewModal()}>
                            <Image
                                source={require('../images/ic_view.png')}
                                style={styles.viewIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editContainer} onPress={() => this.props.navigation.navigate('AddNewCar')}>
                            <Image
                                source={require('../images/ic_edit.png')}
                                style={styles.viewIcon}
                            />
                        </TouchableOpacity>
                    </View> */}
        </View>

        {item.status == '0' ? (
          <View style={styles.activeCarNumberContainer}>
            <Text numberOfLines={1} style={styles.activeCarNumberTextStyle}>
              {item.car_no}
            </Text>
          </View>
        ) : (
          <View style={styles.inactiveCarNumberContainer}>
            <Text numberOfLines={1} style={styles.inactiveCarNumberTextStyle}>
              {item.car_no}
            </Text>
          </View>
        )}

        <View style={styles.carInfoContainer}>
          <Text numberOfLines={1} style={styles.serialNumberTextStyle}>
            {item.model} |
          </Text>
          <Text numberOfLines={1} style={styles.yearTextStyle}>
            {item.year}
          </Text>
          {/* <Text numberOfLines={1} style={styles.serialNumberTextStyle}>|  {item.fuel_type}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  setRenderRegisteredDriversItemView = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.topItemContainer}
        activeOpacity={1}
        key={item.id}
        // onPress={() => this.props.navigation.navigate('CourseLearningSelectionDetails', { pageTitle: item.book_name })}
      >
        <View>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              color: Colors.dark_shade_gray,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            {item.created_ts}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              fontSize: 10,
              color: Colors.pink,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginVertical: 4,
            }}>
            Validation Waited
          </Text>

          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: Colors.dark_shade_pink_red,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            {item.first_name + ' ' + item.last_name}
          </Text>

          <View
            style={{
              height: 2,
              justifyContent: 'center',
              alignSelf: 'center',
              alignContent: 'center',
              borderRadius: 50,
              elevation: 1,
              marginVertical: 6,
              width: 25,
              backgroundColor: Colors.pink,
            }}
          />

          <Text
            numberOfLines={1}
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              color: Colors.blue,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            {item.mobile}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              color: Colors.black,
              marginVertical: 4,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            Licence No.: {item.licence_no}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 9,
              color: Colors.dark_shade_gray,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            Country : {item.country}
          </Text>
          <TouchableOpacity
            style={{
              borderRadius: 30,
              paddingVertical: 8,
              paddingHorizontal: 15,
              backgroundColor: Colors.textColor1,
              marginTop: 8,
            }}
            onPress={() => this.goToValidatedScreen(item)}>
            <Text
              numberOfLines={1}
              style={{
                fontWeight: '600',
                color: Colors.white,
                flex: 1,
                fontSize: 12,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              VALIDATE DRIVER
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  setTopItemView = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.topItemContainer}
        activeOpacity={1}
        key={item.id}
        // onPress={() => this.props.navigation.navigate('CourseLearningSelectionDetails', { pageTitle: item.book_name })}
      >
        <View style={{flex: 1}}>
          <Image
            source={require('../images/car_img.jpg')}
            // source={{ uri: Links.BASEURL + item.image }}
            style={styles.topViewImage}
          />

          <Text style={styles.headingTwoTextStyle}>{item.title}</Text>

          <View style={styles.activeCarNumberContainer}>
            <Text numberOfLines={1} style={styles.activeCarNumberTextStyle}>
              CAR: {item.car_count}
            </Text>
          </View>

          <View style={styles.activeCarNumberContainer}>
            <Text numberOfLines={1} style={styles.activeCarNumberTextStyle}>
              VAN: {item.van_count}
            </Text>
          </View>
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

  // Function to update state
  handleUpdateViewModalState = value => {
    this.setState({isCarDetailsViewModalVisible: value});
  };

  onPressViewModalConfirmButton = value => {
    this.setState({isCarDetailsViewModalVisible: value});
  };

  onClickDropdownItem() {
    this.setState({isDropdownVisible: false});
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <AppBarWithMenu
            title="Quantum Car Dashboard"
            navigation={this.props.navigation}
          />
          <View style={styles.bottomViewContainer}>
            <ScrollView
              nestedScrollEnabled={true} // add this
            >
              <View style={styles.mainContainer}>
                {this.state.isNetworkAvailable ? (
                  <View style={styles.mainContainer}>
                    {this.state.isLoading && <Loader />}

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginTop: 20,
                        marginHorizontal: 16,
                      }}>
                      {/* {this.state.pendingDriverValidate.length > 0 ?
                                                <FlatList
                                                    data={this.state.topViewList}
                                                    nestedScrollEnabled
                                                    renderItem={(item, index) => this.setTopItemView(item, index)}
                                                    listKey={(item, index) => 'LC' + item.id}
                                                    keyExtractor={(item, index) => item.id}
                                                    style={styles.flatListStyle}
                                                    columnWrapperStyle={{ justifyContent: 'space-between', }}
                                                    showsVerticalScrollIndicator={false}
                                                    numColumns={3}
                                                />
                                                :
                                                this.emptyPlaceHolderView()
                                            } */}

                      <TouchableOpacity
                        style={styles.topItemContainer}
                        activeOpacity={1}
                        // onPress={() => this.props.navigation.navigate('CourseLearningSelectionDetails', { pageTitle: item.book_name })}
                      >
                        <View style={{flex: 1}}>
                          <Image
                            source={require('../images/car_img.jpg')}
                            // source={{ uri: Links.BASEURL + item.image }}
                            style={styles.topViewImage}
                          />

                          <Text style={styles.headingTwoTextStyle}>
                            Total Vehicle
                          </Text>

                          <View style={styles.activeCarNumberContainer}>
                            <Text
                              numberOfLines={1}
                              style={styles.activeCarNumberTextStyle}>
                              CAR: {this.state.totalVehicleCar}
                            </Text>
                          </View>

                          <View style={styles.activeCarNumberContainer}>
                            <Text
                              numberOfLines={1}
                              style={styles.activeCarNumberTextStyle}>
                              VAN: {this.state.totalVehicleVan}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.topItemContainer}
                        activeOpacity={1}
                        // onPress={() => this.props.navigation.navigate('CourseLearningSelectionDetails', { pageTitle: item.book_name })}
                      >
                        <View style={{flex: 1}}>
                          <Image
                            source={require('../images/car_img.jpg')}
                            // source={{ uri: Links.BASEURL + item.image }}
                            style={styles.topViewImage}
                          />

                          <Text style={styles.headingTwoTextStyle}>
                            On Rent
                          </Text>

                          <View style={styles.inactiveCarNumberContainer}>
                            <Text
                              numberOfLines={1}
                              style={styles.inactiveCarNumberTextStyle}>
                              CAR: {this.state.onGoingVehicleCar}
                            </Text>
                          </View>

                          <View style={styles.inactiveCarNumberContainer}>
                            <Text
                              numberOfLines={1}
                              style={styles.inactiveCarNumberTextStyle}>
                              VAN: {this.state.onGoingVehicleVan}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.topItemContainer}
                        activeOpacity={1}
                        // onPress={() => this.props.navigation.navigate('CourseLearningSelectionDetails', { pageTitle: item.book_name })}
                      >
                        <View style={{flex: 1}}>
                          <Image
                            source={require('../images/car_img.jpg')}
                            // source={{ uri: Links.BASEURL + item.image }}
                            style={styles.topViewImage}
                          />

                          <Text style={styles.headingTwoTextStyle}>
                            Available For Rent
                          </Text>

                          <View style={styles.greenCarNumberContainer}>
                            <Text
                              numberOfLines={1}
                              style={styles.greenCarNumberTextStyle}>
                              CAR:{' '}
                              {this.state.totalVehicleCar -
                                this.state.onGoingVehicleCar}
                            </Text>
                          </View>

                          <View style={styles.greenCarNumberContainer}>
                            <Text
                              numberOfLines={1}
                              style={styles.greenCarNumberTextStyle}>
                              VAN:{' '}
                              {this.state.totalVehicleVan -
                                this.state.onGoingVehicleVan}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <Text numberOfLines={1} style={styles.headingTextStyle}>
                      New Registered Drivers
                    </Text>

                    <View style={{flex: 1}}>
                      {this.state.pendingDriverValidate.length > 0 ? (
                        <FlatList
                          data={this.state.pendingDriverValidate}
                          nestedScrollEnabled
                          renderItem={(item, index) =>
                            this.setRenderRegisteredDriversItemView(item, index)
                          }
                          listKey={(item, index) => 'LC' + item.id}
                          keyExtractor={(item, index) => item.id}
                          style={styles.flatListStyle}
                          columnWrapperStyle={{justifyContent: 'space-between'}}
                          showsVerticalScrollIndicator={false}
                          numColumns={2}
                        />
                      ) : (
                        this.emptyPlaceHolderView()
                      )}
                    </View>

                    <Text numberOfLines={1} style={styles.headingTextStyle}>
                      Cars & Vans Available For Rent
                    </Text>

                    <View style={{flex: 1}}>
                      {this.state.availableVehicleList.length > 0 ? (
                        <FlatList
                          data={this.state.availableVehicleList}
                          renderItem={(item, index) =>
                            this.setRenderItemView(item, index)
                          }
                          nestedScrollEnabled
                          listKey={(item, index) => 'LC' + item.car_id}
                          keyExtractor={(item, index) => item.car_id}
                          style={styles.flatListStyle}
                          columnWrapperStyle={{justifyContent: 'space-between'}}
                          showsVerticalScrollIndicator={false}
                          numColumns={2}
                        />
                      ) : (
                        this.emptyPlaceHolderView()
                      )}
                    </View>
                  </View>
                ) : null}
              </View>
            </ScrollView>
          </View>
        </View>

        {this.state.isCarDetailsViewModalVisible ? (
          <CarDetailsViewModal
            isModalVisible={this.state.isCarDetailsViewModalVisible}
            title="My modal"
            buttonName="confirm"
            updateModalState={this.handleUpdateViewModalState}
            buttonOperation={this.onPressViewModalConfirmButton}
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
  bottomViewContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 10,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
  },
  filterMainContainer: {
    // flex: 1,
    flexDirection: 'row',
    paddingTop: 25,
    paddingBottom: 12,
  },
  allEditTextContainer: {
    backgroundColor: Colors.editTextBgColor,
    borderRadius: 30,
    paddingHorizontal: 18,
    marginStart: 20,
    flexDirection: 'row',
    height: 40,
  },
  searchEditTextContainer: {
    flex: 1,
    backgroundColor: Colors.editTextBgColor,
    borderRadius: 30,
    paddingHorizontal: 18,
    marginStart: 20,
    marginEnd: 20,
    flexDirection: 'row',
    height: 40,
  },
  filterText: {
    fontSize: 12,
    // fontFamily: fontSelector("regular"),
    color: Colors.black,
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdownIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginStart: 10,
  },
  searchIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginStart: 10,
  },
  searchEditTextStyle: {
    fontSize: 13,
    // fontFamily: fontSelector("regular"),
    color: Colors.black,
    flex: 1,
  },
  flatListStyle: {
    marginBottom: 5,
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    flex: 1,
  },
  noDataPlaceHolderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataPlaceHolderTextStyle: {
    fontSize: 17,
    // fontFamily: fontSelector("bold"),
    color: Colors.dark_shade_pink_red,
  },
  listItemContainer: {
    flex: 0.5,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: Colors.white,
    elevation: 5,
    paddingBottom: 8,
  },
  topItemContainer: {
    flex: 0.5,
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: Colors.light_shade_gray,
    elevation: 5,
  },
  carImage: {
    width: '100%',
    height: 130,
    resizeMode: 'contain',
    borderRadius: 10,
  },

  topViewImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  carInfoContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 4,
  },
  serialNumberTextStyle: {
    fontSize: 12,
    // fontFamily: fontSelector("bold"),
    color: Colors.black,
    fontWeight: 'bold',
  },
  yearTextStyle: {
    fontSize: 12,
    // fontFamily: fontSelector("bold"),
    color: Colors.black,
    marginHorizontal: 6,
    fontWeight: 'bold',
  },
  activeCarNumberContainer: {
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 8,
    backgroundColor: Colors.blueBackground,
  },
  activeCarNumberTextStyle: {
    fontSize: 12,
    // fontFamily: fontSelector("bold"),
    color: Colors.blue,
    fontWeight: 'bold',
    paddingHorizontal: 13,
    paddingVertical: 4,
  },
  greenCarNumberContainer: {
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 8,
    backgroundColor: Colors.greenBackground,
  },
  greenCarNumberTextStyle: {
    fontSize: 12,
    // fontFamily: fontSelector("bold"),
    color: Colors.green,
    fontWeight: 'bold',
    paddingHorizontal: 13,
    paddingVertical: 4,
  },
  headingTextStyle: {
    fontSize: 16,
    color: Colors.dark_shade_gray,
    fontWeight: 'bold',
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  headingTwoTextStyle: {
    fontSize: 12,
    color: Colors.dark_shade_gray,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 6,
    textAlign: 'center',
  },
  inactiveCarNumberContainer: {
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 8,
    backgroundColor: Colors.yellowBackground,
  },
  inactiveCarNumberTextStyle: {
    fontSize: 12,
    // fontFamily: fontSelector("bold"),
    color: Colors.yellow,
    fontWeight: 'bold',
    paddingHorizontal: 13,
    paddingVertical: 4,
  },
  indicatorContainer: {
    width: 14,
    height: 14,
    backgroundColor: 'white',
    borderRadius: 30,
    position: 'absolute',
    top: 6,
    right: 6,
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  activeIndicator: {
    width: 10,
    height: 10,
    backgroundColor: Colors.blue,
    borderRadius: 20,
    alignSelf: 'center',
  },
  inactiveIndicator: {
    width: 10,
    height: 10,
    backgroundColor: Colors.yellow,
    borderRadius: 20,
    alignSelf: 'center',
  },
  editAndViewContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  editContainer: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContainer: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    marginEnd: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  dropdownContainer: {
    width: 100,
    // height: 150,
    backgroundColor: 'white',
    marginStart: 20,
    borderRadius: 8,
    elevation: 4,
    position: 'absolute',
    left: 0,
    top: 70,
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
});
