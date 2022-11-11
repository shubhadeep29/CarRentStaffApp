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
import ViewRemarksModal from '../component/ViewRemarksModal';
import AppBarWithMenu from '../component/AppBarWithMenu';


export default class BondReturnEntryScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isNetworkAvailable: true,
            isLoading: false,
            searchText: "",
            isViewRemarksModalVisible: false,
            data: [
                {
                    id: 1,
                    refund_type: "Full Refund",
                    status: "Settled",
                    name: "Havir Singh",
                    dc_no: "552427",
                    total_bond_amount: "1000.00",
                    bond_refund_remain: "1000.00",
                    refund_amount: "1000.00",
                    notice_date: "12/02/2022",
                    refund_due_date: "12/09/2023",
                    settlement_date: "N/A",
                },
                {
                    id: 2,
                    refund_type: "Partial Refund",
                    status: "Settle",
                    name: "Havir Singh",
                    dc_no: "552427",
                    total_bond_amount: "1000.00",
                    bond_refund_remain: "1000.00",
                    refund_amount: "1000.00",
                    notice_date: "12/02/2022",
                    refund_due_date: "12/09/2023",
                    settlement_date: "N/A",
                },
                {
                    id: 3,
                    refund_type: "Full Refund",
                    status: "Settled",
                    name: "Havir Singh",
                    dc_no: "552427",
                    total_bond_amount: "1000.00",
                    bond_refund_remain: "1000.00",
                    refund_amount: "1000.00",
                    notice_date: "12/02/2022",
                    refund_due_date: "12/09/2023",
                    settlement_date: "N/A",
                },
                {
                    id: 4,
                    refund_type: "Partial Refund",
                    status: "Settle",
                    name: "Havir Singh",
                    dc_no: "552427",
                    total_bond_amount: "1000.00",
                    bond_refund_remain: "1000.00",
                    refund_amount: "1000.00",
                    notice_date: "12/02/2022",
                    refund_due_date: "12/09/2023",
                    settlement_date: "N/A",
                },
            ]
        }
    }

    goToBondReturnEntryEditScreen = () =>{
        this.props.navigation.navigate('BondReturnEntryEditScreen')
    }


    setRenderItemView = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.listItemContainer} activeOpacity={1} key={item.id}
                onPress={() => this.goToBondReturnEntryEditScreen()}
            >

                <View style={styles.refundStatusContainer}>
                    <Text style={styles.refundTypeTextStyle}>{item.refund_type}</Text>

                    <View style={item.status == "Settle" ? styles.settleStatusContainer : styles.statusContainer}>
                        <Text style={item.status == "Settle" ? styles.settleStatusTextStyle : styles.statusTextStyle}>{item.status}</Text>
                    </View>
                </View>

                <View style={styles.nameAndDcContainer}>
                    <Text style={styles.nameTextStyle}>{item.name}   |   </Text>
                    <Text style={styles.dcNoTextStyle}>{item.dc_no}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeadingTextStyle}>Total bond amount</Text>
                    <Text style={styles.infoTextStyle}>{item.total_bond_amount}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeadingTextStyle}>Bond refund amount</Text>
                    <Text style={styles.infoTextStyle}>{item.bond_refund_remain}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeadingTextStyle}>Refund amount</Text>
                    <Text style={styles.infoTextStyle}>{item.refund_amount}</Text>
                </View>


                <View style={styles.infoContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoHeadingTextStyleTwo}>Notice date</Text>
                        <Text style={styles.infoTextStyleTwo}>{item.notice_date}</Text>
                    </View>


                    <View style={styles.infoContainerTwo}>
                        <Text style={styles.infoHeadingTextStyleTwo}>Refund due date</Text>
                        <Text style={styles.infoTextStyleTwo}>{item.notice_date}</Text>
                    </View>

                </View>


                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeadingTextStyle}>Settelment Date</Text>
                    <Text style={styles.infoTextStyle}>{item.settlement_date}</Text>
                </View>


                {item.status == "Settled" ?
                    <TouchableOpacity onPress={() => this.showViewRemarksModal()}>
                        <Text style={styles.viewRemarksTextStyle}>View Remarks</Text>
                    </TouchableOpacity>

                    : null
                }

            </TouchableOpacity>
        );
    }

    showViewRemarksModal = () => {
        this.setState({ isViewRemarksModalVisible: true });
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
        this.setState({ isViewRemarksModalVisible: value })
    }

    onPressViewModalConfirmButton = (value) => {
        this.setState({ isViewRemarksModalVisible: value })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
            <AppBarWithMenu title="Bond Return Entry" navigation={this.props.navigation} />

                <View style={styles.bottomViewContainer}>

                    <View style={styles.filterMainContainer}>
                        <View style={styles.searchEditTextContainer}>
                            <TextInput
                                numberOfLines={1}
                                style={styles.searchEditTextStyle}
                                autoCapitalize="none"
                                multiline={false}
                                placeholderTextColor={Colors.placeholderColor}
                                placeholder="Search by DC,Driver Name, Date 7 Refund Type"
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

                {this.state.isViewRemarksModalVisible ?
                    <ViewRemarksModal
                        isModalVisible={this.state.isViewRemarksModalVisible}
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
    filterMainContainer: {
        paddingTop: 25,
        paddingBottom: 12,
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
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: Colors.editTextBgColor,
        padding: 12,
    },
    flatListStyle: {
        marginBottom: 5,
        marginHorizontal: 16,
        backgroundColor: Colors.white,
        // flex: 1
    },
    refundStatusContainer: {
        flexDirection: 'row',
    },
    refundTypeTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: '#1E8449',
        flex: 1,
        alignSelf: 'center'
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
    settleStatusContainer:{
        borderRadius: 20,
        backgroundColor: Colors.textColor1,
        alignSelf: 'baseline'
    },
    settleStatusTextStyle:{
        fontSize: 12,
        // fontFamily: fontSelector("bold"),
        color: Colors.white,
        fontWeight: 'bold',
        paddingHorizontal: 15,
        paddingVertical: 3
    },
    nameAndDcContainer: {
        flexDirection: 'row',
    },
    nameTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
    },
    dcNoTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
    },
    infoContainer: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 5
    },
    infoContainerTwo: {
        flexDirection: 'row',
        alignSelf: 'baseline',
        marginTop: 5
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
        marginStart: 8
    },
    viewRemarksTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        flex: 1,
        marginTop: 5,
        textDecorationLine: 'underline',
    },


});