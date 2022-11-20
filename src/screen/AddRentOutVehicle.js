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


export default class AddRentOutVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.route.params.item,
            isNetworkAvailable: true,
            isLoading: false,
            deviceType: "1",
            driverId: "1",
            carId: "1",
            driver: "",
            rentOutDate: "",
            rentOutNo: "",
            isDisplayRentOutDate: "",
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
            notes: false,
            openImageGalleryFor: "",
            damageImageUri: null,
            frontImageUri: null,
            rearImageUri: null,
            driverSideImageUri: null,
            passengerSideImageUri: null,
            odometerImageUri: null,
            fuelGuageImageUri: null,

            damageImageName: "",
            damageImageSize: "",
            damageImageType: "",

            frontImageName: "",
            frontImageSize: "",
            frontImageType: "",

            rearImageName: "",
            rearImageSize: "",
            rearImageType: "",

            driverSideImageName: "",
            driverSideImageSize: "",
            driverSideImageType: "",

            passengerSideImageName: "",
            passengerSideImageSize: "",
            passengerSideImageType: "",

            odometerImageName: "",
            odometerImageSize: "",
            odometerImageType: "",

            fuelGuageImageName: "",
            fuelGuagImageSize: "",
            fuelGuagImageType: "",

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


    openImageGallery() {
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

                if (this.state.openImageGalleryFor == "damageImageUri") {
                    this.setState({
                        resourcePath: res,
                        damageImageUri: res.assets[0].uri,
                        damageImageName: res.assets[0].fileName,
                        damageImageSize: res.assets[0].fileSize,
                        damageImageType: res.assets[0].type
                    });
                }
                else if (this.state.openImageGalleryFor == "frontImageUri") {
                    this.setState({
                        resourcePath: res,
                        frontImageUri: res.assets[0].uri,
                        frontImageName: res.assets[0].fileName,
                        frontImageSize: res.assets[0].fileSize,
                        frontImageType: res.assets[0].type
                    });
                }
                else if (this.state.openImageGalleryFor == "rearImageUri") {
                    this.setState({
                        resourcePath: res,
                        rearImageUri: res.assets[0].uri,
                        rearImageName: res.assets[0].fileName,
                        rearImageSize: res.assets[0].fileSize,
                        rearImageType: res.assets[0].type
                    });
                }
                else if (this.state.openImageGalleryFor == "driverSideImageUri") {
                    this.setState({
                        resourcePath: res,
                        driverSideImageUri: res.assets[0].uri,
                        driverSideImageName: res.assets[0].fileName,
                        driverSideImageSize: res.assets[0].fileSize,
                        driverSideImageType: res.assets[0].type
                    });
                }
                else if (this.state.openImageGalleryFor == "passengerSideImageUri") {
                    this.setState({
                        resourcePath: res,
                        passengerSideImageUri: res.assets[0].uri,
                        passengerSideImageName: res.assets[0].fileName,
                        passengerSideImageSize: res.assets[0].fileSize,
                        passengerSideImageType: res.assets[0].type
                    });
                }
                else if (this.state.openImageGalleryFor == "odometerImageUri") {
                    this.setState({
                        resourcePath: res,
                        odometerImageUri: res.assets[0].uri,
                        odometerImageName: res.assets[0].fileName,
                        odometerImageSize: res.assets[0].fileSize,
                        odometerImageType: res.assets[0].type
                    });
                }
                else if (this.state.openImageGalleryFor == "fuelGuageImageUri") {
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
        formData.append('bond_amount', this.state.bondRefundAmount);
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
            const res = await fetch(Links.ADD_NEW_RENT_IN, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: "application/json",
                    //   'Content-Type': 'application/json',
                    "Content-Type": "multipart/form-data",
                },
            });
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
                <CommonAppBar title="Add Return Out Vehicle" navigation={this.props.navigation} />

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



                        <Text numberOfLines={1} style={styles.headingTextStyle} >Basic Excess</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.basicExcess}
                                onChangeText={(value) => this.setState({ basicExcess: value })}
                                onSubmitEditing={() => { this.yearTextInput.focus() }}
                                ref={(input) => { this.basicExcessTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>


                        <Text numberOfLines={1} style={styles.headingTextStyle} >Age Excess</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.ageExcess}
                                onChangeText={(value) => this.setState({ ageExcess: value })}
                                onSubmitEditing={() => { this.yearTextInput.focus() }}
                                ref={(input) => { this.ageExcessTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Overseas DL Excess</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.overseasDLExcess}
                                onChangeText={(value) => this.setState({ overseasDLExcess: value })}
                                onSubmitEditing={() => { this.yearTextInput.focus() }}
                                ref={(input) => { this.overseasDLExcessTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>


                        <Text numberOfLines={1} style={styles.headingTextStyle} >Weekly Rent *</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.weeklyRent}
                                onChangeText={(value) => this.setState({ weeklyRent: value })}
                                onSubmitEditing={() => { this.yearTextInput.focus() }}
                                ref={(input) => { this.weeklyRentTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>


                        <Text numberOfLines={1} style={styles.headingTextStyle} >Bond</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.bond}
                                onChangeText={(value) => this.setState({ bond: value })}
                                onSubmitEditing={() => { this.yearTextInput.focus() }}
                                ref={(input) => { this.bondTextInput = input; }}
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




                        <Text numberOfLines={1} style={styles.headingTextStyle} >Reference Number</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.referenceNumber}
                                onChangeText={(value) => this.setState({ referenceNumber: value })}
                                onSubmitEditing={() => { this.yearTextInput.focus() }}
                                ref={(input) => { this.referenceNumberTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>


                        <Text numberOfLines={1} style={[styles.rowViewOptionStyle, styles.headingTextStyleThree]} >Insurance Details</Text>


                        <Text numberOfLines={1} style={styles.headingTextStyle} >Company *</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.company}
                                onChangeText={(value) => this.setState({ company: value })}
                                onSubmitEditing={() => { this.yearTextInput.focus() }}
                                ref={(input) => { this.companyTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>



                        <Text numberOfLines={1} style={styles.headingTextStyle} >Expire *</Text>
                        <TouchableOpacity onPress={this.showRentOutDate}>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    placeholder="DD/MM/YYYY"
                                    value={this.state.expire}
                                    onChangeText={(value) => this.setState({ expire: value })}
                                    onSubmitEditing={() => { this.rentOutNoTextInput.focus() }}
                                    ref={(input) => { this.expireTextInput = input; }}
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

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Upload photo of cover note</Text>
                        <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery()}>
                            {this.state.coverNoteImageUri != null ?
                                <Image
                                    source={{ uri: this.state.coverNoteImageUri }}
                                    style={styles.logoIcon}
                                />
                                : <Image
                                    source={require('../images/ic_add_camera.png')}
                                    style={styles.logoIcon}
                                />
                            }


                            {this.state.fileName != "" ?
                                <Text numberOfLines={2} style={styles.uploadImageNameText} >{this.state.coverNoteImageName}</Text>
                                : <Text numberOfLines={1} style={styles.uploadPhotoText} >Upload Photo of cover note</Text>
                            }

                        </TouchableOpacity>



                        <Text numberOfLines={1} style={[styles.rowViewOptionStyle, styles.headingTextStyleThree]} >Upload 7 pictures of car being issued</Text>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Upload Photo of Front</Text>
                        <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery()}>
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
                        <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery()}>
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
                        <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery()}>
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
                        <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery()}>
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
                        <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery()}>
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
                        <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery()}>
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