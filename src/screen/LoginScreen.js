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


export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNetworkAvailable: false,
      isLoading: false,
      email: "",
      password: "",
    }
  }

  componentDidMount = async () => {

  }

  goToNextScreen() {
    this.props.navigation.navigate('MainDrawerScreen')
  }

  goToForgotPassword(){
    this.props.navigation.navigate('ChangePasswordScreen')
  }

render() {
  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <AdaptiveStatusBar />

        <View>
          <View style={styles.logoContainer}>
            <Image
              source={require('../images/ic_login_top_transparent.png')}
              style={styles.logoIcon}
            />
          </View>
          <Text numberOfLines={1} style={styles.subTitleTextTwo} >STAFF APP</Text>
        </View>


        <View style={styles.bottomViewContainer}>
          <Text numberOfLines={1} style={styles.loginYourAccountText}>Login to your account</Text>

          <View style={styles.editTextContainer}>
            <TextInput
              style={styles.emailIdEditTextStyle}
              autoCapitalize="none"
              multiline={false}
              keyboardType="email-address"
              placeholderTextColor={Colors.placeholderColor}
              // placeholder={strings.pleaseSelectTheTypeOfInquiry}
              placeholder="Email Id"
              value={this.state.email}
              onChangeText={(value) => this.setState({ email: value })}
              onSubmitEditing={() => { this.passwordTextInput.focus() }}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.editTextContainer}>
            <TextInput
              style={styles.emailIdEditTextStyle}
              autoCapitalize="none"
              multiline={false}
              secureTextEntry
              placeholderTextColor={Colors.placeholderColor}
              // placeholder={strings.pleaseSelectTheTypeOfInquiry}
              placeholder="Password"
              value={this.state.password}
              onChangeText={(value) => this.setState({ password: value })}
              ref={(input) => { this.passwordTextInput = input; }}
              blurOnSubmit={false}
            />
          </View>

          {/* <Image
              source={require('../images/ic_login_bottom.png')}
              style={styles.bottomImage}
            /> */}

          <TouchableOpacity style={styles.loginButtonContainer}
            onPress={() => this.goToNextScreen()}>
            <Text numberOfLines={1} style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => this.goToForgotPassword()}>
            <Text numberOfLines={1} style={styles.forgotPasswordText}>Forgot Password</Text>
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
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  logoIcon: {
    width: 150,
    resizeMode: 'contain',
    height: 150,

  },
  titleText: {
    fontSize: 22,
    // fontFamily: fontSelector("regular"),
    color: Colors.textColor1,
    alignItems: "center",
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  subTitleContainer: {
    marginTop: 3,
    alignSelf: 'center'
  },
  subTitleText: {
    fontSize: 10,
    // fontFamily: fontSelector("regular"),
    color: Colors.textColor1,
    alignItems: "center",
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 50,
    paddingVertical: 2,
    paddingHorizontal: 10,
    alignSelf: 'baseline',
  },
  subTitleTextTwo: {
    fontSize: 12,
    // fontFamily: fontSelector("regular"),
    color: Colors.textColor1,
    alignItems: "center",
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  bottomViewContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 30,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40
  },
  loginYourAccountText: {
    fontSize: 19,
    // fontFamily: fontSelector("regular"),
    color: Colors.textColor1,
    alignItems: "center",
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 25,
    marginBottom: 20
  },
  emailIdEditTextStyle: {
    fontSize: 15,
    // fontFamily: fontSelector("regular"),
    color: Colors.black,
  },
  editTextContainer: {
    backgroundColor: Colors.editTextBgColor,
    borderRadius: 30,
    paddingHorizontal: 25,
    marginHorizontal: 30,
    marginBottom: 10
  },
  loginButtonContainer: {
    backgroundColor: Colors.textColor1,
    borderRadius: 30,
    paddingVertical: 15,
    marginHorizontal: 30,
    marginTop: 25
  },
  loginButtonText: {
    fontSize: 15,
    // fontFamily: fontSelector("regular"),
    color: Colors.white,
    textAlign: 'center',
  },
  forgotPasswordText: {
    fontSize: 13,
    // fontFamily: fontSelector("regular"),
    color: Colors.textColor2,
    textAlign: 'center',
    marginTop: 20
  },
  bottomImage:{
    flex:1,
    position: 'absolute',
    bottom:0,
    left:0,
    right:0
  }
});
