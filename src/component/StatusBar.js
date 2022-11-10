import React from 'react';
import {Platform, StatusBar, View} from 'react-native';
import CommonCSS from '../component/CommonCSS';

const CustomStatus = ({ backgroundColor, ...props }) => (
  <View style={[CommonCSS.statusBar, { backgroundColor }]}>
      <StatusBar translucent hidden={false} backgroundColor={backgroundColor} {...props}  barStyle="dark-content"/>
  </View>
);

export default CustomStatus;