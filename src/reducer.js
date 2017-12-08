import { combineReducers } from 'redux';
import redu from './redu';
import { reducer as network } from 'react-native-offline';


const appReducer = combineReducers({
    redu,
    network
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {  
    return appReducer(state, action);
}

export default rootReducer;