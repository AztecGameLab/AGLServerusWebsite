//Imports
import firebase from 'firebase';
import axios from 'axios';
const https = require('https');

//Redux Check API
export const IsLoggedIn = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        return user != null;
    });
};

export const IsAdmin = (reduxStateAccounts) => {
    return reduxStateAccounts ? reduxStateAccounts.length > 0 ? reduxStateAccounts[0].authLevel == 2 ? true : false : false : false;
};

export const IsYourProfile = ( username) => {
    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            return user.displayName == username.replace(" ", '%20');
        }
        else{
            return false;
        }
    });
};

//READ ONLY API

export const LoadProfile = async (username) => {
    let url = 'http://localhost:5000/serverus-15f25/us-central1/LoadProfile?=' + username;
    let response = await axios.get(url);
    debugger;
    return response.data;
}

export const EditProfile = async (username, uid, newDataObj) => {

    let response = await axios.post(
        'http://localhost:5000/serverus-15f25/us-central1/EditProfile',
        {
            username: username,
            uid: uid,
            newDataObj: newDataObj
        }
    );
}

export const LoadAllUsers = async (component) => {
    let response = await axios.get('http://localhost:5000/serverus-15f25/us-central1/LoadAllUserProfiles');
    if (component == "dashboard") {

        response.data.map(user => {
            var data = {
                key: user.data.uid,
                text: user.data.info.firstName + ' ' + user.data.info.lastName,
                value: user.data.info.username
            };
            temp.push(data);
            users[user.data.info.username] = user.data;
        });
        return { users, temp };
    } else if (component == "userDirectory") {
        return response.data;
    }
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
        UpdateUser(user.info.username, user);
    });
}

export const createAGLUser = async (username, email, password, newDataObj) => {
    debugger;
    let response = await axios.post(
        'http://localhost:5000/serverus-15f25/us-central1/createAGLUser',
        {
            username: username,
            email: email,
            password: password,
            newDataObj: newDataObj
        });
    debugger;
};

export const GetAllEmails = async () => {
    let response = await axios.get('http://localhost:5000/serverus-15f25/us-central1/getAllEmails');
    return Object.values(response.data);
}

export const GetArticle = (status, key) => {
    const url = 'http://localhost:5000/serverus-15f25/us-central1/GetArticle?=' + status + '&=' + key;
    return axios.get(url).then(article => {
        return article.data;
    }).catch(error => {
        return Promise.reject(error);
    });
}

export const GetAllArticles = async () => {
    let articles = await axios.get('http://localhost:5000/serverus-15f25/us-central1/GetAllArticles');
    return Object.values(articles.data);
}

export const CreatePost = (post, type, id, edit) => {
    let url;
    if (id) {
        if (edit) {
            url = 'http://localhost:5000/serverus-15f25/us-central1/CreatePost?=' + type + '&=' + id + '&=edit';
        } else {
            url = 'http://localhost:5000/serverus-15f25/us-central1/CreatePost?=' + type + '&=' + id;
        }
    } else {
        url = 'http://localhost:5000/serverus-15f25/us-central1/CreatePost?=' + type;
    }
    return axios.post(url, post).then(response => {
        return response;
    }).catch(err => {
        return Promise.reject(error);
    });
}

export const SavePost = (post, type, overwrite, key) => {
    const url = 'http://localhost:5000/serverus-15f25/us-central1/SavePost?=' + type + '&=save';
    return axios.post(url, { post, overwrite, key }).then(response => {
        return response.data;
    }).catch(err => {
        return Promise.reject(error);
    });
}

// Read Only - For Admin Panel
export const GetAllUsernames = async () => {
    let response = await axios.get(
        'https://us-central1-serverus-15f25.cloudfunctions.net/getListOfAllUsernames');
    let usernameList = Object.values(response.data);
    return usernameList;
}

//Sign Up Checks
export const UsernameTakenCheck = async (username) => {
    let response = await axios.post(
        'http://us-central1-serverus-15f25.cloudfunctions.net/isUsernameTaken',
        { username: username });
    return response.data;
    // '{usernameTaken: true/false, profanity: true/false}' 
}

export const EmailTakenCheck = async (email) => {
    debugger;
    let response = await axios.post(
        'http://localhost:5000/serverus-15f25/us-central1/isEmailTaken',
        { email: email });

    return response.data;
    //'{emailTaken: true/false, validEmail: true/false}'
}

export const RedIdTakenCheck = async (redId) => {

    let response = await axios.post(
        'http://us-central1-serverus-15f25.cloudfunctions.net/isRedIdTaken',
        { redId: redId });

    return response.data;
    //Either '{redIdTaken: true/false}'
}

export const AGLEncryption = async (password) => {
    let response = await axios.post(
        'http://localhost:5000/serverus-15f25/us-central1/AGLEncryption',
        { password: password });
    return response.data;
    //encrypted resposne
}

export const AGLRencryption = async (username, password) => {

    return await axios.post(
        'http://localhost:5000/serverus-15f25/us-central1/AGLRencryption',
        {
            username: username,
            password: password
        });

    return response;
}

export const isUserRencrypted = async (username) => {
    debugger;
    let response = await axios.post(
        'http://localhost:5000/serverus-15f25/us-central1/isUserRencrypted',
        {
            username: username
        });

    return response.data; //true/false
}

export const InboxWatch = async (username) => {
    let url = 'http://localhost:5000/serverus-15f25/us-central1/GetInboxData?=' + username;
    let inboxResponse = await axios.get(url);
    return inboxResponse.data;
}

export const SendFriendRequest = async (myInfo, friendInfo) => {

    axios.post('http://localhost:5000/serverus-15f25/us-central1/SendFriendRequest',
        {
            myInfo: myInfo,
            friendInfo: friendInfo
        })
        .then(response => {
            console.log("Success! ", response.data);
        })
        .catch(err => {
            console.log(err);
        });
}

export const AcceptFriendRequest = async () => {

}

export const usernameToEmail = async (username) => {
    let response = await axios.post(
        'http://localhost:5000/serverus-15f25/us-central1/usernameToEmail',
        {username: username});
        debugger;
        return response.data;
}

export const sendPasswordReset = async(email) => {
    let response = await axios.post(
        'http://localhost:5000/serverus-15f25/us-central1/sendPasswordReset',
        {email: email});
        debugger;
        return response.data;
}

export const resetRequestExists = async(hash) => {
    debugger;
    let response = await axios.post(
        'http://localhost:5000/serverus-15f25/us-central1/resetRequestExists',
        {hash: hash});
    return response.data;
}

export const resetPassword = async(securityCode, hash, newPassword) => {
    debugger;
    let response = await axios.post(
        'http://localhost:5000/serverus-15f25/us-central1/resetPassword',
    {
        securityCode: securityCode,
        hash:hash,
        newPassword:newPassword
    });
    debugger;
    return response.data;
}

//update all users value
//edit user
//add new field to all users

// 
// https.get('http://localhost:5000/serverus-15f25/us-central1/getListOfAllUsernames', (response) => {
//         
//     response.on('data', (chunk) => {
//         
//         let usernameJSON = new TextDecoder('utf-8').decode(chunk);
//         let usernameList = Object.values(JSON.parse(usernameList));
//         return usernameList;
//     });
// });