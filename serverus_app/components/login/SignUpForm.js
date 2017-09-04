import React, { Component } from 'react';
import firebase from 'firebase';
import { Button, Form, Checkbox, Transition, Grid } from 'semantic-ui-react';
import Stepper from 'react-stepper-horizontal';
import ReactTransitions from 'react-transitions';
import SignUpOne from './SignUpOne';
import SignUpTwo from './SignUpTwo';
import SignUpThree from './SignUpThree';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhase: 0,
      newAccount: {
        //Essential Login Info
        email: '',
        password: '',
        redId: '',
        //Basic User Info
        firstName: '',
        lastName: '',
        major: '',
        currentYear: '',
        //Optional Editable Later
        roles: [],
        bio: '',
        username: '',
        //Functional Attibutes
        flares: '',
        badges: [],
        games: [

        ],
        groups: [

        ],
        authLevel: false        
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
    //Optional Infos (SignUpThree)
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.onSubmission = this.onSubmission.bind(this);
    this.sendNewUserToFB = this.sendNewUserToFB.bind(this);
    //Navigation
    this.changePhase = this.changePhase.bind(this);
    //Debugger
    this.randomUser = this.randomUser.bind(this);
  }
  //Sign Up Nav
  changePhase(value) {
    //debugger;
    const current = this.state.currentPhase;
    this.setState({
      currentPhase: current + value
    });
  }
  //Essential Login Info (SignUpOne)
  handleEmailInput(e) {
    const newAccount = this.state.newAccount;
    newAccount.email = e.target.value;
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
    newAccount.major = e.target.value;
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
  //Debugger
  randomUser() {
    this.setState({
      newAccount: {
        //Essential Login Info
        email: "random" + Math.floor((Math.random() * 10000) + 1) + "@gmail.com",
        password: "random" + Math.floor((Math.random() * 300) + 1),
        redId: "random" + Math.floor((Math.random() * 900) + 1),
        //Basic User Info
        firstName: "random" + Math.floor((Math.random() * 180) + 1),
        lastName: "random" + Math.floor((Math.random() * 1200) + 1),
        major: "random" + Math.floor((Math.random() * 9000) + 1),
        currentYear: "random" + Math.floor((Math.random() * 420) + 1),
        //Optional Editable Later
        rolesHats: '',
        skillsTools: '',
        username: '',
        //Functional Attibutes
        flares: '',
        badges: '',
        games: [

        ],
        groups: [

        ],
        authLevel: false
      }
    });
    console.log("random USer:");
    console.log(this.state.newAccount);
  }
  onSubmission() {
    var that = this;
    const newUserData = this.state.newAccount;
    debugger;
    firebase.auth().createUserWithEmailAndPassword(newUserData.email, newUserData.password)

      .then(function () {
        that.sendNewUserToFB()
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
    debugger;
    var user = firebase.auth().currentUser;
    console.log('CURRENT USER', user);
    var userUid = user.uid;
    var data = {
      uid: userUid,
      info: this.state.newAccount
    };
    firebase.database().ref('accounts/takenEmails').push(data.info.email); //Taken Emails
    firebase.database().ref('accounts/takenRedIds').push(data.info.redId); //Taken RedIDs
    firebase.database().ref('accounts/takenUsernames').push(data.info.username); //Taken Emails
    var file = new Blob([JSON.stringify(data)], { type: 'application/json' });
    this.pathRef = firebase.storage().ref('accounts/' + data.info.username + '.json');
    user.updateProfile({
      displayName: this.state.newAccount.username
    }).then(function () {
      var that2 = that;
      that.pathRef.put(file).then(function () {
        debugger;
        alert('Uploaded New User to accounts Storage!');
        that2.pathRef.getDownloadURL().then(function (url) {
          var username = firebase.auth().currentUser.displayName;
          debugger;
          firebase.database().ref('accounts/' + username).set({
            data: url
          });
          that2.props.signedUp();
          //firebase.database().ref().child('/testUserURL').push(newUid:url);
        })
      }).catch(function (error) {
        console.log(error);
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
          handleForumHandleInput={this.handleForumHandleInput}
          onSubmission={this.onSubmission}
          changePhase={this.changePhase}
          randomUser={this.randomUser} />
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

var modalStyle = {
  spacing: {
    margin: '15px',
    width: "100%",
    display: "block"
  }
};

export default SignUpForm;