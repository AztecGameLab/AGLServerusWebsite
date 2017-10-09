import React, { Component } from 'react';
import firebase from 'firebase';
import { Button, Form, Checkbox, Transition, Grid } from 'semantic-ui-react';
import SignUpOne from './SignUpOne';
import SignUpTwo from './SignUpTwo';
import SignUpThree from './SignUpThree';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

const https = require('https');
const md5 = require('md5');

import { AGLEncryption, createAGLUser } from '../AGL';

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
        securityCode: '',
        //Basic Info
        firstName: '',
        lastName: '',
        redId: '',
        major: '',
        dateJoined: '',
        school: 'San Diego State University',
        //AGL Info
        username: '',
        roles: [],
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
        friends: {},
        authLevel: 0,
        showcaseImage: 'ProfileIconsSmall/033-flask.png',
        facebookLink: 'https://www.facebook.com/',
        twitterLink: 'https://twitter.com/',
        instagramUser: 'https://instagram.com/',
        linkedInLink: 'https://www.linkedin.com/in/',
        slackUser: '',
        inbox: {
          friendRequests: {},
          teamRequests: {},
          myRequests: {}

        },
        rencrypted: true
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
    this.onSubmission = this.onSubmission.bind(this);
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
    if (new Date().getFullYear() == 2017) {
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
  handleMajorInput(text) {
    const newAccount = this.state.newAccount;
    newAccount.major = text;
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

  async onSubmission() {
    this.setState({
      loading: true
    });
    var that = this;
    const newUserData = this.state.newAccount;
    const pass = await AGLEncryption(newUserData.password);
    
    newUserData.password = pass;
    let response = await createAGLUser(newUserData.username, newUserData.email, pass, newUserData);
    
    this.setState({
      loading: false,
      created: true
    });
    this.props.signedUp();
    let postBody = JSON.stringify({
      email: newUserData.email,
      fName: newUserData.firstName,
      securityCode: newUserData.securityCode
    });
    let request = https.request({
      hostname: 'us-central1-serverus-15f25.cloudfunctions.net',
      method: 'POST',
      path: '/dispatchConfirmEmail',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postBody)
      }
    });
    request.end(postBody);
    request.on('response', (response) => {
    });
    window.location.reload();
  }


  render() {
    //Semantic UI transitions not working atm
    let phase;
    switch (this.state.currentPhase) {
      case 2:
        phase = <SignUpOne key='2'
          handleEmailInput={this.handleEmailInput}
          handlePasswordInput={this.handlePasswordInput}
          changePhase={this.changePhase}
          onSubmission={this.onSubmission} 
          loading={this.state.loading}
          error={this.state.error}
          errorMessage={this.state.errorMessage}/>;
        break;
      case 0:
        phase = <SignUpTwo key='0'
          handleFirstNameInput={this.handleFirstNameInput}
          handleLastNameInput={this.handleLastNameInput}
          handleMajorInput={this.handleMajorInput}
          changePhase={this.changePhase} />;
        break;
      case 1:
        phase = <SignUpThree key='1'
          handleUsernameInput={this.handleUsernameInput}
          changePhase={this.changePhase}
          randomUser={this.randomUser}
          handleRedIDInput={this.handleRedIDInput}
          handleRolesInput={this.handleRolesInput}
          handleProfileInput={this.handleProfileInput}
          startingIcon={this.state.startingIcon} />
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