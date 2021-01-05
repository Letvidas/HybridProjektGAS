import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView,Animated,Button,TouchableOpacity,Picker} from 'react-native';
import 'react-native-gesture-handler';
import { TextInput } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import gasTank from '../../models/GT';
import {showAll} from '../../store/actions/actions';
import {createOrder} from '../../store/actions/actions';
import {editGasTank} from '../../store/actions/actions'

class orderScreen extends Component {
constructor(){
  super()
  this.state = {  
    PickerValue: "",
    PickerValue1: "",
    Litrage: "",
    Price:"",
    Progress:"Inprogress",
    Pid: "",
  };
}
handleSubmit = () => {

};
pricereset (s,d){
  if (this.state.PickerValue1 == "Gas")
  {
    this.setState({Price:s})
  }
  else
  {
    this.setState({Price:d})
  }
}
changed (val) {
  this.setState({Litrage:val})
  const s = (val * 1.1).toFixed(2)
  const d = (val * 0.95).toFixed(2)
  this.pricereset(s,d)
}
butonpress =() =>{
  if (this.state.PickerValue != "" && this.state.PickerValue1 !=""&& this.state.Litrage !="" && this.state.Price !=""){
 this.props.createOrder(this.state.PickerValue,this.state.PickerValue1,this.state.Litrage,this.state.Price,this.state.Progress)
 this.props.editGasTank(this.state.PickerValue,"Unavailable",this.state.Pid)
 alert("Go to pay up "+this.state.Price+ "eur to Gas Station")
  }
};
componentDidMount() {
  this.props.showAll();
}
  render() {
    const {gasTanks} = this.props
    return (
      <View style={styles.container}>
        <Text style={[styles.title]}>ORDER</Text>
        <Text>Pick gas station</Text>
        <Picker style = {{width:'100%'}}
           selectedValue = {this.state.PickerValue}
           onValueChange = {(itemValue, itemIndex)=> this.setState({PickerValue:itemValue.gasname,Pid:itemValue.id})}>
            {gasTanks.gasTanks.map((gasTank, index) => (  
            <Picker.Item key = {gasTank.id} label = {gasTank.gasname} value = {gasTank}>
            </Picker.Item>
          ))}    
          </Picker>
          <Text>Pick gas type</Text>    
          <Picker style = {{width:'100%'}}
           selectedValue = {this.state.PickerValue1}
           onValueChange = {(itemValue, itemIndex)=> this.setState({PickerValue1:itemValue})}
        > 
            <Picker.Item label = 'Diesel' value = 'Diesel'>
            </Picker.Item> 
            <Picker.Item label = 'Gas' value = 'Gas'>
            </Picker.Item> 
          </Picker>
          <Text>Pick how many litres you want</Text>
                <TextInput 
                style = {styles.input}
                keyboardType='numeric'
                placeHolder = 'example: 1.1'
                onChangeText = {val => this.changed(val)}
                >
                </TextInput>
                <Text>Price: {this.state.Price}</Text>
                <Button style = {styles.pcs} title = "Order" onPress = {() => this.butonpress()}>
                  </Button>               
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
    input: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        marginBottom: 5,
      },
  });
  
  const mapStateToProps = (state) => {
    return {
      gasTanks: state.gasTanks,
    };
  };
  export default connect(mapStateToProps, {showAll,createOrder,editGasTank},)(orderScreen);