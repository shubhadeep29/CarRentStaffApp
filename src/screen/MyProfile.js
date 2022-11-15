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


export default class MyProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isNetworkAvailable: true,
            isLoading: false,
        }

        //this.callMyProfile();
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
                if (responseJSON.hasOwnProperty("status") && responseJSON.status == 1) {
                    this.setState({ isLoading: false });

                    await AsyncStorage.setItem(Constants.STORAGE_KEY_USER_ID, "");
                    await AsyncStorage.setItem(Constants.STORAGE_KEY_API_KEY, "");
                    await AsyncStorage.setItem(Constants.STORAGE_KEY_NAME, "");
                    await AsyncStorage.setItem(Constants.STORAGE_KEY_EMAIL, "");
                    await AsyncStorage.setItem(Constants.STORAGE_KEY_MOBILEL, "");

                    if (responseJSON.hasOwnProperty("message") && responseJSON.message) {
                        Toast.show(responseJSON.message, Toast.SHORT);
                    }


                }
                else if (responseJSON.hasOwnProperty("status") && responseJSON.status == 0) {
                    this.setState({ isLoading: false });
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
                <AppBarWithMenu title="My Account" navigation={this.props.navigation}  />

                <View style={styles.bottomViewContainer}>
                <View style={styles.rowView}>
                    <View style={styles.bottomViewContainer}>
                    <Text numberOfLines={1} style={styles.headingTextStyle} ></Text>
                        
                        </View>

                        <View style={styles.column}>
                        <Image
                                source={require('../images/rounded_img.png')}
                                style={styles.viewImage}
                            />
                        <Text numberOfLines={1} style={styles.headingBigTextStyle} >Karan Singh</Text>
                        <Text numberOfLines={1} style={styles.headingTextStyle} >+91 87777889988</Text>
                        <Text numberOfLines={1} style={styles.headingTextStyle} >karansingh@gmail.com</Text>
                    
                        </View>
                        
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
                    
                    
                    
                <View style={styles.searchEditTextContainer}>
                    <Text style={styles.infoHeadingTextStyle}>Role :</Text>
                    <Text style={styles.infoTextStyle}>Driver Manager</Text>
                </View>

                <View style={styles.largeTextContainer}>
                    <Text numberOfLines={1} style={styles.filterText} >Full Address</Text>
                    
                    <Text numberOfLines={1} style={styles.filterText} >Peskar lane, salkia howrah 6</Text>
                    
                    </View>


                <View style={styles.searchEditTextContainer}>
                    <Text style={styles.infoHeadingTextStyle}>Gender</Text>
                    <Text style={styles.infoTextStyle}>Male</Text>
                </View>


                <View style={styles.searchEditTextContainer}>
                    <Text style={styles.infoHeadingTextStyle}>ABN</Text>
                    <Text style={styles.infoTextStyle}>ABN</Text>
                </View>


                <View style={styles.searchEditTextContainer}>
                    <Text style={styles.infoHeadingTextStyle}>TBN</Text>
                    <Text style={styles.infoTextStyle}>TBN</Text>
                </View>

                    
                </View>
            </SafeAreaView>
        );
    }

    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.splashScreenBgColor,
        margin: 0,
    },
    viewImage: {
        width: 80,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center'
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
        fontSize: 8,
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
        paddingVertical: 10
    },

    editTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 15,
        marginHorizontal: 30,
        textAlign:'center',
        flex: 1,
        marginTop:15,
        height:48,
        alignItems:'baseline',
        justifyContent:'center',
        paddingBottom: 12,
        
    },
    emailIdEditTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
    },
    headingBigTextStyle: {
        fontSize: 22,
        // fontFamily: fontSelector("regular"),
        color: Colors.textColor1,
        paddingHorizontal: 40,
        marginTop: 15,
        marginBottom:10,
    },
    headingTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        paddingHorizontal: 40,
        marginTop: 15,
        marginBottom:10,
    },
    buttonContainer: {
        backgroundColor: Colors.textColor1,
        borderRadius: 20,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginTop: 35,
        position: 'relative',
    
        width:70,
        height:20,
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
    filterText: {
        fontSize: 12,
        color: Colors.black,
        alignItems:'center',
        justifyContent:'center',
        height:48,
        paddingTop:15
        
    },
    dropdownIcon: {
        width: 12,
        height: 12,
        justifyContent:'center',
        alignItems:'center',
        alignSelf: 'flex-end',
    },
    rowView: {
        flexDirection: 'row',
    },
    rowViewEdit:{
        flexDirection:'row',
    },
    column:{
        flexDirection: 'column',
        alignContent:'flex-start',
        justifyContent:'center',
        textAlign:''
        
    },filterMainContainer: {
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
        paddingTop:15,
         marginTop:10,
         marginBottom:10
    },largeTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 15,
        paddingHorizontal: 18,
        marginHorizontal: 20,
        textAlign:'center',
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