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
import exported from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import * as Colors from '../utils/Colors';
import AdaptiveStatusBar from '../component/AdaptiveStatusBar';
import AppBarWithMenu from '../component/AppBarWithMenu';
import LoaderView from '../component/LoaderView'
import Loader from '../component/Loader';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Constants from '../utils/Constants';
import Links from '../utils/Links';
import Utils from '../utils/Utils';
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
const imageUrl = "https://images.unsplash.com/photo-1526045612212-70caf35c14df";


export default class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNetworkAvailable: true,
            isLoading: false,
            data: {},
            fullName: "kk",
            email: "kk@gmail.com",
            mobile: "8787878787",
            role: "Driver Manager",
            address: "Salkia Howrah-711106 ",
            gender: "Male",
            abn: "ABN",
            tfn: "TFN"
        }


    }

    callMyProfile() {
        try {

            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    this.callMyProfileApi();
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

    componentDidMount = async () => {
        this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
        this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);
        this.callMyProfile();
    }

    callMyProfileApi = async () => {
        this.setState({ isLoading: true });

        var inputBody = JSON.stringify({
            device_type: "1",
            user_id: this.userId,
            token_key: this.apiKey,
        });


        try {
            console.log("Call MyProfile API Link ========>  ", Links.MY_PROFILE);
            console.log("Call MyProfile Input ========>  ", JSON.stringify(inputBody));
            const res = await fetch(Links.MY_PROFILE, {
                method: 'POST',
                body: inputBody,
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    // "Content-Type": "multipart/form-data",
                },
            });
            const responseJSON = await res.json();
            console.log("Logout Response ===========>  ", JSON.stringify(responseJSON));
            if (responseJSON) {
                this.setState({ isLoading: false });
                if (responseJSON.hasOwnProperty("status") && responseJSON.status == 1) {
                    this.setState({ data: responseJSON.profile_details });
                    this.setState({ fullName: responseJSON.profile_details.full_name });
                    this.setState({ email: responseJSON.profile_details.email });
                    this.setState({ mobile: responseJSON.profile_details.mobile_no });
                    this.setState({ role: responseJSON.profile_details.role_name });
                    this.setState({ gender: responseJSON.profile_details.gender });
                    this.setState({ address: responseJSON.profile_details.address });
                    this.setState({ abn: responseJSON.profile_details.abn });
                    this.setState({ tfn: responseJSON.profile_details.tfn });
                    this.setState({ imageUrl: Links.BASEURL + responseJSON.profile_details.user_image });
                    console.log("MyProfile Response ===========>  ", imageUrl);

                    await AsyncStorage.setItem(Constants.STORAGE_KEY_NAME, this.state.fullName);
                    await AsyncStorage.setItem(Constants.STORAGE_KEY_EMAIL, this.state.email);
                    await AsyncStorage.setItem(Constants.STORAGE_KEY_MOBILEL, this.state.mobile);

                    await AsyncStorage.setItem(Constants.STORAGE_KEY_ADDRESS, this.state.address);
                    await AsyncStorage.setItem(Constants.STORAGE_KEY_ABN, this.state.abn);
                    await AsyncStorage.setItem(Constants.STORAGE_KEY_TFN, this.state.tfn);

                    await AsyncStorage.setItem(Constants.STORAGE_KEY_GENDER, this.state.gender);
                    await AsyncStorage.setItem(Constants.STORAGE_KEY_ROLE, this.state.role);
                    await AsyncStorage.setItem(Constants.STORAGE_KEY_USER_IMAGE, this.state.imageUrl);
                    // console.log("MyProfile AsyncStorageResponse ===========>  ", JSON.stringify(fullName));
                    if (responseJSON.hasOwnProperty("message") && responseJSON.message) {
                        Toast.show(responseJSON.message, Toast.SHORT);
                    }
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

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.isLoading && <LoaderView />}
                <AppBarWithMenu title="My Account" navigation={this.props.navigation} />
                <ScrollView >
                <View style={styles.bottomViewContainer}>

                        <View style={{
                            flexDirection: 'row',
                            marginHorizontal: 20,
                            marginTop: 20,
                            justifyContent: 'center',


                        }} >

                            <Image
                                source={{ uri: this.state.imageUrl }}
                                style={styles.viewImage}
                            />
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('EditProfile')}>
                                <View style={styles.rowViewEdit}>
                                    <Image
                                        source={require('../images/ic_edit.png')}
                                        style={styles.viewIcon}
                                    />
                                    <Text style={styles.editTextStyle}>Edit</Text>
                                </View>
                        </TouchableOpacity>

                    </View>
                        <View style={styles.column}>

                        <Text numberOfLines={1} style={styles.headingBigTextStyle} >{this.state.fullName}</Text>
                        <Text numberOfLines={1} style={styles.headingSmallTextStyle} >{this.state.mobile}</Text>
                        <Text numberOfLines={1} style={styles.headingSmallTextStyle} >{this.state.email}</Text>

                        </View>




                        <View style={styles.searchEditTextContainer}>
                            <Text style={styles.infoHeadingTextStyle}>Role :</Text>
                            <Text style={styles.infoTextStyle}>{this.state.role}</Text>
                        </View>

                        <View style={styles.largeTextContainer}>
                            <Text numberOfLines={1} style={styles.filterGrayText} >Full Address</Text>
                            <Text style={styles.filterText} >{this.state.address}</Text>
                        </View>


                        <View style={styles.searchEditTextContainer}>
                            <Text style={styles.infoHeadingTextStyle}>Gender</Text>
                            <Text style={styles.infoTextStyle}>{this.state.gender}</Text>
                        </View>


                        <View style={styles.searchEditTextContainer}>
                            <Text style={styles.infoHeadingTextStyle}>ABN</Text>
                            <Text style={styles.infoTextStyle}>{this.state.abn}</Text>
                        </View>


                        <View style={styles.searchEditTextContainer}>
                            <Text style={styles.infoHeadingTextStyle}>TBN</Text>
                            <Text style={styles.infoTextStyle}>{this.state.tfn}</Text>
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
        margin: 0
    },
    viewImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 0,
        borderRadius: 50
    },
    viewIcon: {
        width: 20,
        height: 10,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginEnd: 10,
    },
    editContainer: {
        // flex: 1,
        borderRadius: 20,
        backgroundColor: Colors.textColor1,
        alignSelf: 'baseline',

    },
    editTextStyle: {
        fontSize: 12,
        // fontFamily: fontSelector("bold"),
        color: Colors.white,
        paddingHorizontal: 0,
        paddingVertical: 0,
        alignItems: "flex-start",

    },
    editRightTextStyle: {
        fontSize: 8,
        // fontFamily: fontSelector("bold"),
        color: Colors.white,
        paddingHorizontal: 0,
        paddingVertical: 0,
        alignItems: "flex-end",

    },
    mainContainer: {
        flex: 1,
    },
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomViewContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        marginTop: 10,
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        paddingVertical: 10,
        height: Dimensions.get('window').height
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
    headingEditTextStyle: {
        fontSize: 22,
        // fontFamily: fontSelector("regular"),
        color: Colors.textColor1,
        paddingHorizontal: 20,
        marginTop: 15,
        marginBottom: 10,

    },
    headingBigTextStyle: {
        fontSize: 22,
        // fontFamily: fontSelector("regular"),
        color: Colors.textColor1,
        paddingHorizontal: 20,
        marginTop: 15,
        marginBottom: 10,
        textAlign: 'center'
    },
    headingSmallTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        paddingHorizontal: 20,
        marginTop: 15,
        marginBottom: 10,

        textAlign: 'center'
    },
    headingTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        paddingHorizontal: 40,
        marginTop: 15,
        marginBottom: 10,
    },
    buttonContainer: {
        backgroundColor: Colors.textColor1,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginStart: 15,
        flexWrap: 'wrap',
        paddingVertical: 6,
        paddingHorizontal: 20,
        position: 'absolute',
        right: 0,
        top: 0
    },
    buttonText: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.white,
        textAlign: 'center',
    },
    filterText: {
        fontSize: 12,
        color: Colors.black,
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        paddingTop: 15

    },

    filterGrayText: {
        fontSize: 12,
        color: "#7F8C8D",
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        paddingTop: 15

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
        textAlign: ''

    }, filterMainContainer: {
        paddingBottom: 12,
    },
    infoContainer: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 3,
    },
    infoContainerTwo: {
        flexDirection: 'row',
        marginTop: 3,
    },
    infoHeadingTextStyleTwo: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: '#7F8C8D',
    },

    infoHeadingTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: '#7F8C8D',
        flex: 1
    },
    searchEditTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 18,
        marginHorizontal: 20,
        flexDirection: 'row',
        height: 48,
        paddingTop: 15,
        marginTop: 10,
        marginBottom: 10
    }, largeTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 15,
        paddingHorizontal: 18,
        marginHorizontal: 20,
        textAlign: 'center',
        height: 100,
    },
    searchEditTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
    },
    searchIcon: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginStart: 10
    },

});