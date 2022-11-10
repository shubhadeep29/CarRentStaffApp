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


export default class ValidateStepThreeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNetworkAvailable: true,
            isLoading: false,
            accountName: "Rahul Pathak",
            bsb: "",
            accountNumber: "",
            numberOfAtFaultAccidents: "3",
            numberOfNotAtFaultAccidents: "3",
        }
    }

    goToNextScreen = () => {
        this.props.navigation.navigate('ValidateStepFourScreen')
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

                        <View style={styles.indicatorContainer}>
                            <Text numberOfLines={1} style={styles.indicatorText}>4</Text>
                        </View>

                        <View style={styles.indicatorContainer}>
                            <Text numberOfLines={1} style={styles.indicatorText}>5</Text>
                        </View>
                    </View>


                    <ScrollView>
                        <View>
                            <Text numberOfLines={1} style={styles.headingOneTextStyle} >Bank Account Details</Text>

                            <Text numberOfLines={1} style={styles.headingTextStyle} >Account Name</Text>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    // placeholder="Email Id"
                                    value={this.state.accountName}
                                    onChangeText={(value) => this.setState({ accountName: value })}
                                    onSubmitEditing={() => { this.bsbTextInput.focus() }}
                                    blurOnSubmit={false}
                                />
                            </View>

                            <Text numberOfLines={1} style={styles.headingTextStyle} >BSB</Text>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    // placeholder="Email Id"
                                    value={this.state.bsb}
                                    onChangeText={(value) => this.setState({ bsb: value })}
                                    onSubmitEditing={() => { this.accountNumberTextInput.focus() }}
                                    ref={(input) => { this.bsbTextInput = input; }}
                                    blurOnSubmit={false}
                                />
                            </View>


                            <Text numberOfLines={1} style={styles.headingTextStyle} >Account Number</Text>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    // placeholder="Email Id"
                                    value={this.state.accountNumber}
                                    onChangeText={(value) => this.setState({ accountNumber: value })}
                                    onSubmitEditing={() => { this.bsbTextInput.focus() }}
                                    ref={(input) => { this.accountNumberTextInput = input; }}

                                    blurOnSubmit={false}
                                />
                            </View>

                            <Text numberOfLines={1} style={styles.headingOneTextStyle} >Account History Last 5 Years</Text>

                            <View style={styles.accountHistoryRowView}>
                                <Text numberOfLines={1} style={styles.noOfAtFaultAccidentsText} >No of At Fault Accidents</Text>
                                <View style={styles.dropdownContainer}>
                                    <Text numberOfLines={1} style={styles.dropdownTextStyle} >1</Text>
                                    <Image
                                        source={require('../images/down_arow.png')}
                                        style={styles.dropDownIcon}
                                    />
                                </View>
                            </View>
                            <View style={styles.accountHistoryRowView}>
                                <Text numberOfLines={1} style={styles.noOfAtFaultAccidentsText} >No of Not At Fault Accidents</Text>
                                <View style={styles.dropdownContainer}>
                                    <Text numberOfLines={1} style={styles.dropdownTextStyle} >4</Text>
                                    <Image
                                        source={require('../images/down_arow.png')}
                                        style={styles.dropDownIcon}
                                    />
                                </View>
                            </View>





                            {/* <View style={styles.accountHistoryRowView}>
                                <Text numberOfLines={1} style={styles.accountHistoryTitleView} >No of Not At Fault Accidents</Text>
                                <View style={styles.dropdownContainer}>
                                    <TextInput
                                        style={styles.emailIdEditTextStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        placeholderTextColor={Colors.placeholderColor}
                                        placeholder="DD/MM/YYYY"
                                        value={this.state.numberOfNotAtFaultAccidents}
                                        onChangeText={(value) => this.setState({ numberOfNotAtFaultAccidents: value })}
                                        blurOnSubmit={false}
                                    />
                                    <Image
                                        source={require('../images/down_arow.png')}
                                        style={{ alignSelf: 'center', height: 15, width: 15 }}
                                    />
                                </View>
                            </View> */}

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
    headingOneTextStyle: {
        fontSize: 18,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        paddingHorizontal: 40,
        marginTop: 25
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
        marginTop: 15,
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
    noOfAtFaultAccidentsText: {
        fontSize: 14,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        flex: 1,
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
    dropdownContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 17,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8
    },
    dropdownTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        alignSelf: 'center',
    },
    dropDownIcon: {
        alignSelf: 'center',
        height: 15,
        width: 15,
        marginStart: 30
    }
});