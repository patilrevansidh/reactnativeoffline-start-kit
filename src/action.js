export const INCREMENTING = 'INCREMENTING';
export const DECREMENTING = 'DECREMENTING';
export const INCR_SUCCESS = 'INCR_SUCCESS'; 
export const INCR_FAIL = 'INCR_FAIL';  
export const DECR_SUCCESS = 'DECR_SUCCESS';
export const DECR_FAIL = 'DECR_FAIL';
import operationService from './service'

export const incrementAction = () => {
    async function thunk(dispatch) {
      try {
          dispatch({type:INCREMENTING});
          const body = {'type':'increment'}
          const result =await operationService.doOperation({'type':'increment'})
          console.log(result,"incremented")
          const value = JSON.parse(result._bodyInit).value
          dispatch({type:INCR_SUCCESS,payload:{number:value}});
      } catch (error) {
          dispatch({type:INCR_FAIL})
      }
    };
  
    thunk.interceptInOffline = true; // This is the important part
    return thunk; // Return it afterwards
};

export const decrementAction = () => {
    async function thunk(dispatch) {
      try {
          dispatch({type:DECREMENTING});
          const result = await operationService.doOperation({type:'decrement'})
          console.log(result,"incremented")
          const value = JSON.parse(result._bodyInit).value
          dispatch({type:DECR_SUCCESS,payload:{number:value}});
      } catch (error) {
          dispatch({type: DECR_FAIL})
      }
    };
  
    thunk.interceptInOffline = true; 
    thunk.meta = {
        retry: true, // By passing true, your thunk will be enqueued on offline mode
        // dismiss: []
    }
    return thunk; // Return it afterwards
};
