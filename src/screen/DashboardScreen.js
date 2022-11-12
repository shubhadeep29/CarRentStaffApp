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
import CarDetailsViewModal from '../component/CarDetailsViewModal';
import AppBarWithMenu from '../component/AppBarWithMenu';


export default class DashboardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNetworkAvailable: true,
            isLoading: false,
            searchText: "",
            isCarDetailsViewModalVisible: false,
            data: [
                {
                    id: 1,
                    car_image: '../images/car_img.jpg',
                    car_number: "WB16 M9876",
                    serial_number: "K02315",
                    year: "2021",
                    fuel_type: "LPG",
                    is_available: true
                },
                {
                    id: 2,
                    car_image: '../images/car_img.jpg',
                    car_number: "WB16 M9876",
                    serial_number: "K02315",
                    year: "2022",
                    fuel_type: "Petrol",
                    is_available: false
                },
                {
                    id: 3,
                    car_image: '../images/car_img.jpg',
                    car_number: "WB16 M9876",
                    serial_number: "K02315",
                    year: "2020",
                    fuel_type: "Diesel",
                    is_available: false
                },
                {
                    id: 4,
                    car_image: '../images/car_img.jpg',
                    car_number: "WB16 M9876",
                    serial_number: "K02315",
                    year: "2021",
                    fuel_type: "Petrol",
                    is_available: true
                },
                {
                    id: 5,
                    car_image: '../images/car_img.jpg',
                    car_number: "WB16 M9876",
                    serial_number: "K02315",
                    year: "2020",
                    fuel_type: "LPG",
                    is_available: true
                },
                {
                    id: 6,
                    car_image: '../images/car_img.jpg',
                    car_number: "WB16 M9876",
                    serial_number: "K02315",
                    year: "2021",
                    fuel_type: "Petrol",
                    is_available: false
                },
                {
                    id: 7,
                    car_image: '../images/car_img.jpg',
                    car_number: "WB16 M9876",
                    serial_number: "K02315",
                    year: "2020",
                    fuel_type: "Diesel",
                    is_available: true
                },
            ],
        }
    }

    openViewModal = () => {
        this.setState({ isCarDetailsViewModalVisible: true });
    }


    setRenderItemView = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.listItemContainer} activeOpacity={1} key={item.id}
            // onPress={() => this.props.navigation.navigate('CourseLearningSelectionDetails', { pageTitle: item.book_name })}
            >
                <View >
                    <Image
                        source={require('../images/car_img.jpg')}
                        style={styles.carImage}
                    />
                    <View style={styles.indicatorContainer}>
                        {item.is_available ?
                            <View style={styles.activeIndicator} />
                            :
                            <View style={styles.inactiveIndicator} />
                        }
                    </View>

                    <View style={styles.editAndViewContainer}>
                        <TouchableOpacity style={styles.viewContainer} onPress={() => this.openViewModal()}>
                            <Image
                                source={require('../images/ic_view.png')}
                                style={styles.viewIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editContainer} onPress={() => this.props.navigation.navigate('AddNewCar')}>
                            <Image
                                source={require('../images/ic_edit.png')}
                                style={styles.viewIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {item.is_available ?
                    <View style={styles.activeCarNumberContainer}>
                        <Text numberOfLines={1} style={styles.activeCarNumberTextStyle}>{item.car_number}</Text>
                    </View>
                    :
                    <View style={styles.inactiveCarNumberContainer}>
                        <Text numberOfLines={1} style={styles.inactiveCarNumberTextStyle}>{item.car_number}</Text>
                    </View>
                }


                <View style={styles.carInfoContainer}>
                    <Text numberOfLines={1} style={styles.serialNumberTextStyle}>{item.serial_number}  |</Text>
                    <Text numberOfLines={1} style={styles.yearTextStyle}>{item.year}</Text>
                    <Text numberOfLines={1} style={styles.serialNumberTextStyle}>|  {item.fuel_type}</Text>
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

    // Function to update state
    handleUpdateViewModalState = (value) => {
        this.setState({ isCarDetailsViewModalVisible: value })
    }

    onPressViewModalConfirmButton = (value) => {
        this.setState({ isCarDetailsViewModalVisible: value })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.mainContainer}>
                    <AppBarWithMenu title="List of Cars" navigation={this.props.navigation} />

                    <View style={styles.bottomViewContainer}>
                        <View style={styles.filterMainContainer}>
                            <View style={styles.allEditTextContainer}>
                                <Text numberOfLines={1} style={styles.filterText} >All</Text>
                                <Image
                                    source={require('../images/down_arow.png')}
                                    style={styles.dropdownIcon}
                                />
                            </View>

                            <View style={styles.searchEditTextContainer}>
                                <TextInput
                                    numberOfLines={1}
                                    style={styles.searchEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    placeholder="Search by Model,Car No, Fuel type"
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
                                            columnWrapperStyle={{ justifyContent: 'space-between', }}
                                            showsVerticalScrollIndicator={false}
                                            numColumns={2}
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
                </View>

                {this.state.isCarDetailsViewModalVisible ?
                    <CarDetailsViewModal
                        isModalVisible={this.state.isCarDetailsViewModalVisible}
                        title="My modal"
                        buttonName="confirm"
                        updateModalState={this.handleUpdateViewModalState}
                        buttonOperation={this.onPressViewModalConfirmButton}
                    />
                    :
                    null
                }

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
    filterMainContainer: {
        // flex: 1,
        flexDirection: 'row',
        paddingTop: 25,
        paddingBottom: 12
    },
    allEditTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 18,
        marginStart: 20,
        flexDirection: 'row',
        height: 40,
    },
    searchEditTextContainer: {
        flex: 1,
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 18,
        marginStart: 10,
        marginEnd: 20,
        flexDirection: 'row',
        height: 40,
    },
    filterText: {
        fontSize: 12,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dropdownIcon: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginStart: 10
    },
    searchIcon: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginStart: 10
    },
    searchEditTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        flex: 1
    },
    flatListStyle: {
        marginBottom: 5,
        marginHorizontal: 16,
        backgroundColor: Colors.white,
        // flex: 1
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
    listItemContainer: {
        flex: 0.5,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: Colors.white,
        elevation: 5,
        paddingBottom: 8,
    },
    carImage: {
        width: '100%',
        height: 130,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    carInfoContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 4
    },
    serialNumberTextStyle: {
        fontSize: 12,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        fontWeight: 'bold'
    },
    yearTextStyle: {
        fontSize: 12,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        marginHorizontal: 6,
        fontWeight: 'bold'
    },
    activeCarNumberContainer: {
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 8,
        backgroundColor: '#D6EAF8'
    },
    activeCarNumberTextStyle: {
        fontSize: 12,
        // fontFamily: fontSelector("bold"),
        color: 'blue',
        fontWeight: 'bold',
        paddingHorizontal: 13,
        paddingVertical: 4
    },
    inactiveCarNumberContainer: {
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 8,
        backgroundColor: '#FCF3CF'
    },
    inactiveCarNumberTextStyle: {
        fontSize: 12,
        // fontFamily: fontSelector("bold"),
        color: '#F39C12',
        fontWeight: 'bold',
        paddingHorizontal: 13,
        paddingVertical: 4
    },
    indicatorContainer: {
        width: 14,
        height: 14,
        backgroundColor: 'white',
        borderRadius: 30,
        position: 'absolute',
        top: 6,
        right: 6,
        elevation: 20,
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    activeIndicator: {
        width: 10,
        height: 10,
        backgroundColor: 'blue',
        borderRadius: 20,
        alignSelf: 'center',
    },
    inactiveIndicator: {
        width: 10,
        height: 10,
        backgroundColor: '#F39C12',
        borderRadius: 20,
        alignSelf: 'center',
    },
    editAndViewContainer: {
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    editContainer: {
        width: 30,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    viewContainer: {
        width: 30,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 30,
        marginEnd: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    viewIcon: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        alignSelf: 'center'
    }
});