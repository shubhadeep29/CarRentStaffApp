import React, { Component } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, Modal, StatusBar,
    TouchableWithoutFeedback, Image
} from 'react-native';
import Constants from '../utils/Constants';
// import fontSelector from '../utils/FontSelector';
import * as Colors from '../utils/Colors';
// import Utils from '../utils/Utils';


export default class CarDetailsViewModal extends Component {
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
                                    <Text style={styles.carAndModelNumberTextStyle}>WB16 M9816   |   </Text>
                                    <Text style={styles.carAndModelNumberTextStyle}>Model : K02315</Text>
                                </View>

                                <TouchableOpacity onPress={() => this.setStateUpdateMethod(false)}>
                                    <Image
                                        source={require('../images/ic_cancel_dark_pink_red.png')}
                                        style={styles.cancelImage}
                                    />
                                </TouchableOpacity>
                            </View>

                            <Image
                                source={require('../images/car_img.jpg')}
                                style={styles.carImage}
                            />

                            <View style={styles.infoContainer}>
                                <Text style={styles.infoHeadingTextStyle}>Car Status :</Text>
                                <View style={styles.activeCarNumberContainer}>
                                    <Text numberOfLines={1} style={styles.activeCarNumberTextStyle}>Active</Text>
                                </View>
                            </View>

                            <View style={styles.infoContainer}>
                                <Text style={styles.infoHeadingTextStyle}>Fule Type :</Text>
                                <Text style={styles.infoTextStyle}>Petrol</Text>
                            </View>

                            <View style={styles.infoContainer}>
                                <Text style={styles.infoHeadingTextStyle}>Year :</Text>
                                <Text style={styles.infoTextStyle}>2020</Text>
                            </View>

                            <View style={styles.infoContainer}>
                                <Text style={styles.infoHeadingTextStyle}>Make :</Text>
                                <Text style={styles.infoTextStyle}>Lorem Ipsum</Text>
                            </View>


                            <View style={styles.infoContainer}>
                                <Text style={styles.infoHeadingTextStyle}>Hybrid :</Text>
                                <Text style={styles.infoTextStyle}>YES</Text>
                            </View>

                            <View style={styles.infoContainer}>
                                <Text style={styles.infoHeadingTextStyle}>Rego Expire Date :</Text>
                                <Text style={styles.infoTextStyle}>2024</Text>
                            </View>

                            <View style={styles.infoContainer}>
                                <Text style={styles.infoHeadingTextStyle}>Insurance Expire Date :</Text>
                                <Text style={styles.infoTextStyle}>2023</Text>
                            </View>



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
        marginTop: 5
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
    activeCarNumberContainer: {
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: '#D6EAF8'
    },
    activeCarNumberTextStyle: {
        fontSize: 12,
        // fontFamily: fontSelector("bold"),
        color: 'blue',
        fontWeight: 'bold',
        paddingHorizontal: 11,
        paddingVertical: 3
    },

});