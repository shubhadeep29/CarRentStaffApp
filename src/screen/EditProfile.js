import React from 'react';
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
import LoaderView from '../component/LoaderView'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Constants from '../utils/Constants';
import Links from '../utils/Links';
import { ScrollView } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CommonAppBar from '../component/CommonAppBar';
import { Dropdown } from 'react-native-element-dropdown';

export default class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNetworkAvailable: true,
            isLoading: false,
            fullName: "",
            mobile: "",
            role: "",
            email: "",
            gender: "",
            abn: "",
            deviceType: "1",
            tfn: "",
            imageUrl: "",
            imageName: "No choosen file",
            address: "",
            genderList: [
                { value: "Male" },
                { value: "Female" },
                { value: "Others Gender" },
            ],
            abnList: [
                { value: "Petrol" },
                { value: "Diesel" },
                { value: "Roller" },
                { value: "LPG" },
            ]

        }
    }
    componentDidMount = async () => {
        this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
        this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);

        this.setState({
            isLoading: false,
            fullName: await AsyncStorage.getItem(Constants.STORAGE_KEY_NAME),
            mobile: await AsyncStorage.getItem(Constants.STORAGE_KEY_MOBILEL),
            role: await AsyncStorage.getItem(Constants.STORAGE_KEY_ROLE),
            email: await AsyncStorage.getItem(Constants.STORAGE_KEY_EMAIL),
            address: await AsyncStorage.getItem(Constants.STORAGE_KEY_ADDRESS),
            gender: await AsyncStorage.getItem(Constants.STORAGE_KEY_GENDER),
            abn: await AsyncStorage.getItem(Constants.STORAGE_KEY_ABN),
            tfn: await AsyncStorage.getItem(Constants.STORAGE_KEY_TFN),
            imageUrl: await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_IMAGE)
        });

    }

    onClickCancelButton = async () => {
        this.props.navigation.goBack()
    }

    callMyProfileApi = async () => {
        if(this.state.abn.length!=11){
            Toast.show("ABN must be 11 digits only", Toast.SHORT);
        }else{
            this.setState({ isLoading: true });


        var formData = new FormData();
        formData.append('device_type', this.state.deviceType);
        formData.append('user_id', this.userId)
        formData.append('token_key', this.apiKey);

        formData.append('full_name', this.state.fullName);
        formData.append('email', this.state.email);
        formData.append('mobile_no', this.state.mobile);
        formData.append('gender', this.state.gender);
        formData.append('abn', this.state.abn);
        formData.append('tfn', this.state.tfn);
        formData.append('address', this.state.address);
        formData.append('user_image', {
            uri: Platform.OS === 'ios' ? this.state.imageUrl.replace('file://', '') : this.state.imageUrl,
            name: this.state.imageName,
            type: this.state.imageType
        });




        try {
            console.log("Call MyProfile API Link ========>  ", Links.EDIT_PROFILE);
            console.log("Call MyProfile Input ========>  ", JSON.stringify(formData));
            const res = await fetch(Links.EDIT_PROFILE, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: "application/json",
                    //'Content-Type': 'application/json',
                    "Content-Type": "multipart/form-data",
                },
            });
            const responseJSON = await res.json();
            console.log("Logout Response ===========>  ", JSON.stringify(responseJSON));
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
                } else {
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
                    imageUrl: res.assets[0].uri,
                    imageName: res.assets[0].fileName,
                    imageSize: res.assets[0].fileSize,
                    imageType: res.assets[0].type
                });

                console.log('fileData', JSON.stringify(res.assets[0].fileName));
                console.log('fileUri', JSON.stringify(res.assets[0].uri));


            }
        });
    }

    onClickDropdownGender = (value) => {
        this.setState({
            gender: value
        })
        console.log("gender value" ,value)
    }

    onClickDropdownABN = (value) => {
        this.setState({
            abn: value
        })
    }




    renderGender = (item) => {
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
                <CommonAppBar title="Edit My Account" navigation={this.props.navigation} />
                <ScrollView style={styles.mainContainer}>
                    <View >
                        <View style={[styles.rowView, { paddingHorizontal: 30, flex: 1 }]}>
                            <Image
                                source={{ uri: this.state.imageUrl }}
                                style={styles.viewImage}
                            />

                            <View style={styles.column}>
                                <Text
                                    numberOfLines={1}
                                    style={styles.headingSmallTextStyle} >
                                    Upload New Photo
                                </Text>
                                <TouchableOpacity
                                    style={styles.searchEditSmallTextContainer}
                                    onPress={() => this.openImageGallery()}>

                                    <View style={styles.rowView}>
                                        <View style={styles.buttonContainer}>
                                            <Text
                                                numberOfLines={1}
                                                style={styles.editTextStyle}>
                                                Choose File
                                            </Text>
                                        </View>
                                        <View style={styles.boxGap} />

                                        <Text
                                            numberOfLines={1}
                                            maxLength={10}
                                            style={styles.filterImage} >
                                            {this.state.imageName}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <Text numberOfLines={1} style={styles.headingTextStyle} >Name</Text>
                        <View style={styles.searchEditTextContainer}>
                            <TextInput
                                numberOfLines={1}
                                style={styles.filterInputText}
                                value={this.state.fullName}
                                placeholder={"enter full name"}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                onChangeText={(value) => this.setState({ fullName: value })}
                                blurOnSubmit={false}
                            />

                        </View>
                        <Text numberOfLines={1} style={styles.headingTextStyle} >Phone</Text>
                        <View style={styles.searchEditTextContainer}>
                            <TextInput numberOfLines={1} style={styles.filterInputText}
                                value={this.state.mobile}
                                maxLength={11}
                                onChangeText={(value) => this.setState({ mobile: value })}
                                placeholder={"enter mobile number"}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                blurOnSubmit={false} />

                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Role</Text>

                        <View style={styles.searchEditTextContainer}>
                            <Text numberOfLines={1} style={styles.filterGrayText} placeholder={"Role"}>{this.state.role}</Text>

                        </View>


                        <Text numberOfLines={1} style={styles.headingTextStyle} >Your Email</Text>
                        <View style={styles.searchEditTextContainer}>
                            <Text numberOfLines={1} style={styles.filterGrayText} >{this.state.email}</Text>

                        </View>


                        <Text numberOfLines={1} style={styles.headingTextStyle} >Full Address</Text>
                        <View style={styles.largeTextContainer}>
                            <TextInput
                                multiline={true}
                                style={styles.filterText}
                                value={this.state.address}
                                onChangeText={(value) => this.setState({ address: value })}
                                autoCapitalize="none"
                                placeholderTextColor={Colors.placeholderColor}
                                blurOnSubmit={true}
                            />

                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >Gender</Text>

                        <View style={styles.searchEditTextContainer}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={this.state.genderList}
                                placeholder="Select Gender"
                                maxHeight={300}
                                labelField="value"
                                valueField="value"
                                value={this.state.gender}
                                onChange={item => {
                                    this.onClickDropdownGender(item.value);
                                }}
                                renderItem={this.renderGender}

                            />

                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >ABN</Text>

                        <View style={styles.searchEditTextContainer}>
                        <TextInput
                                numberOfLines={1}
                                style={styles.filterInputText}
                                value={this.state.abn}
                                onChangeText={(value) => this.setState({ abn: value })}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                blurOnSubmit={false} />

                        </View>

                        <Text numberOfLines={1} style={styles.headingTextStyle} >TFN</Text>
                        <View style={styles.searchEditTextContainer}>
                            <TextInput
                                numberOfLines={1}
                                style={styles.filterInputText}
                                value={this.state.tfn}
                                onChangeText={(value) => this.setState({ tfn: value })}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                blurOnSubmit={false} />

                        </View>

                        <View style={styles.buttonContainers}>
                            <TouchableOpacity style={styles.cancelButtonContainer}
                                onPress={() => this.onClickCancelButton()}>
                                <Text numberOfLines={1} style={styles.buttonText}>CANCLE</Text>
                            </TouchableOpacity>
                            <View style={styles.boxGap} />


                            <TouchableOpacity style={styles.approveButtonContainer}
                                onPress={() => this.callMyProfileApi()}>
                                <Text
                                    numberOfLines={1}
                                    style={styles.buttonText}>SAVE</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        )  
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.splashScreenBgColor,
        margin: 0,
    },
    viewImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 50
    },
    viewIcon: {
        width: 20,
        height: 10,
        resizeMode: 'contain',
        alignSelf: 'baseline',
        marginStart: 10,
    },
    editContainer: {
        // flex: 1,
        borderRadius: 20,
        backgroundColor: Colors.textColor1,
        alignSelf: 'baseline',

    },
    editTextStyle: {
        fontSize: 10,
        // fontFamily: fontSelector("bold"),
        color: Colors.white,
        alignItems: "center",
    },

    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        marginTop: 10,
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        paddingVertical: 25,
    },

    editTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 15,
        marginHorizontal: 30,
        textAlign: 'center',
        flex: 1,
        marginTop: 15,
        height: 48,
        alignItems: 'baseline',
        justifyContent: 'center',
        paddingBottom: 12,

    },
    emailIdEditTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        paddingVertical: Platform.OS == "ios" ? 16 : 12

    },
    headingTextStyle: {
        fontSize: 16,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        paddingHorizontal: 40,
        marginTop: 15,
        marginBottom: 10,
    },
    headingSmallTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        marginVertical: 10,
        backgroundColor: Colors.white,
    },
    buttonContainer: {
        backgroundColor: Colors.textColor1,
        borderRadius: 30,
        textColor: Colors.white,
        textAlign: 'center',
        paddingHorizontal: 16,
        paddingVertical: 4,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.white,
        textAlign: 'center',
    },
    filterText: {
        fontSize: 16,
        color: Colors.black,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        paddingTop: 15, 

    },
    filterGrayText: {
        fontSize: 16,
        color: "#7F8C8D",
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        paddingTop: 15, 

    },
    filterImage: {
        width:120,
        fontSize: 12,
        color: Colors.black,
        alignItems: 'center',
        alignSelf: 'center'
    },
    filterInputText: {
        fontSize: 16,
        color: Colors.black,
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        flex: 1

    },
    dropdownIcon: {
        width: 12,
        height: 12,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    rowView: {
        flexDirection: 'row',
    },
    rowViewEdit: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
        alignContent: 'flex-start',
        justifyContent: 'center',
        marginStart: 10,
        flex: 1
    },

    searchEditSmallTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
    },
    searchEditTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 18,
        marginHorizontal: 20,
        flexDirection: 'row',
        height: 48,
        paddingBottom: 10
    },

    largeTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 15,
        paddingHorizontal: 15,
        marginHorizontal: 30,
        textAlign: 'center',
        height: 100,
    },

    divider: {
        backgroundColor: Colors.borderColor,
        height: 0.5,
        marginStart: 40,
        marginEnd: 40
    },
    buttonContainers: {
        marginHorizontal: 30,
        flexDirection: 'row',
        marginTop: 100,
        marginBottom: 20
    },

    approveButtonContainer: {
        backgroundColor: Colors.textColor1,
        borderRadius: 30,
        paddingVertical: 13,
        flex: 1,
        marginBottom:25
    },
    cancelButtonContainer: {
        backgroundColor: '#aaaaaa',
        borderRadius: 30,
        paddingVertical: 13,
        flex: 1,
        marginBottom:25
    },
    boxGap: {
        width: 15
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
        fontSize: 16,
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