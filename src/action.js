export const INCREMENTING = 'INCREMENTING';
export const DECREMENTING = 'DECREMENTING';
export const INCR_SUCCESS = 'INCR_SUCCESS'; 
export const INCR_FAIL = 'INCR_FAIL';  
export const DECR_SUCCESS = 'DECR_SUCCESS';
export const DECR_FAIL = 'DECR_FAIL';
import operationService from './service'

export const incrementAction = (number) => {
     async function thunk(dispatch) {
       try {
           dispatch({type:INCREMENTING});
           const result =await operationService.doOperation({'type':'increment',number})
           const value = JSON.parse(result._bodyInit).value
           dispatch({type:INCR_SUCCESS,payload:{number:value}});
       } catch (error) {
            dispatch({type:INCR_FAIL})
       }
     };

     thunk.interceptInOffline = true;
     return thunk; 
};

export const decrementAction = (number) => {
    async function thunk(dispatch) {
      try {
          dispatch({type:DECREMENTING});
          const result = await operationService.doOperation({type:'decrement',number})
          const value = JSON.parse(result._bodyInit).value
          dispatch({type:DECR_SUCCESS,payload:{number:value}});
      } catch (error) {
          dispatch({type: DECR_FAIL})
      }
    };
  
    thunk.interceptInOffline = true; 
    thunk.meta = {
        retry: true, 
        // dismiss: []
    }
    return thunk; 
};

// export  const decrementAction = () =>{
//     const effectReconciler=()=>{
//         return operationService.doOperation({type:'decrement'});
//     }

//     const commit = {
//          type:DECR_SUCCESS
//     }

//     const rollback = {
//         type: DECR_FAIL
//     }

//     return {
//         type: DECREMENTING,
//         meta: {
//             offline: {
//                 effect: effectReconciler(),
//                 commit,
//                 rollback
//             }
//         }
//     }
// }