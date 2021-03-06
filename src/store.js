import { applyMiddleware, createStore, compose } from 'redux';
import { offline,createOfflineStore} from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
import reducer from './reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {AsyncStorage} from 'react-native';
import batch from 'redux-offline/lib/defaults/batch';
import retry from 'redux-offline/lib/defaults/retry';
import discard from 'redux-offline/lib/defaults/discard';
import {persistStore, autoRehydrate} from 'redux-persist';
import { createNetworkMiddleware } from 'react-native-offline';




const myConfig = {
    ...offlineConfig,
    effect: (effect, action) => sendData(effect, action),
    persistOptions: {
        storage: AsyncStorage,
        blacklist : ['nav']
    },
};

const networkMiddleware = createNetworkMiddleware();


const configureStore = () => {
    const store = createStore(
        reducer,
        compose(
            applyMiddleware(thunk, logger),
            offline(myConfig),
            autoRehydrate()
        )
    );

    persistStore(store, {storage: AsyncStorage,blacklist:['nav']});
    return store;
}


function sendData (effect, action) {
    console.log(action,"config")
    const promise = new Promise((resolve, reject) => {
        let options = {
            method :"post" //effect.method
        };
        
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.body = effect.body;
        // console.log(effect,"config")
        fetch("https://j5lm2nusvi.execute-api.us-east-1.amazonaws.com/dev/", options)
        .then((response) => {
            console.log(response)
            const value = JSON.parse(response._bodyInit).value
            // console.log("value",value)
           resolve({number:value})
        }).catch((message)=> {
            reject(message);
        }); 
    });
    return promise;
}

function retryConf (action, retries) {
    if (retries < 3) {
        return 1000 * retries;
    } else {
        return null
    }
}

export default configureStore;
