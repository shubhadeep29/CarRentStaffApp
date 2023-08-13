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
import NetInfo from '@react-native-community/netinfo';
import * as Colors from '../utils/Colors';
import AdaptiveStatusBar from '../component/AdaptiveStatusBar';
import Loader from '../component/Loader';
import ViewRemarksModal from '../component/ViewRemarksModal';
import AppBarWithMenu from '../component/AppBarWithMenu';
import {UseQuery} from '../utils/reactQuery';
import Toast from 'react-native-simple-toast';
import Links from '../utils/Links';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../utils/Constants';
import Utils from '../utils/Utils';
import {Button} from 'react-native-paper';

export default class BondReturnEntryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNetworkAvailable: true,
      isLoading: false,
      searchText: '',
      isViewRemarksModalVisible: false,
      data: [
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
    };
  }

  goToBondReturnEntryEditScreen = () => {
    this.props.navigation.navigate('BondReturnEntryEditScreen');
  };

  setRenderItemView = ({item, index}) => {
    return (
      <View
        style={styles.listItemContainer}
        activeOpacity={1}
        key={item.id}
        // onPress={() => this.goToBondReturnEntryEditScreen()}
      >
        <View style={styles.refundStatusContainer}>
          {item.refund_type == 'Full Refund' ? (
            <Text style={styles.fullRefundTextStyle}>{item.refund_type}</Text>
          ) : (
            <Text style={styles.partialRefundTextStyle}>
              {item.refund_type}
            </Text>
          )}

          <View
            style={
              item.is_settele
                ? styles.settleStatusContainer
                : styles.statusContainer
            }>
            <Text
              style={
                item.is_settele
                  ? styles.settleStatusTextStyle
                  : styles.statusTextStyle
              }>
              {item.is_settele ? 'Settle' : 'Settled'}
            </Text>
          </View>
        </View>

        <View style={styles.nameAndDcContainer}>
          <Text style={styles.nameTextStyle}>
            {item.first_name}
            {item.middle_name ? ' ' + item.middle_name : ''}
            {item.last_name ? ' ' + item.last_name : ''} |{' '}
          </Text>
          <Text style={styles.dcNoTextStyle}>{item.bond_refund_id}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoHeadingTextStyle}>Total bond amount</Text>
          <Text style={styles.infoTextStyle}>{item.total_bond_amount}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoHeadingTextStyle}>Refund type</Text>
          <Text style={styles.infoTextStyle}>{item.refund_type}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoHeadingTextStyle}>Refund amount</Text>
          <Text style={styles.infoTextStyle}>{item.amount_want_to_refund}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoHeadingTextStyle}>Notice date</Text>
          <Text style={styles.infoTextStyle}>{item.notice_date}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoHeadingTextStyle}>Refund due date</Text>
          <Text style={styles.infoTextStyle}>{item.notice_date}</Text>
        </View>
        {item.settle_date ? (
          <View style={styles.infoContainer}>
            <Text style={styles.infoHeadingTextStyle}>Settlement Date</Text>
            <Text style={styles.infoTextStyle}>{}</Text>
          </View>
        ) : null}
        {item.remarks ? (
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text
              style={{
                fontSize: 13,
                color: '#7F8C8D',
                marginRight: 8,
              }}>
              Remarks
            </Text>
            <Text
              style={{
                fontSize: 13,
                flex: 1,
                textAlign: 'right',
                color: Colors.black,
                fontWeight: 'bold',
              }}>
              {item.remarks}
            </Text>
          </View>
        ) : null}

        {/* 
        {item.is_settele === 1 ? (
          <TouchableOpacity onPress={() => this.showViewRemarksModal()}>
            <Text style={styles.viewRemarksTextStyle}>View Remarks</Text>
          </TouchableOpacity>
        ) : null} */}
      </View>
    );
  };

  showViewRemarksModal = () => {
    this.setState({isViewRemarksModalVisible: true});
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
    this.setState({isViewRemarksModalVisible: value});
  };

  onPressViewModalConfirmButton = value => {
    this.setState({isViewRemarksModalVisible: value});
  };

  willFocus = () => {
    console.log('log to console');
    this.bondRefundList();
  };

  componentDidMount = async () => {
    this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
    this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);
    this.bondRefundList();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.willFocus();
    });
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  updateSearch = text => {
    this.setState({searchText: text});
    this.bondRefundList();
  };

  bondRefundList() {
    try {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          this.callLoadingBondListApi();
        } else {
          Utils.showMessageAlert('No internet connection');
        }
      });
    } catch (error) {
      console.log('Error in api call : ' + error);
    }
  }

  callLoadingBondListApi = async () => {
    this.setState({isLoading: true});

    var inputBody = JSON.stringify({
      device_type: Platform.OS === 'android' ? 1 : 2,
      user_id: this.userId,
      token_key: this.apiKey,
      search_text: this.state.searchText,
    });

    try {
      // console.log(
      //   'Call car list API Link ========>  ',
      //   Links.getBondRefundList,
      // );
      console.log('Car list Input ========>  ', JSON.stringify(inputBody));
      const res = await fetch(Links.getBondRefundList, {
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
      //   'Car list Response 123 ===========>  ',
      //   JSON.stringify(responseJSON),
      // );
      if (responseJSON) {
        this.setState({isLoading: false});
        if (responseJSON.hasOwnProperty('status') && responseJSON.status == 1) {
          console.log(
            'responseJSON.bond_refund_list ---',
            responseJSON.bond_refund_list,
          );
          if (
            responseJSON.hasOwnProperty('bond_refund_list') &&
            responseJSON.bond_refund_list != null
          ) {
            this.setState({data: responseJSON.bond_refund_list});
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AppBarWithMenu
          title="List of Bond Refund"
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
                placeholder="Search by Driver Name, Refund Type"
                value={this.state.searchText}
                onChangeText={this.updateSearch}
              />

              <Image
                source={require('../images/ic_search.png')}
                style={styles.searchIcon}
              />
            </View>
            <Button
              onPress={this.goToBondReturnEntryEditScreen}
              mode="contained"
              color={Colors.textColor1}
              uppercase={false}
              style={{
                borderRadius: 20,
                marginHorizontal: 20,
                marginTop: 16,
              }}>
              Add new refund
            </Button>
          </View>

          <View style={styles.mainContainer}>
            {this.state.isNetworkAvailable ? (
              <View style={styles.mainContainer}>
                {this.state.isLoading && <Loader />}
                <FlatList
                  data={this.state.data.length > 0 ? this.state.data : []}
                  renderItem={(item, index) =>
                    this.setRenderItemView(item, index)
                  }
                  listKey={(item, index) => item.bond_refund_id}
                  keyExtractor={(item, index) => item.bond_refund_id}
                  style={styles.flatListStyle}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={() => this.emptyPlaceHolderView()}
                />
              </View>
            ) : null}
          </View>
        </View>

        {this.state.isViewRemarksModalVisible ? (
          <ViewRemarksModal
            isModalVisible={this.state.isViewRemarksModalVisible}
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
  filterMainContainer: {
    paddingTop: 25,
    paddingBottom: 12,
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
  listItemContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: Colors.editTextBgColor,
    padding: 12,
  },
  flatListStyle: {
    marginBottom: 5,
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    // flex: 1
  },
  refundStatusContainer: {
    flexDirection: 'row',
  },
  fullRefundTextStyle: {
    fontSize: 13,
    // fontFamily: fontSelector("bold"),
    color: '#1E8449',
    flex: 1,
    alignSelf: 'center',
  },
  partialRefundTextStyle: {
    fontSize: 13,
    // fontFamily: fontSelector("bold"),
    color: '#1E8449',
    flex: 1,
    alignSelf: 'center',
  },
  statusContainer: {
    // flex: 1,
    borderRadius: 20,
    backgroundColor: Colors.blueBackground,
    alignSelf: 'baseline',
  },
  statusTextStyle: {
    fontSize: 12,
    // fontFamily: fontSelector("bold"),
    color: Colors.blue,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  settleStatusContainer: {
    borderRadius: 20,
    backgroundColor: Colors.textColor1,
    alignSelf: 'baseline',
  },
  settleStatusTextStyle: {
    fontSize: 12,
    // fontFamily: fontSelector("bold"),
    color: Colors.white,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  nameAndDcContainer: {
    flexDirection: 'row',
  },
  nameTextStyle: {
    fontSize: 15,
    // fontFamily: fontSelector("bold"),
    color: Colors.black,
  },
  dcNoTextStyle: {
    fontSize: 15,
    // fontFamily: fontSelector("bold"),
    color: Colors.black,
  },
  infoContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 5,
  },
  infoContainerTwo: {
    flexDirection: 'row',
    alignSelf: 'baseline',
    marginTop: 5,
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
  },
  viewRemarksTextStyle: {
    fontSize: 13,
    // fontFamily: fontSelector("bold"),
    color: Colors.black,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    flex: 1,
    marginTop: 5,
    textDecorationLine: 'underline',
  },
});
