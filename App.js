import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { screensEnabled } from 'react-native-screens';
import Splash from './src/screen/Splash';
import LoginScreen from './src/screen/LoginScreen';
import DashboardScreen from './src/screen/DashboardScreen';
import ChangePasswordScreen from './src/screen/ChangePasswordScreen';
import BondReturnEntryScreen from './src/screen/BondReturnEntryScreen';
import ValidateOrApproveDriverScreen from './src/screen/ValidateOrApproveDriverScreen';
import RentOutVehicleScreen from './src/screen/RentOutVehicleScreen';
import ReturnInVehicleScreen from './src/screen/ReturnInVehicleScreen';
import HamburgerMenuScreen from './src/screen/HamburgerMenuScreen';
import MyProfileScreen from './src/screen/MyProfile';
import MainDrawerScreen from './src/screen/MainDrawerScreen';
import AddNewCar from './src/screen/AddNewCar';
import ValidateStepOneScreen from './src/screen/ValidateStepOneScreen';
import BondReturnEntryEditScreen from './src/screen/BondReturnEntryEditScreen';
import ValidateStepTwoScreen from './src/screen/ValidateStepTwoScreen';
import ValidateStepThreeScreen from './src/screen/ValidateStepThreeScreen';
import ValidateStepFiveScreen from './src/screen/ValidateStepFiveScreen';
import ValidateStepFourScreen from './src/screen/ValidateStepFourScreen';
import AddRentOutVehicle from './src/screen/AddRentOutVehicle';
import AddReturnInVehicle from './src/screen/AddReturnInVehicle';
import CarMaintenanceScreen from './src/screen/CarMaintenanceScreen';



const Stack = createStackNavigator();
const screenOptionStyle = {
  headerMode: null,
  headerShown: false
};



const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="CarMaintenanceScreen" component={CarMaintenanceScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        <Stack.Screen name="BondReturnEntryScreen" component={BondReturnEntryScreen} />
        <Stack.Screen name="ValidateOrApproveDriverScreen" component={ValidateOrApproveDriverScreen} />
        <Stack.Screen name="RentOutVehicleScreen" component={RentOutVehicleScreen} />
        <Stack.Screen name="ReturnInVehicleScreen" component={ReturnInVehicleScreen} />
        <Stack.Screen name="MainDrawerScreen" component={MainDrawerScreen} />
        <Stack.Screen name="HamburgerMenuScreen" component={HamburgerMenuScreen} />
        <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
        <Stack.Screen name="AddNewCar" component={AddNewCar} />
        <Stack.Screen name="BondReturnEntryEditScreen" component={BondReturnEntryEditScreen} />
        <Stack.Screen name="ValidateStepOneScreen" component={ValidateStepOneScreen} />
        <Stack.Screen name="ValidateStepTwoScreen" component={ValidateStepTwoScreen} />
        <Stack.Screen name="ValidateStepThreeScreen" component={ValidateStepThreeScreen} />
        <Stack.Screen name="ValidateStepFiveScreen" component={ValidateStepFiveScreen} />
        <Stack.Screen name="ValidateStepFourScreen" component={ValidateStepFourScreen} />
        <Stack.Screen name="AddReturnInVehicle" component={AddReturnInVehicle} />
        <Stack.Screen name="AddRentOutVehicle" component={AddRentOutVehicle} />







      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainStackNavigator;