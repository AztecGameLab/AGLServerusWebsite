//Imports
import React, { Component } from 'react';
import { Button, Form, Checkbox, Input, Icon, Grid, Segment, Label, Popup } from 'semantic-ui-react';
import firebase from 'firebase';

//CSS Objects
//var modalStyle

//AGL API
import {EmailTakenCheck} from '../AGL';

class SignUpOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailFirstClick: false,
      passwordFirstClick: false,
      emailWarning: false,
      emailTaken: false,
      passwordWarning: false,
      emailFilled: false,
      passFilled: false,
      buttonDisable: true,
      termsAccepted: false,
      
    };
    this.termsAccepted = this.termsAccepted.bind(this);    
    this.emailCheck = this.emailCheck.bind(this);
    this.passwordCheck = this.passwordCheck.bind(this);
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

  termsAccepted(e) {
    let prevChecked = this.state.termsAccepted;
    this.setState({
      termsAccepted: !prevChecked
    }, function () {
      this.formComplete();
    });
    return;
  }

  passwordCheck(e) {
    this.props.handlePasswordInput(e);
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
  
  formComplete() {
    var warningsOn = (this.state.emailWarning || this.state.passwordWarning || this.state.emailTaken);
    var inputsFilled = (this.state.emailFilled && this.state.passFilled && this.state.termsAccepted);
    if (inputsFilled) {
      this.setState({
        buttonDisable: warningsOn
      }); //true -> button off false -> button on
    }
  }
  render() {
    var emailInput = document.getElementById('email');
    var passInput = document.getElementById('pass');
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
                    <input id='pass' onChange={this.props.handlePasswordInput} onChange={(e) => this.passwordCheck(e)} type='password' />
                    {this.state.passwordWarning ?
                      this.state.passwordFirstClick && <Label color='red' pointing='left'>Password needs 6+ characters, a number and uppercase letter</Label>
                      : this.state.passwordFirstClick && <Label circular color='green' pointing='left'><Icon name='checkmark' /></Label>}
                  </Input>
                </div>}
              content='Make sure to have 6+ characters with an uppercase and lowercase letter!'
            />
           
        </Form.Field>
      </div>
        <div style={{ padding: '5px' }}>
          <Form.Field>
            <Checkbox label='By signing up you agree to AGL terms and conditions:  ' onClick={this.termsAccepted} />
            <Button icon color = "teal" floated = "right" onClick= {() => {window.open('https://docs.google.com/document/d/1R6tGpquyGkJQlrIz-iO-xCoMH5pjsymbRFWiCd6qYQ4/edit?usp=sharing','_blank')}} >
            <Icon name='file text' />
          </Button>
            <hr />
            
          </Form.Field>
          <br/>
          <div style={modalStyle.spacing}>
            <Grid>
              <Grid.Column floated='left' width={1}>
                <Button circular icon size='big' onClick={() => this.props.changePhase(-1)}>
                  <Icon name='angle double left' />
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={10}>
                {<Button fluid color='green' size='massive' 
                  onClick={this.props.onSubmission}
                  loading={this.props.loading}
                  disabled = {this.state.buttonDisable}>
                  <Icon  size = 'large' name = 'shutdown'/>
                  Join our lab!
                </Button>}
                {this.props.error && <Message negative>
                  <Message.Header>Sorry, authentification failed</Message.Header>
                      <p>{this.props.errorMessage}</p>
              </Message>}
              </Grid.Column>
            </Grid>
          </div>
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