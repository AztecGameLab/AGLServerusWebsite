import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home.jsx';
import NavigationBar from './components/NavigationBar.jsx';
import * as firebase from 'firebase';

  const config = {
    apiKey: "AIzaSyD8wj5nBOAHoGGsKqqQo1lmvMRRIcWYaMc",
    authDomain: "serverus-15f25.firebaseapp.com",
    databaseURL: "https://serverus-15f25.firebaseio.com",
    projectId: "serverus-15f25",
    storageBucket: "serverus-15f25.appspot.com",
    messagingSenderId: "718720782324"
  };
  firebase.initializeApp(config);

ReactDOM.render(
    <NavigationBar />,
    document.getElementById('navbar')
);