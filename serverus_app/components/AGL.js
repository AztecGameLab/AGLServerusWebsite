//Imports
import firebase from 'firebase';
import axios from 'axios';
const https = require('https');

//Redux Check API
export const IsLoggedIn = (reduxStateAccounts) => {
    return reduxStateAccounts ? reduxStateAccounts.length > 0 ? true : false : false;
};

export const IsAdmin = (reduxStateAccounts) => {
    return reduxStateAccounts ? reduxStateAccounts.length > 0 ? reduxStateAccounts[0].info.authLevel == 2 ? true : false : false : false;
};

export const IsYourProfile = (reduxStateAccounts, username) => {
    return reduxStateAccounts ? reduxStateAccounts.length > 0 ? reduxStateAccounts[0].info.username == username ? true : false : false : false;
};

//READ ONLY API
export const LoadUser = async (username) => {
    let postBody = JSON.stringify({
        username: username
    });
    let userRef = firebase.database().ref('accounts/' + username);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          debugger;
        } else {
          // No user is signed in.
        }
      });
    debugger;
    const firebaseUrl = await userRef.once('value');
    const response = await axios.get(firebaseUrl.val().data);
    return response.data;
}

export const EditUser = async (username, newDataObj) => {
    let userRef = firebase.storage().ref('accounts/' + username + '.json');
    debugger;
    const currentData = await axios.get(firebaseUrl.val().data);
    let mergedObj = Object.assign({}, currentData.data, newDataObj);
    var newFile = new blob([JSON.stringify(mergedObj)], {type: 'application/json'});
    await accountRef.put(newFile);
}

export const LoadAllUsers = async () => {
    let accounts = firebase.database().ref('accounts');
    const firebaseUrls = await accounts.once('value');
    let promises = [];
    Object.values(firebaseUrls.val()).forEach(url => {
        promises.push(axios.get(url.data));
    });
    let response = await Promise.all(promises);
    let temp = [];
    let users = {}
    response.map(user => {
        var data = {
            key: user.data.uid,
            text: user.data.info.firstName + ' ' + user.data.info.lastName,
            value: user.data.info.username
        };
        temp.push(data);
        users[user.data.info.username] = user.data;
    });
    return { users, temp };
}

export const UpdateUser = async (userData) => {
    let storageAcc = firebase.storage().ref('accounts/' + userData.info.username + '.json');
    let userFile = new Blob([JSON.stringify(userData)], { type: 'application/json' });
    await storageAcc.put(userFile);
    let url = await storageAcc.getDownloadURL();
    firebase.database().ref('accounts/' + userData.info.username).set({
        data: url
    });
}

export const UpdateAllUsers = async (accounts) => {
    Object.keys(accounts).map(user => {
        debugger;
        UpdateUser(user.info.username, user);
    });
}

export const GetAllEmails = async () => {
    let emailPathRef = firebase.database().ref('takenEmails/');
    let emailList = await emailPathRef.once('value');
    debugger;
    let response = await axios.post (
        'http://localhost:5000/serverus-15f25/us-central1/AGLEncryption', 
        {password: password});
    debugger;
    return response.data;
    //encrypted resposne
}

// Read Only - For Admin Panel
export const GetAllUsernames = async () => {
    debugger;
    let response = await axios.get(
        'http://localhost:5000/serverus-15f25/us-central1/getListOfAllUsernames');
    debugger;
    let usernameList = Object.values(response.data);
    return usernameList;
}

//Sign Up Checks
export const UsernameTakenCheck = async (username) => {
    debugger;
    let response = await axios.post(
        'http://localhost:5000/serverus-15f25/us-central1/isUsernameTaken', 
        {username: username});
    debugger;
    return response.data;
    // '{usernameTaken: true/false, profanity: true/false}' 
}

export const EmailTakenCheck = async (email) => {
    debugger;
    let response = await axios.post(
        'http://localhost:5000/serverus-15f25/us-central1/isEmailTaken', 
        {email: email});
    debugger;
    return response.data;
    //'{emailTaken: true/false, validEmail: true/false}'
}

export const RedIdTakenCheck = async (redId) => {
    debugger;
    let response = await axios.post(
        'http://localhost:5000/serverus-15f25/us-central1/isRedIdTaken', 
        {redId: redId});
    debugger;
    return response.data;
    //Either '{redIdTaken: true/false}'
}

export const AGLEncryption = async (password) => {
    debugger;
    let response = await axios.post (
        'http://localhost:5000/serverus-15f25/us-central1/AGLEncryption', 
        {password: password});
    debugger;
    return response.data;
    //encrypted resposne
}

//update all users value
//edit user
//add new field to all users

// debugger;
// https.get('http://localhost:5000/serverus-15f25/us-central1/getListOfAllUsernames', (response) => {
//     debugger;    
//     response.on('data', (chunk) => {
//         debugger;
//         let usernameJSON = new TextDecoder('utf-8').decode(chunk);
//         let usernameList = Object.values(JSON.parse(usernameList));
//         return usernameList;
//     });
// });