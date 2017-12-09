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

// export const decrementAction = (number) => {
//     async function thunk(dispatch) {
//       try {
//           dispatch({type:DECREMENTING});
//           const result = await operationService.doOperation({type:'decrement',number})
//           const value = JSON.parse(result._bodyInit).value
//           dispatch({type:DECR_SUCCESS,payload:{number:value}});
//       } catch (error) {
//           dispatch({type: DECR_FAIL})
//       }
//     };
  
//     thunk.interceptInOffline = true; 
//     thunk.meta = {
//         retry: true, 
//         // dismiss: []
//     }
//     return thunk; 
// };

const effectReconciler= async (body)=>{
    // return config = {
    //     effect:(effect, action) => {
                operationService.doOperation(body)
                .then((result)=>{
                    const value = JSON.parse(result._bodyInit).value
                    console.log("value",value)
                    return dispatch(complete(value))
                })                                      
                .catch((e)=>{
                    console.log("error",e)
                    return dispatch(rollback(error));
                });
           
        // }
    // }
    // return config.effect(metadata.effect, action).then(function (result) {
    //     console.log('config.effect result:', result);
    //     return dispatch(complete(metadata.commit, true, result));
    //   }).catch(function (error) {
    //     console.error('config.effect gave error:', error);
    //     // discard
    //     if (config.discard(error, action, retries)) {
    //       console.log('Discarding action', action.type);
    //       return dispatch(complete(metadata.rollback, false, error));
    //     }
}


export  const decrementAction = (number) =>{
    return async (dispatch)=>{
        dispatch({type: DECREMENTING,
            
                meta: {
                    offline: {
                        effect:{body:JSON.stringify({type:"decrement",number})},     //effectReconciler({type:"decrement",number}),
                        commit: { type:DECR_SUCCESS,meta:{number:number}},
                        rollback:{type:DECR_FAIL,meta:{}}
                    }
                }
            }
        )
    }
}



















// const effectReconciler = async (body) =>{
//     config : {
//         effect:async  (effect, action) => {
//             const promise = new Promise((resolve, reject) => {
                            
//                 operationService.doOperation({type:'decrement',number})
//                 .then((result)=>{
//                     const value = JSON.parse(result._bodyInit).value
//                     resolve(value); 
//                 })                                      
//                 .catch(e=>reject(e));
//             });
//             return promise;
//         }
//     }
// }