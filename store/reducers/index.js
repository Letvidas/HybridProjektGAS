import {gasReducer} from './gasReducer';
import {combineReducers} from 'redux';

export default combineReducers({
  gasTanks: gasReducer,
});