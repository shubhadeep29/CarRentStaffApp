import React from 'react';
import {StyleSheet, View, Platform, SafeAreaView} from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";
import {WebView} from 'react-native-webview';

// import Button from "../components/Button";
import * as Colors from '../utils/Colors';
import {Button} from 'react-native-paper';

function PdfViewer({navigation, route}) {
  console.log('image ----', route.params);

  const PdfReader = ({url: uri}) => {
    let urlNew = `https://docs.google.com/gview?embedded=true&url=${uri}`;
    console.log('url -----', urlNew);
    return (
      <WebView
        javaScriptEnabled={true}
        style={{flex: 1, backgroundColor: 'white'}}
        source={{uri: urlNew}}
        domStorageEnabled={true}
        decelerationRate="normal"
        automaticallyAdjustContentInsets={false}
        startInLoadingState={true}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // backgroundColor: colors.primary,
      }}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingTop: 40,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}>
            <PdfReader url={route?.params} />
          </View>
          <View style={{paddingTop: 10}}>
            <Button
              color={Colors.textColor1}
              mode="contained"
              uppercase={false}
              style={{marginHorizontal: 16, borderRadius: 24}}
              contentStyle={{height: 44}}
              onPress={() => navigation.goBack()}>
              Back
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    height: 300,
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    marginBottom: 30,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});

export default PdfViewer;
