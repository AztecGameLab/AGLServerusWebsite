//Imports
import firebase from 'firebase';
import axios from 'axios';

export const IsLoggedIn = (reduxStateAccounts) => {
    return reduxStateAccounts ? reduxStateAccounts.length > 0 ? true : false : false;
};

export const IsAdmin = (reduxStateAccounts) => {
    return reduxStateAccounts ? reduxStateAccounts.length > 0 ? reduxStateAccounts[0].info.authLevel == 2 ? true : false : false : false;
};

export const IsYourProfile = (reduxStateAccounts, username) => {
    return reduxStateAccounts ? reduxStateAccounts.length > 0 ? reduxStateAccounts[0].info.username == username ? true : false : false : false;
};

export const LoadUser = async (username, filters = []) => {
    let userRef = firebase.database().ref('accounts/' + username);
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

export const UpdateUser = async (username, data) => {
    var accountRef = firebase.storage().ref('accounts/' + username + '.json');
    var yourFile = new Blob([JSON.stringify(data)], { type: 'application/json' });
    accountRef.put(yourFile).then(async () => {
        let url = await accountRef.getDownloadURL();
        firebase.database().ref('accounts/' + username).set({
            data: url
        });
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