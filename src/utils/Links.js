import {Link} from '@react-navigation/native';

export default class Links {
  //   static BASEURL = 'https://quantum.syscentricdev.com/';
  static BASEURL = 'https://quantum.syscentricdev.com/';
  static API = Links.BASEURL + 'api/';

  static LOGIN = Links.API + 'staff/login';
  static LOGOUT = Links.API + 'staff/logout';
  static CHANGE_PASSWORD = Links.API + 'staff/changePassword';
  static EDIT_CAR = Links.API + 'staff/editCar';
  static addCar = Links.API + 'staff/addCar';
  static MY_PROFILE = Links.API + 'staff/myProfile';
  static CAR_LIST = Links.API + 'staff/getCarList';
  static EDIT_PROFILE = Links.API + 'staff/updateProfile';
  static DRIVER_LIST = Links.API + 'staff/getDriverList';
  static RENT_OUT_LIST = Links.API + 'staff/getRentOutList';
  static RENT_IN_LIST = Links.API + 'staff/getRentInList';
  static ADD_NEW_RENT_IN = Links.API + 'staff/addRentIn';
  static ADD_NEW_RENT_OUT = Links.API + 'staff/addRentOut';
  static EDIT_RENT_OUT = Links.API + 'staff/editRentOut';
  static getDriverDetailsRentOut =
    Links.API + 'staff/get_driver_details_rent_out';
  static getCountryList = Links.API + 'staff/getCountryList';
  static EDIT_RENT_IN = Links.API + 'staff/editRentIn';
  static getDriverListRentOut = Links.API + 'staff/getDriverListRentOut';
  static getCompanyList = Links.API + 'staff/getCompanyList';
  static getUtilityList = Links.API + 'staff/getUtilityBillList';
  static getDriverListRentIn = Links.API + 'staff/getDriverListRentIn';
  static getPaymentMethod = Links.API + 'staff/getPaymentMethod';
  static getCarListRent = Links.API + 'staff/getCarListRent';
  static validateDriver = Links.API + 'staff/validateDriver';
  static editDriver = Links.API + 'staff/editDriver';
  static getVehicle = Links.API + 'staff/getVehicle';
  static getOnGoingVehicle = Links.API + 'staff/getOnGoingVehicle';
  static getBondRefundList = Links.API + 'staff/getBondRefundList';
  static getDriverListWithBond = Links.API + 'staff/getDriverListWithBond';
  static addBondRefund = Links.API + 'staff/addBondRefund';
  static getPendingDriverValidate =
    Links.API + 'staff/getPendingDriverValidate';
  static getAvailableVehicleList =
    Links.API + 'staff/get_available_vehicle_list';
}
