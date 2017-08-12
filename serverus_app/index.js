import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory} from 'react-router';
import routes from './routes';
import firebase from 'firebase';
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

const storage = firebase.storage();

ReactDOM.render (
    <StyleRoot style = {rootStyle}>
      <Router history = {browserHistory} routes = {routes} />
    </StyleRoot>,
    document.getElementById('app')
);

let rootStyle = {
    background: "#f7f7f7",
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
