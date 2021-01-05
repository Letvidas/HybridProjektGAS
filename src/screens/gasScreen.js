import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView,Animated,TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {addGas} from '../../store/actions/actions';

class gasScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gasname: 'Gas6',
      availability: 'Available',
    };
  }
handleSubmit = () => {
  this.props.addGas(this.state.gasname, this.state.availability);
};
  render() {
    return (
        <View style={styles.container}>
        <Text style = {styles.title}>Pick Gastank</Text>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity onPress={this.handleSubmit}>
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>INSERT</Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    pcsContainer: {
      borderTopWidth: 3,
      borderTopColor: '#ddd',
      flex: 1,
    },
    title: {
      paddingTop: 30,
      paddingBottom: 20,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    addButton: {
      width: 120,
      height: 60,
      backgroundColor: '#bd10e0',
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    addButtonContainer: {
      flex: 4,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  });
  const mapStateToProps = (state) => {
    return {
      gasTanks: state.gasTanks,
    };
  };
  export default connect(mapStateToProps, {addGas})(gasScreen);