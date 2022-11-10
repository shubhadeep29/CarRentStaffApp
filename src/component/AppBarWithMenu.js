import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Constants from '../utils/Constants';
// import strings from '../utils/Localization';
// import fontSelector from '../utils/FontSelector';
import * as Colors from '../utils/Colors';
import AdaptiveStatusBar from './AdaptiveStatusBar';



export default function AppBarWithMenu({ title, navigation }) {
    console.log("navigation ====> ", navigation)
    return (
        <View >
            <AdaptiveStatusBar />
            <View style={styles.headercontainer}>

                <View style={styles.appbarContainer}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Image
                            source={require('../images/hamburgericon.png')}
                            style={styles.hambergerIcon}
                        />
                    </TouchableOpacity>

                    <Text numberOfLines={1} style={styles.titleText} >{title}</Text>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    headercontainer: {
        height: Constants.APPBAR_HEIGHT,
        flexDirection: 'row',
        backgroundColor: Colors.splashScreenBgColor,
        alignContent: 'center',
        alignItems: 'center',
        // shadowColor: '#000',
        // elevation: 4,
        // shadowOffset: { width: 0, height: 0.5 },
        // shadowOpacity: 0.2,
        // shadowRadius: 1,
        // marginBottom: 1,
        // paddingLeft: 15
    },

    appbarContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    hambergerIcon: {
        width: 23,
        height: 23,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    titleText: {
        fontSize: 22,
        // fontFamily: fontSelector("regular"),
        color: Colors.textColor1,
        alignItems: "center",
        textAlign: 'center',
        textAlignVertical: 'center',
        flex: 1,
        fontWeight: 'bold'
    },
});