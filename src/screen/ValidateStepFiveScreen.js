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


export default class ValidateStepFiveScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNetworkAvailable: true,
            isLoading: false,
            bondAmount: "",
            driverExpireDate: "",
            paymentMethod: "",
            referenceNumber: "",
            adminNote: ""
        }
    }

    goToNextScreen = () => {

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

                        <View style={styles.selectedIndicatorContainer}>
                            <Text numberOfLines={1} style={styles.selectedIndicatorText}>3</Text>
                        </View>

                        <View style={styles.selectedIndicatorContainer}>
                            <Text numberOfLines={1} style={styles.selectedIndicatorText}>4</Text>
                        </View>

                        <View style={styles.selectedIndicatorContainer}>
                            <Text numberOfLines={1} style={styles.selectedIndicatorText}>5</Text>
                        </View>
                    </View>

                    <ScrollView>
                        <View>
                            <Text numberOfLines={1} style={styles.headingOneTextStyle} >Bond Setup</Text>
                            <View style={styles.bondContainer}>
                                <View style={styles.bondAmountContainer}>
                                    <Text numberOfLines={1} style={styles.bondAmountText} >Bond Account</Text>
                                    <View style={styles.editTextContainerForBond}>
                                        <TextInput
                                            style={styles.editTextStyle}
                                            autoCapitalize="none"
                                            multiline={false}
                                            placeholderTextColor={Colors.placeholderColor}
                                            // placeholder="Email Id"
                                            value={this.state.bondAmount}
                                            onChangeText={(value) => this.setState({ bondAmount: value })}
                                            onSubmitEditing={() => { this.dateTextInput.focus() }}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                </View>

                                <View style={styles.boxGap} />

                                <View style={styles.bondAmountContainer}>
                                    <Text numberOfLines={1} style={styles.bondAmountText} >Date</Text>
                                    <View style={styles.editTextContainerForBond}>
                                        <TextInput
                                            style={styles.editTextStyle}
                                            autoCapitalize="none"
                                            multiline={false}
                                            placeholderTextColor={Colors.placeholderColor}
                                            placeholder="DD/MM/YYYY"
                                            value={this.state.driverExpireDate}
                                            onChangeText={(value) => this.setState({ driverExpireDate: value })}
                                            onSubmitEditing={() => { this.paymentMethodTextInput.focus() }}
                                            ref={(input) => { this.dateTextInput = input; }}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                </View>
                            </View>


                            <Text numberOfLines={1} style={styles.headingTextStyle} >Payment Method</Text>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.editTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    // placeholder="Email Id"
                                    value={this.state.paymentMethod}
                                    onChangeText={(value) => this.setState({ paymentMethod: value })}
                                    onSubmitEditing={() => { this.referenceNumberTextInput.focus() }}
                                    ref={(input) => { this.paymentMethodTextInput = input; }}
                                    blurOnSubmit={false}
                                />
                            </View>


                            <Text numberOfLines={1} style={styles.headingTextStyle} >Refarence Number</Text>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.editTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    // placeholder="Email Id"
                                    value={this.state.referenceNumber}
                                    onChangeText={(value) => this.setState({ referenceNumber: value })}
                                    onSubmitEditing={() => { this.radminNoteTextInput.focus() }}
                                    ref={(input) => { this.referenceNumberTextInput = input; }}
                                    blurOnSubmit={false}
                                />
                            </View>


                            <Text numberOfLines={1} style={styles.headingOneTextStyle} >Admin Notes</Text>
                            <View style={styles.adminNoteContainer}>
                                <TextInput
                                    style={styles.adminNoteTextStyle}
                                    autoCapitalize="none"
                                    multiline={true}
                                    placeholderTextColor={Colors.placeholderColor}
                                    placeholder="Type Notes"
                                    value={this.state.adminNote}
                                    onChangeText={(value) => this.setState({ adminNote: value })}
                                    ref={(input) => { this.radminNoteTextInput = input; }}
                                    blurOnSubmit={false}
                                />
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.approveButtonContainer}
                                    onPress={() => this.onClickSubmitButton()}>
                                    <Text numberOfLines={1} style={styles.buttonText}>APPROVE</Text>
                                </TouchableOpacity>
                                <View style={styles.boxGap} />
                                <TouchableOpacity style={styles.cancelButtonContainer}
                                    onPress={() => this.onClickSubmitButton()}>
                                    <Text numberOfLines={1} style={styles.buttonText}>REJECT</Text>
                                </TouchableOpacity>
                            </View>
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
    headingOneTextStyle: {
        fontSize: 16,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        paddingHorizontal: 40,
        marginTop: 25,
        fontWeight: 'bold'
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
    editTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 17,
        marginHorizontal: 30,
        marginTop: 8,
        flexDirection: 'row'
    },
    editTextContainerForBond: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 17,
        // marginStart: 30,
        marginTop: 8,
        flexDirection: 'row',
        flex: 1
    },
    editTextContainerTwo: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 17,
        marginTop: 5,
        flex: 1,
    },
    adminNoteContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginHorizontal: 30,
        marginTop: 5,
        height: 100
    },
    adminNoteTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        flex: 1,
        textAlignVertical: 'top',
    },
    editTextStyle: {
        fontSize: 14,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        flex: 1
    },
    accountHistoryRowView: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 15,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 40
    },
    accountHistoryRDropdownView: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 17,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    accountHistoryTitleView: {
        fontSize: 14,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        flex: 1
    },
    boxGap: {
        width: 15
    },
    calenderIcon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    bondContainer: {
        flexDirection: 'row',
        marginHorizontal: 30,
        // backgroundColor: 'purple'
    },
    bondAmountContainer: {
        flexDirection: 'column',
        flex: 1,
        // backgroundColor: 'yellow'
    },
    bondAmountText: {
        fontSize: 14,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        marginTop: 15,
        paddingStart: 10
    },
    buttonContainer: {
        marginHorizontal: 30,
        flexDirection: 'row',
        marginTop: 100,
        marginBottom: 20
    },
    approveButtonContainer: {
        backgroundColor: Colors.textColor1,
        borderRadius: 30,
        paddingVertical: 13,
        flex: 1
    },
    cancelButtonContainer: {
        backgroundColor: Colors.pink,
        borderRadius: 30,
        paddingVertical: 13,
        flex: 1
    },
    buttonText: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.white,
        textAlign: 'center',
    },

});