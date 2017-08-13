import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory} from 'react-router';
import routes from './routes';
import firebase from 'firebase';
import CountdownPage from './components/prelaunch/CountdownPage';
import {StyleRoot} from 'radium';

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
var mode = 'dev';

ReactDOM.render (
    <StyleRoot style = {rootStyle}>
    {
      function prelaunch(){
        if(new Date().getMonth() + 1 == 8 && new Date().getDate() == 28){
          mode = "go time ayy lets get it";
        }
        if(mode == 'dev'){
          return <CountdownPage/>;
        }
        else{
          return <Router history = {browserHistory} routes = {routes} />;
        }
      }() //instant call
    }  
      
    </StyleRoot>,
    document.getElementById('app')
);
//<Router history = {browserHistory} routes = {routes} />
let rootStyle = {
    height: "100%",
    color: "#424242",
    padding: 0,
    margin: 0,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: 1,
    position: "relative",
    cursor: "auto"
};
