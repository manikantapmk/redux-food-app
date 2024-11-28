import { combineReducers } from 'redux';
import { cartReducer } from './reducer';

const rootRed = combineReducers({
    cartReducer
})

export default rootRed;