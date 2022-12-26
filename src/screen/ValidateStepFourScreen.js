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
import CommonAppBar from '../component/CommonAppBar';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class ValidateStepFourScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: props.route.params.item,
            isNetworkAvailable: true,
            isLoading: false,
            isFirstOptionChecked: true,
            isSecondOptionChecked: true,
            isThirdOptionChecked: true,
            isFourthOptionChecked: true,
            isFivthOptionChecked: true,
            isSixthOptionChecked: true,
            isSeventhOptionChecked: true,
            isEighthOptionChecked: true,
        }
    }
    componentDidMount = async () => {
        this.userId = await AsyncStorage.getItem(Constants.STORAGE_KEY_USER_ID);
        this.apiKey = await AsyncStorage.getItem(Constants.STORAGE_KEY_API_KEY);

        console.log(this.state.item)

        // this.setState({


        //     isFirstOptionChecked: this.state.item,
        //     isSecondOptionChecked: this.state.item,
        //     isThirdOptionChecked: this.state.item,
        //     isFourthOptionChecked: this.state.item,
        //     isFivthOptionChecked: this.state.item,
        //     isSixthOptionChecked: this.state.item,
        //     isSeventhOptionChecked: this.state.item,
        //     isEighthOptionChecked: this.state.item,
        // })
    }


    goToNextScreen = () => {
        this.props.navigation.navigate('ValidateStepFiveScreen', {
            item: this.state.item
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <CommonAppBar title="Validate/Approve Driver" navigation={this.props.navigation} />

                <View style={styles.bottomViewContainer}>
                    <View style={styles.indicatorMainContainer}>
                        <View style={styles.selectedIndicatorContainer}>
                            <Text numberOfLines={1} style={styles.selectedIndicatorText}>1</Text>
                        </View>

                        <View style={styles.selectedIndicatorContainer}>
                            <Text numberOfLines={1} style={styles.selectedIndicatorText}>2</Text>
                        </View>

                        <View style={styles.selectedIndicatorContainer}>
                            <Text numberOfLines={1} style={styles.selectedIndicatorText}>3</Text>
                        </View>

                        <View style={styles.selectedIndicatorContainer}>
                            <Text numberOfLines={1} style={styles.selectedIndicatorText}>4</Text>
                        </View>

                        <View style={styles.indicatorContainer}>
                            <Text numberOfLines={1} style={styles.indicatorText}>5</Text>
                        </View>
                    </View>



                    <View style={styles.rowView}>
                        <TouchableOpacity >
                            <Image
                                source={this.state.isFirstOptionChecked ? require('../images/ic_checked.png') : require('../images/ic_uncheck.png')}
                                style={styles.checkUncheckIcon}
                            />
                        </TouchableOpacity>
                        <Text style={styles.infoText}>car to be used in area max of 200 km from melbourne cbd </Text>
                    </View>


                    <View style={styles.rowView}>
                        <TouchableOpacity >
                            <Image
                                source={this.state.isSecondOptionChecked ? require('../images/ic_checked.png') : require('../images/ic_uncheck.png')}
                                style={styles.checkUncheckIcon}
                            />
                        </TouchableOpacity>
                        <Text style={styles.infoText}>I will check water and engine oil every day </Text>
                    </View>

                    <View style={styles.rowView}>
                        <TouchableOpacity >
                            <Image
                                source={this.state.isThirdOptionChecked ? require('../images/ic_checked.png') : require('../images/ic_uncheck.png')}
                                style={styles.checkUncheckIcon}
                            />
                        </TouchableOpacity>
                        <Text style={styles.infoText}>I will report every accident on the day </Text>
                    </View>

                    <View style={styles.rowView}>
                        <TouchableOpacity >
                            <Image
                                source={this.state.isFourthOptionChecked ? require('../images/ic_checked.png') : require('../images/ic_uncheck.png')}
                                style={styles.checkUncheckIcon}
                            />
                        </TouchableOpacity>
                        <Text style={styles.infoText}>I will send service sticker and speedo meter photo every week  </Text>
                    </View>

                    <View style={styles.rowView}>
                        <TouchableOpacity >
                            <Image
                                source={this.state.isFivthOptionChecked ? require('../images/ic_checked.png') : require('../images/ic_uncheck.png')}
                                style={styles.checkUncheckIcon}
                            />
                        </TouchableOpacity>
                        <Text style={styles.infoText}>I will pay $10 per nomination for any late toll invoices </Text>
                    </View>

                    <View style={styles.rowView}>
                        <TouchableOpacity >
                            <Image
                                source={this.state.isSixthOptionChecked ? require('../images/ic_checked.png') : require('../images/ic_uncheck.png')}
                                style={styles.checkUncheckIcon}
                            />
                        </TouchableOpacity>
                        <Text style={styles.infoText}>I will give 2 weeks notice when returning the car / van </Text>
                    </View>

                    <View style={styles.rowView}>
                        <TouchableOpacity >
                            <Image
                                source={this.state.isSeventhOptionChecked ? require('../images/ic_checked.png') : require('../images/ic_uncheck.png')}
                                style={styles.checkUncheckIcon}
                            />
                        </TouchableOpacity>
                        <Text style={styles.infoText}>I agree to terms and conditions listed on car rental website </Text>
                    </View>


                    <View style={styles.rowView}>
                        <TouchableOpacity >
                            <Image
                                source={this.state.isEighthOptionChecked ? require('../images/ic_checked.png') : require('../images/ic_uncheck.png')}
                                style={styles.checkUncheckIcon}
                            />
                        </TouchableOpacity>
                        <Text style={styles.infoText}>all information provided is true and correct</Text>
                    </View>

                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.goToNextScreen()}>
                        <Text numberOfLines={1} style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>

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
    rowView: {
        flexDirection: 'row',
        marginHorizontal: 30,
        marginTop: 23
    },
    bottomViewContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        marginTop: 10,
        borderTopEndRadius: 40,
        borderTopStartRadius: 40
    },
    indicatorMainContainer: {
        flexDirection: 'row',
        paddingHorizontal: 40,
        paddingVertical: 20,
        alignSelf: 'center',
    },
    selectedIndicatorContainer: {
        width: 45,
        height: 45,
        borderRadius: 30,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginStart: 17,
        backgroundColor: Colors.textColor1
    },
    selectedIndicatorText: {
        fontSize: 17,
        // fontFamily: fontSelector("bold"),
        color: Colors.white,
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlignVertical: 'center',
    },
    indicatorContainer: {
        width: 45,
        height: 45,
        borderRadius: 30,
        marginStart: 17,
        backgroundColor: Colors.white,
        borderWidth: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
        borderColor: '#C0C2C2',
    },
    indicatorText: {
        fontSize: 17,
        // fontFamily: fontSelector("bold"),
        color: '#C0C2C2',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlignVertical: 'center',
    },
    checkUncheckIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    infoText: {
        fontSize: 12,
        // fontFamily: fontSelector("bold"),
        color: Colors.black,
        marginStart: 10
    },
    buttonContainer: {
        backgroundColor: Colors.textColor1,
        borderRadius: 30,
        paddingVertical: 15,
        marginHorizontal: 30,
        marginTop: 25,
        position: 'absolute',
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
});