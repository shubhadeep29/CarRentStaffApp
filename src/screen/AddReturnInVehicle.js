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
    Platform,
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
import LoaderView from '../component/LoaderView';
import DatePickerModel from '../component/DatePickerModel';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';


export default class AddReturnInVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.route.params.item,
            paymentMethodList: props.route.params.paymentMethodList,
            driverListRentOut: props.route.params.driverListRentOut,
            carListRent: props.route.params.carListRent,
            isNetworkAvailable: true,
            isLoading: false,
            deviceType: "1",
            driverId: "1",
            carId: "1",
            driver: "",
            rentOutDate: "",
            rentOutNo: "",
            isDisplayRentOutDate: false,
            carNo: "",
            isDamageYes: false,
            isDamageNo: true,
            odometerReading: "",
            damageAmount: "$",
            fuelAmount: "$",
            isBondRefundRequestYes: true,
            isBondRefundRequestNo: false,
            bondRefundDate: "",
            isDisplayBondRefundDate: false,
            bondRefundAmount: "$",
            paymentMethod: "",
            isPaymentMethodDropdownVisible: false,
            isDropdownVisible: false,
            notes: "",
            openImageGalleryFor: "",

            damageImageUri: null,
            damageImageName: "",
            damageImageSize: "",
            damageImageType: "",

            frontImageUri: null,
            frontImageName: "",
            frontImageSize: "",
            frontImageType: "",

            rearImageUri: null,
            rearImageName: "",
            rearImageSize: "",
            rearImageType: "",

            driverSideImageUri: null,
            driverSideImageName: "",
            driverSideImageSize: "",
            driverSideImageType: "",

            passengerSideImageUri: null,
            passengerSideImageName: "",
            passengerSideImageSize: "",
            passengerSideImageType: "",

            odometerImageUri: null,
            odometerImageName: "",
            odometerImageSize: "",
            odometerImageType: "",

            fuelGuageImageUri: null,
            fuelGuageImageName: "",
            fuelGuageImageSize: "",
            fuelGuageImageType: "",

        }
    }

    setBondRefundDate = (event, selectedDate) => {
        console.log("selectedDate" + selectedDate)
        this.setState({
            isDisplayBondRefundDate: false,
            bondRefundDate: selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear()
        });
    }
    setRentOutDate = (event, selectedDate) => {
        console.log("selectedDate" + selectedDate)
        this.setState({
            isDisplayRentOutDate: false,
            rentOutDate: selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear()
        });
    }

    showBondRefundDate = () => {
        this.setState({
            isDisplayBondRefundDate: true,
        });
    }
    showRentOutDate = () => {
        this.setState({
            isDisplayRentOutDate: true,
        });
    }

    componentDidMount = async () => {
        this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
        this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);


        if (this.state.item != null) {
            console.log(this.state.item)

            this.setState({
                carNo: this.state.item.car_no,
                rentOutDate: this.state.item.rent_out_date,
                rentOutNo: this.state.item.rent_out_no,
                isDamageYes: this.state.item.damage,
                isDamageNo: !this.state.item.damage,
                damageAmount: this.state.item.damage_amount,
                driverId: this.state.item.driver_id,
                odometerReading: this.state.item.odometer_reading,
                bondRefundAmount: this.state.item.bond_refund_amount,
                bondRefundDate: this.state.item.bond_refund_date,
                isBondRefundRequestYes: this.state.item.bond_refund_request,
                isBondRefundRequestNo: !this.state.item.bond_refund_request,
                notes: this.state.item.notes,
                fuelAmount: this.state.item.fuel,
                notes: this.state.item.notes,
                driverSideImageUri: Links.BASEURL + this.state.item.driver_side_img,
                frontImageUri: Links.BASEURL + this.state.item.front_img,
                fuelGuageImageUri: Links.BASEURL + this.state.item.fuel_guage_img,
                odometerImageUri: Links.BASEURL + this.state.item.odometer_img,
                passengerSideImageUri: Links.BASEURL + this.state.item.passenger_side_img,
                rearImageUri: Links.BASEURL + this.state.item.rear_img,
                damageImageUri: Links.BASEURL + this.state.item.damage_img,
            })
        }

    }

    onClickSubmitButton() {

    }

    onClickDropdownItem(driver) {
        this.setState({
            isDropdownVisible: false,
            driver: driver,
        })
    }

    onClickPaymentMethodDropdownItem(paymentMethod) {
        this.setState({
            isPaymentMethodDropdownVisible: false,
            paymentMethod: paymentMethod,
        })
    }


    openImageGallery(openImageGalleryFor) {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        // ImagePicker.launchImageLibrary(options, (res) => {
        launchImageLibrary(options, (res) => {
            console.log('Response = ', res);
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {

                const source = { uri: res.uri };
                console.log('response', JSON.stringify(res));

                if (openImageGalleryFor == "damageImageUri") {
                    this.setState({
                        resourcePath: res,
                        damageImageUri: res.assets[0].uri,
                        damageImageName: res.assets[0].fileName,
                        damageImageSize: res.assets[0].fileSize,
                        damageImageType: res.assets[0].type
                    });
                }
                else if (openImageGalleryFor == "frontImageUri") {
                    this.setState({
                        resourcePath: res,
                        frontImageUri: res.assets[0].uri,
                        frontImageName: res.assets[0].fileName,
                        frontImageSize: res.assets[0].fileSize,
                        frontImageType: res.assets[0].type
                    });
                }
                else if (openImageGalleryFor == "rearImageUri") {
                    this.setState({
                        resourcePath: res,
                        rearImageUri: res.assets[0].uri,
                        rearImageName: res.assets[0].fileName,
                        rearImageSize: res.assets[0].fileSize,
                        rearImageType: res.assets[0].type
                    });
                }
                else if (openImageGalleryFor == "driverSideImageUri") {
                    this.setState({
                        resourcePath: res,
                        driverSideImageUri: res.assets[0].uri,
                        driverSideImageName: res.assets[0].fileName,
                        driverSideImageSize: res.assets[0].fileSize,
                        driverSideImageType: res.assets[0].type
                    });
                }
                else if (openImageGalleryFor == "passengerSideImageUri") {
                    this.setState({
                        resourcePath: res,
                        passengerSideImageUri: res.assets[0].uri,
                        passengerSideImageName: res.assets[0].fileName,
                        passengerSideImageSize: res.assets[0].fileSize,
                        passengerSideImageType: res.assets[0].type
                    });
                }
                else if (openImageGalleryFor == "odometerImageUri") {
                    this.setState({
                        resourcePath: res,
                        odometerImageUri: res.assets[0].uri,
                        odometerImageName: res.assets[0].fileName,
                        odometerImageSize: res.assets[0].fileSize,
                        odometerImageType: res.assets[0].type
                    });
                }
                else if (openImageGalleryFor == "fuelGuageImageUri") {
                    this.setState({
                        resourcePath: res,
                        fuelGuageImageUri: res.assets[0].uri,
                        fuelGuageImageName: res.assets[0].fileName,
                        fuelGuageImageSize: res.assets[0].fileSize,
                        fuelGuageImageType: res.assets[0].type
                    });
                }


                console.log('fileData', JSON.stringify(res.assets[0].fileName));
                console.log('fileUri', JSON.stringify(res.assets[0].uri));
                console.log('fileType', JSON.stringify(res.assets[0].type));


            }
        });
    }



    callAddReturnInVehicleValidation() {
        Keyboard.dismiss();
        if (this.state.driver == "") {
            Toast.show("Please enter Driver", Toast.SHORT);
        }
        else if (this.state.rentOutDate == "") {
            Toast.show("Please enter Rent out Date", Toast.SHORT);
        }
        else if (this.state.rentOutNo == "") {
            Toast.show("Please enter Rent out No", Toast.SHORT);
        }
        else if (this.state.carNo == "") {
            Toast.show("Please enter Car No", Toast.SHORT);
        }
        else if (this.state.odometerReading == "") {
            Toast.show("Please enter Odometer Reading", Toast.SHORT);
        }
        else if (this.state.paymentMethod == "") {
            Toast.show("Please enter Payment Method", Toast.SHORT);
        }
        else {
            try {
                NetInfo.fetch().then(state => {
                    if (state.isConnected) {
                        this.callAddReturnInVehicleApi();
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

    callAddReturnInVehicleApi = async () => {
        this.setState({ isLoading: true });

        var formData = new FormData();
        formData.append('token_key', this.apiKey);
        formData.append('device_type', this.state.deviceType);
        formData.append('user_id', this.userId);
        formData.append('driver_id', this.state.driverId);
        formData.append('car_id', this.state.carId);
        formData.append('odometer_reading', this.state.odometerReading);
        formData.append('basic_excess', this.state.item != null ? this.state.item.basic_excess : "");
        formData.append('age_excess', this.state.item != null ? this.state.item.age_excess : "");
        formData.append('overseas_dL_excess', this.state.item != null ? this.state.item.overseas_dL_excess : "");
        formData.append('weekly_rent', this.state.item != null ? this.state.item.weekly_rent : "");
        formData.append('bond_amount', this.state.item != null ? this.state.bondRefundAmount : "");
        formData.append('company_id', this.state.item != null ? this.state.item.company_id : "");
        formData.append('expire', this.state.item != null ? this.state.item.expire : "");
        formData.append('notes', this.state.notes);
        formData.append('front_img', {
            uri: Platform.OS === 'ios' ? this.state.frontImageUri.replace('file://', '') : this.state.frontImageUri,
            name: this.state.frontImageName,
            type: this.state.frontImageType
        });
        formData.append('rear_img', {
            uri: Platform.OS === 'ios' ? this.state.rearImageUri.replace('file://', '') : this.state.rearImageUri,
            name: this.state.rearImageName,
            type: this.state.rearImageType
        });
        formData.append('driver_side_img', {
            uri: Platform.OS === 'ios' ? this.state.driverSideImageUri.replace('file://', '') : this.state.driverSideImageUri,
            name: this.state.driverSideImageName,
            type: this.state.driverSideImageType
        });
        formData.append('passenger_side_img', {
            uri: Platform.OS === 'ios' ? this.state.passengerSideImageUri.replace('file://', '') : this.state.passengerSideImageUri,
            name: this.state.passengerSideImageName,
            type: this.state.passengerSideImageType
        });
        formData.append('odometer_img', {
            uri: Platform.OS === 'ios' ? this.state.odometerImageUri.replace('file://', '') : this.state.odometerImageUri,
            name: this.state.odometerImageName,
            type: this.state.odometerImageType
        });
        formData.append('fuel_guage_img', {
            uri: Platform.OS === 'ios' ? this.state.fuelGuageImageUri.replace('file://', '') : this.state.fuelGuageImageUri,
            name: this.state.fuelGuageImageName,
            type: this.state.fuelGuagImageType
        });



        try {
            console.log("Call Add/Edit Return In Vehicle API ========>  ", JSON.stringify(formData));
            res = null
            if (this.state.item == null) {
                res = await fetch(Links.ADD_NEW_RENT_IN, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Accept: "application/json",
                        //   'Content-Type': 'application/json',
                        "Content-Type": "multipart/form-data",
                    },
                });
            }
            else {
                res = await fetch(Links.EDIT_RENT_IN, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Accept: "application/json",
                        //   'Content-Type': 'application/json',
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            const responseJSON = await res.json();
            console.log("Car Add/Edit Return In Vehicle Response ===========>  ", JSON.stringify(responseJSON));
            if (responseJSON) {
                this.setState({ isLoading: false });
                if (responseJSON.hasOwnProperty("status") && responseJSON.status == 1) {
                    if (responseJSON.hasOwnProperty("message") && responseJSON.message) {
                        Toast.show(responseJSON.message, Toast.SHORT);
                    }
                    this.props.navigation.goBack()

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
                <CommonAppBar title="Add Return In Vehicle" navigation={this.props.navigation} />

                <ScrollView >
                    <View style={styles.bottomViewContainer}>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Driver *</Text>
                        <TouchableOpacity onPress={() => this.setState({ isDropdownVisible: !this.state.isDropdownVisible })}>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    // placeholder="Email Id"
                                    value={this.state.driver}
                                    onChangeText={(value) => this.setState({ driver: value })}
                                    onSubmitEditing={() => { this.rentOutDateTextInput.focus() }}
                                    blurOnSubmit={false}
                                />
                                <Image
                                    source={require('../images/down_arow.png')}
                                    style={styles.calenderIcon}
                                />
                            </View>
                        </TouchableOpacity>

                        {this.state.isDropdownVisible ?
                            <View style={styles.dropdownContainer}>
                                <TouchableOpacity style={styles.dropdownItemTextContainer} onPress={() => this.onClickDropdownItem("Driver")} >
                                    <Text numberOfLines={1} style={styles.dropdownItemTextStyle} >Driver</Text>
                                </TouchableOpacity>

                                <View style={styles.divider} />

                                <TouchableOpacity style={styles.dropdownItemTextContainer} onPress={() => this.onClickDropdownItem("Driver")} >
                                    <Text numberOfLines={1} style={styles.dropdownItemTextStyle} >Driver</Text>
                                </TouchableOpacity>

                                <View style={styles.divider} />

                                <TouchableOpacity style={styles.dropdownItemTextContainer} onPress={() => this.onClickDropdownItem("Driver")} >
                                    <Text numberOfLines={1} style={styles.dropdownItemTextStyle} >Driver</Text>
                                </TouchableOpacity>

                                <View style={styles.divider} />

                                <TouchableOpacity style={styles.dropdownItemTextContainer} onPress={() => this.onClickDropdownItem("Driver")} >
                                    <Text numberOfLines={1} style={styles.dropdownItemTextStyle} >Driver</Text>
                                </TouchableOpacity>
                            </View>
                            : null}


                        <Text numberOfLines={1} style={styles.headingTextStyle} >Rent out Date *</Text>
                        <TouchableOpacity onPress={this.showRentOutDate}>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    placeholder="DD/MM/YYYY"
                                    value={this.state.rentOutDate}
                                    onChangeText={(value) => this.setState({ rentOutDate: value })}
                                    onSubmitEditing={() => { this.rentOutNoTextInput.focus() }}
                                    ref={(input) => { this.rentOutDateTextInput = input; }}
                                    blurOnSubmit={false}
                                />

                                <Image
                                    source={require('../images/calendar.png')}
                                    style={styles.calenderIcon}
                                />
                            </View>
                        </TouchableOpacity>

                        {this.state.isDisplayRentOutDate &&
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={new Date()}
                                mode='date'
                                display="default"
                                onChange={this.setRentOutDate}
                            />
                        }


                        <Text numberOfLines={1} style={styles.headingTextStyle} >Rent Out No. *</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.rentOutNo}
                                onChangeText={(value) => this.setState({ rentOutNo: value })}
                                onSubmitEditing={() => { this.carNoTextInput.focus() }}
                                ref={(input) => { this.rentOutNoTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Car No. *</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.carNo}
                                onChangeText={(value) => this.setState({ carNo: value })}
                                onSubmitEditing={() => { this.odometerReadingTextInput.focus() }}
                                ref={(input) => { this.carNoTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>



                        <Text numberOfLines={1} style={styles.headingTextStyle} >Odometer Reading *</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.odometerReading}
                                onChangeText={(value) => this.setState({ odometerReading: value })}
                                onSubmitEditing={() => { this.damageAmountTextInput.focus() }}
                                ref={(input) => { this.odometerReadingTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>


                        <View style={styles.rowViewOptionStyle}>
                            <Text numberOfLines={1} style={styles.headingTextStyleThree} >Damage</Text>

                            <TouchableOpacity onPress={() => this.setState({
                                isDamageYes: true,
                                isDamageNo: false
                            })}>
                                <Image
                                    source={this.state.isDamageYes ? require('../images/ic_radio_check.png') : require('../images/ic_radio_uncheck.png')}
                                    style={styles.checkUncheckIcon}
                                />
                            </TouchableOpacity>
                            <Text numberOfLines={1} style={styles.optionTextStyle} >YES</Text>

                            <TouchableOpacity onPress={() => this.setState({
                                isDamageYes: false,
                                isDamageNo: true
                            })}>
                                <Image
                                    source={this.state.isDamageNo ? require('../images/ic_radio_check.png') : require('../images/ic_radio_uncheck.png')}
                                    style={styles.checkUncheckIcon}
                                />
                            </TouchableOpacity>
                            <Text numberOfLines={1} style={styles.optionTextStyle} >NO</Text>
                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Damage Amount</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.damageAmount}
                                onChangeText={(value) => this.setState({ damageAmount: value })}
                                onSubmitEditing={() => { this.fuelAmountTextInput.focus() }}
                                ref={(input) => { this.damageAmountTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Upload photo of Damage</Text>
                        <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery("damageImageUri")}>
                            {this.state.damageImageUri != null ?
                                <Image
                                    source={{ uri: this.state.damageImageUri }}
                                    style={styles.logoIcon}
                                />
                                : <Image
                                    source={require('../images/ic_add_camera.png')}
                                    style={styles.logoIcon}
                                />
                            }


                            {this.state.fileName != "" ?
                                <Text numberOfLines={2} style={styles.uploadImageNameText} >{this.state.damageImageName}</Text>
                                : <Text numberOfLines={1} style={styles.uploadPhotoText} >Upload Photo</Text>
                            }

                        </TouchableOpacity>


                        <Text numberOfLines={1} style={styles.headingTextStyle} >Fuel Amount</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.fuelAmount}
                                onChangeText={(value) => this.setState({ fuelAmount: value })}
                                onSubmitEditing={() => { this.yearTextInput.focus() }}
                                ref={(input) => { this.fuelAmountTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>

                        <View style={styles.rowViewOptionStyle}>
                            <Text numberOfLines={1} style={styles.headingTextStyleThree} >Bond Refund Request</Text>

                            <TouchableOpacity onPress={() => this.setState({
                                isBondRefundRequestYes: true,
                                isBondRefundRequestNo: false
                            })}>
                                <Image
                                    source={this.state.isBondRefundRequestYes ? require('../images/ic_radio_check.png') : require('../images/ic_radio_uncheck.png')}
                                    style={styles.checkUncheckIcon}
                                />
                            </TouchableOpacity>
                            <Text numberOfLines={1} style={styles.optionTextStyle} >YES</Text>

                            <TouchableOpacity onPress={() => this.setState({
                                isBondRefundRequestYes: false,
                                isBondRefundRequestNo: true
                            })}>
                                <Image
                                    source={this.state.isBondRefundRequestNo ? require('../images/ic_radio_check.png') : require('../images/ic_radio_uncheck.png')}
                                    style={styles.checkUncheckIcon}
                                />
                            </TouchableOpacity>
                            <Text numberOfLines={1} style={styles.optionTextStyle} >NO</Text>
                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Bond Refund Date</Text>
                        <TouchableOpacity onPress={this.showBondRefundDate}>

                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    placeholder="DD/MM/YYYY"
                                    value={this.state.bondRefundDate}
                                    onChangeText={(value) => this.setState({ bondRefundDate: value })}
                                    onSubmitEditing={() => { this.insuranceExpireDateTextInput.focus() }}
                                    ref={(input) => { this.bondRefundDateTextInput = input; }}
                                    blurOnSubmit={false}
                                />

                                <Image
                                    source={require('../images/calendar.png')}
                                    style={styles.calenderIcon}
                                />
                            </View>
                        </TouchableOpacity>


                        {this.state.isDisplayBondRefundDate &&
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={new Date()}
                                mode='date'
                                display="default"
                                onChange={this.setBondRefundDate}
                            />
                        }


                        <Text numberOfLines={1} style={styles.headingTextStyle} >Bond Refund Amount</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.bondRefundAmount}
                                onChangeText={(value) => this.setState({ bondRefundAmount: value })}
                                onSubmitEditing={() => { this.yearTextInput.focus() }}
                                ref={(input) => { this.bondRefundAmountTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Payment Method *</Text>
                        <TouchableOpacity onPress={() => this.setState({ isPaymentMethodDropdownVisible: !this.state.isPaymentMethodDropdownVisible })}>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    // placeholder="Email Id"
                                    value={this.state.paymentMethod}
                                    onChangeText={(value) => this.setState({ paymentMethod: value })}
                                    blurOnSubmit={false}
                                />
                                <Image
                                    source={require('../images/down_arow.png')}
                                    style={styles.calenderIcon}
                                />
                            </View>
                        </TouchableOpacity>

                        {this.state.isPaymentMethodDropdownVisible ?
                            <View style={styles.dropdownContainer}>
                                <TouchableOpacity style={styles.dropdownItemTextContainer} onPress={() => this.onClickPaymentMethodDropdownItem("Payment Method ")} >
                                    <Text numberOfLines={1} style={styles.dropdownItemTextStyle} >Payment Method </Text>
                                </TouchableOpacity>

                                <View style={styles.divider} />

                                <TouchableOpacity style={styles.dropdownItemTextContainer} onPress={() => this.onClickPaymentMethodDropdownItem("Payment Method ")} >
                                    <Text numberOfLines={1} style={styles.dropdownItemTextStyle} >Payment Method </Text>
                                </TouchableOpacity>

                                <View style={styles.divider} />

                                <TouchableOpacity style={styles.dropdownItemTextContainer} onPress={() => this.onClickPaymentMethodDropdownItem("Payment Method ")} >
                                    <Text numberOfLines={1} style={styles.dropdownItemTextStyle} >Payment Method </Text>
                                </TouchableOpacity>

                                <View style={styles.divider} />

                                <TouchableOpacity style={styles.dropdownItemTextContainer} onPress={() => this.onClickPaymentMethodDropdownItem("Payment Method ")} >
                                    <Text numberOfLines={1} style={styles.dropdownItemTextStyle} >Payment Method </Text>
                                </TouchableOpacity>
                            </View>
                            : null}



                        <Text numberOfLines={1} style={[styles.rowViewOptionStyle, styles.headingTextStyleThree]} >Upload 6 pictures of car being issued</Text>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Upload Photo of Front</Text>
                        <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery("frontImageUri")}>
                            {this.state.frontImageUri != null ?
                                <Image
                                    source={{ uri: this.state.frontImageUri }}
                                    style={styles.logoIcon}
                                />
                                : <Image
                                    source={require('../images/ic_add_camera.png')}
                                    style={styles.logoIcon}
                                />
                            }


                            {this.state.fileName != "" ?
                                <Text numberOfLines={2} style={styles.uploadImageNameText} >{this.state.frontImageName}</Text>
                                : <Text numberOfLines={1} style={styles.uploadPhotoText} >Upload Photo of Front</Text>

                            }

                        </TouchableOpacity>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Upload Photo of Rear</Text>
                        <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery("rearImageUri")}>
                            {this.state.rearImageUri != null ?
                                <Image
                                    source={{ uri: this.state.rearImageUri }}
                                    style={styles.logoIcon}
                                />
                                : <Image
                                    source={require('../images/ic_add_camera.png')}
                                    style={styles.logoIcon}
                                />
                            }


                            {this.state.fileName != "" ?
                                <Text numberOfLines={2} style={styles.uploadImageNameText} >{this.state.rearImageName}</Text>
                                : <Text numberOfLines={1} style={styles.uploadPhotoText} >Upload Photo of Rear</Text>

                            }

                        </TouchableOpacity>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Upload Photo of Driver Side</Text>
                        <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery("driverSideImageUri")}>
                            {this.state.driverSideImageUri != null ?
                                <Image
                                    source={{ uri: this.state.driverSideImageUri }}
                                    style={styles.logoIcon}
                                />
                                : <Image
                                    source={require('../images/ic_add_camera.png')}
                                    style={styles.logoIcon}
                                />
                            }


                            {this.state.fileName != "" ?
                                <Text numberOfLines={2} style={styles.uploadImageNameText} >{this.state.driverSideImageName}</Text>
                                : <Text numberOfLines={1} style={styles.uploadPhotoText} >Upload Photo of Driver Side</Text>

                            }

                        </TouchableOpacity>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Upload Photo of Passenger Side</Text>
                        <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery("passengerSideImageUri")}>
                            {this.state.passengerSideImageUri != null ?
                                <Image
                                    source={{ uri: this.state.passengerSideImageUri }}
                                    style={styles.logoIcon}
                                />
                                : <Image
                                    source={require('../images/ic_add_camera.png')}
                                    style={styles.logoIcon}
                                />
                            }


                            {this.state.fileName != "" ?
                                <Text numberOfLines={2} style={styles.uploadImageNameText} >{this.state.passengerSideImageName}</Text>
                                : <Text numberOfLines={1} style={styles.uploadPhotoText} >Upload Photo of Passenger Side</Text>

                            }

                        </TouchableOpacity>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Upload Photo of Odometer</Text>
                        <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery("odometerImageUri")}>
                            {this.state.odometerImageUri != null ?
                                <Image
                                    source={{ uri: this.state.odometerImageUri }}
                                    style={styles.logoIcon}
                                />
                                : <Image
                                    source={require('../images/ic_add_camera.png')}
                                    style={styles.logoIcon}
                                />
                            }


                            {this.state.fileName != "" ?
                                <Text numberOfLines={2} style={styles.uploadImageNameText} >{this.state.odometerImageName}</Text>
                                : <Text numberOfLines={1} style={styles.uploadPhotoText} >Upload Photo of Odometer</Text>

                            }

                        </TouchableOpacity>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Upload Photo of Fuel Guage</Text>
                        <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery("fuelGuageImageUri")}>
                            {this.state.fuelGuageImageUri != null ?
                                <Image
                                    source={{ uri: this.state.fuelGuageImageUri }}
                                    style={styles.logoIcon}
                                />
                                : <Image
                                    source={require('../images/ic_add_camera.png')}
                                    style={styles.logoIcon}
                                />
                            }


                            {this.state.fileName != "" ?
                                <Text numberOfLines={2} style={styles.uploadImageNameText} >{this.state.fuelGuageImageName}</Text>
                                : <Text numberOfLines={1} style={styles.uploadPhotoText} >Upload Photo of Fuel Guage</Text>

                            }

                        </TouchableOpacity>



                        <Text numberOfLines={1} style={styles.headingTextStyle} >Notes</Text>
                        <View style={styles.remarksStyle}>
                            <TextInput
                                style={styles.remarksTextStyle}
                                autoCapitalize="none"
                                multiline={true}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Enter your remarks"
                                value={this.state.notes}
                                onChangeText={(value) => this.setState({ notes: value })}
                                blurOnSubmit={false}
                            />
                        </View>


                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.approveButtonContainer}
                                onPress={() => this.callAddReturnInVehicleApi()}>
                                <Text numberOfLines={1} style={styles.buttonText}>SUBMIT</Text>
                            </TouchableOpacity>
                            <View style={styles.boxGap} />

                            <TouchableOpacity style={styles.cancelButtonContainer}
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
    headingTextStyleThree: {
        fontSize: 18,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        marginBottom: 5,
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
    uploadImageNameText: {
        fontSize: 11,
        // fontFamily: fontSelector("regular"),
        color: Colors.textColor2,
        paddingHorizontal: 15
    },
    checkUncheckIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginStart: 20,
        marginEnd: 5
    },
    addImageViewStyle: {
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
    },

    rowViewOptionStyle: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        paddingHorizontal: 50
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
    boxGap: {
        width: 15
    },
    dropdownIcon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginStart: 10
    },

    dropdownContainer: {
        width: 150,
        // height: 150,
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 8,
        elevation: 4,
        position: 'absolute',
        left: 0,
        top: 15,
        right: 0
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
});