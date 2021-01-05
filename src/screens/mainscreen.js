  
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView,Animated,Button,TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {showAll} from '../../store/actions/actions';

class showScreen extends Component {
constructor(){
  super()
  this.state = {
    gasname: '',
    availability: '',
  };
}
handleSubmit = () => {

};
componentDidMount() {
  this.props.showAll();
}
  render() {
    const {gasTanks} = this.props
    return (
      <View style={styles.container}>
        <Text style={[styles.title]}>Available Gas tanks</Text>
        <ScrollView>
          {gasTanks.gasTanks.map((gasTank, index) => (
            <View style={styles.pcs} key={index}>
              <TouchableOpacity onPress={this.handleSubmit()}>
               <Text>{gasTank.gasname}</Text>
              </TouchableOpacity>
            </View>
          ))}
          </ScrollView>
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
  export default connect(mapStateToProps, {showAll})(showScreen);