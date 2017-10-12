import React, {Component} from 'react';
import {Message, Loader, Dimmer, Button } from 'semantic-ui-react';
import InboxLayout from './InboxLayout';
import { connect } from 'react-redux';
import axios from 'axios';
import { InboxWatch, AcceptFriendRequest, RejectFriendRequest } from '../AGL';

class Inbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileObject : {},
            loading: true,
            inbox: {},
            yourAccount:false,
            friendAccount: {},
            relatedMembers : []
        };
        this.acceptFriend = this.acceptFriend.bind(this);
    }


    async componentWillMount(nextProps, nextState) {
        var that = this;
        var yourUsername = this.props.match.params.username;
        let inbox = await InboxWatch();
        this.setState({
            inbox: inbox
        });
        // var userRef = firebase.database().ref('accounts/' + yourUsername);
        // userRef.on('value', function (snapshot) {
        //     if (!snapshot.val()) {
        //         alert('wat');
        //         return;
        //     } else {
        //         axios.get(snapshot.val().data).then(
        //             function (response) {
        //                 var that2 = that;
        //                 that2.setState({
        //                     profileObject: response.data,
        //                     loading: false
        //                 }, () => {  firebase.auth().onAuthStateChanged(function (user) {
        //                     if (user) {
        //                         // User is signed in.
        //                         if (user.email == that.state.profileObject.info.email) {
        //                             var keys = Object.keys(that.state.profileObject.info.inbox.friendRequests);
        //                             that.setState({
        //                                 yourAccount: true,
        //                                 relatedMembers: keys
        //                             });
        //                         } 
        //                     }
        //                     else {
        //                         that.setState({
        //                             loggedIn: false
        //                         });
        //                     }    
        //                 });
        //             });
        //             });
        //         }
        // });
    }
    
    acceptFriend(friendName) {

        AcceptFriendRequest();
        // var that = this;
        // var friendRef = firebase.database().ref('accounts/' + friendName);
        // friendRef.on('value', function (snapshot) {
        //     if (!snapshot.val()) {
        //         alert('what')
        //         return;
        //     } else {
        //         axios.get(snapshot.val().data).then(
        //             function (response) {
        //                 var friendObject = response.data;
        //                 friendObject.info.friends[that.state.profileObject.info.username] = 'accepted';
        //                 delete friendObject.info.inbox.myRequests[that.state.profileObject.info.username];
        //                 var friendRef = firebase.storage().ref('accounts/' + friendObject.info.username + '.json');
        //                 var newFriendFile = new Blob([JSON.stringify(friendObject)], { type: 'application/json' });
        //                 friendRef.put(newFriendFile).then(function () {
        //                     friendRef.getDownloadURL().then(function (url) {
        //                         firebase.database().ref('accounts/' + friendObject.username).set({
        //                             data: url
        //                         });
        //                     });
        //                 });
        //             });
        //     }});
        // var currentData = this.state.profileObject;
        // currentData.info.friends[friendName] = 'accepted';
        // delete currentData.info.inbox.friendRequests[friendName];
        // var accountRef = firebase.storage().ref('accounts/' + this.state.profileObject.info.username + '.json');                        
        // var yourFile = new Blob([JSON.stringify(currentData)], { type: 'application/json' });
        // accountRef.put(yourFile).then(function () {
        //     accountRef.getDownloadURL().then(function (url) {
        //         firebase.database().ref('accounts/' + that.state.profileObject.info.username).set({
        //             data: url
        //         });
        //     });
        // });
    }

    declineFriend(friendName) {
        // var that = this;
        // this.setState({
        //     friendInteraction:friendName
        // }, function () {
        // var currentData = this.state.profileObject.info;
        // currentData.friends[friendName] = 'declined';
        // delete currentData.inbox.friendRequests[friendName];
        // var friendRef = firebase.database().ref('accounts/' + friendName);
        // friendRef.on('value', function (snapshot) {
        //     if (!snapshot.val()) {
        //         that.setState({
        //             notFound: true
        //         });
        //         return;
        //     } else {
        //         axios.get(snapshot.val().data).then(
        //             function (response) {
        //                 var that2 = that;
        //                 var friendObject = response.data;
        //                 friendObject.info.inbox.myRequests[that2.state.profileObject.info.username] = 'declined';
        //                 friendObject.info.friends[that2.state.profileObject.info.username] = 'declined';
        //                 var friendRef = firebase.storage().ref('accounts/' + friendObject.info.username + '.json');                        
        //                 var friendFile = new Blob([JSON.stringify(friendObject)], { type: 'application/json' });
        //                 friendRef.put(friendFile).then(function () {
        //                     friendRef.getDownloadURL().then(function (url) {
        //                         firebase.database().ref('accounts/' + that.state.friendInteraction).set({
        //                             data: url
        //                         });
        //                         return;
        //                     });
        //                 });
        //             })
        //     }});
        // });
    }

    render() {
        var loggedIn = this.props.accounts ? this.props.accounts[0] ? true : false : false;
        return (
            <div>
                {(loggedIn && this.state.yourAccount) ? <InboxLayout 
                                loading = {this.state.loading} 
                                profileObject = {this.state.inbox}
                                acceptFriend = {this.acceptFriend}
                                declineFriend = {this.declineFriend}/> : 
                                <Loader>Loading</Loader>
            }
            {!this.state.yourAccount && 
                <Loader>Loading</Loader>}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts
        //this means i would like to access by this.state.accounts
        // the data within the state of our store named by root reducer
        // ownProps are the props of our component CoursesPage
    };
}

export default connect(mapStateToProps, null)(Inbox);