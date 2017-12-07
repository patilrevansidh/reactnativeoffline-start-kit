import React, { Component } from 'react';
import {Platform, StyleSheet,  Text,  View,  Button, TouchableNativeFeedback} from 'react-native';
import { connect } from "react-redux";
import { withNetworkConnectivity } from 'react-native-offline';
import {decrementAction, incrementAction} from './action';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1,flexDirection:'row'}}>
            <View style={{flex:1,justifyContent:'center'}}>
                <Button
                  onPress={this.onPressDecrement.bind(this)}
                  title="Decriment"
                  color="#841584"
                />
            </View>
            <View style={{flex:1,justifyContent:'center'}}>
                <Text style={{textAlign:'center',alignItems:'center'}}>{this.props.label.number}</Text>
            </View>
            <View style={{flex:1,justifyContent:'center'}}>
                <Button
                    onPress={this.onPressIncrement.bind(this)}
                    title="Increment"
                    color="#EF4F2F"
                />
            </View>           
        </View>
      </View>
    );
  }

  onPressDecrement() {
    this.props.decrementAction()  
  }

  onPressIncrement() {
    this.props.incrementAction()
  }
}

const mapDispatchToProps = (dispatch) =>({
  incrementAction : ()=>{
      dispatch(incrementAction());
  },
  decrementAction :()=>{
    dispatch(decrementAction());
  },
  goOffline: () => {
    dispatch({ type: 'Offline/STATUS_CHANGED', payload: { online: false } })
  },
  goOnline: () => dispatch({ type: 'Offline/STATUS_CHANGED', payload: { online: true } }),
});

const mapStateToProps = (state) =>({
  label : state.redu,
  outbox: state.offline.outbox,
  isOnline: state.offline.online
});

export default connect(mapStateToProps,mapDispatchToProps)(App);