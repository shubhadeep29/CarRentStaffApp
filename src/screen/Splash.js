import React, { useState } from 'react';
import {
    Image, Text, View, StyleSheet, TouchableOpacity, SafeAreaView,
} from 'react-native';
import * as Colors from '../utils/Colors';



export default class Splash extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        try {
            setTimeout(async () => {
              this.navigateToScreen()
            }, 3000);
          } catch (error) { }

    };


    navigateToScreen() {
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          });
    }



    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View >

                    {/* <ImageBackground style={styles.imgBackground}
                        resizeMode='cover'
                        source={require('../images/icon_splash_background.png')}>

                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 30 }}>
                            <Image
                                source={require('../images/icon_splash_logo.png')}
                                style={{
                                    width: 100, resizeMode: 'contain', height: 100,
                                }}
                            />
                        </View>
                    </ImageBackground> */}

                    <Image
                        source={require('../images/ic_login_top_transparent.png')}
                        style={styles.splashLogo}
                    />


                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.splashScreenBgColor,
    },
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    splashLogo:{
        width: 150,
        height: 150,
        resizeMode: 'contain',
    }


});
