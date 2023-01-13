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
import CommonAppBar from '../component/CommonAppBar';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../utils/Constants';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Links from '../utils/Links';
import Toast from 'react-native-simple-toast';

export default class ValidateStepTwoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.route.params.item,
            isNetworkAvailable: true,
            isLoading: false,
            selectedUtility: "",
            passportExpireDate: "DD/MM/YYYY",
            passportNo: "",
            driverExpireDate: "DD/MM/YYYY",
            isDisplayPassportExpireDate: false,
            isDisplayDriverExpireDate: false,
            driverLICNo: "",
            isAustralianLicenceYes: true,
            isAustralianLicenceNo: false,

            licenceImage: "",
            licenceImageName: "",
            licenceExpiryImage: "",
            licenceExpiryImageName: "",
            passportNoImage: "",
            passportNoImageName: "",
            passportExpiryImage: "",
            passportExpiryImageName: "",
            utilityBillImage: "",
            utilityBillImageName: "",
        }
    }

    componentDidMount = async () => {
        this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
        this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);
        // this.item = this.props.params.item;

        console.log("item", this.state.item)

        this.setState({
            selectedUtility: this.state.item.utility_bill,
            passportExpireDate: this.state.item.passport_expiry,
            passportNo: this.state.item.passport_no,
            driverExpireDate: this.state.item.licence_expiry,
            driverLICNo: this.state.item.licence_no,
            licenceImage: this.state.item.licence_image,
            passportNoImage: this.state.item.passport_no_image,
            passportExpiryImage: this.state.item.passport_expiry_image,
            utilityBillImage: this.state.item.utility_bill_image,
            utilityBillImageName:this.state.item.utilityBillImageName,

            licenceExpiryImage: this.state.item.licence_expiry_image,
            isAustralianLicenceYes: this.state.item.is_australian_licence === "Yes" ? true : false,
            isAustralianLicenceNo: this.state.item.is_australian_licence === "No" ? true : false,

        })
    }


    goToNextScreen = () => {
        if(this.state.driverLICNo==""){
            Toast.show("Please enter Driving License Number", Toast.SHORT);
        }else if(this.state.licenceImage==""){
            Toast.show("Please enter Driving License Image", Toast.SHORT);
        }else if(this.state.driverExpireDate==""){
            Toast.show("Please enter Driving License Expiry Date", Toast.SHORT);
        }else if(this.state.licenceExpiryImage==""){
            Toast.show("Please enter Driving License Expiration Image", Toast.SHORT);
        }else if(this.state.isAustralianLicenceYes&&this.state.passportNo==""){
            Toast.show("Please enter Passport Number", Toast.SHORT);
        }else if(this.state.isAustralianLicenceYes&&this.state.passportNoImage==""){
            Toast.show("Please enter Passport Image", Toast.SHORT);
        }else if(this.state.isAustralianLicenceYes&&this.state.passportExpireDate==""){
            Toast.show("Please enter Passport Expiration Date", Toast.SHORT);
        }else if(this.state.isAustralianLicenceYes&&this.state.passportExpiryImage==""){
            Toast.show("Please enter Passport Expiration Image", Toast.SHORT);
        }else if(this.state.isAustralianLicenceYes&&this.state.utilityBillImageName==""){
            Toast.show("Please enter Utility Bill Name", Toast.SHORT);
        }else if(this.state.isAustralianLicenceYes&&this.state.utilityBillImage==""){
            Toast.show("Please enter Utility Bill Image", Toast.SHORT);
        }else{
        let item = this.state.item
        item.utility_bill = this.state.selectedUtility;
        item.passport_expiry = this.state.passportExpireDate;
        item.passport_no = this.state.passportNo;
        item.licence_expiry = this.state.driverExpireDate;
        
        item.licence_no = this.state.driverLICNo;
        item.is_australian_licence = this.state.isAustralianLicenceYes;
        if(this.state.licenceImage!="")
        item.licence_image = this.state.licenceImage;
        if(this.state.licenceExpiryImage!="")
        item.licence_expiry_image = this.state.licenceExpiryImage;
        if(this.state.passportNoImage!="")
        item.passport_no_image = this.state.passportNoImage;
        if(this.state.passportExpiryImage!="")
        item.passport_expiry_image = this.state.passportExpiryImage;
        if(this.state.utilityBillImage!="")
        item.utility_bill_image = this.state.utilityBillImage;
        this.setState({
            item: item
        })

        console.log("++++++++++++", item)
        this.props.navigation.navigate('ValidateStepThreeScreen', {
            item: item
        })
    }
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

                if (openImageGalleryFor == "licenceImage") {

                    this.state.item.licence_image=res.assets[0].uri
                    this.setState({
                        resourcePath: res,
                        licenceImage: res.assets[0].uri,
                        licenceImageName: res.assets[0].fileName,
                    });
                }
                else if (openImageGalleryFor == "licenceExpiryImage") {

                    this.state.item.licence_expiry_image=res.assets[0].uri
                    this.setState({
                        resourcePath: res,
                        licenceExpiryImage: res.assets[0].uri,
                        licenceExpiryImageName: res.assets[0].fileName,
                    });
                }
                else if (openImageGalleryFor == "passportNoImage") {

                    this.state.item.passport_no_image=res.assets[0].uri
                    this.setState({
                        resourcePath: res,
                        passportNoImage: res.assets[0].uri,
                        passportNoImageName: res.assets[0].fileName,

                    });
                }
                else if (openImageGalleryFor == "passportExpiryImage") {
                    this.state.item.passport_expiry_image=res.assets[0].uri
                    this.setState({
                        resourcePath: res,
                        passportExpiryImage: res.assets[0].uri,
                        passportExpiryImageName: res.assets[0].fileName,
                        
                    });
                }
                else if (openImageGalleryFor == "utilityBillImage") {

                    this.state.item.utility_bill_image=res.assets[0].uri
                    this.setState({
                        resourcePath: res,
                        utilityBillImage: res.assets[0].uri,
                        utilityBillImageName: res.assets[0].fileName,
                    });
                }
                else if (openImageGalleryFor == "odometerImageUri") {

                    this.state.item.odometerImageUri=res.assets[0].uri
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



    showDriverExpireDate = () => {
        this.setState({
            isDisplayDriverExpireDate: true,
        });
    }

    setDriverExpireDate = (event, selectedDate) => {
        console.log("selectedDate" + selectedDate)
        this.setState({
            isDisplayDriverExpireDate: false,
            driverExpireDate: selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear()
        });
    }

    setPassportExpireDate = (event, selectedDate) => {
        console.log("selectedDate" + selectedDate)
        this.setState({
            isDisplayPassportExpireDate: false,
            passportExpireDate: selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear()
        });
    }

    showPassportExpireDate = () => {
        this.setState({
            isDisplayPassportExpireDate: true,
        });
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

                            <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery("licenceImage")}>
                                {this.state.item.licence_image != null && this.state.item.licence_image != "" ?
                                    <Image
                                        source={{ uri: this.state.licenceImage }}
                                        style={styles.logoIcon}
                                    />
                                    : <Image
                                        source={require('../images/ic_add_camera.png')}
                                        style={styles.logoIcon}
                                    />
                                }


                                {this.state.licenceImageName != null && this.state.licenceImageName != "" ?
                                    <Text numberOfLines={2} style={styles.uploadImageNameText} >{this.state.licenceImageName}</Text>
                                    :
                                    <Text numberOfLines={1} style={styles.uploadImageNameText} >Upload Photo of Driver LIC No.</Text>
                                }

                            </TouchableOpacity>


                            <Text numberOfLines={1} style={styles.headingTextStyle} >Driver Expire</Text>
                            <TouchableOpacity style={styles.bondDateContainer} onPress={this.showDriverExpireDate} >
                                <View style={styles.editTextContainer}>
                                    <Text style={[styles.emailIdEditTextStyle, { paddingVertical: 16 }]}
                                    >{this.state.driverExpireDate}</Text>
                                <Image
                                    source={require('../images/calendar.png')}
                                    style={{ alignSelf: 'center', height: 15, width: 15 }}
                                />
                            </View>
                            </TouchableOpacity>

                            {this.state.isDisplayDriverExpireDate &&
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={new Date()}
                                    minimumDate={new Date()}
                                    mode='date'
                                display={Platform.OS == "android" ? "calendar" : "spinner"}
                                    onChange={this.setDriverExpireDate}
                                />
                            }

                            <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery("licenceExpiryImage")}>
                                {this.state.item.licence_expiry_image != null && this.state.licence_expiry_image != "" ?
                                    <Image
                                        source={{ uri: this.state.licenceExpiryImage }}
                                        style={styles.logoIcon}
                                    />
                                    : <Image
                                        source={require('../images/ic_add_camera.png')}
                                        style={styles.logoIcon}
                                    />
                                }


                                {this.state.licenceExpiryImageName != null && this.state.licenceExpiryImageName != "" ?
                                    <Text numberOfLines={2} style={styles.uploadImageNameText} >{this.state.licenceExpiryImageName}</Text>
                                    :
                                    <Text numberOfLines={1} style={styles.uploadImageNameText} >Upload Photo of Driver Expire</Text>
                                }

                            </TouchableOpacity>

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

                            <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery("passportNoImage")}>
                                {this.state.item.passport_no_image != null && this.state.item.passport_no_image != "" ?
                                    <Image
                                        source={{ uri: this.state.passportNoImage }}
                                        style={styles.logoIcon}
                                    />
                                    : <Image
                                        source={require('../images/ic_add_camera.png')}
                                        style={styles.logoIcon}
                                    />
                                }


                                {this.state.passportNoImageName != null && this.state.passportNoImageName != "" ?
                                    <Text numberOfLines={2} style={styles.uploadImageNameText} >{this.state.passportNoImageName}</Text>
                                    :
                                    <Text numberOfLines={1} style={styles.uploadImageNameText} >Upload Photo of Passport No.</Text>
                                }

                            </TouchableOpacity>


                            <Text numberOfLines={1} style={styles.headingTextStyle} >Passport Expire</Text>
                            <TouchableOpacity style={styles.bondDateContainer} onPress={this.showPassportExpireDate} >
                                <View style={styles.editTextContainer}>
                                    <Text style={[styles.emailIdEditTextStyle, { paddingVertical: 16 }]}
                                    >
                                        {this.state.passportExpireDate}
                                    </Text>
                                <Image
                                    source={require('../images/calendar.png')}
                                    style={{ alignSelf: 'center', height: 15, width: 15 }}
                                />
                            </View>
                            </TouchableOpacity>

                            {this.state.isDisplayPassportExpireDate &&
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={new Date()}
                                    minimumDate={new Date()}
                                    mode='date'
                                display={Platform.OS == "android" ? "calendar" : "spinner"}
                                    onChange={this.setPassportExpireDate}
                                />
                            }

                            <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery("passportExpiryImage")}>
                                {this.state.item.passport_expiry_image != null && this.state.item.passport_expiry_image != "" ?
                                    <Image
                                        source={{ uri: this.state.passportExpiryImage }}
                                        style={styles.logoIcon}
                                    />
                                    : <Image
                                        source={require('../images/ic_add_camera.png')}
                                        style={styles.logoIcon}
                                    />
                                }


                                {this.state.passportExpiryImageName != null && this.state.passportExpiryImageName != "" ?
                                    <Text numberOfLines={2} style={styles.uploadImageNameText} >{this.state.passportExpiryImageName}</Text>
                                    :
                                    <Text numberOfLines={1} style={styles.uploadImageNameText} >Upload Photo of Passport Expire</Text>
                                }

                            </TouchableOpacity>


                            <Text numberOfLines={1} style={styles.headingTextStyle} >Select Utility Bill</Text>

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



                            <TouchableOpacity style={styles.addImageViewStyle} onPress={() => this.openImageGallery("utilityBillImage")}>
                                {this.state.item.utility_bill_image != null && this.state.utilityBillImage != "" ?
                                    <Image
                                        source={{ uri: this.state.utilityBillImage }}
                                        style={styles.logoIcon}
                                    />
                                    : <Image
                                        source={require('../images/ic_add_camera.png')}
                                        style={styles.logoIcon}
                                    />
                                }


                                {this.state.utilityBillImageName != null && this.state.utilityBillImageName != "" ?
                                    <Text numberOfLines={2} style={styles.uploadImageNameText} >{this.state.utilityBillImageName}</Text>
                                    :
                                    <Text numberOfLines={1} style={styles.uploadImageNameText} >Upload Photo of Utility</Text>
                                }

                            </TouchableOpacity>

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
        backgroundColor: Colors.white,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
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
        marginVertical: 15,
        paddingHorizontal: 40
    },
    checkUncheckIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        alignSelf: 'center',

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

    logoIcon: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },

    uploadImageNameText: {
        fontSize: 11,
        // fontFamily: fontSelector("regular"),
        color: Colors.textColor2,
        paddingHorizontal: 15
    },

});