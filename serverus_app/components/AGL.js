//Imports
import firebase from 'firebase';
import axios from 'axios';

export const IsLoggedIn = (reduxStateAccounts) => {
    return reduxStateAccounts ? reduxStateAccounts.length > 0 ? true : false : false;
};

export const IsAdmin = (reduxStateAccounts) => {
    return reduxStateAccounts ? reduxStateAccounts.length > 0 ? reduxStateAccounts[0].info.authLevel == 2 ? true: false : false : false;
};

export const IsYourProfile = (reduxStateAccounts, username) => {
    return reduxStateAccounts ? reduxStateAccounts.length > 0 ? reduxStateAccounts[0].info.username == username ? true: false : false : false;
};

export const LoadUser = async (username, filters = []) => {
    let userRef = firebase.database().ref('accounts/' + username);
    const firebaseUrl = await userRef.once('value');
    const response = await axios.get(firebaseUrl.val().data);
    return response.data;
}

export const LoadAllUsers = async () => {
    let usersRef = firebase.database().ref('accounts');
    const userUrls = await usersRef.once('value');

}

export const EditUser = async (username, newDataObj) => {
    let userRef = firebase.storage().ref('accounts/' + username + '.json');
    const currentData = await axios.get(firebaseUrl.val().data);
    debugger;
    let mergedObj = Object.assign({}, currentData.data, newDataObj);
    var newFile = new blob([JSON.stringify(mergedObj)], {type: 'application/json'});
    await accountRef.put(newFile);

}

export const GetAllEmails = async () => {
    let emailPathRef = firebase.database().ref('takenEmails/');
    let emailList = await emailPathRef.once('value'); 
    debugger;
    return Object.values(emailList.val());
}

export const GetAllRedIds = async () => {
    let redIdPathRef = firebase.database().ref('takenRedIds/');
    let redIdList = await redIdPathRef.once('value');
    debugger;
    return Object.values(redIdList.val());
}

export const GetAllUsernames = async () => {
    let usernamePathRef = firebase.database().ref('takenUsernames/');
    let usernameList = await usernamePathRef.once('value');
    debugger;
    return Object.values(usernameList.val());
}

//update all users value
//edit user
//add new field to all users