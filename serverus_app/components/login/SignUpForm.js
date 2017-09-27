import React, { Component } from 'react';
import firebase from 'firebase';
import { Button, Form, Checkbox, Transition, Grid } from 'semantic-ui-react';
import SignUpOne from './SignUpOne';
import SignUpTwo from './SignUpTwo';
import SignUpThree from './SignUpThree';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

const http = require('https');
const md5 = require('md5');

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhase: 0,
      error: false,
      startingIcon: 'ProfileIconsSmall/033-flask.png',
      created: false,
      loading: false,
      newAccount: {
        //Login Info
        email: '',
        password: '',
        securityCode:'',
        //Basic Info
        firstName: '',
        lastName: '',
        redId: '',
        major: '',
        dateJoined: '',
        school: 'San Diego State University',
        //AGL Info
        username: '',
        roles : [],
        bio: 'hi, im new!',
        flare: '',
        goodBoyPoints: 0,
        //Collections
        badges: ['Badges/sprout.png'],
        games: [],
        showcase: [],
        bookmarked: [],
        groups: [],
        activities: [],
        verificationHash: '',
        friends:{},
        authLevel: 0,
        showcaseImage: 'ProfileIconsSmall/033-flask.png',
        facebookLink: 'https://www.facebook.com/',
        twitterLink :'https://twitter.com/',
        instagramUser: 'https://instagram.com/',
        linkedInLink:'https://www.linkedin.com/in/',
        slackUser:'',
        inbox:{
          friendRequests: {},
          teamRequests: {},
          myRequests: {}

        }
      }
    };
    //Essential Login Info (SignUpOne)
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleRedIDInput = this.handleRedIDInput.bind(this);
    //Basic User Info (SignUpTwo)
    this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
    this.handleLastNameInput = this.handleLastNameInput.bind(this);
    this.handleMajorInput = this.handleMajorInput.bind(this);
    this.handleRolesInput = this.handleRolesInput.bind(this);
    //Optional Infos (SignUpThree)
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleAdminCode = this.handleAdminCode.bind(this);
    this.onSubmission = this.onSubmission.bind(this);
    this.sendNewUserToFB = this.sendNewUserToFB.bind(this);
    this.handleProfileInput = this.handleProfileInput.bind(this);
    //Navigation
    this.changePhase = this.changePhase.bind(this);
  }
  //Sign Up Nav
  changePhase(value) {
    const current = this.state.currentPhase;
    this.setState({
      currentPhase: current + value
    });
  }
  //Essential Login Info (SignUpOne)
  handleEmailInput(e) {
    var now = new Date();
    now = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    const newAccount = this.state.newAccount;
    newAccount.email = e.target.value;
    newAccount.dateJoined = now;
    if(new Date().getFullYear() == 2017){
      newAccount.badges[0] = 'Badges/sprout.png';
      
    }
    this.setState({
      newAccount: newAccount
    });
  }
  handlePasswordInput(e) {
    const newAccount = this.state.newAccount;
    newAccount.password = e.target.value;
    this.setState({
      newAccount: newAccount
    });
  }
  handleRedIDInput(e) {
    const newAccount = this.state.newAccount;
    newAccount.redId = e.target.value;
    this.setState({
      newAccount: newAccount
    });
  }

  //Basic User Info (SignUpTwo)
  handleFirstNameInput(e) {
    const newAccount = this.state.newAccount;
    newAccount.firstName = e.target.value;
    this.setState({
      newAccount: newAccount
    });
  }
  handleLastNameInput(e) {
    const newAccount = this.state.newAccount;
    newAccount.lastName = e.target.value;
    this.setState({
      newAccount: newAccount
    });
  }
  handleMajorInput(e) {
    const newAccount = this.state.newAccount;
    newAccount.major = e.target.textContent;
    this.setState({
      newAccount: newAccount
    });
  }
  //Optional Infos (SignUpThree)
  handleUsernameInput(e) {
    const newAccount = this.state.newAccount;
    newAccount.username = e.target.value;
    this.setState({
      newAccount: newAccount
    });
  }

  handleAdminCode(e) {
    const newAccount = this.state.newAccount;
    newAccount.securityCode = e.target.value;
    if (e.target.value == "乇乂ㄒ尺卂 ㄒ卄丨匚匚") {
      newAccount.authLevel = 2;
    }
    this.setState({
      newAccount: newAccount
    });
  }

  handleRolesInput(e, { value }) {
    const newAccount = this.state.newAccount;
    newAccount.roles = value;
    this.setState({
      newAccount: newAccount
    });
  }
  handleProfileInput(e) {
    const newAccount = this.state.newAccount;
    newAccount.showcaseImage = e.target.name;
    this.setState({
      newAccount: newAccount,
      startingIcon: e.target.name
    });
  }

  onSubmission() {
    this.setState({
      loading: true
    });
    var that = this;
    const newUserData = this.state.newAccount;
    let hashPass = md5(newUserData.password);
    firebase.auth().createUserWithEmailAndPassword(newUserData.email, hashPass)

      .then(function () {
        that.sendNewUserToFB();
        let postBody = JSON.stringify({
          email: newUserData.email,
          fName: newUserData.firstName
        });

        let request = http.request({
          hostname: 'us-central1-serverus-15f25.cloudfunctions.net',
          method: 'POST',
          path: '/dispatchConfirmEmail',
          headers: {
            'Content-Type' : 'application/json',
            'Content-Length' : Buffer.byteLength(postBody)
          }
        });
        request.end(postBody);
        request.on('response', (response) =>{
          
        });
      })

      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ...
      });
    //TODO: TURN new user's info (this.state.newAccount) into new userdata.txt containing user's info 
    // Package the User UID from account creation as key and pair with download url for the userdata.txt
  }

  sendNewUserToFB() {
    this.props.signedUp();
    var that = this;
    var user = firebase.auth().currentUser;
    var userUid = user.uid;
    var data = {
      uid: userUid,
      info: this.state.newAccount
    };
    data.info.password = md5(data.info.password);
    data.info.verificationHash = md5(data.info.username);
    firebase.database().ref('takenEmails').push(data.info.email); //Taken Emails
    firebase.database().ref('takenRedIds').push(data.info.redId); //Taken RedIDs
    firebase.database().ref('takenUsernames').push(data.info.username); //Taken Emails
    var file = new Blob([JSON.stringify(data)], { type: 'application/json' });
    this.pathRef = firebase.storage().ref('accounts/' + data.info.username + '.json');
    user.updateProfile({
      displayName: this.state.newAccount.username
    }).then(function () {
      var that2 = that;
      that.pathRef.put(file).then(function () {
        that2.pathRef.getDownloadURL().then(function (url) {
          var username = firebase.auth().currentUser.displayName;
          firebase.database().ref('accounts/' + username).set({
            data: url
          });
          that2.setState({
            loading: false,
            created: true
          });
          that2.props.signedUp();
          var that3 = that2;
          //firebase.database().ref().child('/testUserURL').push(newUid:url);
        })
      }).catch(function (error) {
        console.log(error);
        that2.setState({
          errorMessage: error.errorMessage,
          error: true
        });
        
      });
    });
  }

  render() {
    //Semantic UI transitions not working atm
    let phase;
    switch (this.state.currentPhase) {
      case 0:
        phase = <SignUpOne key = '0'
          handleEmailInput={this.handleEmailInput}
          handlePasswordInput={this.handlePasswordInput}
          handleRedIDInput={this.handleRedIDInput}
          changePhase={this.changePhase} />;
        break;
      case 1:
        phase = <SignUpTwo key = '1'
          handleFirstNameInput={this.handleFirstNameInput}
          handleLastNameInput={this.handleLastNameInput}
          handleMajorInput={this.handleMajorInput}
          changePhase={this.changePhase} />;
        break;
      case 2:
        phase = <SignUpThree key = '2'
          handleUsernameInput={this.handleUsernameInput}
          handleAdminCode={this.handleAdminCode}
          onSubmission={this.onSubmission}
          changePhase={this.changePhase}
          randomUser={this.randomUser}
          created={this.state.created} 
          loading = {this.state.loading}
          handleRolesInput = {this.handleRolesInput}
          handleProfileInput = {this.handleProfileInput}
          startingIcon = {this.state.startingIcon}
          error = {this.state.error}
          errorMessage = {this.state.errorMessage}/>
        break;
    }
    return (
      <Form>
        <ReactCSSTransitionReplace transitionName="fade-wait" 
          transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
          {phase}
        </ReactCSSTransitionReplace>
        
      </Form>
    );
  }
}

export default SignUpForm;