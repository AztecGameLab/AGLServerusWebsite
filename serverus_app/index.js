import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import firebase from 'firebase';
import { StyleRoot } from 'radium';
import configureStore from './components/redux/store/configureStore';
import {Provider} from 'react-redux';
import CountdownPage from './components/common/prelaunch/CountdownPage';


const config = {
  apiKey: "AIzaSyD8wj5nBOAHoGGsKqqQo1lmvMRRIcWYaMc",
  authDomain: "serverus-15f25.firebaseapp.com",
  databaseURL: "https://serverus-15f25.firebaseio.com",
  projectId: "serverus-15f25",
  storageBucket: "serverus-15f25.appspot.com",
  messagingSenderId: "718720782324"
};
firebase.initializeApp(config);

//UNTIL AUGUST 28
let mode = 'lol';

const store = configureStore(); //can pass initial state (overrides default params in reducer)

ReactDOM.render(
  <Provider store = {store}>
    <StyleRoot style={rootStyle}>
      {
        function prelaunch(){
          if(new Date().getMonth() + 1 >= 8 && new Date().getDate() >= 28 && new Date().getFullYear >= 2017){
            mode = "Ayy lmao";
          }
          if(mode == 'dev'){
            return <CountdownPage/>;
          }else{
            return <Router history={browserHistory} routes={routes} />;
          }
        }()
      }
    </StyleRoot>
  </Provider>,
  document.getElementById('app')
);

let rootStyle = {
  background: "#f7f7f7",
  height: '100%',
  color: "#424242",
  padding: 0,
  margin: 0,
  fontFamily: "Roboto, Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif",
  fontWeight: 400,
  fontStyle: "normal",
  lineHeight: 1,
  position: "relative",
  cursor: "auto"
};
