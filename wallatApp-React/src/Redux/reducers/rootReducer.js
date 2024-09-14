import {combineReducers} from 'redux'
import errorReducer from '..//reducers/errorReducer';
import walletReducer from '../reducers/walletReducer';

export default combineReducers({
    errors:errorReducer,
    wallet:walletReducer
});