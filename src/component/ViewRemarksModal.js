import React, { Component } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, Modal, StatusBar,
    TouchableWithoutFeedback, Image
} from 'react-native';
import Constants from '../utils/Constants';
// import fontSelector from '../utils/FontSelector';
import * as Colors from '../utils/Colors';
// import Utils from '../utils/Utils';


export default class ViewRemarksModal extends Component {
    constructor(props) {
        super(props);

    }

    setStateUpdateMethod = (value) => {
        // Using parent props to update parent state
        this.props.updateModalState(value)
    }

    onPressButton = (value) => {
        // Using parent props to update parent state
        this.props.buttonOperation(value)
    }


    render() {
        return (
            <Modal visible={this.props.isModalVisible} transparent={true}
                onRequestClose={() => this.setStateUpdateMethod(false)}
            >
                <StatusBar
                    translucent
                    backgroundColor={Colors.modalContainerBackgroundColor}
                    barStyle="light-content"
                />
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1}
                    onPressOut={() => this.setStateUpdateMethod(false)}
                >
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <View style={styles.rowView}>
                                <View style={styles.carAndModelNumberContainer}>
                                    <Text style={styles.carAndModelNumberTextStyle}>Hanvhir Singh   |   </Text>
                                    <Text style={styles.carAndModelNumberTextStyle}>DC : 552427</Text>
                                </View>

                                <TouchableOpacity onPress={() => this.setStateUpdateMethod(false)}>
                                    <Image
                                        source={require('../images/ic_cancel_dark_pink_red.png')}
                                        style={styles.cancelImage}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.settledContainer}>
                                <Text numberOfLines={1} style={styles.settledTextStyle}>Settled</Text>
                            </View>

                            <Text style={styles.refundTypeTextStyle}>Full Refund</Text>

                            <View style={styles.infoContainer}>
                                <Text style={styles.infoHeadingTextStyle}>Total Bond Amount :</Text>
                                <Text style={styles.infoTextStyle}>1000.00</Text>
                            </View>

                            <View style={styles.infoContainer}>
                                <Text style={styles.infoHeadingTextStyle}>Bond Refund Remain :</Text>
                                <Text style={styles.infoTextStyle}>1000.00</Text>
                            </View>

                            <View style={styles.infoContainer}>
                                <Text style={styles.infoHeadingTextStyle}>Refund Amount :</Text>
                                <Text style={styles.infoTextStyle}>1000.00</Text>
                            </View>



                            <View style={styles.infoContainer}>
                                <View style={styles.infoContainerThree}>
                                    <Text style={styles.infoHeadingTextStyleTwo}>Notice date</Text>
                                    <Text style={styles.infoTextStyleTwo}>12.02.2022</Text>
                                </View>


                                <View style={styles.infoContainerTwo}>
                                    <Text style={styles.infoHeadingTextStyleTwo}>Refund due date</Text>
                                    <Text style={styles.infoTextStyleTwo}>12.09.2023</Text>
                                </View>

                            </View>


                            <View style={styles.infoContainer}>
                                <Text style={styles.infoHeadingTextStyle}>Settlement Date :</Text>
                                <Text style={styles.infoTextStyle}>N/A</Text>
                            </View>

                            <Text style={styles.remarksHeadingTextStyle}>Remarks</Text>
                            <Text style={styles.remarksTextStyle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>

                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    viewStyle: {
        flex: 1,
        marginHorizontal: 15
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.modalContainerBackgroundColor,
    },
    modalView: {
        margin: 20,
        backgroundColor: Colors.white,
        borderRadius: 12,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    centerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowView: {
        flexDirection: 'row'
    },
    carAndModelNumberContainer: {
        flexDirection: 'row',
        flex: 1
    },
    carAndModelNumberTextStyle: {
        fontSize: 15,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        fontWeight: 'bold'
    },
    cancelImage: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    carImage: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 8
    },
    infoContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    infoHeadingTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: '#7F8C8D',
        flex: 1,
    },
    infoTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        fontWeight: 'bold',
        alignSelf: 'baseline',
    },
    settledContainer: {
        alignSelf: 'baseline',
        borderRadius: 20,
        backgroundColor: '#D6EAF8',
        marginTop: 10
    },
    settledTextStyle: {
        fontSize: 12,
        // fontFamily: fontSelector("bold"),
        color: 'blue',
        fontWeight: 'bold',
        paddingHorizontal: 11,
        paddingVertical: 3
    },
    refundTypeTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: '#1E8449',
        marginTop: 8
    },
    remarksHeadingTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        fontWeight: 'bold',
        marginTop: 5
    },
    remarksTextStyle: {
        fontSize: 13,
        // fontFamily: fontSelector("bold"),
        color: '#7F8C8D',
        marginTop: 3
    },
    infoContainerTwo: {
        flexDirection: 'row',
        alignSelf: 'baseline',
    },
    infoContainerThree: {
        flexDirection: 'row',
        alignSelf: 'baseline',
        flex: 1
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
});