//Imports
import React, { Component } from 'react';
import { Button, Form, Checkbox, Input, Icon, Grid, Segment, Label, Popup } from 'semantic-ui-react';
import firebase from 'firebase';

//CSS Objects
//var modalStyle

//AGL API
import {EmailTakenCheck, RedIdTakenCheck} from '../AGL';

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
    };
    this.emailCheck = this.emailCheck.bind(this);
    this.passwordCheck = this.passwordCheck.bind(this);
    this.redIDCheck = this.redIDCheck.bind(this);
    this.formComplete = this.formComplete.bind(this);
  }
  
  async emailCheck(e) {
    e.persist();
    var that = this;
    const emailCheck = await EmailTakenCheck(e.target.value);   
    const isTaken = emailCheck.emailTaken;
    const isValid = emailCheck.validEmail;
    if (isTaken) {
      that.setState({
        emailFirstClick: true,
        emailWarning: true,
        emailFilled: true,
        emailTaken: true
      }, function () {
        that.formComplete();
        setTimeout(function(){
          document.getElementById("email").value = '';
      }, 2000);
      });
      return;
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
    else if (isValid == false) {
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
  async redIDCheck(e) {
    e.persist();
    const redIdCheck = await RedIdTakenCheck(e.target.value);   
    const isTaken = redIdCheck.redIdTaken;
    console.log(isTaken);
    this.props.handleRedIDInput(e);
    var that = this;
    if (isTaken == true) {
      that.setState({
        redIDFirstClick: true,
        redIDWarning: true,
        redIDTaken: true
      }, function () {
        that.formComplete();
        setTimeout(function(){
          document.getElementById("red").value = '';
      }, 2000);
      });
      return;
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
                    <input id='email' onChange={this.props.handleEmailInput} onBlur={(e) => this.emailCheck(e)} />
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
            <label>Red ID</label>
            <Input inverted placeholder="Red ID" iconPosition='left'>
              <Icon name='shield' />
              <input id='red' onBlur={(e) => this.redIDCheck(e)} />
              {this.state.redIDWarning ?
                this.state.redIDFirstClick && !this.state.redIDTaken && <Label color='red' pointing='left'>Incorrect Red ID</Label>
                : this.state.redIDFirstClick ? <Label circular color='green' pointing='left'><Icon name='checkmark' /></Label> : null}
              {this.state.redIDTaken && <Label pointing='left' color='red'>Red ID is already used</Label>}
            </Input>
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
                    <input id='pass' onChange={this.props.handlePasswordInput} onChange={(e) => this.passwordCheck(e)} type='password' />
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