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

    onClickSubmitButton() {

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/* <View style={styles.appbarContainer}>
                    <Image
                        source={require('../images/hamburgericon.png')}
                        style={styles.hambergerIcon}
                    />
                    <Text numberOfLines={1} style={styles.titleText} >Change Password</Text>
                </View> */}

                <AppBarWithMenu title="Change Password" navigation={this.props.navigation} />

                <View style={styles.bottomViewContainer}>

                    <Text numberOfLines={1} style={styles.headingTextStyle} >Old Password</Text>
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


                    <Text numberOfLines={1} style={styles.headingTextStyle} >New Password</Text>
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


                    <Text numberOfLines={1} style={styles.headingTextStyle} >Confirm New Password</Text>
                    <View style={styles.editTextContainer}>
                        <TextInput
                            style={styles.emailIdEditTextStyle}
                            autoCapitalize="none"
                            multiline={false}
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