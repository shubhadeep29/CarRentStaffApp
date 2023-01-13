import React, { useState } from 'react';
import {
    Image, FlatList,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Keyboard,
} from 'react-native';
import * as Colors from '../utils/Colors';
import AdaptiveStatusBar from '../component/AdaptiveStatusBar';
import Loader from '../component/Loader';
import CommonAppBar from '../component/CommonAppBar';
import { ScrollView } from 'react-native-gesture-handler';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Constants from '../utils/Constants';
import Links from '../utils/Links';
import Utils from '../utils/Utils';
import LoaderView from '../component/LoaderView';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';


export default class ValidateStepFiveScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url:"",
            item: props.route.params.item,
            isNetworkAvailable: true,
            isLoading: false,

            deviceType: "1",
            firstName: "",
            lastName: "",
            middleName: "",
            email: "",
            flatNo: "",
            streetNo: "",
            streetName: "",
            suburb: "",
            postCode: "",
            dob: "",
            moileNo: "",

            selectedUtility: "",
            passportExpireDate: "",
            passportNo: "",
            driverExpireDate: "",
            driverLICNo: "",
            isAustralianLicenceYes: true,
            isAustralianLicenceNo: false,

            accountName: "",
            bsb: "",
            accountNumber: "",
            numberOfAtFaultAccidents: "",
            numberOfNotAtFaultAccidents: "",

            bondAmount: "",
            bondAmountDate: "DD/MM/YYYY",
            isDisplayDate: false,
            paymentMethod: "Cash",
            referenceNumber: "",
            adminNote: "",

            licenceImage: "",
            licenceExpiryImage: "",
            passportNoImage: "",
            passportExpiryImage: "",
            utilityBillImage: "",

            paymentMethodList: [],

        }
    }



    componentDidMount = async () => {
        this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
        this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);

        this.getPaymentMethod()


        console.log("item", this.state.item)
        console.log("componentDidMount1", this.state.item.bond_details.bond_payment_method)
        
        this.setState({
            firstName: this.state.item.first_name,
            lastName: this.state.item.last_name,
            middleName: this.state.item.middle_name,
            email: this.state.item.email,
            flatNo: this.state.item.flat_no,
            streetNo: this.state.item.street_no,
            streetName: this.state.item.street_name,
            subrub: this.state.item.suburb,
            postCode: this.state.item.pin,
            dob: this.state.item.do,
            moileNo: this.state.item.mobile,

            selectedUtility: this.state.item.utility_bill,
            passportExpireDate: this.state.item.passport_expiry,
            passportNo: this.state.item.passport_no,
            driverExpireDate: this.state.item.licence_expiry,
            driverLICNo: this.state.item.licence_no,
            isAustralianLicenceYes: this.state.item.is_australian_licence === "Yes" ? true : false,
            isAustralianLicenceNo: this.state.item.is_australian_licence === "No" ? true : false,

            accountName: this.state.item.bank_name,
            bsb: this.state.item.bsb,
            accountNumber: this.state.item.account_no,
            numberOfAtFaultAccidents: this.state.item.no_of_at_fault_accidents,
            numberOfNotAtFaultAccidents: this.state.item.no_of_not_at_fault_accidents,


            bondAmount:this.state.item.bond_details.bond_amount,
            bondAmountDate:new Date().getMonth()+1+"/"+new Date().getDate()+"/"+new Date().getFullYear(),
            paymentMethod:this.state.item.bond_details.bond_payment_method,
            referenceNumber:this.state.item.bond_details.bond_reference_no,
            adminNote:this.state.item.adminNote,

            licenceImage:this.state.item.licence_image,
            licenceExpiryImage:this.state.item.licence_expiry_image,
            passportNoImage:this.state.item.passport_no_image,
            passportExpiryImage:this.state.item.passport_expiry_image,
            utilityBillImage:this.state.item.utility_bill_image,
            odometerImageUri:this.state.item.odometerImageUri

                        

        })
        

    }


    setDate = (event, selectedDate) => {
        console.log("selectedDate" + selectedDate)
        this.setState({
            isDisplayDate: false,
            bondAmountDate: selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear()
        });
    }

    showDate = () => {
        this.setState({
            isDisplayDate: true,
        });
    }


    callValidateDriverValidation() {
        Keyboard.dismiss();
        if(this.state.bondAmount==""||this.state.bondAmount==null){
            Toast.show("Enter Bond Amount", Toast.SHORT);
        }else if(this.state.bondAmountDate==""||this.state.bondAmountDate==null){
            Toast.show("Enter Bond Date", Toast.SHORT);
        }else if(this.state.paymentMethod==""||this.state.paymentMethod==null){
            Toast.show("Enter Payment Method", Toast.SHORT);
        }else if(this.state.referenceNumber==""||this.state.referenceNumber==null){
            Toast.show("Enter Reference Number", Toast.SHORT);
        }else if(this.state.adminNote==""||this.state.bondAmount==null){
            Toast.show("Enter Admin Notes", Toast.SHORT);
        }else{
        
        try {
            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    if(this.state.item.status==0){
                        this.callValidateDriverApi();
                    }else{
                        this.editDriverApi();
                    }
                
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

    callValidateDriverApi = async () => {
        
        this.setState({ isLoading: true });

        var formData = new FormData();

        formData.append('token_key', this.apiKey);
        formData.append('device_type', this.state.deviceType);
        formData.append('user_id', this.userId);
        formData.append('driver_id', this.state.item.driver_id);

        formData.append('first_name', this.state.firstName);
        formData.append('middle_name', this.state.middleName);
        formData.append('last_name', this.state.lastName);
        formData.append('flat_no', this.state.flatNo);
        formData.append('street_no', this.state.streetNo);
        formData.append('street_name', this.state.streetName);
        formData.append('suburb', this.state.item.suburb);
        formData.append('pin', this.state.item.pin);
        formData.append('mobile', this.state.item.mobile);
        formData.append('dob', this.state.dob);
        formData.append('licence_no', this.state.driverLICNo);
        formData.append('licence_expiry', this.state.driverExpireDate);
        formData.append('is_australian_licence', this.state.isAustralianLicenceYes ? "Yes" : "No");
        formData.append('passport_no', this.state.passportNo);
        formData.append('passport_expiry', this.state.passportExpireDate);
        formData.append('utility_bill', this.state.selectedUtility);
        formData.append('bank_name', this.state.accountName);
        formData.append('bsb', this.state.bsb);
        formData.append('account_no', this.state.accountNumber);
        formData.append('bond_amount', this.state.bondAmount);
        formData.append('bond_date', this.state.bondAmountDate);
        formData.append('bond_payment_method', this.state.paymentMethod);
        formData.append('bond_reference_no', this.state.referenceNumber);
        formData.append('admin_notes', this.state.adminNote);


        if (this.state.licenceImage != null && this.state.licenceImage != "")
            formData.append('licence_image', {
                uri: Platform.OS === 'ios' ? this.state.licenceImage.replace('file://', '') : this.state.licenceImage,
                name: "licenceImage.jpeg",
                type: "jpeg"
            });
        if (this.state.licenceExpiryImage != null && this.state.licenceExpiryImage != "")
            formData.append('licence_expiry_image', {
                uri: Platform.OS === 'ios' ? this.state.licenceExpiryImage.replace('file://', '') : this.state.licenceExpiryImage,
                name: "licenceExpiryImage.jpeg",
                type: "jpeg"
            });
        if (this.state.passportNoImage != null && this.state.passportNoImage != "")
            formData.append('passport_no_image', {
                uri: Platform.OS === 'ios' ? this.state.passportNoImage.replace('file://', '') : this.state.passportNoImage,
                name: "passportNoImage.jpeg",
                type: "jpeg"
            });
        if (this.state.passportExpiryImage != null && this.state.passportExpiryImage != "")
            formData.append('passport_expiry_image', {
                uri: Platform.OS === 'ios' ? this.state.passportExpiryImage.replace('file://', '') : this.state.passportExpiryImage,
                name: "passportExpiryImage.jpeg",
                type: "jpeg"
            });
        if (this.state.utilityBillImage != null && this.state.utilityBillImage != "")
            formData.append('utility_bill_image', {
                uri: Platform.OS === 'ios' ? this.state.utilityBillImage.replace('file://', '') : this.state.utilityBillImage,
                name: "utilityBillImage.jpeg",
                type: "jpeg"
            });




        try {
            console.log("Call Validate Driver API Link ========>  ", Links.validateDriver);
            console.log("Validate Driver Input ========>  ", JSON.stringify(formData));
            

            const res = await fetch(Links.validateDriver, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: "application/json",
                    // 'Content-Type': 'application/json',
                    "Content-Type": "multipart/form-data",

                },
            });
            const responseJSON = await res.json();

            console.log("Car Validate Driver Response ===========>  ", JSON.stringify(responseJSON));
            if (responseJSON) {
                this.setState({ isLoading: false });
                if (responseJSON.hasOwnProperty("status") && responseJSON.status == 1) {
                    if (responseJSON.hasOwnProperty("message") && responseJSON.message) {
                        Toast.show(responseJSON.message, Toast.SHORT);
                    }
                    this.props.navigation.navigate('ValidateOrApproveDriverScreen', {
                        
                    })

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

    editDriverApi = async () => {
        
        this.setState({ isLoading: true });

        var formData = new FormData();

        formData.append('token_key', this.apiKey);
        formData.append('device_type', this.state.deviceType);
        formData.append('user_id', this.userId);
        formData.append('driver_id', this.state.item.driver_id);

        formData.append('first_name', this.state.firstName);
        formData.append('middle_name', this.state.middleName);
        formData.append('last_name', this.state.lastName);
        formData.append('flat_no', this.state.flatNo);
        formData.append('street_no', this.state.streetNo);
        formData.append('street_name', this.state.streetName);
        formData.append('suburb', this.state.item.suburb);
        formData.append('pin', this.state.item.pin);
        formData.append('mobile', this.state.item.mobile);
        formData.append('dob', this.state.dob);
        formData.append('licence_no', this.state.driverLICNo);
        formData.append('licence_expiry', this.state.driverExpireDate);
        formData.append('is_australian_licence', this.state.isAustralianLicenceYes ? "Yes" : "No");
        formData.append('passport_no', this.state.passportNo);
        formData.append('passport_expiry', this.state.passportExpireDate);
        formData.append('utility_bill', this.state.selectedUtility);
        formData.append('bank_name', this.state.accountName);
        formData.append('bsb', this.state.bsb);
        formData.append('account_no', this.state.accountNumber);
        formData.append('bond_amount', this.state.bondAmount);
        formData.append('bond_date', this.state.bondAmountDate);
        formData.append('bond_payment_method', this.state.paymentMethod);
        formData.append('bond_reference_no', this.state.referenceNumber);
        formData.append('admin_notes', this.state.adminNote);


        if (this.state.licenceImage != null && this.state.licenceImage != "")
            formData.append('licence_image', {
                uri: Platform.OS === 'ios' ? this.state.licenceImage.replace('file://', '') : this.state.licenceImage,
                name: "licenceImage.jpeg",
                type: "jpeg"
            });
        if (this.state.licenceExpiryImage != null && this.state.licenceExpiryImage != "")
            formData.append('licence_expiry_image', {
                uri: Platform.OS === 'ios' ? this.state.licenceExpiryImage.replace('file://', '') : this.state.licenceExpiryImage,
                name: "licenceExpiryImage.jpeg",
                type: "jpeg"
            });
        if (this.state.passportNoImage != null && this.state.passportNoImage != "")
            formData.append('passport_no_image', {
                uri: Platform.OS === 'ios' ? this.state.passportNoImage.replace('file://', '') : this.state.passportNoImage,
                name: "passportNoImage.jpeg",
                type: "jpeg"
            });
        if (this.state.passportExpiryImage != null && this.state.passportExpiryImage != "")
            formData.append('passport_expiry_image', {
                uri: Platform.OS === 'ios' ? this.state.passportExpiryImage.replace('file://', '') : this.state.passportExpiryImage,
                name: "passportExpiryImage.jpeg",
                type: "jpeg"
            });
        if (this.state.utilityBillImage != null && this.state.utilityBillImage != "")
            formData.append('utility_bill_image', {
                uri: Platform.OS === 'ios' ? this.state.utilityBillImage.replace('file://', '') : this.state.utilityBillImage,
                name: "utilityBillImage.jpeg",
                type: "jpeg"
            });




        try {
            console.log("Call Edit Driver API Link ========>  ", Links.editDriver);
            console.log("Edit Driver Input ========>  ", JSON.stringify(formData));
            

            const res = await fetch(Links.editDriver, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",

                },
            });
            const responseJSON = await res.json();

            console.log("Car Edit Driver Response ===========>  ", JSON.stringify(responseJSON));
            if (responseJSON) {
                this.setState({ isLoading: false });
                if (responseJSON.hasOwnProperty("status") && responseJSON.status == 1) {
                    if (responseJSON.hasOwnProperty("message") && responseJSON.message) {
                        Toast.show(responseJSON.message, Toast.SHORT);
                    }
                    this.props.navigation.navigate('ValidateOrApproveDriverScreen', {
                        
                    })

                }
                else if (responseJSON.hasOwnProperty("status") && responseJSON.status == 0) {
                    if (responseJSON.hasOwnProperty("message") && responseJSON.message) {
                        Toast.show(responseJSON.message, Toast.SHORT);
                        console.log("response",responseJSON)
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



    getPaymentMethod() {
        try {
            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    this.getPaymentMethodApi();
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

    getPaymentMethodApi = async () => {
        this.setState({ isLoading: true });

        var inputBody = JSON.stringify({
            device_type: "1",
            user_id: this.userId,
            token_key: this.apiKey,
        });


        try {
            console.log("Call Rent Out list API Link ========>  ", Links.getPaymentMethod);
            console.log("Rent Out list Input ========>  ", JSON.stringify(inputBody));
            const res = await fetch(Links.getPaymentMethod, {
                method: 'POST',
                body: inputBody,
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
            });
            const responseJSON = await res.json();
            console.log("Rent Out list Response ===========>  ", JSON.stringify(responseJSON));
            if (responseJSON) {
                this.setState({ isLoading: false });
                if (responseJSON.hasOwnProperty("status") && responseJSON.status == 1) {
                    if (responseJSON.hasOwnProperty("payment_method_list") && responseJSON.payment_method_list != null) {
                        this.setState({ paymentMethodList: responseJSON.payment_method_list });

                        var paymentMethodListModified = []
                        for (var i = 0; i < this.state.paymentMethodList.length; i++) {
                            paymentMethodListModified.push({ "value": this.state.paymentMethodList[i] });
                        }

                        this.setState({
                            paymentMethodList: paymentMethodListModified
                        })
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

    async onValueChangePayment(value) {
        this.setState({
            paymentMethod: value
        });
        console.log("this.state.paymentMethod", value)

    }


    goToNextScreen = () => {

    }

    onClickSubmitButton(){
        this.props.navigation.navigate('ValidateOrApproveDriverScreen', {
            item: this.state.item
        })
    }


    renderDriver = (item) => {
        return (
            <View>
                <Text style={styles.selectionListTextStyle}>{item.first_name}</Text>
            </View>
        );
    };

    renderCar = (item) => {
        return (
            <View>
                <Text style={styles.selectionListTextStyle}>{item.car_no}</Text>
            </View>
        );
    };

    renderPayment = (item) => {
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

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.isLoading && <LoaderView />}
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
                                    <Text numberOfLines={1} style={styles.bondAmountText} >Bond Amount</Text>
                                    <View style={styles.editTextContainerForBond}>
                                        {this.state.item.status==0?
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
                                        :
                                        <View style={styles.editTextContainerForBond}>
                                        
                                <Text style={styles.editTextStyle}
                                        >{this.state.item.bond_details.bond_amount}</Text>
                                </View>
    }
                                    </View>
                                </View>

                                <View style={styles.boxGap} />

                                <View style={styles.bondAmountContainer}>
                                    <Text numberOfLines={1} style={styles.bondAmountText} >Date</Text>
                                    {this.state.item.status==0?
                                    <TouchableOpacity style={styles.bondDateContainer} onPress={this.showDate} >
                                        <View style={styles.editTextContainerForBond}>
                                            <Text style={styles.editTextStyle}
                                            >{this.state.bondAmountDate}</Text>
                                            <Image
                                                source={require('../images/calendar.png')}
                                                style={styles.calenderIcon}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <View style={styles.editTextContainerForBond}>
                                        
                                    <Text style={styles.editTextStyle}
                                            >{this.state.item.bond_details.bond_date}</Text>
                                            </View>
    }
                                </View>

                                {this.state.isDisplayDate &&
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={new Date()}
                                        mode='date'
                                    display={Platform.OS == "android" ? "calendar" : "spinner"}
                                        onChange={this.setDate}
                                    />
                                }
                            </View>


                            <Text numberOfLines={1} style={styles.headingTextStyle} >Payment Method</Text>


                            <View style={styles.editTextContainer}>
                                {this.state.item.status==0?
                                
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={this.state.paymentMethodList}
                                    placeholder="Select Payment Method"
                                    maxHeight={300}
                                    labelField="value"
                                    valueField="value"
                                    value={this.state.paymentMethod}
                                    onChange={item => {
                                        this.onValueChangePayment(item);
                                    }}
                                    renderItem={this.renderPayment}

                                />
                                :
                                <View style={styles.editTextContainerForBond}>
                                        
                                <Text style={styles.editTextStyle}
                                        >{this.state.item.bond_details.bond_payment_method}</Text>
                                </View>
                                }
                            </View>



                            <Text numberOfLines={1} style={styles.headingTextStyle} >Refarence Number</Text>
                            <View style={styles.editTextContainer}>
                            {this.state.item.status==0?
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
                                :
                                <View style={styles.editTextContainerForBond}>
                                        
                                <Text style={styles.editTextStyle}
                                        >{this.state.item.bond_details.bond_reference_no}</Text>
                                </View>
                                
                            }
                            </View>


                            <Text numberOfLines={1} style={styles.headingOneTextStyle} >Admin Notes</Text>
                            <View style={styles.adminNoteContainer}>
                            {this.state.item.status==0?
                                    
                                
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
                                :
                                <View style={styles.editTextContainerForBond}>
                                        
                                <Text style={styles.editTextStyle}
                                        >{this.state.item.admin_notes}</Text>
                                </View>
                                
                            }
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.approveButtonContainer}
                                onPress={() => this.callValidateDriverValidation()}>
                                    {this.state.item.status ==0 ?
                                    <Text numberOfLines={1} style={styles.buttonText}>APPROVE</Text>
                                    :
                                    <Text numberOfLines={1} style={styles.buttonText}>SUBMIT</Text>
    }
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
        fontSize: 16,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        paddingHorizontal: 40,
        marginTop: 25,
        fontWeight: 'bold'
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
        marginTop: 2,
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
        flex: 1,
        alignSelf: 'center',
        paddingVertical: Platform.OS == "ios" ? 16 : 12


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
    bondDateContainer: {
        flexDirection: 'row',
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
    dropdownStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        flex: 1,
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