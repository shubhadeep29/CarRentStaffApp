import React, { useState } from 'react';
import {
    Image, FlatList,
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
import AppBarWithMenu from '../component/AppBarWithMenu';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Constants from '../utils/Constants';
import Links from '../utils/Links';
import Utils from '../utils/Utils';
import LoaderView from '../component/LoaderView'


export default class ValidateOrApproveDriverScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isNetworkAvailable: true,
            isLoading: false,
            data:[],
            // data: [
            //     {
            //         id: 1,
            //         status: "Active",
            //         name: "Sudhir Biswas",
            //         mobile: "9876543210",
            //         email: "sbiswas68532@gmail.com",
            //         address: "Baikunthapur, Tribeni, Hooghly, 712503",
            //         license_no: "H98653",
            //         driver_expire_date: "12/09/2023"
            //     },
            //     {
            //         id: 2,
            //         status: "Pending",
            //         name: "Sudhir Biswas",
            //         mobile: "9876543210",
            //         email: "sbiswas68532@gmail.com",
            //         address: "Baikunthapur, Tribeni, Hooghly, 712503",
            //         license_no: "H98653",
            //         driver_expire_date: "12/09/2023"
            //     },
            //     {
            //         id: 3,
            //         status: "Active",
            //         name: "Sudhir Biswas",
            //         mobile: "9876543210",
            //         email: "sbiswas68532@gmail.com",
            //         address: "Baikunthapur, Tribeni, Hooghly, 712503",
            //         license_no: "H98653",
            //         driver_expire_date: "12/09/2023"
            //     },
            //     {
            //         id: 4,
            //         status: "Pending",
            //         name: "Sudhir Biswas",
            //         mobile: "9876543210",
            //         email: "sbiswas68532@gmail.com",
            //         address: "Baikunthapur, Tribeni, Hooghly, 712503",
            //         license_no: "H98653",
            //         driver_expire_date: "12/09/2023"
            //     },
            //     {
            //         id: 5,
            //         status: "Active",
            //         name: "Sudhir Biswas",
            //         mobile: "9876543210",
            //         email: "sbiswas68532@gmail.com",
            //         address: "Baikunthapur, Tribeni, Hooghly, 712503",
            //         license_no: "H98653",
            //         driver_expire_date: "12/09/2023"
            //     },
            //     {
            //         id: 6,
            //         status: "Pending",
            //         name: "Sudhir Biswas",
            //         mobile: "9876543210",
            //         email: "sbiswas68532@gmail.com",
            //         address: "Baikunthapur, Tribeni, Hooghly, 712503",
            //         license_no: "H98653",
            //         driver_expire_date: "12/09/2023"
            //     },
            // ],
        }
    }

    componentDidMount = async () => {
        this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
        this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);
        this.loadingDriverList()
    }

    loadingDriverList() {
        try {
            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    this.callDriverListApi();
                }
                else {
                    Utils.showMessageAlert("No internet connection")
                }
            });
        }
        catch (error) {
            console.log("Error in webservice call : " + error);
        }
    }

    callDriverListApi = async () => {
        this.setState({ isLoading: true });

        var inputBody = JSON.stringify({
            device_type: "1",
            user_id: this.userId,
            token_key: this.apiKey,
        });


        try {
            console.log("Call driver list API Link ========>  ", Links.DRIVER_LIST);
            console.log("Driver list Input ========>  ", JSON.stringify(inputBody));
            const res = await fetch(Links.DRIVER_LIST, {
                method: 'POST',
                body: inputBody,
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
            });
            const responseJSON = await res.json();
            console.log("Driver list Response ===========>  ", JSON.stringify(responseJSON));
            if (responseJSON) {
                this.setState({ isLoading: false });
                if (responseJSON.hasOwnProperty("status") && responseJSON.status == 1) {

                    if (responseJSON.hasOwnProperty("driver_list") && responseJSON.driver_list != null) {
                        this.setState({ data: responseJSON.driver_list });
                    }
                }
                else if (responseJSON.hasOwnProperty("status") && responseJSON.status == 0) {
                    if (responseJSON.hasOwnProperty("message") && responseJSON.message) {
                        Toast.show(responseJSON.message, Toast.SHORT);
                    } else {
                        Toast.show("something went wrong", Toast.SHORT);
                    }
                }
            }
        }
        catch (error) {
            this.setState({ isLoading: false });
            Toast.show("something went wrong", Toast.SHORT);
            console.log("Exception in API call: " + error);
        }
    }



    goToValidatedScreen = (item) => {
        this.props.navigation.navigate('ValidateStepOneScreen', {
            item: item
        })
    }

    setRenderItemView = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.listItemContainer} activeOpacity={1} key={item.id}
            // onPress={() => this.props.navigation.navigate('CourseLearningSelectionDetails', { pageTitle: item.book_name })}
            >
                <View style={styles.rowView}>
                    <View style={styles.mainContainer}>
                        <View style={item.status == "1" ? styles.statusContainer : styles.pendingStatusContainer}>
                            <Text style={item.status == "1" ? styles.statusTextStyle : styles.pendingStatusTextStyle}>{item.status == "1" ? "Active" : "Pending"}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.validateContainer} onPress={() => this.goToValidatedScreen(item)}>
                        <Image
                            source={require('../images/ic_edit_white.png')}
                            style={styles.validateIcon}
                        />
                        <Text style={styles.validateTextStyle}>Validate</Text>
                    </TouchableOpacity>
                </View>




                <View style={styles.nameAndMobileContainer}>
                    <Text style={styles.nameTextStyle}>{item.first_name} {item.middle_name} {item.last_name}   |   </Text>
                    <Text style={styles.mobileTextStyle}>{item.mobile}</Text>
                </View>

                <Text style={styles.infoTextStyle}>{item.email}</Text>
                <Text style={styles.infoTextStyle}>{item.flat_no}, {item.street_name}, {item.street_no}, {item.suburb}, {item.pin}</Text>


                <View style={styles.infoContainer}>
                    <View style={styles.infoContainerOne}>
                        <Text style={styles.infoHeadingTextStyleTwo}>License No</Text>
                        <Text style={styles.infoTextStyleTwo}>{item.licence_no}</Text>
                    </View>


                    <View style={styles.infoContainerTwo}>
                        <Text style={styles.infoHeadingTextStyleTwo}>Driver Expire</Text>
                        <Text style={styles.infoTextStyleTwo}>{item.licence_expiry}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }


    emptyPlaceHolderView = () => {
        return (
            <View style={styles.noDataPlaceHolderContainer}>
                <Text style={styles.noDataPlaceHolderTextStyle}>No Data Found</Text>
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <AppBarWithMenu title="Validate/Approve Driver" navigation={this.props.navigation} />

                <View style={styles.bottomViewContainer}>

                    <View style={styles.mainContainer}>
                    {this.state.isLoading && <Loader />}
                        {this.state.isNetworkAvailable ?
                            <View style={styles.mainContainer}>
                                {this.state.isLoading && <Loader />}
                                {this.state.data.length > 0 ?
                                    <FlatList
                                        data={this.state.data}
                                        renderItem={(item, index) => this.setRenderItemView(item, index)}
                                        listKey={(item, index) => 'LC' + item.id}
                                        keyExtractor={(item, index) => item.id}
                                        style={styles.flatListStyle}
                                        showsVerticalScrollIndicator={false}
                                    />
                                    :
                                    this.emptyPlaceHolderView()
                                }
                            </View>
                            :
                            null
                        }
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
        justifyContent: "center",
        alignItems: "center"
    },
    bottomViewContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        marginTop: 10,
        borderTopEndRadius: 40,
        borderTopStartRadius: 40
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
        marginTop: 35,
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
    statusContainer: {
        // flex: 1,
        borderRadius: 20,
        backgroundColor: Colors.blueBackground,
        alignSelf: 'baseline'
    },
    statusTextStyle: {
        fontSize: 12,
        // fontFamily: fontSelector("bold"),
        color: Colors.blue,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingVertical: 3
    },
    pendingStatusContainer: {
        borderRadius: 20,
        backgroundColor: Colors.yellowBackground,
        alignSelf: 'baseline'
    },
    pendingStatusTextStyle: {
        fontSize: 12,
        // fontFamily: fontSelector("bold"),
        color: Colors.yellow,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingVertical: 3
    },
    nameAndMobileContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    nameTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        fontWeight: 'bold'
    },
    mobileTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        fontWeight: 'bold'
    },
    infoTextStyle: {
        fontSize: 14,
        // fontFamily: fontSelector("bold"),
        color: '#7F8C8D',
        marginTop: 2
    },
    infoContainer: {
        flexDirection: 'row',
        marginTop: 3,
        // flex: 1,
        // backgroundColor: 'purple'
    },
    infoContainerOne: {
        flexDirection: 'row',
        flex: 1,
    },
    infoContainerTwo: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        alignItems:'flex-end',
    },
    infoHeadingTextStyleTwo: {
        fontSize: 11,
        // fontFamily: fontSelector("bold"),
        color: '#7F8C8D',
    },
    infoTextStyleTwo: {
        fontSize: 11,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        fontWeight: 'bold',
        marginStart: 8,
        // flex: 1,
    },
    rowView: {
        flexDirection: 'row',
    },
    validateIcon: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    validateContainer: {
        backgroundColor: Colors.textColor1,
        borderRadius: 2,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 3
    },
    validateTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: Colors.white,
        marginStart: 4
    }
});