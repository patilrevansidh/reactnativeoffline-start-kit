import React from 'react';
import { Provider, connect } from 'react-redux';
import configureStore from './store';
import App from './App';
import { withNetworkConnectivity } from 'react-native-offline';

const store = configureStore();

let Init = ()=>{
    return(
        <App/>        
    );
}
Init = withNetworkConnectivity({
    withRedux: true // It won't inject isConnected as a prop in this case
})(Init);
  
const OfflineTry = () => (
    <Provider store={store}>
        <Init/>
    </Provider>
);

export default OfflineTry;