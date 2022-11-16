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


export default class RentOutVehicleScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isNetworkAvailable: true,
            isLoading: false,
            searchText: "",
            data: [
                {
                    id: 1,
                    date: "28/09/2022",
                    name: "Harvir Singh",
                    rent_unique_id: "SG 102 L12365",
                    rent_out_no: "123456",
                    odometer_reading: "1000.00",
                    weekly_rent: "$ 00.00",
                    bond: "$ 00.00",
                },
                {
                    id: 2,
                    date: "29/09/2022",
                    name: "Harvir Singh",
                    rent_unique_id: "SG 102 L12365",
                    rent_out_no: "123456",
                    odometer_reading: "1000.00",
                    weekly_rent: "$ 00.00",
                    bond: "$ 00.00",
                },
                {
                    id: 3,
                    date: "28/09/2022",
                    name: "Harvir Singh",
                    rent_unique_id: "SG 102 L12365",
                    rent_out_no: "123456",
                    odometer_reading: "1000.00",
                    weekly_rent: "$ 00.00",
                    bond: "$ 00.00",
                },
                {
                    id: 4,
                    date: "29/09/2022",
                    name: "Harvir Singh",
                    rent_unique_id: "SG 102 L12365",
                    rent_out_no: "123456",
                    odometer_reading: "1000.00",
                    weekly_rent: "$ 00.00",
                    bond: "$ 00.00",
                },
                {
                    id: 5,
                    date: "28/09/2022",
                    name: "Harvir Singh",
                    rent_unique_id: "SG 102 L12365",
                    rent_out_no: "123456",
                    odometer_reading: "1000.00",
                    weekly_rent: "$ 00.00",
                    bond: "$ 00.00",
                },
                {
                    id: 6,
                    date: "29/09/2022",
                    name: "Harvir Singh",
                    rent_unique_id: "SG 102 L12365",
                    rent_out_no: "123456",
                    odometer_reading: "1000.00",
                    weekly_rent: "$ 00.00",
                    bond: "$ 00.00",
                },
            ],
        }
    }

    setRenderItemView = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.listItemContainer} activeOpacity={1} key={item.id}
            // onPress={() => this.props.navigation.navigate('CourseLearningSelectionDetails', { pageTitle: item.book_name })}
            >
                <View style={styles.rowView}>
                    <View style={styles.mainContainer}>
                        <Text style={styles.dateTextStyle}>{item.date}</Text>
                    </View>

                    <View style={styles.editContainer}>
                        <Text style={styles.editTextStyle}>Edit</Text>
                    </View>
                </View>



                <View style={styles.nameAndRentUniqueIdContainer}>
                    <Text style={styles.nameTextStyle}>{item.name}   |   </Text>
                    <Text style={styles.rentUniqueIdTextStyle}>{item.rent_unique_id}</Text>
                </View>



                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeadingTextStyle}>Rent Out No</Text>
                    <Text style={styles.infoTextStyle}>{item.rent_out_no}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeadingTextStyle}>Odometer Reading</Text>
                    <Text style={styles.infoTextStyle}>{item.odometer_reading}</Text>
                </View>


                <View style={styles.rowView}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoHeadingTextStyleTwo}>Weekly Rent</Text>
                        <Text style={styles.infoTextStyleTwo}>{item.weekly_rent}</Text>
                    </View>


                    <View style={styles.infoContainerTwo}>
                        <Text style={styles.infoHeadingTextStyleTwo}>Bond</Text>
                        <Text style={styles.infoTextStyleTwo}>{item.bond}</Text>
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
                <AppBarWithMenu title="Rent Out Vehicle" navigation={this.props.navigation} />

                <View style={styles.bottomViewContainer}>


                    <View style={styles.filterMainContainer}>
                        <View style={styles.searchEditTextContainer}>
                            <TextInput
                                numberOfLines={1}
                                style={styles.searchEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                placeholder="Search by Date,Driver Name, Car no"
                                value={this.state.searchText}
                                onChangeText={(value) => this.setState({ searchText: value })}
                                onSubmitEditing={() => { this.passwordTextInput.focus() }}
                                blurOnSubmit={false}
                            />

                            <Image
                                source={require('../images/ic_search.png')}
                                style={styles.searchIcon}
                            />
                        </View>
                    </View>

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
    // appbarContainer: {
    //     flexDirection: 'row',
    //     paddingVertical: 15,
    //     paddingHorizontal: 15
    // },
    // hambergerIcon: {
    //     width: 23,
    //     height: 23,
    //     resizeMode: 'contain',
    //     alignSelf: 'center'
    // },
    // titleText: {
    //     fontSize: 22,
    //     // fontFamily: fontSelector("regular"),
    //     color: Colors.textColor1,
    //     alignItems: "center",
    //     textAlign: 'center',
    //     textAlignVertical: 'center',
    //     flex: 1,
    //     fontWeight: 'bold'
    // },
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
        marginTop: 8,
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
    editContainer: {
        // flex: 1,
        borderRadius: 20,
        backgroundColor: Colors.textColor1,
        alignSelf: 'baseline'
    },
    editTextStyle: {
        fontSize: 12,
        // fontFamily: fontSelector("bold"),
        color: Colors.white,
        paddingHorizontal: 20,
        paddingVertical: 3
    },
    nameAndRentUniqueIdContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    nameTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        fontWeight: 'bold'
    },
    rentUniqueIdTextStyle: {
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
    infoTextStyleTwo: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        fontWeight: 'bold',
        marginStart: 8,
        // flex: 1,
    },

    infoHeadingTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: '#7F8C8D',
        flex: 1
    },
    infoTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        fontWeight: 'bold',
        alignSelf: 'baseline'
    },
    rowView: {
        flexDirection: 'row',
    },
    dateTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: Colors.blue,
        marginStart: 4
    },


    filterMainContainer: {
        paddingTop: 25,
        // paddingBottom: 12,
    },
    searchEditTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 18,
        marginHorizontal: 20,
        flexDirection: 'row',
        height: 40,
    },
    searchEditTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        flex: 1
    },
    filterText: {
        fontSize: 12,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    searchIcon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginStart: 10
    },
});