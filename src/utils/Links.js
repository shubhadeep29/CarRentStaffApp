import { Link } from "@react-navigation/native";

export default class Links {
    static BASEURL = "https://quantum.syscentricdev.com/";
    static API = Links.BASEURL + "api/";
    

    static LOGIN = Links.API + "staff/login";
    static LOGOUT = Links.API + "staff/logout";
    static CHANGE_PASSWORD = Links.API + "staff/changePassword";
    static EDIT_CAR = Links.API + "staff/editCar";
   

    
}