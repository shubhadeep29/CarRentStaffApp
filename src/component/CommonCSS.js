'use strict';
import {
  StyleSheet,
  StatusBar
} from 'react-native';

import Constants from '../utils/Constants';
import fontSelector from '../component/FontSelector';

var React = require('react-native');

var CommonCSS = React.StyleSheet.create({

  statusBar: {
    height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  },
  navBarTab: {
    backgroundColor: Constants.COLOR_NAVIGATION_BAR,
    height: Constants.APPBAR_HEIGHT,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  navBarTabText_en: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
  },
  navBarTabText_ko: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
  },
  navBar: {
    backgroundColor: Constants.COLOR_NAVIGATION_BAR, //'#151B45',
    height: Constants.APPBAR_HEIGHT,
    flexDirection: 'row',
    alignSelf: "stretch",
    alignItems: 'center',
  },
  navBarTouchableOpacity: {
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  navBarBackArrow: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
  navBarText_en: {
    color: '#FFFFFF',
    fontSize: 16,
    // fontFamily:'Roboto-Medium',
    // fontFamily:fontSelector('medium'),
    flexShrink: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  navBarText_ko: {
    color: '#FFFFFF',
    fontSize: 16,
    // fontFamily:'Roboto-Medium',
    //fontFamily:fontSelector('bold'),
    flexShrink: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  animationContainerBig: {
    width: 90,
    height: 90,
    backgroundColor: "#00000000",
  },
  animationContainerSmall: {
    width: 70,
    height: 70,
    backgroundColor: "#00000000",
  },
  button: {
    alignItems: "center",
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 7,
    backgroundColor: Constants.COLOR_BUTTON_BACKGROUND_HOVER,
  },
  errorImage: {
    width: 200,
    height: 119,
    marginBottom: 30,
  },
  errorMessage_en: {
    color: "#9C9C9D",
    fontSize: 16,
    fontFamily: 'Roboto-regular',
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  errorMessage_ko: {
    color: "#9C9C9D",
    fontSize: 16,
    fontFamily: 'Roboto-regular',
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  yesStyle: {
    fontSize: 14,
    color: "#5666BF",
    fontFamily: fontSelector('bold'),
  },
  noStyle: {
    fontSize: 14,
    color: "#BEBEBE",
    fontFamily: fontSelector('bold'),
  },
  noRecordFound: {
    fontSize: 16,
    color: "#222222",
    fontFamily: fontSelector('medium'),
    textAlign:'center'
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    backgroundColor: "#000000CC",
  },
  modalType: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '80%',
    flexDirection:'column'
  },
  modalView: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:40

  },
  modalImageStyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginBottom: 5
  },

  modalText: {
    fontSize: 15,
    color: "#121212",
    fontFamily: fontSelector('medium'),
    marginTop: 5,
    paddingHorizontal: 20,
    textAlign:'center'
  },
  modalSubText: {
    fontSize: 14,
    color: "#888888",
    fontFamily: fontSelector('regular'),
    marginTop: 10,
    paddingHorizontal: 20,
    textAlign:"center"
  },
  modalTransparency: {
    backgroundColor: "#000000AA",
    flex: 1,
  },
  modalBorderStyle: {
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  okStyle: {
    fontSize: 14,
    color: "#2B6CB4",
    fontFamily: fontSelector('bold'),
    textAlign: 'center',
  },
  defaultStyle: {
    fontSize: 14,
    color: "#A0A0A0",
    fontFamily: fontSelector('bold'),
    textAlign: 'center',
  },
  modalCrossStyle:{
    height: 15,
    width: 15,
    resizeMode: 'contain',
    alignSelf:'flex-end'
  },
  controls:{
    backgroundColor:"rgba(0,0,0,0.5)",
    left:0,
    right:0,
    bottom:0,
    position:'absolute',
    flexDirection:'row',
    justifyContent:'space-around',
    paddingHorizontal:10,
    paddingVertical:3,
    alignItems:'center'
  },
  duration:{
    color:"#FFF",
    marginLeft:5
  },
  dateModal: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    backgroundColor: "#000000CC",
  },


})

module.exports = CommonCSS;
