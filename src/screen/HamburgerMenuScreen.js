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



export default class HamburgerMenuScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
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

    }

    // onmenu() {
    //     this.props.navigation.closeDrawer();
    // }

    onMenuClick(screen) {
        if (screen != "") {
            this.props.navigation.closeDrawer();
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
            screen = ""
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
    mainContainer:{
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