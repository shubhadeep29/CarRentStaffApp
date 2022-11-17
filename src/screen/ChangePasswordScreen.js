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
import AppBarWithMenu from '../component/AppBarWithMenu';
import LoaderView from '../component/LoaderView'
import Loader from '../component/Loader';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Constants from '../utils/Constants';
import Links from '../utils/Links';
import Utils from '../utils/Utils';



export default class ChangePasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNetworkAvailable: true,
            isLoading: false,
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        }
    }

    componentDidMount = async () => {
        this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
        this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);
    }

    onClickSubmitButton() {
        if (this.state.oldPassword == "") {
            Toast.show("Please enter old password", Toast.SHORT);
        }
        else if (this.state.newPassword == "") {
            Toast.show("Please enter new password", Toast.SHORT);
        }
        else if (this.state.confirmNewPassword == "") {
            Toast.show("Please enter confirm password", Toast.SHORT);
        } 
        else if (this.state.newPassword != this.state.confirmNewPassword) {
            Toast.show("Confirm password is not matched with new password", Toast.SHORT);
        }
        else {
            try {
                NetInfo.fetch().then(state => {
                    if (state.isConnected) {
                        this.callChangePasswordApi();
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

    callChangePasswordApi = async () => {
        this.setState({ isLoading: true });

        var inputBody = JSON.stringify({
            device_type: "1",
            user_id: this.userId,
            token_key: this.apiKey,
            old_password: this.state.oldPassword,
            new_password: this.state.newPassword,
        });


        try {
            console.log("Call Change password API Link ========>  ", Links.LOGOUT);
            console.log("Change password Input ========>  ", JSON.stringify(inputBody));
            const res = await fetch(Links.CHANGE_PASSWORD, {
                method: 'POST',
                body: inputBody,
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
            });
            const responseJSON = await res.json();
            console.log("Change password Response ===========>  ", JSON.stringify(responseJSON));
            if (responseJSON) {
                this.setState({ isLoading: false });
                if (responseJSON.hasOwnProperty("status") && responseJSON.status == 1) {

                    if (responseJSON.hasOwnProperty("message") && responseJSON.message) {
                        Toast.show(responseJSON.message, Toast.SHORT);
                    }

                    this.props.navigation.goBack();

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


    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.isLoading && <LoaderView />}
                <AppBarWithMenu title="Change Password" navigation={this.props.navigation}  />

                <View style={styles.bottomViewContainer}>

                    <Text numberOfLines={1} style={styles.headingTextStyle} >Old Password</Text>
                    <View style={styles.editTextContainer}>
                        <TextInput
                            style={styles.emailIdEditTextStyle}
                            autoCapitalize="none"
                            multiline={false}
                            height={48}
                            secureTextEntry
                            placeholderTextColor={Colors.placeholderColor}
                            // placeholder="Email Id"
                            value={this.state.oldPassword}
                            onChangeText={(value) => this.setState({ oldPassword: value })}
                            onSubmitEditing={() => { this.newPasswordTextInput.focus() }}
                            blurOnSubmit={false}
                        />
                    </View>


                    <Text numberOfLines={1} style={styles.headingTextStyle} >New Password</Text>
                    <View style={styles.editTextContainer}>
                        <TextInput
                            style={styles.emailIdEditTextStyle}
                            autoCapitalize="none"
                            multiline={false}
                            height={48}
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


                    <Text numberOfLines={1} style={styles.headingTextStyle} >Confirm New Password</Text>
                    <View style={styles.editTextContainer}>
                        <TextInput
                            style={styles.emailIdEditTextStyle}
                            autoCapitalize="none"
                            multiline={false}
                            height={48}
                            secureTextEntry
                            placeholderTextColor={Colors.placeholderColor}
                            // placeholder="Email Id"
                            value={this.state.confirmNewPassword}
                            onChangeText={(value) => this.setState({ confirmNewPassword: value })}
                            ref={(input) => { this.confirmNewPasswordTextInput = input; }}
                            blurOnSubmit={false}
                        />
                    </View>


                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.onClickSubmitButton()}>
                        <Text numberOfLines={1} style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>

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
        borderTopStartRadius: 40,
        paddingVertical: 10
    },

    editTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 25,
        marginHorizontal: 30,
        marginTop: 5,
    },
    emailIdEditTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
    },
    headingTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        paddingHorizontal: 40,
        marginTop: 25
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

});