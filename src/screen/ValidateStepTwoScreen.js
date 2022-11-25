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
import CommonAppBar from '../component/CommonAppBar';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../utils/Constants';


export default class ValidateStepTwoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.route.params.item,
            isNetworkAvailable: true,
            isLoading: false,
            selectedUtility: "",
            passportExpireDate: "",
            passportNo: "",
            driverExpireDate: "",
            driverLICNo: "",
            isAustralianLicenceYes: true,
            isAustralianLicenceNo: false
        }
    }

    componentDidMount = async () => {
        this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
        this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);
        // this.item = this.props.params.item;

        console.log(this.state.item)

        this.setState({
            selectedUtility: this.state.item.utility_bill,
            passportExpireDate: this.state.item.passport_expiry,
            passportNo: this.state.item.passport_no,
            driverExpireDate: this.state.item.licence_expiry,
            driverLICNo: this.state.item.licence_no,
            isAustralianLicenceYes: this.state.item.is_australian_licence === "Yes" ? true : false,
            isAustralianLicenceNo: this.state.item.is_australian_licence === "No" ? true : false,

        })
    }


    goToNextScreen = () => {
        let item = this.state.item
        item.utility_bill = this.state.selectedUtility;
        item.passport_expiry = this.state.passportExpireDate;
        item.passport_no = this.state.passportNo;
        item.licence_expiry = this.state.driverExpireDate;
        item.licence_no = this.state.driverLICNo;
        item.is_australian_licence = this.state.isAustralianLicenceYes;
        this.setState({
            item: item
        })

        console.log("++++++++++++", item)
        this.props.navigation.navigate('ValidateStepThreeScreen', {
            item: item
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <CommonAppBar title="Validate/Approve Driver" navigation={this.props.navigation} />

                <View style={styles.bottomViewContainer}>
                    <View style={styles.indicatorMainContainer}>
                        <View style={styles.selectedIndicatorContainer}>
                            <Text numberOfLines={1} style={styles.selectedIndicatorText}>1</Text>
                        </View>

                        <View style={styles.selectedIndicatorContainer}>
                            <Text numberOfLines={1} style={styles.selectedIndicatorText}>2</Text>
                        </View>

                        <View style={styles.indicatorContainer}>
                            <Text numberOfLines={1} style={styles.indicatorText}>3</Text>
                        </View>

                        <View style={styles.indicatorContainer}>
                            <Text numberOfLines={1} style={styles.indicatorText}>4</Text>
                        </View>

                        <View style={styles.indicatorContainer}>
                            <Text numberOfLines={1} style={styles.indicatorText}>5</Text>
                        </View>
                    </View>


                    <ScrollView>
                        <View>
                            <Text numberOfLines={1} style={styles.headingTextStyle} >Driver LIC No.</Text>

                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    // placeholder="Email Id"
                                    value={this.state.driverLICNo}
                                    onChangeText={(value) => this.setState({ driverLICNo: value })}
                                    onSubmitEditing={() => { this.driverExpireDateTextInput.focus() }}
                                    blurOnSubmit={false}
                                />
                            </View>


                            <Text numberOfLines={1} style={styles.headingTextStyle} >Driver Expire</Text>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    placeholder="DD/MM/YYYY"
                                    value={this.state.driverExpireDate}
                                    onChangeText={(value) => this.setState({ driverExpireDate: value })}
                                    onSubmitEditing={() => { this.passportNoTextInput.focus() }}
                                    ref={(input) => { this.driverExpireDateTextInput = input; }}
                                    blurOnSubmit={false}
                                />
                                <Image
                                    source={require('../images/calendar.png')}
                                    style={{ alignSelf: 'center', height: 15, width: 15 }}
                                />
                            </View>

                            <View style={styles.rowViewOptionStyle}>
                                <Text numberOfLines={1} style={styles.headingTextStyleTwo} >Australian Licence</Text>

                                <TouchableOpacity onPress={() => this.setState({
                                    isAustralianLicenceYes: true,
                                    isAustralianLicenceNo: false
                                })}>
                                    <Image
                                        source={this.state.isAustralianLicenceYes ? require('../images/ic_radio_check.png') : require('../images/ic_radio_uncheck.png')}
                                        style={styles.checkUncheckIcon}
                                    />
                                </TouchableOpacity>
                                <Text numberOfLines={1} style={styles.optionTextStyle} >YES</Text>

                                <TouchableOpacity onPress={() => this.setState({
                                    isAustralianLicenceYes: false,
                                    isAustralianLicenceNo: true
                                })}>
                                    <Image
                                        source={this.state.isAustralianLicenceNo ? require('../images/ic_radio_check.png') : require('../images/ic_radio_uncheck.png')}
                                        style={styles.checkUncheckIcon}
                                    />
                                </TouchableOpacity>
                                <Text numberOfLines={1} style={styles.optionTextStyle} >NO</Text>
                            </View>



                            <Text numberOfLines={1} style={styles.headingTextStyle} >Passport No.</Text>

                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    // placeholder="Email Id"
                                    value={this.state.passportNo}
                                    onChangeText={(value) => this.setState({ passportNo: value })}
                                    onSubmitEditing={() => { this.passportExpireDateTextInput.focus() }}
                                    ref={(input) => { this.passportNoTextInput = input; }}
                                    blurOnSubmit={false}
                                />
                            </View>


                            <Text numberOfLines={1} style={styles.headingTextStyle} >Passport Expire</Text>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    placeholder="DD/MM/YYYY"
                                    value={this.state.passportExpireDate}
                                    onChangeText={(value) => this.setState({ passportExpireDate: value })}
                                    onSubmitEditing={() => { this.selectedUtilityTextInput.focus() }}
                                    ref={(input) => { this.passportExpireDateTextInput= input; }}
                                    blurOnSubmit={false}
                                />
                                <Image
                                    source={require('../images/calendar.png')}
                                    style={{ alignSelf: 'center', height: 15, width: 15 }}
                                />
                            </View>


                            <Text numberOfLines={1} style={styles.headingTextStyle} >Select Utility</Text>

                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    // placeholder="Email Id"
                                    value={this.state.selectedUtility}
                                    onChangeText={(value) => this.setState({ selectedUtility: value })}
                                    ref={(input) => { this.selectedUtilityTextInput= input; }}
                                    blurOnSubmit={false}
                                />
                            </View>

                            <TouchableOpacity style={styles.buttonContainer}
                                onPress={() => this.goToNextScreen()}>
                                <Text numberOfLines={1} style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>



                        </View>
                    </ScrollView>

                </View>
            </SafeAreaView>
        )
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
    rowView: {
        flexDirection: 'row',
        marginHorizontal: 30,
    },
    bottomViewContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        marginTop: 10,
        borderTopEndRadius: 40,
        borderTopStartRadius: 40
    },
    indicatorMainContainer: {
        flexDirection: 'row',
        paddingHorizontal: 40,
        paddingVertical: 20,
        alignSelf: 'center',
    },
    selectedIndicatorContainer: {
        width: 45,
        height: 45,
        borderRadius: 30,
        backgroundColor: Colors.textColor1,
        marginStart: 17,
    },
    selectedIndicatorText: {
        fontSize: 17,
        // fontFamily: fontSelector("bold"),
        color: Colors.white,
        alignSelf: 'center',
        textAlignVertical: 'center',
        flex: 1
    },
    indicatorContainer: {
        width: 45,
        height: 45,
        borderRadius: 30,
        marginStart: 17,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#C0C2C2',
    },
    indicatorText: {
        fontSize: 17,
        // fontFamily: fontSelector("bold"),
        color: '#C0C2C2',
        alignSelf: 'center',
        textAlignVertical: 'center',
        flex: 1
    },
    headingTextStyle: {
        fontSize: 14,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        paddingHorizontal: 40,
        marginTop: 15
    },
    headingTextStyleTwo: {
        fontSize: 14,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        marginEnd: 20
    },
    optionTextStyle: {
        fontSize: 14,
        // fontFamily: fontSelector("regular"),
        color: Colors.textColor2,
        paddingHorizontal: 20,
    },

    editTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 17,
        marginHorizontal: 30,
        marginTop: 8,
        flexDirection: 'row'
    },
    editTextContainerTwo: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 17,
        marginTop: 5,
        flex: 1,
    },
    emailIdEditTextStyle: {
        fontSize: 14,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        flex: 1,
        paddingVertical: Platform.OS == "ios" ? 16 : 12

    },
    boxGap: {
        width: 15
    },
    buttonContainer: {
        backgroundColor: Colors.textColor1,
        borderRadius: 30,
        paddingVertical: 15,
        marginHorizontal: 30,
        marginTop: 60,
        marginBottom: 10
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
    rowViewOptionStyle: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: 40
    },
    checkUncheckIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        alignSelf: 'center',

    },

});