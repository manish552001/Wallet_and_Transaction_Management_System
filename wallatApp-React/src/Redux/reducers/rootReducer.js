import {combineReducers} from 'redux'
import errorReducer from '..//reducers/errorReducer';
import walletReducer from '../reducers/walletReducer';
import transactionReducer from './transactionReducer';

export default combineReducers({
    errors:errorReducer,
    wallet:walletReducer,
    transaction : transactionReducer
});