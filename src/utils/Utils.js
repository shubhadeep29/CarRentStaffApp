import React, {Component, PureComponent} from 'react';
import {Alert, TouchableOpacity, Text, View} from 'react-native';
import strings from '../utils/Localization';
import CommonCSS from '../component/CommonCSS';

export default class Utils {
  constructor() {
    // super();
    this.state = {
      isModalVisible: true,
    };
  }

  static showMessageAlert(message) {
    Alert.alert(
      'Alert',
      message,
      [{text: strings.ok, onPress: () => console.log('OK Pressed')}],
      {cancelable: true},
    );
  }

  static emailValidate(text) {
    var result = false;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (text.trim() == '') {
      result = false;
      return result;
    } else {
      if (reg.test(text) === false) {
        // alert("Email is Not Correct")
        result = false;
      } else {
        // alert("Email is Correct")
        result = true;
      }
      return result;
    }
    // Keyboard.dismiss();
  }

  static getDate(date) {
    if (date) {
      const splittedDate = date.split('/');
      // console.log(
      //   'splittedDate --- 123',
      //   splittedDate,
      //   new Date(`${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`),
      // );
      return new Date(
        `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`,
      );
    } else {
      return new Date();
    }
  }
}
