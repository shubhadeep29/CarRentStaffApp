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
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


export default class MyProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNetworkAvailable: false,
            isLoading: false,
            email: "",
            password: "",
            resourcePath: {},
        }
    }

   
    openDatePickerView() {

    }

    // selectFile = () => {
    //     var options = {
    //       title: 'Select Image',
    //       customButtons: [
    //         { 
    //           name: 'customOptionKey', 
    //           title: 'Choose file from Custom Option' 
    //         },
    //       ],
    //       storageOptions: {
    //         skipBackup: true,
    //         path: 'images',
    //       },
    //     };
    //     ImagePicker.showImagePicker(options, res => {
    //       console.log('Response = ', res);
    //       if (res.didCancel) {
    //         console.log('User cancelled image picker');
    //       } else if (res.error) {
    //         console.log('ImagePicker Error: ', res.error);
    //       } else if (res.customButton) {
    //         console.log('User tapped custom button: ', res.customButton);
    //         alert(res.customButton);
    //       } else {
    //         let source = res;
    //         this.setState({
    //           resourcePath: source,
    //         });
    //       }
    //     });
    // };

    imageGalleryLaunch = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        // ImagePicker.launchImageLibrary(options, (res) => {
        launchImageLibrary(options, (res) => {
          console.log('Response = ', res);
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            const source = { uri: res.uri };
            console.log('response', JSON.stringify(res));
            this.setState({
              filePath: res,
              fileData: res.data,
              fileUri: res.uri
            });
          }
        });
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.mainContainer}>

                    <View style={styles.centerView}>
                        <Text style={{ fontSize: 30, color: 'white' }} > MyProfileScreen Screen </Text>

                        <View style={{ height: 30 }} />
                        {/* <TouchableOpacity onPress={() => this.openDatePickerView()}>
                            <Text style={{ fontSize: 30, color: 'white' }} > Open Date picker </Text>
                        </TouchableOpacity> */}


                        <Image
                            source={{
                                uri: 'data:image/jpeg;base64,' + this.state.resourcePath.data,
                            }}
                            style={{ width: 100, height: 100 }}
                        />
                        <Image
                            source={{ uri: this.state.resourcePath.uri }}
                            style={{ width: 200, height: 200 }}
                        />
                        <Text style={{ alignItems: 'center' }}>
                            {this.state.resourcePath.uri}
                        </Text>
                        <TouchableOpacity onPress={this.imageGalleryLaunch()} style={styles.button}  >
                            <Text style={styles.buttonText}>Select File</Text>
                        </TouchableOpacity>









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
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});