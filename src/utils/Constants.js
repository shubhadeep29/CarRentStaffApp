import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  Dimensions
} from 'react-native';
import strings from './Localization';

export default class Constants {
  static WEATHER_APPID ="2e35119060054c4c7dd752a2f6b77ae4"
  //static WEATHER_APPID = "cc1ede411d41a15bce91cc8839bc408d"
  static COLOR_STATUS_BAR = '#ffffff';
  static COLOR_NAVIGATION_BAR = "#FFFFFF";
  static COLOR_PRIMARY_BACKGROUND = "#FFFFFF";
  static COLOR_LIST_ITEM_HOVER = "#F0F9FC";
  static COLOR_ERROR_TEXT = "red";
  static COLOR_LOADER = "#2B6CB4";
  static COLOR_LOADER_BACKGROUND = "rgba(0,0,0,0.1)";
  static COLOR_BUTTON_BACKGROUND = "#2B6CB4";

  static appNavBarTopPadding = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;

  static STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  static APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
  static HEADER_HEIGHT = 60;


  static STORAGE_KEY_USER_ID = "user_id";
  static STORAGE_KEY_API_KEY = "api_key";
  static STORAGE_KEY_LANGUAGE = "language";
  static STORAGE_KEY_NAME = "name";
  static STORAGE_KEY_EMAIL= "email";
  static STORAGE_PUSH_ALARM_STATUS= "push_alarm";

  
  
  static STORAGE_KEY_USER_MOBILE_NO = "user_mobile_no";
  static STORAGE_KEY_FCM_TOKEN= "fcm_token";
  static STORAGE_KEY_SKIP_UPDATE_DATE= "update_time";

  static LANGUAGE_ENGLISH = "ENGLISH";
  static LANGUAGE_KOREAN = "한국어";
  static LANGUAGE_JAPANESE = "日本語";
  static LANGUAGE_CHINESE= "中文";

  static LANGUAGE_ENGLISH_EN = "en";
  static LANGUAGE_KOREAN_KO = "ko";
  static LANGUAGE_JAPANESE_JA = "ja";
  static LANGUAGE_CHINESE_ZH= "zh";

  static TRAINING_TYPE = [
    {type:strings.all},
    {type:strings.liveTraining},
    {type:strings.digitalTraining},
    {type:strings.fieldTraining},

  ]
  static LIVE_TRAINING = "live";
  static DIGITAL_TRAINING = "digital";
  static FIELD_TRAINING = "field";

  static ALL_TRAINING_CODE = "all";
  static LIVE_TRAINING_CODE = "1";
  static DIGITAL_TRAINING_CODE = "2";
  static FIELD_TRAINING_CODE = "3";




}
