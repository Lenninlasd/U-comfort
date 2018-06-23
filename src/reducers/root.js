import { combineReducers } from 'redux';
import * as reducers from './prepareData.js';
import * as sizeReducers from './size.js';

export default combineReducers(
    Object.assign({}, reducers, sizeReducers)
);
