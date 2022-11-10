import React, { Component } from 'react';
import { View, SafeAreaView, Platform } from 'react-native';
import Constants from '../utils/Constants';
import StatusBar from '../component/StatusBar';

export default function Header() {
    return (

        <View>
            {Platform.OS === "ios" ?
                <SafeAreaView style={{
                    flex: 0,
                    backgroundColor: Constants.COLOR_STATUS_BAR
                }}>
                </SafeAreaView>
                :
                <StatusBar
                    backgroundColor={Constants.COLOR_STATUS_BAR}
                />
            }
        </View>

    );
}