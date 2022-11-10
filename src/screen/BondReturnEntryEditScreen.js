import React, { useState } from 'react';
import {
    Image, FlatList,
    Text,
    View,
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


export default class BondReturnEntryEditScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNetworkAvailable: true,
            isLoading: false,
            driver: "",
            totalBondAmount: "",
            driverBoundAmount: "",
            refundType: "",
            amountWantToReturn: "",
            noticeDate: "",
            boundRefundDueDate: "",
            remark: "",
        }
    }

    onClickSubmitButton() {

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <CommonAppBar title="Bond Return Entry" navigation={this.props.navigation} />

                <ScrollView >
                    <View style={styles.bottomViewContainer}>
                        <Text numberOfLines={1} style={styles.headingOneTextStyle} >Settle Bond Return</Text>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Driver</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.driver}
                                onChangeText={(value) => this.setState({ driver: value })}
                                onSubmitEditing={() => { this.totalBondAmountTextInput.focus() }}
                                blurOnSubmit={false}
                            />
                        </View>


                        <Text numberOfLines={1} style={styles.headingTextStyle} >Total Bond Amount</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.totalBondAmount}
                                onChangeText={(value) => this.setState({ totalBondAmount: value })}
                                onSubmitEditing={() => { this.driverBoundAmountTextInput.focus() }}
                                ref={(input) => { this.totalBondAmountTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>



                        <Text numberOfLines={1} style={styles.headingTextStyle} >Driver Refund Amount</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.driverBoundAmount}
                                onChangeText={(value) => this.setState({ driverBoundAmount: value })}
                                onSubmitEditing={() => { this.refundTypeTextInput.focus() }}
                                ref={(input) => { this.driverBoundAmountTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>



                        <Text numberOfLines={1} style={styles.headingTextStyle} >Refund Type</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.refundType}
                                onChangeText={(value) => this.setState({ refundType: value })}
                                onSubmitEditing={() => { this.amountWantToReturnTextInput.focus() }}
                                ref={(input) => { this.refundTypeTextInput = input; }}
                                blurOnSubmit={false}
                            />

                            <Image
                                source={require('../images/down_arow.png')}
                                style={styles.dropdownIcon}
                            />
                        </View>



                        <Text numberOfLines={1} style={styles.headingTextStyle} >Amount Want to Return</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.amountWantToReturn}
                                onChangeText={(value) => this.setState({ amountWantToReturn: value })}
                                onSubmitEditing={() => { this.noticeDateTextInput.focus() }}
                                ref={(input) => { this.amountWantToReturnTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>


                        <Text numberOfLines={1} style={styles.headingTextStyle} >Notice Date</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                placeholder="DD/MM/YYYY"
                                value={this.state.noticeDate}
                                onChangeText={(value) => this.setState({ noticeDate: value })}
                                onSubmitEditing={() => { this.boundRefundDueDateTextInput.focus() }}
                                ref={(input) => { this.noticeDateTextInput = input; }}
                                blurOnSubmit={false}
                            />
                            <Image
                                source={require('../images/calendar.png')}
                                style={{ alignSelf: 'center', height: 15, width: 15 }}
                            />
                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Bound Refund Due Date</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                placeholder="DD/MM/YYYY"
                                value={this.state.boundRefundDueDate}
                                onChangeText={(value) => this.setState({ boundRefundDueDate: value })}
                                onSubmitEditing={() => { this.remarkTextInput.focus() }}
                                ref={(input) => { this.boundRefundDueDateTextInput = input; }}
                                blurOnSubmit={false}
                            />
                            <Image
                                source={require('../images/calendar.png')}
                                style={{ alignSelf: 'center', height: 15, width: 15 }}
                            />
                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Remark</Text>
                        <View style={styles.remarksStyle}>
                            <TextInput
                                style={styles.remarksTextStyle}
                                autoCapitalize="none"
                                multiline={true}
                                placeholderTextColor={Colors.placeholderColor}
                                placeholder="Enter your remarks"
                                value={this.state.remark}
                                onChangeText={(value) => this.setState({ remark: value })}
                                ref={(input) => { this.refundTypeTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>


                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.submitStyle}
                                onPress={() => this.onClickSubmitButton()}>
                                <Text numberOfLines={1} style={styles.buttonText}>SETTLE</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.cancleStyle}
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
        width: 50,
        resizeMode: 'contain',
        height: 50,

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
        paddingHorizontal: 25,
        marginHorizontal: 30,
        marginTop: 5,
        flex: 1,
        flexDirection: 'row'
    },
    emailIdEditTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.placeholderColor,
        flex: 1
    },
    headingTextStyle: {
        fontSize: 14,
        // fontFamily: fontSelector("regular"),
        color: Colors.placeholderColor,
        paddingHorizontal: 50,
        marginTop: 8
    },
    headingOneTextStyle: {
        fontSize: 16,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        paddingHorizontal: 50,
        marginTop: 25
    },
    remarksStyle: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginHorizontal: 30,
        marginTop: 5,
        height: 100
    },
    remarksTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        flex: 1,
        textAlignVertical: 'top',
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
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        paddingHorizontal: 40
    },
    submitStyle: {
        backgroundColor: Colors.textColor1,
        borderRadius: 30,
        paddingVertical: 10,
        marginEnd: 10,
        flex: 1,
    },
    cancleStyle: {
        backgroundColor: Colors.pink,
        borderRadius: 30,
        paddingVertical: 10,
        marginStart: 10,
        flex: 1,
    },
    buttonText: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.white,
        textAlign: 'center',
    },
    dropdownIcon: {
        alignSelf: 'center',
        height: 20,
        width: 20
    }
});