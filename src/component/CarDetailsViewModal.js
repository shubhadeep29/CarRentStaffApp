import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  StatusBar,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Constants from '../utils/Constants';
// import fontSelector from '../utils/FontSelector';
import * as Colors from '../utils/Colors';
import Links from '../utils/Links';
// import Utils from '../utils/Utils';

export default class CarDetailsViewModal extends Component {
  constructor(props) {
    super(props);
  }

  setStateUpdateMethod = value => {
    // Using parent props to update parent state
    this.props.updateModalState(value);
  };

  onPressButton = value => {
    // Using parent props to update parent state
    this.props.buttonOperation(value);
  };

  render() {
    return (
      <Modal
        visible={this.props.isModalVisible}
        transparent={true}
        onRequestClose={() => this.setStateUpdateMethod(false)}>
        <StatusBar
          translucent
          backgroundColor={Colors.modalContainerBackgroundColor}
          barStyle="light-content"
        />
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => this.setStateUpdateMethod(false)}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={styles.rowView}>
                <View style={styles.carAndModelNumberContainer}>
                  <Text style={styles.carAndModelNumberTextStyle}>
                    {this.props.item.car_no} |{' '}
                  </Text>
                  <Text style={styles.carAndModelNumberTextStyle}>
                    Model : {this.props.item.model}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => this.setStateUpdateMethod(false)}>
                  <Image
                    source={require('../images/ic_cancel_dark_pink_red.png')}
                    style={styles.cancelImage}
                  />
                </TouchableOpacity>
              </View>

              <Image
                source={{uri: Links.BASEURL + this.props.item.car_pic}}
                style={styles.carImage}
              />

              <View style={styles.infoContainer}>
                <Text style={styles.infoHeadingTextStyle}>Car Status :</Text>
                {this.props.item.status == '0' ? (
                  <View style={styles.activeCarNumberContainer}>
                    <Text
                      numberOfLines={1}
                      style={styles.activeCarNumberTextStyle}>
                      Active
                    </Text>
                  </View>
                ) : this.props.item.status == '1' ? (
                  <View style={styles.inActiveCarNumberContainer}>
                    <Text
                      numberOfLines={1}
                      style={styles.activeCarNumberTextStyle}>
                      Inactive
                    </Text>
                  </View>
                ) : this.props.item.status == '2' ? (
                  <View style={styles.activeCarNumberContainer}>
                    <Text
                      numberOfLines={1}
                      style={styles.activeCarNumberTextStyle}>
                      Accident
                    </Text>
                  </View>
                ) : this.props.item.status == '3' ? (
                  <View style={styles.breakdownContainer}>
                    <Text
                      numberOfLines={1}
                      style={styles.activeCarNumberTextStyle}>
                      Breakdown
                    </Text>
                  </View>
                ) : (
                  <View style={styles.inActiveCarNumberContainer}>
                    <Text
                      numberOfLines={1}
                      style={styles.inActiveCarNumberTextStyle}>
                      Inactive
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoHeadingTextStyle}>Fule Type :</Text>
                <Text style={styles.infoTextStyle}>
                  {this.props.item.fuel_type}
                </Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoHeadingTextStyle}>Year :</Text>
                <Text style={styles.infoTextStyle}>{this.props.item.year}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoHeadingTextStyle}>Make :</Text>
                <Text style={styles.infoTextStyle}>{this.props.item.make}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoHeadingTextStyle}>Hybrid :</Text>
                {this.props.item.is_hybrid == '0' ? (
                  <Text style={styles.infoTextStyle}>YES</Text>
                ) : (
                  <Text style={styles.infoTextStyle}>NO</Text>
                )}
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoHeadingTextStyle}>
                  Rego Expire Date :
                </Text>
                <Text style={styles.infoTextStyle}>
                  {this.props.item.rego_expire_date}
                </Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoHeadingTextStyle}>
                  Insurance Expire Date :
                </Text>
                <Text style={styles.infoTextStyle}>
                  {this.props.item.insurance_expire_date}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  viewStyle: {
    flex: 1,
    marginHorizontal: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.modalContainerBackgroundColor,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowView: {
    flexDirection: 'row',
  },
  carAndModelNumberContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  carAndModelNumberTextStyle: {
    fontSize: 15,
    // fontFamily: fontSelector("bold"),
    color: Colors.black,
    fontWeight: 'bold',
  },
  cancelImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  carImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  infoHeadingTextStyle: {
    fontSize: 13,
    // fontFamily: fontSelector("bold"),
    color: '#7F8C8D',
    flex: 1,
  },
  infoTextStyle: {
    fontSize: 13,
    // fontFamily: fontSelector("bold"),
    color: Colors.black,
    fontWeight: 'bold',
    alignSelf: 'baseline',
  },
  activeCarNumberContainer: {
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: Colors.green,
  },
  activeCarNumberTextStyle: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: 11,
    paddingVertical: 3,
  },
  inActiveCarNumberContainer: {
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: Colors.lightYellow,
  },
  inActiveCarNumberTextStyle: {
    fontSize: 12,
    // fontFamily: fontSelector("bold"),
    color: Colors.yellow,
    fontWeight: 'bold',
    paddingHorizontal: 11,
    paddingVertical: 3,
  },
  breakdownContainer: {
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: Colors.red,
  },
});
