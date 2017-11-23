export const INCREMENTING = 'INCREMENTING';
export const DECREMENTING = 'DECREMENTING';
export const INCR_SUCCESS = 'INCR_SUCCESS'; 
export const INCR_FAIL = 'INCR_FAIL';  
export const DECR_SUCCESS = 'DECR_SUCCESS';
export const DECR_FAIL = 'DECR_FAIL';

export const incrementAction = () => {
    async function thunk(dispatch) {
      try {
          dispatch({type:INCREMENTING});
          await increment();
          dispatch({type:INCR_SUCCESS});
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
          await increment();
          dispatch({type: DECR_SUCCESS});
      } catch (error) {
          dispatch({type: DECR_FAIL})
      }
    };
  
    thunk.interceptInOffline = true; 
    thunk.meta = {
        retry: boolean, // By passing true, your thunk will be enqueued on offline mode
        // dismiss: []
    }
    return thunk; // Return it afterwards
};
