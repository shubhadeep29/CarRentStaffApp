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
import AppBarWithMenu from '../component/AppBarWithMenu';


export default class ValidateOrApproveDriverScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isNetworkAvailable: true,
            isLoading: false,
            data: [
                {
                    id: 1,
                    status: "Active",
                    name: "Sudhir Biswas",
                    mobile: "9876543210",
                    email: "sbiswas68532@gmail.com",
                    address: "Baikunthapur, Tribeni, Hooghly, 712503",
                    license_no: "H98653",
                    driver_expire_date: "12/09/2023"
                },
                {
                    id: 2,
                    status: "Pending",
                    name: "Sudhir Biswas",
                    mobile: "9876543210",
                    email: "sbiswas68532@gmail.com",
                    address: "Baikunthapur, Tribeni, Hooghly, 712503",
                    license_no: "H98653",
                    driver_expire_date: "12/09/2023"
                },
                {
                    id: 3,
                    status: "Active",
                    name: "Sudhir Biswas",
                    mobile: "9876543210",
                    email: "sbiswas68532@gmail.com",
                    address: "Baikunthapur, Tribeni, Hooghly, 712503",
                    license_no: "H98653",
                    driver_expire_date: "12/09/2023"
                },
                {
                    id: 4,
                    status: "Pending",
                    name: "Sudhir Biswas",
                    mobile: "9876543210",
                    email: "sbiswas68532@gmail.com",
                    address: "Baikunthapur, Tribeni, Hooghly, 712503",
                    license_no: "H98653",
                    driver_expire_date: "12/09/2023"
                },
                {
                    id: 5,
                    status: "Active",
                    name: "Sudhir Biswas",
                    mobile: "9876543210",
                    email: "sbiswas68532@gmail.com",
                    address: "Baikunthapur, Tribeni, Hooghly, 712503",
                    license_no: "H98653",
                    driver_expire_date: "12/09/2023"
                },
                {
                    id: 6,
                    status: "Pending",
                    name: "Sudhir Biswas",
                    mobile: "9876543210",
                    email: "sbiswas68532@gmail.com",
                    address: "Baikunthapur, Tribeni, Hooghly, 712503",
                    license_no: "H98653",
                    driver_expire_date: "12/09/2023"
                },
            ],
        }
    }

    goToValidatedScreen = () =>{
        this.props.navigation.navigate('ValidateStepOneScreen')
    }

    setRenderItemView = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.listItemContainer} activeOpacity={1} key={item.id}
            // onPress={() => this.props.navigation.navigate('CourseLearningSelectionDetails', { pageTitle: item.book_name })}
            >
                <View style={styles.rowView}>
                    <View style={styles.mainContainer}>
                        <View style={item.status == "Active" ? styles.statusContainer : styles.pendingStatusContainer}>
                            <Text style={item.status == "Active" ? styles.statusTextStyle : styles.pendingStatusTextStyle}>{item.status}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.validateContainer} onPress={() => this.goToValidatedScreen()}>
                        <Image
                            source={require('../images/hamburgericon.png')}
                            style={styles.validateIcon}
                        />
                        <Text style={styles.validateTextStyle}>Validate</Text>
                    </TouchableOpacity>
                </View>




                <View style={styles.nameAndMobileContainer}>
                    <Text style={styles.nameTextStyle}>{item.name}   |   </Text>
                    <Text style={styles.mobileTextStyle}>{item.mobile}</Text>
                </View>

                <Text style={styles.infoTextStyle}>{item.email}</Text>
                <Text style={styles.infoTextStyle}>{item.address}</Text>


                <View style={styles.infoContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoHeadingTextStyleTwo}>License No</Text>
                        <Text style={styles.infoTextStyleTwo}>{item.license_no}</Text>
                    </View>


                    <View style={styles.infoContainerTwo}>
                        <Text style={styles.infoHeadingTextStyleTwo}>Driver Expire</Text>
                        <Text style={styles.infoTextStyleTwo}>{item.driver_expire_date}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }


    emptyPlaceHolderView = () => {
        return (
            <View style={styles.noDataPlaceHolderContainer}>
                <Text style={styles.noDataPlaceHolderTextStyle}>No Data Found</Text>
            </View>
        );
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <AppBarWithMenu title="Validate/Approve Driver" navigation={this.props.navigation} />

                <View style={styles.bottomViewContainer}>

                    <View style={styles.mainContainer}>
                        {this.state.isNetworkAvailable ?
                            <View style={styles.mainContainer}>
                                {this.state.isLoading && <Loader />}
                                {this.state.data.length > 0 ?
                                    <FlatList
                                        data={this.state.data}
                                        renderItem={(item, index) => this.setRenderItemView(item, index)}
                                        listKey={(item, index) => 'LC' + item.id}
                                        keyExtractor={(item, index) => item.id}
                                        style={styles.flatListStyle}
                                        showsVerticalScrollIndicator={false}
                                    />
                                    :
                                    this.emptyPlaceHolderView()
                                }
                            </View>
                            :
                            null
                        }
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
        borderTopStartRadius: 40
    },
    noDataPlaceHolderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataPlaceHolderTextStyle: {
        fontSize: 17,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
    },
    flatListStyle: {
        marginTop: 35,
        marginBottom: 15,
        marginHorizontal: 16,
        backgroundColor: Colors.white,
        // flex: 1
    },
    listItemContainer: {
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: Colors.editTextBgColor,
        padding: 12,
    },
    statusContainer: {
        // flex: 1,
        borderRadius: 20,
        backgroundColor: '#D6EAF8',
        alignSelf: 'baseline'
    },
    statusTextStyle: {
        fontSize: 12,
        // fontFamily: fontSelector("bold"),
        color: 'blue',
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingVertical: 3
    },
    pendingStatusContainer: {
        borderRadius: 20,
        backgroundColor: '#FCF3CF',
        alignSelf: 'baseline'
    },
    pendingStatusTextStyle: {
        fontSize: 12,
        // fontFamily: fontSelector("bold"),
        color: '#F39C12',
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingVertical: 3
    },
    nameAndMobileContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    nameTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        fontWeight: 'bold'
    },
    mobileTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        fontWeight: 'bold'
    },
    infoTextStyle: {
        fontSize: 14,
        // fontFamily: fontSelector("bold"),
        color: '#7F8C8D',
        marginTop: 2
    },
    infoContainer: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 3
    },
    infoContainerTwo: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'baseline',
        marginTop: 3
    },
    infoHeadingTextStyleTwo: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: '#7F8C8D',
    },
    infoTextStyleTwo: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        fontWeight: 'bold',
        marginStart: 8,
        flex: 1,
    },
    rowView: {
        flexDirection: 'row',
    },
    validateIcon: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    validateContainer: {
        backgroundColor: Colors.textColor1,
        borderRadius: 2,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 3
    },
    validateTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: Colors.white,
        marginStart: 4
    }
});