import React from 'react';
import { Dimensions, View, Text, StyleSheet, ActivityIndicator, Modal,StatusBar} from 'react-native';
// import fontSelector from '../utils/FontSelector';
import Constants from "../utils/Constants";
const height = Dimensions.get("window").height + StatusBar.currentHeight;
const width = Dimensions.get("window").width ;


export default class Loader extends React.Component {
    render() {
        return(
                <View style={styles.container}>
                    <View style={styles.activityCont}>
                        <ActivityIndicator
                            animating={true}
                            size="large"
                            color={Constants.COLOR_LOADER}
                        style={styles.activity}></ActivityIndicator>
                    </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        //backgroundColor:  'rgba(0,0,0,0.1)',
        backgroundColor:"#FFFFFF",
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right:0,
        justifyContent: 'center',
        zIndex:100,
    },
    activityCont: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20
    },
    activity: {
        width: 70,
        height: 70
    },
    activityText: {
        color: 'black',
        // fontFamily: fontSelector('bold'),
        fontSize: 20
    }
});