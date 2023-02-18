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
import { Dropdown } from 'react-native-element-dropdown';

export default class AddNewCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.route.params.item,
            isNetworkAvailable: true,
            isLoading: false,
            deviceType: "1",
            carNo: "",
            model: "",
            company:"",
            companyId:"",
            fuleType: "",
            make: "",
            year: "",
            odometer:"",
            serviceKilometer:"",
            transmissionService:"",
            sparkPlug:"",
            regoExpireDate: "",
            insuranceExpireDate: "",
            carImage: null,
            carId: "",
            vehicleId:"",
            isHybridYes: false,
            isHybridNo: true,
            isCarStatusActive: true,
            isCarStatusInactive: false,
            resourcePath: {},
            companyList: [],
            imageUri: null,
            imageName: "",
            imageSize: "",
            imageType: "",
            isDisplayYear: false,
            isDisplayRegoExpireDate: false,
            isDisplayInsuranceExpireDate: false,
            isDropdownVisible: false,
            vehicleType:[
                {value: "Car"},
                {value: "Van"}
            ],
            abnList: [
                { value: "Petrol" },
                { value: "Diesel" },
                { value: "LPG" },
            ]

        }
    }

    setYear = (event, selectedDate) => {
        console.log("selectedDate" + selectedDate)
        this.setState({
            isDisplayYear: false,
            year: "" + selectedDate.getFullYear()
        });
    }
    setRegoExpireDate = (event, selectedDate) => {
        console.log("selectedDate" + selectedDate)
        this.setState({
            isDisplayRegoExpireDate: false,
            regoExpireDate: selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear()
        });

    }
    setInsuranceExpireDate = (event, selectedDate) => {
        console.log("selectedDate" + selectedDate)
        this.setState({
            isDisplayInsuranceExpireDate: false,
            insuranceExpireDate: selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear()
        });
    }

    showYear = () => {
        this.setState({
            isDisplayYear: true,
        });
    }
    showRegoExpireDate = () => {
        this.setState({
            isDisplayRegoExpireDate: true,
        });
    }
    showInsuranceExpireDate = () => {
        this.setState({
            isDisplayInsuranceExpireDate: true,
        });
    }

    componentDidMount = async () => {
        this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
        this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);
        console.log("item value:",this.state.item)
        this.getCompanyList()
        this.setState({
            carNo: this.state.item.car_no,
            carId: this.state.item.car_id,
            vehicleId:this.state.item.vehicle_type,
            company:this.state.item.company_name,
            companyId:this.state.item.company_id,
            odometer:this.state.item.total_odometer_reading,
            serviceKilometer:this.state.item.service_kilometer,
            transmissionService:this.state.item.transmission_service,
            sparkPlug:this.state.item.spark_plug_for_eg,
            model: this.state.item.model,
            fuleType: this.state.item.fuel_type,
            make: this.state.item.make,
            year: this.state.item.year,
            regoExpireDate: this.state.item.rego_expire_date,
            insuranceExpireDate: this.state.item.insurance_expire_date,
            imageUri: Links.BASEURL + this.state.item.car_image,
            isHybridYes: this.state.item.is_hybrid === "1" ? true : false,
            isHybridNo: this.state.item.is_hybrid === "0" ? true : false,
            //isHybridNo: this.state.item.is_hybrid === "" ? true : false,
            isCarStatusActive: this.state.item.status === "1" ? true : false,
            isCarStatusInactive: this.state.item.status === "0" ? true : false,
            // com: item.company_id,
            // insuranceExpireDate: item.company_name,
            // insuranceExpireDate: item.company_code,
        })
        
    }
    goToMainScreen() {
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'MainDrawerScreen' }],
        });
      }
    onClickSubmitButton() {

    }
    async onValueChangeCompany(value) {
        this.setState({
            companyId: value,
        });
        console.log("this.state.companyId", value)

    }
    onClickDropdownItem(fuleType) {
        this.setState({
            fuleType: fuleType,
        })
    }

    onClickVehicleDropdownItem(vehicleId) {
        this.setState({
            vehicleId: vehicleId,
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
                this.setState({
                    resourcePath: res,
                    imageUri: res.assets[0].uri,
                    imageName: res.assets[0].fileName,
                    imageSize: res.assets[0].fileSize,
                    imageType: res.assets[0].type
                });

                console.log('fileData', JSON.stringify(res.assets[0].fileName));
                console.log('fileUri', JSON.stringify(res.assets[0].uri));


            }
        });
    }

    getCompanyList() {
        try {
            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    this.getCompanyListApi();
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

    getCompanyListApi = async () => {
        this.setState({ isLoading: true });

        var inputBody = JSON.stringify({
            device_type: "1",
            user_id: this.userId,
            token_key: this.apiKey,
        });


        try {
            console.log("Call Rent Out company_list API Link ========>  ", Links.getCompanyList);
            console.log("Rent Out company_list Input ========>  ", JSON.stringify(inputBody));
            const res = await fetch(Links.getCompanyList, {
                method: 'POST',
                body: inputBody,
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
            });
            const responseJSON = await res.json();
            console.log("Rent Out company_list Response ===========>  ", JSON.stringify(responseJSON));
            if (responseJSON) {
                this.setState({ isLoading: false });
                if (responseJSON.hasOwnProperty("status") && responseJSON.status == 1) {
                    if (responseJSON.hasOwnProperty("company_list") && responseJSON.company_list != null) {
                        this.setState({ companyList: responseJSON.company_list });

                        console.log("company_id", this.state.companyList)

                    }
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


    callAddNewCarValidation() {
        Keyboard.dismiss();
        if (this.state.carNo == "") {
            Toast.show("Please enter Car No", Toast.SHORT);
        }
        else if (this.state.vehicleId == null||this.state.vehicleId == "") {
            Toast.show("Please select vehicle type", Toast.SHORT);
        }
        else if (this.state.company == "") {
            Toast.show("Please select company name", Toast.SHORT);
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
        else if (this.state.odometer == null||this.state.odometer == "") {
            Toast.show("Please enter Odometer value", Toast.SHORT);
            console.log("vehicle id", vehicleId)
        }
        else if (this.state.serviceKilometer ==null||this.state.serviceKilometer == "") {
            Toast.show("Please enter Service Kilometers value", Toast.SHORT);
        }
        else if (this.state.regoExpireDate ==null||this.state.regoExpireDate == "") {
            Toast.show("Please enter Rego Expire Date", Toast.SHORT);
        }
        else if (this.state.insuranceExpireDate ==null||this.state.insuranceExpireDate == "") {
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
        formData.append('user_id', this.userId);
        formData.append('car_no', this.state.carNo);

        formData.append('company_id', this.state.companyId);
        formData.append('vehicle_type', this.state.vehicleId);
        formData.append('odometer_reading', this.state.odometer);

        formData.append('service_kilometer', this.state.serviceKilometer);
        formData.append('transmission_service', this.state.transmissionService);
        formData.append('spark_plug_for_eg', this.state.sparkPlug);

        formData.append('make', this.state.make);
        formData.append('model', this.state.model);
        formData.append('year', this.state.year);
        formData.append('fuel_type', this.state.fuleType);
        formData.append('is_hybrid', this.state.isHybridYes === true ? "1" : "0");
        formData.append('status', this.state.isCarStatusActive === true ? "1" : "0");
        formData.append('rego_expire_date', this.state.regoExpireDate);
        formData.append('insurance_expire_date', this.state.insuranceExpireDate);
        if(this.state.imageName.trim().length>0){
        formData.append('car_image', {
            uri: Platform.OS === 'ios' ? this.state.imageUri.replace('file://', '') : this.state.imageUri,
            name: this.state.imageName,
            type: this.state.imageType
        });
    }
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
                this.setState({ isLoading: false });
                if (responseJSON.hasOwnProperty("status") && responseJSON.status == 1) {
                    if (responseJSON.hasOwnProperty("message") && responseJSON.message) {
                        Toast.show(responseJSON.message, Toast.SHORT);
                    }
                    this.goToMainScreen()
                    //this.props.navigation.goBack()

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



    renderFuleType = (item) => {
        return (
            <View>
                <Text style={styles.selectionListTextStyle}>{item.value}</Text>
            </View>
        );
    };


renderCompany = (item) => {
        return (
            <View>
                <Text style={styles.selectionListTextStyle}>{item.company_name}</Text>
            </View>
        );
    };

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
                {this.state.isLoading && <LoaderView />}
                <CommonAppBar title="Edit Car" navigation={this.props.navigation} />

                <ScrollView >
                    <View style={styles.bottomViewContainer}>
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
                                onSubmitEditing={() => { this.makeTextInput.focus() }}
                                blurOnSubmit={false}
                            />
                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Vehicle Type *</Text>

<View style={styles.editTextContainer}>
    <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={this.state.vehicleType}
        placeholder="Select Vehicle Type"
        maxHeight={300}
        labelField="value"
        valueField="value"
        value={this.state.vehicleId}
        onChange={item => {
            this.onClickVehicleDropdownItem(item.value);
        }}
        renderItem={this.renderVehicleType}

    />
</View>



<Text numberOfLines={1} style={styles.headingTextStyle} >Company *</Text>

<View style={styles.editTextContainer}>

    <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={this.state.companyList}
        placeholder="Select Company"
        maxHeight={300}
        labelField="company_name"
        valueField="company_id"
        value={this.state.companyId}
        onChange={item => {
            this.onValueChangeCompany(item.company_id);
        }}
        renderItem={this.renderCompany}

        />
</View>

<Text numberOfLines={1} style={styles.headingTextStyle} >Make</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.make}
                                onChangeText={(value) => this.setState({ make: value })}
                                onSubmitEditing={() => { this.modelTextInput.focus() }}
                                ref={(input) => { this.makeTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Model *</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.model}
                                onChangeText={(value) => this.setState({ model: value })}
                                onSubmitEditing={() => { this.fuelTypeTextInput.focus() }}
                                ref={(input) => { this.modelTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Odometer *</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.odometer}
                                onChangeText={(value) => this.setState({ odometer: value })}
                                onSubmitEditing={() => { this.yearTextInput.focus() }}
                                blurOnSubmit={true}
                            />
                        </View>








                        <Text numberOfLines={1} style={styles.headingTextStyle} >Year</Text>

                        <TouchableOpacity onPress={this.showYear}>

                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    placeholder="DD/MM/YYYY"
                                    value={this.state.year}
                                    onChangeText={(value) => this.setState({ year: value })}
                                    onSubmitEditing={() => { this.fuelTypeTextInput.focus() }}
                                    ref={(input) => { this.yearTextInput = input; }}
                                    blurOnSubmit={false}
                                />

                                <Image
                                    source={require('../images/calendar.png')}
                                    style={styles.calenderIcon}
                                />
                            </View>
                        </TouchableOpacity>


                        {this.state.isDisplayYear &&
                            <DateTimePicker
                                testID="dateTimePicker"
                            value={new Date()}
                                mode='date'
                            display={Platform.OS == "android" ? "calendar" : "spinner"}
                            maximumDate={new Date()}
                            // minimumDate={new Date()}
                            onChange={this.setYear}
                            />
                        }

<Text numberOfLines={1} style={styles.headingTextStyle} >Fuel Type</Text>

<View style={styles.editTextContainer}>
    <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={this.state.abnList}
        placeholder="Select Fuel Type"
        maxHeight={300}
        labelField="value"
        valueField="value"
        value={this.state.fuleType}
        onChange={item => {
            this.onClickDropdownItem(item);
        }}
        renderItem={this.renderFuleType}

    />
</View>

<Text numberOfLines={1} style={styles.headingTextStyle} >Service Kilometer *</Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.serviceKilometer}
                                onChangeText={(value) => this.setState({ serviceKilometer: value })}
                                onSubmitEditing={() => { this.transmissionServiceTextInput.focus() }}
                                ref={(input) => { this.serviceKilometerTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Transmission Service </Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.transmissionService}
                                onChangeText={(value) => this.setState({ transmissionService: value })}
                                onSubmitEditing={() => { this.sparkPlugTextInput.focus() }}
                                ref={(input) => { this.transmissionServiceTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Spark Plug for EG </Text>
                        <View style={styles.editTextContainer}>
                            <TextInput
                                style={styles.emailIdEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                // placeholder="Email Id"
                                value={this.state.sparkPlug}
                                onChangeText={(value) => this.setState({ sparkPlug: value })}
                                onSubmitEditing={() => { this.insuranceExpireDateTextInput.focus() }}
                                ref={(input) => { this.sparkPlugTextInput = input; }}
                                blurOnSubmit={false}
                            />
                        </View>




                        <Text numberOfLines={1} style={styles.headingTextStyle} >Insurance Expire Date *</Text>
                        <TouchableOpacity onPress={this.showInsuranceExpireDate}>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    placeholder="DD/MM/YYYY"
                                    value={this.state.insuranceExpireDate}
                                    onChangeText={(value) => this.setState({ insuranceExpireDate: value })}
                                    onSubmitEditing={() => { this.regoExpireDateTextInput.focus() }}
                                    ref={(input) => { this.insuranceExpireDateTextInput = input; }}
                                    blurOnSubmit={false}
                                />

                                <Image
                                    source={require('../images/calendar.png')}
                                    style={styles.calenderIcon}
                                />
                            </View>
                        </TouchableOpacity>

                        {this.state.isDisplayInsuranceExpireDate &&
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={new Date()}
                                mode='date'
                                // maximumDate={new Date()}
                                minimumDate={new Date()}
                                display={Platform.OS == "android" ? "calendar" : "spinner"}
                                onChange={this.setInsuranceExpireDate}
                            />
                        }

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Rego Expire Date *</Text>
                        <TouchableOpacity onPress={this.showRegoExpireDate}>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    placeholder="DD/MM/YYYY"
                                    value={this.state.regoExpireDate}
                                    onChangeText={(value) => this.setState({ regoExpireDate: value })}
                                    ref={(input) => { this.regoExpireDateTextInput = input; }}
                                    blurOnSubmit={false}
                                />

                                <Image
                                    source={require('../images/calendar.png')}
                                    style={styles.calenderIcon}
                                />
                            </View>
                        </TouchableOpacity>


                        {this.state.isDisplayRegoExpireDate &&
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={new Date()}
                                mode='date'
                            display={Platform.OS == "android" ? "calendar" : "spinner"}
                            // maximumDate={new Date()}
                            minimumDate={new Date()}
                                onChange={this.setRegoExpireDate}
                            />
                        }


                        <Text numberOfLines={1} style={styles.headingTextStyle} >Upload Photo</Text>
                        <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery()}>
                            {this.state.imageUri != null ?
                                <Image
                                    source={{ uri: this.state.imageUri }}
                                    style={styles.logoIcon}
                                />
                                : <Image
                                    source={require('../images/ic_add_camera.png')}
                                    style={styles.logoIcon}
                                />
                            }


                            {this.state.fileName != "" ?
                                <Text numberOfLines={1} style={styles.uploadImageNameText} >{this.state.imageName}</Text>
                                : <Text numberOfLines={1} style={styles.uploadPhotoText} >Upload Photo</Text>

                            }

                        </TouchableOpacity>


                        <View style={styles.rowViewOptionStyle}>
                            <Text numberOfLines={1} style={styles.headingTextStyleTwo} >Hybrid</Text>

                            <TouchableOpacity onPress={() => this.setState({
                                isHybridYes: true,
                                isHybridNo: false
                            })}>
                                <Image
                                    source={this.state.isHybridYes ? require('../images/ic_radio_check.png') : require('../images/ic_radio_uncheck.png')}
                                    style={styles.checkUncheckIcon}
                                />
                            </TouchableOpacity>
                            <Text numberOfLines={1} style={styles.optionTextStyle} >YES</Text>

                            <TouchableOpacity onPress={() => this.setState({
                                isHybridYes: false,
                                isHybridNo: true
                            })}>
                                <Image
                                    source={this.state.isHybridNo ? require('../images/ic_radio_check.png') : require('../images/ic_radio_uncheck.png')}
                                    style={styles.checkUncheckIcon}
                                />
                            </TouchableOpacity>
                            <Text numberOfLines={1} style={styles.optionTextStyle} >NO</Text>
                        </View>


                        <View style={styles.rowViewOptionStyle}>
                            <Text numberOfLines={1} style={styles.headingTextStyleTwo} >Car Status</Text>

                            <TouchableOpacity onPress={() => this.setState({
                                isCarStatusActive: true,
                                isCarStatusInactive: false
                            })}>
                                <Image
                                    source={this.state.isCarStatusActive ? require('../images/ic_radio_check.png') : require('../images/ic_radio_uncheck.png')}
                                    style={styles.checkUncheckIcon}
                                />
                            </TouchableOpacity>
                            <Text numberOfLines={1} style={styles.optionTextStyle} >ACTIVE</Text>

                            <TouchableOpacity onPress={() => this.setState({
                                isCarStatusActive: false,
                                isCarStatusInactive: true
                            })}>
                                <Image
                                    source={this.state.isCarStatusInactive ? require('../images/ic_radio_check.png') : require('../images/ic_radio_uncheck.png')}
                                    style={styles.checkUncheckIcon}
                                />
                            </TouchableOpacity>
                            <Text numberOfLines={1} style={styles.optionTextStyle} >INACTIVE</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.approveButtonContainer}
                                onPress={() => this.callAddNewCarValidation()}>
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
        marginTop:5,
        width: 1000,
        height: 100,
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
        flex: 1,
        paddingVertical: Platform.OS == "ios" ? 16 : 12

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

    dropdown: {
        height: 50,
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
        fontSize: 16,
        color: Colors.black,

    },
    selectedTextStyle: {
        fontSize: 16,
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
        fontSize: 13,
        color: Colors.black,
        // fontFamily: fontSelector("regular"),
        paddingHorizontal: 15,
        paddingVertical: 12
    },

});