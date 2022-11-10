import React, { useState } from 'react';
import {
  Image, Text, View, Button, Dimensions
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HamburgerMenuScreen from './HamburgerMenuScreen';
import DashboardScreen from './DashboardScreen';
import MyProfileScreen from './MyProfileScreen';
import ValidateOrApproveDriverScreen from './ValidateOrApproveDriverScreen';
import RentOutVehicleScreen from './RentOutVehicleScreen';
import ReturnInVehicleScreen from './ReturnInVehicleScreen';
import BondReturnEntryScreen from './BondReturnEntryScreen';
import ChangePasswordScreen from './ChangePasswordScreen';




const MyDrawer = createDrawerNavigator();

const screenOptionStyle = {
  headerMode: null,
  headerShown: false,
  drawerStyle: {
    width: Dimensions.get('window').width * .80,
  },
  drawerPosition: "left"
};

export default class MainDrawerScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      // <NavigationContainer>
      <MyDrawer.Navigator
        initialRouteName="Dashboard"
        screenOptions={screenOptionStyle}
        drawerStyle={{ width: Dimensions.get('window').width * .80 }}
        drawerContent={props => <HamburgerMenuScreen  {...props} />} >
        <MyDrawer.Screen name="DashboardScreen" component={DashboardScreen} />
        <MyDrawer.Screen name="MyProfileScreen" component={MyProfileScreen} />
        <MyDrawer.Screen name="ValidateOrApproveDriverScreen" component={ValidateOrApproveDriverScreen} />
        <MyDrawer.Screen name="RentOutVehicleScreen" component={RentOutVehicleScreen} />
        <MyDrawer.Screen name="ReturnInVehicleScreen" component={ReturnInVehicleScreen} />
        <MyDrawer.Screen name="BondReturnEntryScreen" component={BondReturnEntryScreen} />
        <MyDrawer.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      </MyDrawer.Navigator>
      // </NavigationContainer>
    );
  }
}

