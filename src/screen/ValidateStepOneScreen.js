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


export default class ValidateStepOneScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNetworkAvailable: true,
            isLoading: false,
            firstName: "Sudhir",
            lastName: "Biswas",
            middleName: "",
            email: "rahul@gmail.com",
            flatNo: "",
            streetNo: "",
            streetName: "",
            subrub: "",
            postCode: "",
            dob: "20/03/2022",
            moileNo: "98752345432"
        }
    }

    goToNextScreen = () => {
        this.props.navigation.navigate('ValidateStepTwoScreen')
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

                        <View style={styles.indicatorContainer}>
                            <Text numberOfLines={1} style={styles.indicatorText}>2</Text>
                        </View>

                        <View style={styles.indicatorContainer}>
                            <Text numberOfLines={1} style={styles.indicatorText}>3</Text>
                        </View>

                        <View style={styles.indicatorContainer}>
                            <Text numberOfLines={1} style={styles.indicatorText}>4</Text>
                        </View>

                        <View style={styles.indicatorContainer}>
                            <Text numberOfLines={1} style={styles.indicatorText}>5</Text>
                        </View>
                    </View>


                    <ScrollView>
                        <View>
                            <Text numberOfLines={1} style={styles.headingTextStyle} >Your Name</Text>

                            <View style={styles.rowView}>
                                <View style={styles.editTextContainerTwo}>
                                    <TextInput
                                        style={styles.emailIdEditTextStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        placeholderTextColor={Colors.placeholderColor}
                                        // placeholder="Email Id"
                                        value={this.state.firstName}
                                        onChangeText={(value) => this.setState({ firstName: value })}
                                        onSubmitEditing={() => { this.lastNameTextInput.focus() }}
                                        ref={(input) => { this.firstNameTextInput = input; }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={styles.boxGap} />
                                <View style={styles.editTextContainerTwo}>
                                    <TextInput
                                        style={styles.emailIdEditTextStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        placeholderTextColor={Colors.placeholderColor}
                                        // placeholder="Email Id"
                                        value={this.state.lastName}
                                        onChangeText={(value) => this.setState({ lastName: value })}
                                        onSubmitEditing={() => { this.middleNameTextInput.focus() }}
                                        ref={(input) => { this.lastNameTextInput = input; }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    placeholder="Middle Name"
                                    value={this.state.middleName}
                                    onChangeText={(value) => this.setState({ middleName: value })}
                                    onSubmitEditing={() => { this.emailTextInput.focus() }}
                                    ref={(input) => { this.middleNameTextInput = input; }}
                                    blurOnSubmit={false}
                                />
                            </View>


                            <Text numberOfLines={1} style={styles.headingTextStyle} >Your Email</Text>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    // placeholder="Middle Name"
                                    value={this.state.email}
                                    onChangeText={(value) => this.setState({ email: value })}
                                    onSubmitEditing={() => { this.flatNoTextInput.focus() }}
                                    ref={(input) => { this.emailTextInput = input; }}
                                    blurOnSubmit={false}
                                />
                            </View>



                            <Text numberOfLines={1} style={styles.headingTextStyle} >Address</Text>
                            <View style={styles.rowView}>
                                <View style={styles.editTextContainerTwo}>
                                    <TextInput
                                        style={styles.emailIdEditTextStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        placeholderTextColor={Colors.placeholderColor}
                                        placeholder="Unit/Flat No"
                                        value={this.state.flatNo}
                                        onChangeText={(value) => this.setState({ flatNo: value })}
                                        onSubmitEditing={() => { this.streetNoTextInput.focus() }}
                                        ref={(input) => { this.flatNoTextInput = input; }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={styles.boxGap} />
                                <View style={styles.editTextContainerTwo}>
                                    <TextInput
                                        style={styles.emailIdEditTextStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        placeholderTextColor={Colors.placeholderColor}
                                        placeholder="Street No"
                                        value={this.state.streetNo}
                                        onChangeText={(value) => this.setState({ streetNo: value })}
                                        onSubmitEditing={() => { this.streetNameTextInput.focus() }}
                                        ref={(input) => { this.streetNoTextInput = input; }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>


                            <View style={styles.rowView}>
                                <View style={styles.editTextContainerTwo}>
                                    <TextInput
                                        style={styles.emailIdEditTextStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        placeholderTextColor={Colors.placeholderColor}
                                        placeholder="Street Name"
                                        value={this.state.streetName}
                                        onChangeText={(value) => this.setState({ streetName: value })}
                                        onSubmitEditing={() => { this.subrubTextInput.focus() }}
                                        ref={(input) => { this.streetNameTextInput = input; }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={styles.boxGap} />
                                <View style={styles.editTextContainerTwo}>
                                    <TextInput
                                        style={styles.emailIdEditTextStyle}
                                        autoCapitalize="none"
                                        multiline={false}
                                        placeholderTextColor={Colors.placeholderColor}
                                        placeholder="Subrub"
                                        value={this.state.subrub}
                                        onChangeText={(value) => this.setState({ subrub: value })}
                                        onSubmitEditing={() => { this.postCodeTextInput.focus() }}
                                        ref={(input) => { this.subrubTextInput = input; }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>

                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    placeholder="Post Code"
                                    value={this.state.postCode}
                                    onChangeText={(value) => this.setState({ postCode: value })}
                                    onSubmitEditing={() => { this.dobTextInput.focus() }}
                                    ref={(input) => { this.postCodeTextInput = input; }}
                                    blurOnSubmit={false}
                                />
                            </View>




                            <Text numberOfLines={1} style={styles.headingTextStyle} >Date of Birth</Text>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    // placeholder="Middle Name"
                                    value={this.state.dob}
                                    onChangeText={(value) => this.setState({ dob: value })}
                                    onSubmitEditing={() => { this.moileNoTextInput.focus() }}
                                    ref={(input) => { this.dobTextInput = input; }}
                                    blurOnSubmit={false}
                                />

                                <Image
                                    source={require('../images/calendar.png')}
                                    style={styles.calenderIcon}
                                />

                            </View>


                            <Text numberOfLines={1} style={styles.headingTextStyle} >Mobile</Text>
                            <View style={styles.editTextContainer}>
                                <TextInput
                                    style={styles.emailIdEditTextStyle}
                                    autoCapitalize="none"
                                    multiline={false}
                                    placeholderTextColor={Colors.placeholderColor}
                                    // placeholder="Middle Name"
                                    value={this.state.moileNo}
                                    onChangeText={(value) => this.setState({ moileNo: value })}
                                    // onSubmitEditing={() => { this.middleNameTextInput.focus() }}
                                    ref={(input) => { this.moileNoTextInput = input; }}
                                    blurOnSubmit={false}
                                />
                            </View>

                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.goToNextScreen()}>
                                <Text numberOfLines={1} style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>

                </View>
            </SafeAreaView>
        )
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
        backgroundColor: Colors.textColor1
    },
    selectedIndicatorText: {
        fontSize: 17,
        // fontFamily: fontSelector("bold"),
        color: Colors.white,
        alignSelf: 'center',
        textAlignVertical: 'center',
        flex: 1
    },
    indicatorContainer: {
        width: 45,
        height: 45,
        borderRadius: 30,
        marginStart: 17,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#C0C2C2',
    },
    indicatorText: {
        fontSize: 17,
        // fontFamily: fontSelector("bold"),
        color: '#C0C2C2',
        alignSelf: 'center',
        textAlignVertical: 'center',
        flex: 1
    },
    headingTextStyle: {
        fontSize: 14,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        paddingHorizontal: 40,
        marginTop: 15
    },
    editTextContainer: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 17,
        marginHorizontal: 30,
        marginTop: 8,
        flexDirection: 'row'
    },
    editTextContainerTwo: {
        backgroundColor: Colors.editTextBgColor,
        borderRadius: 30,
        paddingHorizontal: 17,
        marginTop: 5,
        flex: 1,
    },
    emailIdEditTextStyle: {
        fontSize: 14,
        // fontFamily: fontSelector("regular"),
        color: Colors.black,
        flex: 1
    },
    boxGap: {
        width: 15
    },
    buttonContainer: {
        backgroundColor: Colors.textColor1,
        borderRadius: 30,
        paddingVertical: 15,
        marginHorizontal: 30,
        marginTop: 60,
        marginBottom: 10
    },
    buttonText: {
        fontSize: 15,
        // fontFamily: fontSelector("regular"),
        color: Colors.white,
        textAlign: 'center',
    },
    calenderIcon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        alignSelf: 'center'
    }

});