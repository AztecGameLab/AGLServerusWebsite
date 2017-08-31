import React, { Component } from 'react';
import { Button, Form, Checkbox, Input, Icon, Grid, Segment, Label } from 'semantic-ui-react';
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
      exisitngEmails: []

    };
    this.emailCheck = this.emailCheck.bind(this);
    this.passwordCheck = this.passwordCheck.bind(this);
    this.redIDCheck = this.redIDCheck.bind(this);
    this.formComplete = this.formComplete.bind(this);
  }
  componentWillMount() {
    var emailRef = firebase.database().ref('accounts/emails/');
    var that = this;
    emailRef.on('value', function (snapshot) {
      debugger;
      that.setState({
        existingEmails: Object.values(snapshot.val())
      }, function () {
        alert('existing emails loaded');
      });
    });
  }
  emailCheck(e) {
    var that = this;
    debugger;
    for(var i in this.state.existingEmails){
      if (this.state.existingEmails[i] == e.target.value) {
        that.setState({
          emailFirstClick: true,
          emailWarning: true,
          emailTaken: true
        }, function () {
          debugger;
          that.formComplete();
        });
        return;
    }
  }
    if (EmailValidator.validate(e.target.value) == false) {
      this.setState({
        emailFirstClick: true,
        emailWarning: true,
        emailTaken: false
      }, function () {
        this.formComplete();
      });
      return;
    }
    else {
      this.setState({
        emailFirstClick: true,
        emailWarning: false,
        emailFilled: true
      }, function () {
        this.formComplete()
      });
    }
    console.log(e.target.value);
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
        this.formComplete()
      });
      return;
    }
    else {
      this.setState({
        passwordFirstClick: true,
        passwordWarning: true
      }, function () {
        this.formComplete()
      });
      return;
    }
  }
  redIDCheck(e) {
    debugger;
    let passString = e.target.value;
    let numMatches = passString.match(/[0-9]/g);
    let numCount = numMatches ? numMatches.length : 0;
    if (numCount == 9) {
      this.setState({
        redIDFirstClick: true,
        redIDWarning: false,
        redIDFilled: true
      }, function () {
        this.formComplete()
      });
      return;
    }
    else {
      this.setState({
        redIDFirstClick: true,
        redIDWarning: true
      }, function () {
        this.formComplete()
      });
      return;
    }
  }
  formComplete() {
    debugger;
    var warningsOn = (this.state.emailWarning || this.state.passwordWarning || this.state.redIDWarning || this.state.emailTaken);
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
            <label>Email</label>
            <Input inverted placeholder='Email' iconPosition='left'>
              <Icon name='mail outline' />
              <input id='email' onChange={this.props.handleEmailInput} onBlur={this.emailCheck} />
              {this.state.emailWarning ?
                this.state.emailFirstClick && !this.state.emailTaken && <Label pointing='left' color='red'>Invalid Email</Label>
                : this.state.emailFirstClick && <Label circular color='green' pointing='left'><Icon name='checkmark' /></Label>}
                {this.state.emailTaken && <Label pointing='left' color='red'>Email is already used</Label>}
            </Input>
          </Form.Field>
        </div>
        <div style={modalStyle.spacing}>
          <Form.Field>
            <label>Password</label>
            <Input inverted placeholder='Password' iconPosition='left'>
              <Icon name='lock' />
              <input id='pass' onChange={this.props.handlePasswordInput} onBlur={this.passwordCheck} type='password' />
              {this.state.passwordWarning ?
                this.state.passwordFirstClick && <Label color='red' pointing='left'>Password needs 6+ characters, a number and uppercase letter</Label>
                : this.state.passwordFirstClick && <Label circular color='green' pointing='left'><Icon name='checkmark' /></Label>}
            </Input>
          </Form.Field>
        </div>
        <div style={modalStyle.spacing}>
          <Form.Field>
            <label>Red ID</label>
            <Input inverted placeholder="Red ID" iconPosition='left'>
              <Icon name='shield' />
              <input id='red' onChange={this.props.handleRedIDInput} onBlur={this.redIDCheck} />
              {this.state.redIDWarning ?
                this.state.redIDFirstClick && <Label color='red' pointing='left'>Incorrect Red ID</Label>
                : this.state.redIDFirstClick && <Label circular color='green' pointing='left'><Icon name='checkmark' /></Label>}
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