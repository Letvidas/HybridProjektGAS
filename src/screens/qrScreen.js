'use strict';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addGas} from '../../store/actions/actions';
import 'react-native-gesture-handler';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { set } from 'react-native-reanimated';

class ScanScreen extends Component {

  state  = {
      qr: "Here you will find name of wanted Gas Station",
  }
  onSuccess = e=> {
      this.setState ({qr: e.data})
  }

  splitAndGive = e=> {

  }


  render() {
    return (
      <View>
      <QRCodeScanner
        onRead={this.onSuccess}
        ref={(node) => { this.scanner = node }}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            HI! scan the QR code.
          </Text>
        }
        bottomContent={<View>
            <Text style= {styles.pcs}>Info:{"\n"}{this.state.qr}</Text>
       <TouchableOpacity
          style={styles.pcs}
          onPress={()=>this.scanner.reactivate() + 
            this.setState ({qr: "Please Scan again"})
        }
          >
              <Text>Scan Again</Text>
          </TouchableOpacity>
          </View>
        }
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
 button: {
     alignItems: "center",
     backgroundColor: "#DDDDDD",
     padding: 10
    },
    TextStyle: {
      marginTop: 50,
      alignItems: "center",
      alignContent: "center",
      padding: 10
    },
    pcs: {
      padding: 20,
      backgroundColor: '#696969',
      borderColor: '#090909',
      borderWidth: 5,
      borderRadius: 10,
      marginBottom: 5,
    },

});
const mapStateToProps = (state) => {
  return {
    gasTanks: state.gasTanks,
  };
};
export default connect(mapStateToProps, {addGas})(ScanScreen);