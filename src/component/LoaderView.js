import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { Colors } from 'react-native-paper';
// import fontSelector from '../utils/FontSelector';
import Constants from "../utils/Constants";

export default class LoaderView extends React.Component {
    render() {
        return(
                <View style={[styles.container,{backgroundColor:this.props.backgroundColor? this.props.backgroundColor : null}]}>
                    <View style={styles.activityCont}>                  
                    </View>
                    <ActivityIndicator
                            animating={true}
                            size="large"
                            color={Constants.COLOR_LOADER}
                        style={styles.activity}></ActivityIndicator>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        color: Colors.white,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right:0,
        justifyContent: 'center',
        alignItems:'center',
        zIndex:100,
    },
    activityCont: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  'rgba(0,0,0,0.1)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right:0,
        justifyContent: 'center',
        zIndex:100,
        opacity: 0.1,
    },
    activity: {
        width: 70,
        height: 70,
    },
    activityText: {
        color: 'black',
        // fontFamily: fontSelector('bold'),
        fontSize: 20
    }
});