import React, { useState } from 'react';
import {
    Image,
    FlatList,
    Text,
    View, Keyboard,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    ScrollView,
} from 'react-native';
import * as Colors from '../utils/Colors';
import AdaptiveStatusBar from '../component/AdaptiveStatusBar';
import Loader from '../component/Loader';
import CommonAppBar from '../component/CommonAppBar';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Constants from '../utils/Constants';
import Links from '../utils/Links';
import Utils from '../utils/Utils';
import LoaderView from '../component/LoaderView'


export default class AddNewCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNetworkAvailable: true,
            isLoading: false,
            deviceType: "1",
            carNo: "car-1234",
            model: "TataV29878",
            fuleType: "Diesel",
            make: "Tata1",
            isHybrid: 0,
            status: 0,
            year: "2011",
            regoExpireDate: "30/11/2023",
            insuranceExpireDate: "30/10/2023",
            carImage: null,
            carId: "1",
            isHybridChecked: false,
            isCarStatusChecked: false,
        }
    }


    componentDidMount = async () => {
        this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
        this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);
    }

    onClickSubmitButton() {

    }

    callAddNewCarValidation() {
        Keyboard.dismiss();
        if (this.state.carNo == "") {
            Toast.show("Please enter Car No", Toast.SHORT);
        }
        else if (this.state.model == "") {
            Toast.show("Please enter model", Toast.SHORT);
        }
        else if (this.state.fuleType == "") {
            Toast.show("Please enter Fule Type", Toast.SHORT);
        }
        else if (this.state.make == "") {
            Toast.show("Please enter make", Toast.SHORT);
        }
        else if (this.state.year == "") {
            Toast.show("Please enter Year", Toast.SHORT);
        }
        else if (this.state.regoExpireDate == "") {
            Toast.show("Please enter Rego Expire Date", Toast.SHORT);
        }
        else if (this.state.insuranceExpireDate == "") {
            Toast.show("Please enter Insurance Expire Date", Toast.SHORT);
        }
        // else if (this.state.carImage == null) {
        //   Toast.show("Please enter Car Image", Toast.SHORT);
        // }
        else {
            try {
                NetInfo.fetch().then(state => {
                    if (state.isConnected) {
                        this.callAddNewCarApi();
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
    }

    callAddNewCarApi = async () => {
        this.setState({ isLoading: true });

        var formData = new FormData();
        formData.append('token_key', this.apiKey);
        formData.append('device_type', this.state.deviceType);
        formData.append('user_id', this.state.userId);
        formData.append('car_no', this.state.carNo);
        formData.append('make', this.state.make);
        formData.append('model', this.state.model);
        formData.append('year', this.state.year);
        formData.append('fuel_type', this.state.fuleType);
        formData.append('is_hybrid', this.state.isHybrid);
        formData.append('status', this.state.status);
        formData.append('rego_expire_date', this.state.regoExpireDate);
        formData.append('insurance_expire_date', this.state.insuranceExpireDate);
        formData.append('car_image', this.state.carImage);
        formData.append('car_id', this.state.carId);



        try {
            console.log("Call Car Edit API ========>  ", JSON.stringify(formData));
            const res = await fetch(Links.EDIT_CAR, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: "application/json",
                    //   'Content-Type': 'application/json',
                    "Content-Type": "multipart/form-data",
                },
            });
            const responseJSON = await res.json();
            console.log("Car Edit Response ===========>  ", JSON.stringify(responseJSON));
            if (responseJSON) {
                if (responseJSON.hasOwnProperty("status") && responseJSON.status == 1) {
                    this.setState({ isLoading: false });
                    if (responseJSON.hasOwnProperty("message") && responseJSON.message) {
                        Toast.show(responseJSON.message, Toast.SHORT);
                    }
                    this.props.navigation.goBack()

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

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.isLoading && <LoaderView />}
                <CommonAppBar title="Add New Car" navigation={this.props.navigation} />

                <ScrollView >
                    <View style={styles.bottomViewContainer}>
                        <Text numberOfLines={1} style={styles.headingTextStyle} >Car No. *</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                secureTextEntry
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.oldPassword}
                                onChangeText={(value) => this.setState({ oldPassword: value })}
                                onSubmitEditing={() => { this.newPasswordTextInput.focus() }}
                                blurOnSubmit={false}
                            />
                        </View>


                        <Text numberOfLines={1} style={styles.headingTextStyle} >Model *</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                secureTextEntry
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.newPassword}
                                onChangeText={(value) => this.setState({ newPassword: value })}
                                onSubmitEditing={() => { this.confirmNewPasswordTextInput.focus() }}
                                ref={(input) => { this.newPasswordTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>



                        <Text numberOfLines={1} style={styles.headingTextStyle} >Fuel Type</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                secureTextEntry
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.oldPassword}
                                onChangeText={(value) => this.setState({ oldPassword: value })}
                                onSubmitEditing={() => { this.newPasswordTextInput.focus() }}
                                blurOnSubmit={false}
                            />
                        </View>



                        <Text numberOfLines={1} style={styles.headingTextStyle} >Make</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                secureTextEntry
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.oldPassword}
                                onChangeText={(value) => this.setState({ oldPassword: value })}
                                onSubmitEditing={() => { this.newPasswordTextInput.focus() }}
                                blurOnSubmit={false}
                            />
                        </View>



                        <Text numberOfLines={1} style={styles.headingTextStyle} >Year</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                secureTextEntry
                                placeholderTextColor={Colors.placeholderColor}
                                placeholder="DD/MM/YYYY"
                                value={this.state.oldPassword}
                                onChangeText={(value) => this.setState({ oldPassword: value })}
                                onSubmitEditing={() => { this.newPasswordTextInput.focus() }}
                                blurOnSubmit={false}
                            />

                            <Image
                                source={require('../images/calendar.png')}
                                style={styles.calenderIcon}
                            />
                        </View>


                        <Text numberOfLines={1} style={styles.headingTextStyle} >Insurance Expire Date *</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                secureTextEntry
                                placeholderTextColor={Colors.placeholderColor}
                                placeholder="DD/MM/YYYY"
                                value={this.state.confirmNewPassword}
                                onChangeText={(value) => this.setState({ confirmNewPassword: value })}
                                ref={(input) => { this.confirmNewPasswordTextInput = input; }}
                                blurOnSubmit={false}
                            />

                            <Image
                                source={require('../images/calendar.png')}
                                style={styles.calenderIcon}
                            />
                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Rego Expire Date *</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                secureTextEntry
                                placeholderTextColor={Colors.placeholderColor}
                                placeholder="DD/MM/YYYY"
                                value={this.state.confirmNewPassword}
                                onChangeText={(value) => this.setState({ confirmNewPassword: value })}
                                ref={(input) => { this.confirmNewPasswordTextInput = input; }}
                                blurOnSubmit={false}
                            />

                            <Image
                                source={require('../images/calendar.png')}
                                style={styles.calenderIcon}
                            />
                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Upload Photo</Text>
                        <View style={{
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

                        }}>

                            <Image
                                source={require('../images/ic_add_camera.png')}
                                style={styles.logoIcon}
                            />

                            <Text numberOfLines={1} style={styles.uploadPhotoText} >Upload Photo</Text>
                        </View>


                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignContent: 'center',
                            alignItems: 'center',
                            marginTop: 25,
                            paddingHorizontal: 50
                        }}>
                            <Text numberOfLines={1} style={styles.headingTextStyleTwo} >Hybrid</Text>

                            <TouchableOpacity onPress={() => this.setState({ isHybridChecked: !this.state.isHybridChecked })}>
                                <Image
                                    source={this.state.isHybridChecked ? require('../images/ic_radio_check.png') : require('../images/ic_radio_uncheck.png')}
                                    style={styles.checkUncheckIcon}
                                />
                            </TouchableOpacity>
                            <Text numberOfLines={1} style={styles.optionTextStyle} >YES</Text>

                            <TouchableOpacity onPress={() => this.setState({ isHybridChecked: !this.state.isHybridChecked })}>
                                <Image
                                    source={this.state.isHybridChecked ? require('../images/ic_radio_check.png') : require('../images/ic_radio_uncheck.png')}
                                    style={styles.checkUncheckIcon}
                                />
                            </TouchableOpacity>
                            <Text numberOfLines={1} style={styles.optionTextStyle} >NO</Text>
                        </View>


                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignContent: 'center',
                            alignItems: 'center',
                            marginTop: 25,
                            paddingHorizontal: 50
                        }}>
                            <Text numberOfLines={1} style={styles.headingTextStyleTwo} >Car Status</Text>

                            <TouchableOpacity onPress={() => this.setState({ isCarStatusChecked: !this.state.isCarStatusChecked })}>
                                <Image
                                    source={this.state.isCarStatusChecked ? require('../images/ic_radio_check.png') : require('../images/ic_radio_uncheck.png')}
                                    style={styles.checkUncheckIcon}
                                />
                            </TouchableOpacity>
                            <Text numberOfLines={1} style={styles.optionTextStyle} >ACTIVE</Text>

                            <TouchableOpacity onPress={() => this.setState({ isCarStatusChecked: !this.state.isCarStatusChecked })}>
                                <Image
                                    source={this.state.isCarStatusChecked ? require('../images/ic_radio_check.png') : require('../images/ic_radio_uncheck.png')}
                                    style={styles.checkUncheckIcon}
                                />
                            </TouchableOpacity>
                            <Text numberOfLines={1} style={styles.optionTextStyle} >INACTIVE</Text>
                        </View>


                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignContent: 'center',
                            alignItems: 'center',
                            marginTop: 25,
                            paddingHorizontal: 40
                        }}>
                            <TouchableOpacity style={{
                                backgroundColor: Colors.textColor1,
                                borderRadius: 30,
                                paddingVertical: 10,
                                marginEnd: 10,
                                flex: 1,
                            }}
                                onPress={() => this.callAddNewCarValidation()}>
                                <Text numberOfLines={1} style={styles.buttonText}>SUBMIT</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                backgroundColor: '#EB4655',
                                borderRadius: 30,
                                paddingVertical: 10,
                                flex: 1,
                            }}
                                onPress={() => this.onClickSubmitButton()}>
                                <Text numberOfLines={1} style={styles.buttonText}>CANCLE</Text>
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
        justifyContent: "center",
        alignItems: "center"
    },
    appbarContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    hambergerIcon: {
        width: 23,
        height: 23,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    titleText: {
        fontSize: 22,
        // fontFamily: fontSelector("regular"),
        color: Colors.textColor1,
        alignItems: "center",
        textAlign: 'center',
        textAlignVertical: 'center',
        flex: 1,
        fontWeight: 'bold'
    },
    bottomViewContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        marginTop: 10,
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        paddingVertical: 10
    },

    editTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 20,
        marginHorizontal: 30,
        marginTop: 5,
        flex: 1,
        flexDirection: 'row'
    },
    emailIdEditTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        flex: 1
    },
    headingTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        paddingHorizontal: 50,
        marginTop: 10
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
        right: 0
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
        alignSelf: 'center'
    },
    uploadPhotoText: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.textColor2,
    },
    checkUncheckIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginStart: 20,
        marginEnd: 5
    }
});