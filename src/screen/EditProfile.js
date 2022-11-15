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
            isLoading: false
            
        }
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                {this.state.isLoading && <LoaderView />}
                <AppBarWithMenu title="Edit My Account" navigation={this.props.navigation}  />

                <View style={styles.bottomViewContainer}>
                <View style={styles.rowView}>
                    <View style={styles.bottomViewContainer}>
                            <Image
                                source={require('../images/rounded_img.png')}
                                style={styles.viewImage}
                            />
                        </View>

                        <View style={styles.column}>
                        <Text numberOfLines={1} style={styles.headingSmallTextStyle} >Upload New Photo</Text>
                        <View style={styles.searchEditSmallTextContainer}>
                        <View style={styles.rowView}>
                            <View style={styles.buttonContainer}>
                                <Text numberOfLines={1} style={styles.editTextStyle} >Choose File</Text>
                        
                            </View>
                        <Text numberOfLines={1} style={styles.filterText} >No file choosen      </Text>
                    </View>
                    </View>
                    
                        </View>
                        
                    </View>
                    <Text numberOfLines={1} style={styles.headingTextStyle} >Name</Text>
                    <View style={styles.searchEditTextContainer}>
                    <Text numberOfLines={1} style={styles.filterText} >Karan Singh</Text>
                    
                    </View>
                    <Text numberOfLines={1} style={styles.headingTextStyle} >Phone</Text>
                    <View style={styles.searchEditTextContainer}>
                    <Text numberOfLines={1} style={styles.filterText} >8777370943</Text>
                    
                    </View>

                    <Text numberOfLines={1} style={styles.headingTextStyle} >Role</Text>
                    
                    <View style={styles.filterMainContainer}>
                        <View style={styles.searchEditTextContainer}>
                            <TextInput
                                numberOfLines={1}
                                style={styles.searchEditTextStyle}
                                autoCapitalize="none"
                        
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                placeholder="Select Role"
                                editable={false}
                                value={this.state.searchText}
                                onChangeText={(value) => this.setState({ searchText: value })}
                                onSubmitEditing={() => { this.passwordTextInput.focus() }}
                                blurOnSubmit={false}
                            />

                            <Image
                                source={require('../images/down_arow.png')}
                                style={styles.searchIcon}
                            />
                        </View>
                    </View>
                    

                    <Text numberOfLines={1} style={styles.headingTextStyle} >Your Email</Text>
                    <View style={styles.searchEditTextContainer}>
                    <Text numberOfLines={1} style={styles.filterText} >karan@gmail.com</Text>
                    
                    </View>


                    <Text numberOfLines={1} style={styles.headingTextStyle} >Full Address</Text>
                    <View style={styles.largeTextContainer}>
                    <Text numberOfLines={1} style={styles.filterText} >karan@gmail.com</Text>
                    
                    </View>

                    <Text numberOfLines={1} style={styles.headingTextStyle} >Gender</Text>
                    <View style={styles.filterMainContainer}>
                        <View style={styles.searchEditTextContainer}>
                            <TextInput
                                numberOfLines={1}
                                style={styles.searchEditTextStyle}
                                autoCapitalize="none"
                        
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                placeholder="Male"
                                editable={false}
                                value={this.state.searchText}
                                onChangeText={(value) => this.setState({ searchText: value })}
                                onSubmitEditing={() => { this.passwordTextInput.focus() }}
                                blurOnSubmit={false}
                            />

                            <Image
                                source={require('../images/down_arow.png')}
                                style={styles.searchIcon}
                            />
                        </View>
                    </View>
                    <Text numberOfLines={1} style={styles.headingTextStyle} >ABN</Text>
                    <View style={styles.searchEditTextContainer}>
                    <Text numberOfLines={1} style={styles.filterText} >ABN</Text>
                    
                    </View>
                    <Text numberOfLines={1} style={styles.headingTextStyle} >TFN</Text>
                    <View style={styles.searchEditTextContainer}>
                    <Text numberOfLines={1} style={styles.filterText} >TFN</Text>
                    
                    </View>

                    <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignContent: 'center',
                            alignItems: 'center',
                            marginTop: 25,
                            paddingHorizontal: 40
                        }}>
                            <TouchableOpacity style={{
                                backgroundColor: '#aaaaaa',
                                borderRadius: 30,
                                paddingVertical: 10,
                                flex: 1,
                            }}
                                onPress={() => this.onClickSubmitButton()}>
                                <Text numberOfLines={1} style={styles.buttonText}>CANCLE</Text>
                            </TouchableOpacity>
                        
                            <TouchableOpacity style={{
                                backgroundColor: Colors.textColor1,
                                borderRadius: 30,
                                paddingVertical: 10,
                                marginStart: 10,
                                flex: 1,
                            }}
                                onPress={() => this.callAddNewCarValidation()}>
                                <Text numberOfLines={1} style={styles.buttonText}>SAVE</Text>
                            </TouchableOpacity>

                            </View>
                </View>
            </ScrollView>
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
        alignSelf: 'center',
        marginStart:0
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
        paddingHorizontal: 0,
        paddingVertical: 0,
        alignItems: "center",
        textAlign:'center'
        
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
    headingTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        paddingHorizontal: 40,
        marginTop: 15,
        marginBottom:10,
    },
    headingSmallTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        paddingHorizontal: 10,
        marginTop: 15,
        marginBottom:10,
    },
    buttonContainer: {
        backgroundColor: Colors.textColor1,
        borderRadius: 30,
        paddingVertical: 3,
        paddingLeft:0,
        marginHorizontal: 10,
        marginTop: 32,
        textColor:Colors.white,
        width:100,
        height:20,
        bottom: 20,
        left: 0,
        right: 0,
        textAlign:'center'
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
    searchEditSmallTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        marginEnd:70,
        flexDirection: 'row',
        height: 48,
        paddingBottom:10,
    },
    searchEditTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 18,
        marginHorizontal: 20,
        flexDirection: 'row',
        height: 48,
        paddingBottom:10
    },largeTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 15,
        paddingHorizontal: 15,
        marginHorizontal: 30,
        textAlign:'center',
        height: 100,
    },
    searchEditTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        flex: 1
    },
    searchIcon: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginStart: 10
    },
    
});