import LocalizedStrings from 'react-native-localization';

let strings = new LocalizedStrings({
  //english
  en: {
    lang: 'en', // do not change this key and value
    language: "Language",
    noInternetConnection: "No internet connection",
  },

  //korean
  ko: {
    lang: 'ko', // do not change this key and value
    language: "언어",
    noInternetConnection: "인터넷 없음",
  },

 

});

module.exports = strings;


