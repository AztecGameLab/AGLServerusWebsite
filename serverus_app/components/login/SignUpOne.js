import React, { Component } from 'react';
import { Button, Form, Checkbox, Input, Icon, Grid, Segment, Label, Popup } from 'semantic-ui-react';
import * as EmailValidator from 'email-validator';
import firebase from 'firebase';

class SignUpOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailFirstClick: false,
      passwordFirstClick: false,
      emailWarning: false,
      emailTaken: false,
      passwordWarning: false,
      redIDFirstClick: false,
      redIDWarning: false,
      emailFilled: false,
      passFilled: false,
      redIDFilled: false,
      buttonDisable: true,
      redIDTaken: false,
      existingEmails: [],
      existingRedIDs: []
    };
    this.emailCheck = this.emailCheck.bind(this);
    this.passwordCheck = this.passwordCheck.bind(this);
    this.redIDCheck = this.redIDCheck.bind(this);
    this.formComplete = this.formComplete.bind(this);
  }
  componentWillMount() {
    var emailRef = firebase.database().ref('takenEmails/');
    var that = this;
    emailRef.on('value', function (snapshot) {
      if (that.props.isLeaving) return;
      if (snapshot.val()) {
        that.setState({
          existingEmails: Object.values(snapshot.val())
        });
      }
    });
    var redIDRef = firebase.database().ref('takenRedIds/');
    redIDRef.once('value', function (snapshot) {
      if (snapshot.val()) {
        that.setState({
          existingRedIDs: Object.values(snapshot.val())
        });
      }
    });
  }
  emailCheck(e) {

    var profileArray = this.profileIcons;
    var that = this;
    for (var i in this.state.existingEmails) {
      if (this.state.existingEmails[i] == e.target.value) {
        that.setState({
          emailFirstClick: true,
          emailWarning: true,
          emailFilled: true,
          emailTaken: true
        }, function () {
          that.formComplete();
        });
        return;
      }
    }
    if (e.target.value == "") {
      this.setState({
        emailFirstClick: false,
        emailWarning: false,
        emailFilled: false,
        emailTaken: false
      }, function () {
        this.formComplete()
      });
    }
    else if (EmailValidator.validate(e.target.value) == false) {
      this.setState({
        emailFirstClick: true,
        emailWarning: true,
        emailFilled: true,
        emailTaken: false
      }, function () {
        this.formComplete();
      });
    }
    else {
      this.setState({
        emailFirstClick: true,
        emailWarning: false,
        emailFilled: true,
        emailTaken: false
      }, function () {
        this.formComplete()
      });
    }
  }
  passwordCheck(e) {
    let passString = e.target.value;
    let upperMatches = passString.match(/[A-Z]/g);
    let upperCount = upperMatches ? upperMatches.length : 0;

    let lowerMatches = passString.match(/[a-z]/g);
    let lowerCount = lowerMatches ? lowerMatches.length : 0;

    let numMatches = passString.match(/[0-9]/g);
    let numCount = numMatches ? numMatches.length : 0;

    if ((upperCount > 0) && (lowerCount > 0) && (numCount > 0) && (passString.length >= 6)) {
      this.setState({
        passwordFirstClick: true,
        passwordWarning: false,
        passFilled: true
      }, function () {
        this.formComplete();
      });
    }
    else {
      this.setState({
        passwordFirstClick: true,
        passwordWarning: true
      }, function () {
        this.formComplete();
      });
    }
  }
  redIDCheck(e) {
    this.props.handleRedIDInput(e);
    var that = this;
    for (var i in this.state.existingRedIDs) {
      if (this.state.existingRedIDs[i] == e.target.value) {
        that.setState({
          redIDFirstClick: true,
          redIDWarning: true,
          redIDTaken: true
        }, function () {
          that.formComplete();
        });
        return;
      }
    }
    let passString = e.target.value;
    let numMatches = passString.match(/[0-9]/g); 
    let specialMatches = passString.match(/\D/g); 
    let numCount = numMatches ? numMatches.length : 0;
    if (numCount == 9 && specialMatches == null) {
      this.setState({
        redIDFirstClick: true,
        redIDWarning: false,
        redIDFilled: true,
        redIDTaken: false
      }, function () {
        this.formComplete();
      });
    }
    else if (e.target.value.length > 9) {
      this.setState({
        redIDFirstClick: true,
        redIDWarning: true,
        redIDTaken: false
      }, function () {
        this.formComplete();
      });
    }
    else if ((e.target.value == "" || e.target.value.length < 9) && !specialMatches) {
      this.setState({
        redIDFirstClick: false,
        redIDWarning: false,
        redIDTaken: false
      }, function () {
        this.formComplete();
      });
    }
    else {
      this.setState({
        redIDFirstClick: true,
        redIDWarning: true,
        redIDTaken: false
      }, function () {
        this.formComplete();
      });
    }
  }
  formComplete() {
    var warningsOn = (this.state.emailWarning || this.state.passwordWarning || this.state.redIDWarning || this.state.emailTaken || this.state.redIDTaken);
    var inputsFilled = (this.state.emailFilled && this.state.passFilled && this.state.redIDFilled);
    if (inputsFilled) {
      this.setState({
        buttonDisable: warningsOn
      }); //true -> button off false -> button on
    }
  }
  render() {
    var emailInput = document.getElementById('email');
    var passInput = document.getElementById('pass');
    var redInput = document.getElementById('red');
    return (
      <div>
        <div style={modalStyle.spacing}>
          <Form.Field>
                <Popup
                  trigger={
                  <div>
                    <label>Email</label>
                    <Input inverted placeholder='Email' iconPosition='left'>
                    <Icon name='mail outline' />
                    <input id='email' onChange={this.props.handleEmailInput} onBlur={this.emailCheck} />
                    {this.state.emailWarning ?
                      this.state.emailFirstClick && !this.state.emailTaken && <Label pointing='left' color='red'>Invalid Email</Label>
                      : this.state.emailFirstClick ? <Label circular color='green' pointing='left'><Icon name='checkmark' /></Label> : null}
                    {this.state.emailTaken && <Label pointing='left' color='red'>Email is already used</Label>}
                  </Input>
                  </div>
                  }
                  content='This is where your emails and verification will be sent!'
                  inverted
                />
          </Form.Field>
        </div>
        <div style={modalStyle.spacing}>
          <Form.Field>
              <Popup
                trigger={
                  <div>
                    <label>Password</label>
                    <Input inverted placeholder='Password' iconPosition='left'>
                      <Icon name='lock' />
                      <input id='pass' onChange={this.props.handlePasswordInput} onBlur={this.passwordCheck} type='password' />
                      {this.state.passwordWarning ?
                        this.state.passwordFirstClick && <Label color='red' pointing='left'>Password needs 6+ characters, a number and uppercase letter</Label>
                        : this.state.passwordFirstClick && <Label circular color='green' pointing='left'><Icon name='checkmark' /></Label>}
                    </Input>
                  </div>}
                content='Make sure to have 6+ characters with an uppercase and lowercase letter!'
                inverted
              />
             
          </Form.Field>
        </div>
        <div style={modalStyle.spacing}>
          <Form.Field>
            <label>Red ID</label>
            <Input inverted placeholder="Red ID" iconPosition='left'>
              <Icon name='shield' />
              <input id='red' onChange={this.redIDCheck} />
              {this.state.redIDWarning ?
                this.state.redIDFirstClick && !this.state.redIDTaken && <Label color='red' pointing='left'>Incorrect Red ID</Label>
                : this.state.redIDFirstClick ? <Label circular color='green' pointing='left'><Icon name='checkmark' /></Label> : null}
              {this.state.redIDTaken && <Label pointing='left' color='red'>Red ID is already used</Label>}
            </Input>
          </Form.Field>
        </div>
        <div style={modalStyle.spacing}>
        </div>
        <div style={{ padding: '20px' }}>
          <Grid>
            <Grid.Column floated='right' width={1}>
              <Button circular icon color='green' size='big' onClick={() => this.props.changePhase(1)}
                disabled={this.state.buttonDisable}>
                <Icon name='angle double right' />
              </Button>
            </Grid.Column>
          </Grid>
        </div>
      </div>
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

export default SignUpOne;