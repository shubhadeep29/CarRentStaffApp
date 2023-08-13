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
  Linking,
  Alert,
  Share,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Constants from '../utils/Constants';
// import fontSelector from '../utils/FontSelector';
import * as Colors from '../utils/Colors';
import Links from '../utils/Links';
// import Utils from '../utils/Utils';

export default class AuthorizeModal extends Component {
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

  OpenURLButton = async url => {
    try {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.openURL(url);

      console.log('supported ---', supported);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    } catch {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  OpenWhatsappButton = async url => {
    try {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.openURL(url);

      console.log('supported ---', supported);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    } catch {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message: this.props.item?.AuthorisationLink?.Link,
      });
      console.log('result  share ---', result);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    console.log('test ----', this.props.item?.AuthorisationLink?.Link);
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
        <View
          style={styles.modalContainer}
          activeOpacity={1}
          // onPressOut={() => this.setStateUpdateMethod(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={[styles.rowView, {alignItems: 'center'}]}>
                <View style={styles.carAndModelNumberContainer}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.textColor1,
                      fontWeight: '700',
                    }}>
                    Customer Authorization Required
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

              <TouchableOpacity
                onPress={() => {
                  this.OpenURLButton(this.props.item?.AuthorisationLink?.Link);
                }}
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  marginTop: 10,
                  padding: 10,
                  justifyContent: 'space-evenly',
                }}>
                <Image
                  source={require('../images/customer-sign.png')}
                  style={styles.iconImage}
                />
                <View style={{flex: 1, marginLeft: 10}}>
                  <Text style={{fontWeight: '700', color: 'black'}}>
                    Customer is with you now
                  </Text>
                  <Text style={{fontSize: 12, color: 'black'}}>
                    And can authorize on your device.
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(this.props.item?.AuthorisationLink?.Link);
                  this.onShare('whatsapp://app');
                }}
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  marginTop: 10,
                  padding: 10,
                  justifyContent: 'space-evenly',
                }}>
                <Image
                  source={require('../images/whatsapp.png')}
                  style={styles.iconImage}
                />
                <View style={{flex: 1, marginLeft: 10}}>
                  <Text style={{fontWeight: '700', color: 'black'}}>
                    You send an Authorization Link
                  </Text>
                  <Text style={{fontSize: 12, color: 'black'}}>
                    Using your own mobile, Sharing via Whatsapp.
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  marginTop: 10,
                  padding: 10,
                  justifyContent: 'space-evenly',
                }}>
                <Image
                  source={require('../images/link-click.png')}
                  style={styles.iconImage}
                />
                <View style={{flex: 1, marginLeft: 10}}>
                  <Text style={{fontWeight: '700', color: 'black'}}>
                    We send an Authorization Link
                  </Text>
                  <Text style={{fontSize: 12, color: 'black'}}>
                    To the Customer's email or mobile on your behalf.
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(this.props.item?.AuthorisationLink?.Link);
                }}
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  marginTop: 10,
                  padding: 10,
                  justifyContent: 'space-evenly',
                }}>
                <Image
                  source={require('../images/copy.png')}
                  style={styles.iconImage}
                />
                <View style={{flex: 1, marginLeft: 10}}>
                  <Text style={{fontWeight: '700', color: 'black'}}>
                    Copy Authorization Link
                  </Text>
                  <Text style={{fontSize: 12, color: 'black'}}>
                    Copy authorization link & you can send it to customer from
                    anywhere
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
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
    backgroundColor: '#EFEFEF',
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
  iconImage: {
    width: 30,
    height: 30,
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
  accidentCarNumberContainer: {
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: Colors.red,
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
