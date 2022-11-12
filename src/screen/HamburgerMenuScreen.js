import React, { Component } from 'react';
import {
    StyleSheet, Image, View, Text, StatusBar,
    SafeAreaView, TextInput, FlatList
} from 'react-native';
import strings from '../utils/Localization';
import * as Colors from '../utils/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DashboardScreen from './DashboardScreen';
import MyProfileScreen from './MyProfileScreen';
import AdaptiveStatusBar from '../component/AdaptiveStatusBar';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Constants from '../utils/Constants';
import LoaderView from '../component/LoaderView'
import Links from '../utils/Links';
import Utils from '../utils/Utils';




export default class HamburgerMenuScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
            isLoading: false,
            alertMessage: "",
            buttonText: "",
            menuList: [
                { title: "Dashboard", image: require("../images/hamburgericon.png"), flag: "dashboard" },
                { title: "My Profile", image: require("../images/hamburgericon.png"), flag: "profile" },
                { title: "Car Maintaince", image: require("../images/hamburgericon.png"), flag: "carMaintaince" },
                { title: "Validate/Approve Driver", image: require("../images/hamburgericon.png"), flag: "approveDriver" },
                { title: "Rent out Vehicle", image: require("../images/hamburgericon.png"), flag: "rentOutVehicle" },
                { title: "Return in Vehicle", image: require("../images/hamburgericon.png"), flag: "returnInVehicle" },
                { title: "Bond Return Entry", image: require("../images/hamburgericon.png"), flag: "bondReturnEntry" },
                { title: "Change Password", image: require("../images/hamburgericon.png"), flag: "changePassword" },
                { title: "Logout", image: require("../images/hamburgericon.png"), flag: "logout" },
            ],
        }
    }

    componentDidMount = async () => {
        this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
        this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);
    }

    onMenuClick(screen) {
        if (screen != "") {
            this.props.navigation.closeDrawer();
            if (screen == "logout") {
                this.callLogout();
            } else {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{
                        name: screen,
                        // params: {
                        //     userType: "student"
                        // }
                    }],
                });
            }
        }
        else {
            this.props.navigation.closeDrawer();
            this.props.navigation.reset({
                index: 0,
                routes: [{
                    name: 'DashboardScreen',
                    // params: {
                    //     userType: "student"
                    // }
                }],
            });
        }
    }

    callLogout() {
        try {
            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    this.callLogoutApi();
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


    callLogoutApi = async () => {
        this.setState({ isLoading: true });

        var inputBody = JSON.stringify({
            device_type: "1",
            user_id: this.userId,
            token_key: this.apiKey,
        });


        try {
            console.log("Call Logout API Link ========>  ", Links.LOGOUT);
            console.log("Call Logout Input ========>  ", JSON.stringify(inputBody));
            const res = await fetch(Links.LOGOUT, {
                method: 'POST',
                body: inputBody,
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    // "Content-Type": "multipart/form-data",
                },
            });
            const responseJSON = await res.json();
            console.log("Logout Response ===========>  ", JSON.stringify(responseJSON));
            if (responseJSON) {
                if (responseJSON.hasOwnProperty("status") && responseJSON.status == 1) {
                    this.setState({ isLoading: false });

                    await AsyncStorage.setItem(Constants.STORAGE_KEY_USER_ID, "");
                    await AsyncStorage.setItem(Constants.STORAGE_KEY_API_KEY, "");
                    await AsyncStorage.setItem(Constants.STORAGE_KEY_NAME, "");
                    await AsyncStorage.setItem(Constants.STORAGE_KEY_EMAIL, "");
                    await AsyncStorage.setItem(Constants.STORAGE_KEY_MOBILEL, "");

                    if (responseJSON.hasOwnProperty("message") && responseJSON.message) {
                        Toast.show(responseJSON.message, Toast.SHORT);
                    }

                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'LoginScreen' }],
                    });

                }
                else if (responseJSON.hasOwnProperty("status") && responseJSON.status == 0) {
                    this.setState({ isLoading: false });
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

    renderRowItem = ({ item, index }) => {
        var screen = "";
        if (item.flag === "dashboard") {
            screen = "DashboardScreen"
        }
        else if (item.flag === "profile") {
            screen = "MyProfileScreen"
        }
        else if (item.flag === "carMaintaince") {
            screen = ""
        }
        else if (item.flag === "approveDriver") {
            screen = "ValidateOrApproveDriverScreen"
        }
        else if (item.flag === "rentOutVehicle") {
            screen = "RentOutVehicleScreen"
        }
        else if (item.flag === "returnInVehicle") {
            screen = "ReturnInVehicleScreen"
        }
        else if (item.flag === "bondReturnEntry") {
            screen = "BondReturnEntryScreen"
        }
        else if (item.flag === "changePassword") {
            screen = "ChangePasswordScreen"
        }
        else if (item.flag === "logout") {
            screen = "logout"
        }
        else {
            screen = ""
        }




        return (
            <TouchableOpacity onPress={() => this.onMenuClick(screen)}>
                <View style={styles.rowView}>
                    <View style={styles.menuImageContainer}>
                        <Image
                            source={item.image}
                            style={styles.menuImage}
                        />
                    </View>

                    <Text style={[styles.menuTextStyle, { flex: 1 }]}>{item.title}</Text>

                    <Image
                        source={require('../images/ic_right_arrow.png')}
                        style={styles.logoIcon}
                    />
                </View>

                {this.state.menuList.length - 1 == index ?
                    null : <View style={styles.underlineView} />
                }
            </TouchableOpacity>
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <AdaptiveStatusBar />
                {/* {this.state.isLoading && <LoaderView />} */}

                <View style={styles.mainContainer}>
                    <View style={styles.topViewContainer}>
                        <Text style={styles.headingTextStyle}>Menu</Text>

                        <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()}>
                            <Image
                                source={require('../images/ic_cancel.png')}
                                style={styles.closeIcon}
                            />
                        </TouchableOpacity>
                    </View>


                    <FlatList
                        contentContainerStyle={styles.flatListStyle}
                        data={this.state.menuList}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderRowItem}
                    />
                </View>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.textColor1,
    },
    rowView: {
        flexDirection: 'row',
        paddingVertical: 20,
    },
    mainContainer: {
        flex: 1
    },
    topViewContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    underlineView: {
        height: 1,
        backgroundColor: Colors.white,
        marginStart: 50
    },
    menuImageContainer: {
        width: 37,
        height: 40,
        borderRadius: 4,
        backgroundColor: Colors.white
    },
    menuImage: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    menuTextStyle: {
        color: Colors.white,
        // fontFamily: fontSelector('bold'),
        fontSize: 18,
        marginStart: 17,
        textAlignVertical: 'center'
    },
    logoIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    headingTextStyle: {
        color: Colors.white,
        // fontFamily: fontSelector('bold'),
        fontSize: 25,
        flex: 1
    },
    closeIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    flatListStyle: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        flexGrow: 1,
    }
});