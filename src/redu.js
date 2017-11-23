

const initState = {
   number : 1
}
const incrDcrReducer = (state = initState, action) =>{
    switch(action.type) {       
        default :
            return {...state}
    }
}

export default incrDcrReducer;