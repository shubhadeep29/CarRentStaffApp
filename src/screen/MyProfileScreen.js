import React, { useState } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
} from 'react-native';
import * as Colors from '../utils/Colors';
import AdaptiveStatusBar from '../component/AdaptiveStatusBar';


export default class MyProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNetworkAvailable: false,
            isLoading: false,
            email: "",
            password: "",
        }
    }

    render() {
        return (

            <SafeAreaView style={styles.container}>
                <View style={styles.mainContainer}>

                    <View style={styles.centerView}>
                        <Text style={{ fontSize: 30, color: 'white' }} > MyProfileScreen Screen </Text>
                    </View>

                </View>
            </SafeAreaView>

        );
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'purple',
    },
    mainContainer: {
        flex: 1,
    },

});