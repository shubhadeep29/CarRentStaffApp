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

import Toast from 'react-native-simple-toast';
import { Dropdown } from 'react-native-element-dropdown';

export default class ValidateStepThreeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.route.params.item,
            isNetworkAvailable: true,
            isLoading: false,
            accountName: "",
            bsb: "",
            accountNumber: "",
            numberOfAtFaultAccidents: "",
            numberOfNotAtFaultAccidents: "",
            numberList: [
                { value: '0' },
                { value: '1' },
                { value: '2' },
                { value: '3' },
                { value: '4' },
                { value: '5' },
                { value: '6' },
                { value: '7' },
                { value: '8' },
                { value: '9' },
                { value: '10' },
            ]
        }
    }

    componentDidMount = async () => {
        this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
        this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);
        // this.item = this.props.params.item;

        console.log("Item 3", this.state.item)

        this.setState({


            accountName: this.state.item.bank_name,
            bsb: this.state.item.bsb,
            accountNumber: this.state.item.account_no,
            numberOfAtFaultAccidents: this.state.item.no_of_at_fault_accidents,
            numberOfNotAtFaultAccidents: this.state.item.no_of_not_at_fault_accidents,
        })
    }


    goToNextScreen = () => {
        if (this.state.accountName == "") {
            Toast.show("Please enter Account Name", Toast.SHORT);
        } else if (this.state.bsb == "") {
            Toast.show("Please enter BSB", Toast.SHORT);
        } else if (this.state.accountNumber == "") {
            Toast.show("Please enter Account Number", Toast.SHORT);
        } else {
            let item = this.state.item
            item.bank_name = this.state.accountName;
            item.bsb = this.state.bsb;
            item.account_no = this.state.accountNumber;
            item.no_of_at_fault_accidents = this.state.numberOfAtFaultAccidents;
            item.no_of_not_at_fault_accidents = this.state.numberOfNotAtFaultAccidents;
            this.setState({
                item: item
            })

            console.log("++++++++++++", item)
            this.props.navigation.navigate('ValidateStepFourScreen', {
                item: item
            })
        }
    }

    onClickAtFaultAccidentsItem(item) {
        this.setState({
            numberOfAtFaultAccidents: item.value,
        })

    }
    onClickNotAtFaultAccidentsItem(item) {
        this.setState({
            numberOfNotAtFaultAccidents: item.value,
        })

    }

    renderVehicleType = (item) => {
        return (
            <View>
                <Text style={styles.selectionListTextStyle}>{item.value}</Text>
            </View>
        );
    };

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
                                    {/* <Text numberOfLines={1} style={styles.dropdownTextStyle} >{this.state.numberOfAtFaultAccidents}</Text> */}
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={this.state.numberList}
                                        placeholder="No of At Fault Accidents"
                                        maxHeight={300}
                                        labelField="value"
                                        valueField="value"
                                        value={this.state.numberOfAtFaultAccidents}
                                        onChange={item => {
                                            this.onClickAtFaultAccidentsItem(item);
                                        }}
                                        renderItem={this.renderVehicleType}

                                    />
                                </View>
                            </View>
                            <View style={styles.accountHistoryRowView}>
                                <Text numberOfLines={1} style={styles.noOfAtFaultAccidentsText} >No of Not At Fault Accidents</Text>
                                <View style={styles.dropdownContainer}>
                                    {/* <Text numberOfLines={1} style={styles.dropdownTextStyle} >{this.state.numberOfNotAtFaultAccidents}</Text> */}
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={this.state.numberList}
                                        placeholder="No of Not At Fault Accidents"
                                        maxHeight={300}
                                        labelField="value"
                                        valueField="value"
                                        value={this.state.numberOfNotAtFaultAccidents}
                                        onChange={item => {
                                            this.onClickNotAtFaultAccidentsItem(item);
                                        }}
                                        renderItem={this.renderVehicleType}

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
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginStart: 17,
        backgroundColor: Colors.textColor1
    },
    selectedIndicatorText: {
        fontSize: 17,
        // fontFamily: fontSelector("bold"),
        color: Colors.white,
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlignVertical: 'center',
    },
    indicatorContainer: {
        width: 45,
        height: 45,
        borderRadius: 30,
        marginStart: 17,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
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
        alignItems: 'center',
        alignContent: 'center',
        textAlignVertical: 'center',
    },
    headingOneTextStyle: {
        fontSize: 18,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        paddingHorizontal: 40,
        marginTop: 25
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
        paddingVertical: Platform.OS == "ios" ? 16 : 12

    },
    accountHistoryRowView: {
        flex: 1,
        marginTop: 15,
        marginHorizontal: 30
    },
    noOfAtFaultAccidentsText: {
        fontSize: 14,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        flex: 1,
        marginHorizontal: 10,
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
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginTop: 8,
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
    },

    dropdownIcon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginStart: 10
    },


    dropdownItemTextContainer: {
        paddingVertical: 15
    },
    dropdownItemTextStyle: {
        fontSize: 11,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        alignSelf: 'center'
    },
    divider: {
        backgroundColor: Colors.borderColor,
        height: 0.5
    },

    dropdown: {
        flex: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 12,
        color: Colors.black,

    },
    selectedTextStyle: {
        fontSize: 12,
        color: Colors.black,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

    selectionListTextStyle: {
        fontSize: 12,
        color: Colors.black,
        // fontFamily: fontSelector("regular"),
        paddingHorizontal: 15,
        paddingVertical: 12
    },
});