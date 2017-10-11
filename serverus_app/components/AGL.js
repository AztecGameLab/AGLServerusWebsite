//Imports
import firebase from 'firebase';
import axios from 'axios';
const https = require('https');

//Redux Check API
export const IsLoggedIn = (reduxStateAccounts) => {

    return reduxStateAccounts ? reduxStateAccounts.length > 0 ? reduxStateAccounts[0].username != null ? true : false : false : false;
};

// export const IsAdmin = (reduxStateAccounts) => {
//     return reduxStateAccounts ? reduxStateAccounts.length > 0 ? reduxStateAccounts[0].authLevel == 2 ? true : false : false : false;
// };

export const IsYourProfile = (reduxStateAccounts, username) => {

    return reduxStateAccounts ? reduxStateAccounts.length > 0 ? reduxStateAccounts[0].username == username ? true : false : false : false;
}

/*

               _             _          ______                    _    _                    
     /\       | |           (_)        |  ____|                  | |  (_)                   
    /  \    __| | _ __ ___   _  _ __   | |__  _   _  _ __    ___ | |_  _   ___   _ __   ___ 
   / /\ \  / _` || '_ ` _ \ | || '_ \  |  __|| | | || '_ \  / __|| __|| | / _ \ | '_ \ / __|
  / ____ \| (_| || | | | | || || | | | | |   | |_| || | | || (__ | |_ | || (_) || | | |\__ \
 /_/    \_\\__,_||_| |_| |_||_||_| |_| |_|    \__,_||_| |_| \___| \__||_| \___/ |_| |_||___/
                                                                                            
 */

export const IsAdmin = (id) => {
    let url = 'https://us-central1-serverus-15f25.cloudfunctions.net/admin-IsAdmin?id=' + id;
    return axios.get(url).then(response => {
        return response.data;
        debugger;
    }).catch(error => {
        return Promise.reject(error);
    });
}
export const GetAllEmails = async () => {
    let response = await axios.get('https://us-central1-serverus-15f25.cloudfunctions.net/admin-getAllEmails');
    return Object.values(response.data);
}

export const GetAllUsernames = async () => {
    let response = await axios.get(
        'https://us-central1-serverus-15f25.cloudfunctions.net/admin-getListOfAllUsernames');
    let usernameList = Object.values(response.data);
    return usernameList;
}



/*
     /\          | |  (_)      | |           
    /  \    _ __ | |_  _   ___ | |  ___  ___ 
   / /\ \  | '__|| __|| | / __|| | / _ \/ __|
  / ____ \ | |   | |_ | || (__ | ||  __/\__ \
 /_/    \_\|_|    \__||_| \___||_| \___||___/
                                                 */
export const GetArticle = (status, key) => {
    const url = 'https://us-central1-serverus-15f25.cloudfunctions.net/articles-GetArticle?=' + status + '&=' + key;
    return axios.get(url).then(article => {
        return article.data;
    }).catch(error => {
        return Promise.reject(error);
    });
}

export const GetAllArticles = async () => {
    let articles = await axios.get('https://us-central1-serverus-15f25.cloudfunctions.net/articles-GetAllArticles');
    return Object.values(articles.data);
}

export const CreatePost = (post, type, id, edit) => {
    let url;
    if (id) {
        if (edit) {
            url = 'https://us-central1-serverus-15f25.cloudfunctions.net/articles-CreatePost?=' + type + '&=' + id + '&=edit';
        } else {
            url = 'https://us-central1-serverus-15f25.cloudfunctions.net/articles-CreatePost?=' + type + '&=' + id;
        }
    } else {
        url = 'https://us-central1-serverus-15f25.cloudfunctions.net/articles-CreatePost?=' + type;
    }
    return axios.post(url, post).then(response => {
        return response;
    }).catch(err => {
        return Promise.reject(error);
    });
}


export const SavePost = (post, type, overwrite, key) => {
    const url = 'https://us-central1-serverus-15f25.cloudfunctions.net/articles-SavePost?=' + type + '&=save';
    return axios.post(url, { post, overwrite, key }).then(response => {
        return response.data;
    }).catch(err => {
        return Promise.reject(error);
    });
}


/*

   _____  _                    _  _                            
  / ____|| |                  | |(_)                           
 | |     | |  ___   _   _   __| | _  _ __    __ _  _ __  _   _ 
 | |     | | / _ \ | | | | / _` || || '_ \  / _` || '__|| | | |
 | |____ | || (_) || |_| || (_| || || | | || (_| || |   | |_| |
  \_____||_| \___/  \__,_| \__,_||_||_| |_| \__,_||_|    \__, |
                                                          __/ |
                                                         |___/  */
export const CloudinaryUpload = async (image) => {
    var reader = new FileReader();
    reader.readAsDataURL(image);
    let imgUrl = await new Promise((resolve, reject) => {
        reader.onload = () => {
            resolve(reader.result);
        }
    });
    return axios.post('https://us-central1-serverus-15f25.cloudfunctions.net/cloudinary-UploadToCloudinary', { imgUrl }, {
        headers: {
            "hostname": "api.cloudinary.com",
            "host" : "api.cloudinary.com",
            family: 4,
            port: 443,
        }
    }).then(response => {
        return response.data;
    }).catch(error => {
        return Promise.reject(error);
    });
}

export const CloudinaryDelete = (public_id) => {
    return axios.post('https://us-central1-serverus-15f25.cloudfunctions.net/cloudinary-DeleteFromCloudinary', { public_id }).then(response => {
        return response.data;
    }).catch(error => {
        return Promise.reject(error);
    });
}

/*
  _____  _                 _    _          ______                    _    _                    
 / ____|(_)               | |  | |        |  ____|                  | |  (_)                   
| (___   _   __ _  _ __   | |  | | _ __   | |__  _   _  _ __    ___ | |_  _   ___   _ __   ___ 
 \___ \ | | / _` || '_ \  | |  | || '_ \  |  __|| | | || '_ \  / __|| __|| | / _ \ | '_ \ / __|
 ____) || || (_| || | | | | |__| || |_) | | |   | |_| || | | || (__ | |_ | || (_) || | | |\__ \
|_____/ |_| \__, ||_| |_|  \____/ | .__/  |_|    \__,_||_| |_| \___| \__||_| \___/ |_| |_||___/
             __/ |                | |                                                          
            |___/                 |_|                                                          */


export const createAGLUser = async (username, email, password, newDataObj) => {

    let response = await axios.post(
        'https://us-central1-serverus-15f25.cloudfunctions.net/login-createAGLUser',
        {
            username: username,
            email: email,
            password: password,
            newDataObj: newDataObj
        });

};

export const UsernameTakenCheck = async (username) => {
    let response = await axios.post(
        'https://us-central1-serverus-15f25.cloudfunctions.net/login-isUsernameTaken',
        { username: username.toUpperCase() });
    return response.data;
    // '{usernameTaken: true/false, profanity: true/false}' 
}

export const EmailTakenCheck = async (email) => {

    let response = await axios.post(
        'https://us-central1-serverus-15f25.cloudfunctions.net/login-isEmailTaken',
        { email: email.toUpperCase() });

    return response.data;
    //'{emailTaken: true/false, validEmail: true/false}'
}

export const RedIdTakenCheck = async (redId) => {

    let response = await axios.post(
        'https://us-central1-serverus-15f25.cloudfunctions.net/login-isRedIdTaken',
        { redId: redId });

    return response.data;
    //Either '{redIdTaken: true/false}'
}

export const usernameToEmail = async (username) => {
    let response = await axios.post(
        'https://us-central1-serverus-15f25.cloudfunctions.net/login-usernameToEmail',
        { username: username });

    return response.data;
}


/*
______                                   _    _                 ______                    _    _                    
|  ____|                                 | |  (_)               |  ____|                  | |  (_)                   
| |__    _ __    ___  _ __  _   _  _ __  | |_  _   ___   _ __   | |__  _   _  _ __    ___ | |_  _   ___   _ __   ___ 
|  __|  | '_ \  / __|| '__|| | | || '_ \ | __|| | / _ \ | '_ \  |  __|| | | || '_ \  / __|| __|| | / _ \ | '_ \ / __|
| |____ | | | || (__ | |   | |_| || |_) || |_ | || (_) || | | | | |   | |_| || | | || (__ | |_ | || (_) || | | |\__ \
|______||_| |_| \___||_|    \__, || .__/  \__||_| \___/ |_| |_| |_|    \__,_||_| |_| \___| \__||_| \___/ |_| |_||___/
__/ || |                                                                                
|___/ |_|                                                                                */

export const AGLEncryption = async (password) => {
    let response = await axios.post(
        'https://us-central1-serverus-15f25.cloudfunctions.net/security-AGLEncryption',
        { password: password });
    return response.data;
    //encrypted resposne
}

export const AGLRencryption = async (username, password) => {

    return await axios.post(
        'https://us-central1-serverus-15f25.cloudfunctions.net/security-AGLRencryption',
        {
            username: username,
            password: password
        });

    return response;
}

export const isUserRencrypted = async (username) => {

    let response = await axios.post(
        'https://us-central1-serverus-15f25.cloudfunctions.net/security-isUserRencrypted',
        {
            username: username
        });

    return response.data; //true/false
}

export const sendPasswordReset = async (email) => {
    let response = await axios.post(
        'https://us-central1-serverus-15f25.cloudfunctions.net/security-sendPasswordReset',
        { email: email });

    return response.data;
}

export const resetRequestExists = async (hash) => {

    let response = await axios.post(
        'https://us-central1-serverus-15f25.cloudfunctions.net/security-resetRequestExists',
        { hash: hash });
    return response.data;
}

export const resetPassword = async (securityCode, hash, newPassword) => {

    let response = await axios.post(
        'https://us-central1-serverus-15f25.cloudfunctions.net/security-resetPassword',
        {
            securityCode: securityCode,
            hash: hash,
            newPassword: newPassword
        });

    return response.data;
}



/*
  _    _                    _____          _           ______                    _    _                    
  | |  | |                  |  __ \        | |         |  ____|                  | |  (_)                   
  | |  | | ___   ___  _ __  | |  | |  __ _ | |_  __ _  | |__  _   _  _ __    ___ | |_  _   ___   _ __   ___ 
  | |  | |/ __| / _ \| '__| | |  | | / _` || __|/ _` | |  __|| | | || '_ \  / __|| __|| | / _ \ | '_ \ / __|
  | |__| |\__ \|  __/| |    | |__| || (_| || |_| (_| | | |   | |_| || | | || (__ | |_ | || (_) || | | |\__ \
   \____/ |___/ \___||_|    |_____/  \__,_| \__|\__,_| |_|    \__,_||_| |_| \___| \__||_| \___/ |_| |_||___/
                                                                                                            
                                                                                                           */
export const LoadProfile = async (username) => {
    let url = 'https://us-central1-serverus-15f25.cloudfunctions.net/users-LoadProfile?=' + username;
    let response = await axios.get(url);

    return response.data;
}

export const EditProfile = async (username, uid, newDataObj) => {

    let response = await axios.post(
        'https://us-central1-serverus-15f25.cloudfunctions.net/users-EditProfile',
        {
            username: username,
            uid: uid,
            newDataObj: newDataObj
        }
    );
}

export const LoadAllUsers = async (component) => {
    let response = await axios.get('https://us-central1-serverus-15f25.cloudfunctions.net/users-LoadAllUserProfiles');
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

export const NumberOfUsers = async () => {
    let length = await axios.get('https://us-central1-serverus-15f25.cloudfunctions.net/users-NumberOfUsers');
    return length.data;
}

export const UserPagination = async (pageNumber, numOfResults) => {
    let url = 'https://us-central1-serverus-15f25.cloudfunctions.net/users-QueryUserPage?page=' + pageNumber + '&results=' + numOfResults;
    let response = await axios.get(url);
    return response.data;
}

export const InboxWatch = async (username) => {
    let url = 'https://us-central1-serverus-15f25.cloudfunctions.net/inbox-GetInboxData?=' + username;
    let inboxResponse = await axios.get(url);
    return inboxResponse.data;
}

export const SendFriendRequest = async (myInfo, friendInfo) => {

    axios.post('https://us-central1-serverus-15f25.cloudfunctions.net/inbox-SendFriendRequest',
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

// export const UpdateUser = async (userData) => {
//     let storageAcc = firebase.storage().ref('accounts/' + userData.info.username + '.json');
//     let userFile = new Blob([JSON.stringify(userData)], { type: 'application/json' });
//     await storageAcc.put(userFile);
//     let url = await storageAcc.getDownloadURL();
//     firebase.database().ref('accounts/' + userData.info.username).set({
//         data: url
//     });
// }

// export const UpdateAllUsers = async (accounts) => {
//     Object.keys(accounts).map(user => {
//         UpdateUser(user.info.username, user);
//     });
// }

// update all users value
// edit user
// add new field to all users

// https.get('https://us-central1-serverus-15f25.cloudfunctions.net/getListOfAllUsernames', (response) => {

//     response.on('data', (chunk) => {

//         let usernameJSON = new TextDecoder('utf-8').decode(chunk);
//         let usernameList = Object.values(JSON.parse(usernameList));
//         return usernameList;
//     });
// });

// export const WildCard = () => {
//     axios.post('https://us-central1-serverus-15f25.cloudfunctions.net/WildCard').then(response => {
//         return response.data;
//     }).catch(error => {
//         return Promise.reject(error);
//     });
// }