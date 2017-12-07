
import {
    DECREMENTING, DECR_FAIL, DECR_SUCCESS,
    INCREMENTING, INCR_FAIL, INCR_SUCCESS
    } from './action';

const initState = {
   number : 1
}
const incrDcrReducer = (state = initState, action) =>{
    switch(action.type) {       
        // case "persist/REHYDRATE" :
        // return {...state,...action.payload.offline}
        case INCREMENTING :
            return {...state}
        case INCR_SUCCESS :
            return {...state,number : action.payload.number};
        case INCR_FAIL :
            return {...state}
        case DECREMENTING :
            return {...state}
        case DECR_SUCCESS :
            return {...state,number : action.payload.number};
        case DECR_FAIL : 
            return {...state}
        default :
            return {...state}
    }
}

export default incrDcrReducer;