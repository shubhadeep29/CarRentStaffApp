import { Link } from "@react-navigation/native";

export default class Links {
    static BASEURL = "https://quantum.syscentricdev.com/";
    static API = Links.BASEURL + "api/";
    

    static LOGIN = Links.API + "staff/login";
    static LOGOUT = Links.API + "staff/logout";
    static CHANGE_PASSWORD = Links.API + "staff/changePassword";
    static EDIT_CAR = Links.API + "staff/editCar";
    static MY_PROFILE = Links.API+"staff/myProfile"
    static CAR_LIST = Links.API + "staff/getCarList";
    static EDIT_PROFILE = Links.API+"staff/updateProfile";
    static DRIVER_LIST = Links.API+"staff/getDriverList";
    static RENT_OUT_LIST = Links.API + "staff/getRentOutList";
    static RENT_IN_LIST = Links.API + "staff/getRentInList";
    
}