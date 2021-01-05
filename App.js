import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import showScreen from './src/screens/mainscreen'
import gasScreen from './src/screens/gasScreen';
import { Provider } from 'react-redux';
import combineReducers from './store/reducers/index';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {addGas} from './store/actions/actions';
import scanScreen from './src/screens/qrScreen';
import orderScreen from './src/screens/orderScreen';
import { tan } from 'react-native-reanimated';



const Tab = createBottomTabNavigator();

const store = createStore(combineReducers, applyMiddleware(ReduxThunk));
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
            initialRoute="SHOW"
            tabBarOptions={{activeTintColor: '#deaf04'}}>
              <Tab.Screen name="SHOW" component={showScreen}/>
              <Tab.Screen name="QR Scan" component={scanScreen} />
              <Tab.Screen name="Order" component={orderScreen}/>
          </Tab.Navigator>
        </NavigationContainer>
        </Provider>
    );
  }
}
export default App;
