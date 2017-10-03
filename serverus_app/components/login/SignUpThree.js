//Imports
import React, { Component } from 'react';
import firebase from 'firebase';
import { Button, Form, Checkbox, Input, Icon, Grid, Label, Dropdown, Modal, Popup, Message } from 'semantic-ui-react';
import roleOptions from '../common/options/roleOptions.json';
import profileIconOptions from '../common/options/profileIconOptions.json';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import axios from 'axios';
import IconPicker from '../common//icon/IconPicker';

//CSS Objects
//var modalStyle

//AGL API
import {UsernameTakenCheck} from '../AGL';

class SignUpThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameFilled: false,
      usernameLimit: false,
      vulgarUsername: false,
      rolesFilled: '',
      usernameTaken: false,
      buttonDisable: true,
      existingUsernames: [],
      loading: false,
      termsAccepted: false,
      rolesSelected: [],
      securityCodeFilled: false,
      usernameInvalid: false
    };
    this.usernameCheck = this.usernameCheck.bind(this);
    this.adminCheck = this.adminCheck.bind(this);
    this.formComplete = this.formComplete.bind(this);
    this.termsAccepted = this.termsAccepted.bind(this);
    this.rolesCheck = this.rolesCheck.bind(this);
  }

  rolesCheck(e, { value }) {
    this.props.handleRolesInput(e, { value });
    var that = this;
    this.setState({
      rolesSelected: value
    }, function () {
      that.formComplete();
    });
  }

  async usernameCheck(e) {
    e.persist();
    let usernameCheck = await UsernameTakenCheck(e.target.value);
    let isTaken = usernameCheck.usernameTaken;
    let containsProfanity = usernameCheck.profanity;
    var that = this;
    this.props.handleUsernameInput(e);
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if(format.test(e.target.value)){
      that.setState({
        usernameFilled: true,
        usernameTaken: false,
        usernameLimit: false,
        usernameInvalid: true,
        vulgarUsername: false,
      }, function () {
        that.formComplete();
      });
      return;
    }
    if (e.target.value.length > 0 && e.target.value.length < 20 ) {
        if (isTaken == true) {
          that.setState({
            usernameFilled: true,
            usernameTaken: true,
            usernameLimit: false,
            usernameInvalid: false,
            vulgarUsername: false
          }, function () {
            that.formComplete();
            setTimeout(function(){
              document.getElementById("username").value = '';
          }, 2000);
          });
          return;
      }
      else if (containsProfanity == true) {
        this.setState({
          usernameFilled: true,
          usernameTaken: false,
          usernameLimit: false,
          usernameInvalid: false,
          vulgarUsername: true
        }, function () {
          that.formComplete();
        });
        return;
      }
      this.setState({
        usernameFilled: true,
        usernameTaken: false,
        usernameLimit: false,
        usernameInvalid: false,
        vulgarUsername: false
      }, function () {
        that.formComplete();
      });
      return;
    }
    else if (e.target.value == "") {
      this.setState({
        usernameFilled: false,
        usernameTaken: false,
        usernameLimit: false,
        usernameInvalid: false,
        vulgarUsername: false
      }, function () {
        that.formComplete();
      });
      return;
    }
    else {
      this.setState({
        usernameFilled: true,
        usernameTaken: false,
        usernameLimit: true,
        usernameInvalid: false,
        vulgarUsername: false
      }, function () {
        that.formComplete();
      });
      return;
    }
  }

  adminCheck(e) {
    this.props.handleAdminCode(e);
    if(e.target.value.toString().length == 6){
      this.setState({
        securityCodeFilled: true
      }, function () {
        this.formComplete();
      });
      return;
    }
    else {
      this.setState({
        securityCodeFilled: false
      }, function () {
        this.formComplete();
      });
      return;
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
  formComplete() {
    console.log('input form')
    var validInputs = !this.state.usernameInvalid && !this.state.vulgarUsername;
    var isTaken = this.state.usernameTaken || this.state.usernameLimit;
    var inputsFilled = this.state.usernameFilled && (this.state.rolesSelected.length > 0) && this.state.securityCodeFilled;
    var termsAccepted = this.state.termsAccepted;
    if(validInputs){
      if (inputsFilled) {
        if (!isTaken) {
          if (termsAccepted) {
            this.setState({
              buttonDisable: false
            });
            return;
          }
          else {
            this.setState({
              buttonDisable: true
            });
            return;
          }
        }
        else {
          this.setState({
            buttonDisable: true
          });
        }
        return;
      }
      else {
        this.setState({
          buttonDisable: true
        });
        return;
      }
    }
    else {
      this.setState({
        buttonDisable: true
      });
      return;
    }
  }
  render() {
      return (
          <div>
            <div style={modalStyle.spacing}>
              <Grid divided='vertically'>
                <Grid.Row columns={2}>
                  <Grid.Column width={5} >
                    <IconPicker startingIcon= {this.props.startingIcon} 
                                handleProfileInput = {this.props.handleProfileInput}
                                editEnabled = {true}/>
                  </Grid.Column>
                  <Grid.Column width={11} >
                    <Form.Field>
                      <Popup
                        trigger={
                          <div>
                          <label>AGL Username</label>
                          <Input placeholder='Username' iconPosition='left'>
                            <Icon name='new pied piper' />
                            <input id = 'username' onBlur={(e) => this.usernameCheck(e)} />
                            {this.state.usernameTaken && <Label pointing='left' color='red'>Username is already taken</Label>}
                            {this.state.usernameLimit && <Label pointing='left' color='red'>Username is too long</Label>}
                            {this.state.usernameInvalid && <Label pointing='left' color='red'>No special characters</Label>}
                            {this.state.vulgarUsername && <Label pointing='left' color='red'>Inappropriate username</Label>}
                          </Input>
                          </div>}
                        content='This will be your display username and how others see you!'
                        inverted
                      />
                    </Form.Field>
                    <Form.Field>
                      <Popup
                        trigger={
                          <div>
                          <label>Enter a 6 digit Security PIN:</label>
                          <Input placeholder='Passcode' iconPosition='left'>
                            <Icon name='numbered list' />
                            <input onBlur={this.adminCheck} type='password' />
                            {!this.state.securityCodeFilled && <Label pointing='left' color='red'>Invalid Code</Label>}
                            
                          </Input>
                          </div>}
                        content='Please make sure to keep this safe and secure! This is for recovering your account information!'
                        inverted
                      />
                      
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
            <div style={modalStyle.spacing}>
              <Form.Field>
                <label>Roles Interested In:</label>
                <Dropdown placeholder='Roles' fluid multiple selection options={roleOptions.roles}
                  value={this.state.rolesSelected} onChange={this.rolesCheck} />
              </Form.Field>
            </div>
            <div style={{ padding: '5px' }}>
              <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' onClick={this.termsAccepted} />
                <hr />
                AGL terms and conditions can be found:   <a href='https://docs.google.com/document/d/1R6tGpquyGkJQlrIz-iO-xCoMH5pjsymbRFWiCd6qYQ4/edit?usp=sharing'> here</a>
              </Form.Field>
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
                      <Icon  size = 'large' name = 'flask'/>
                      Welcome!

                    </Button>}
                    {this.state.error && <Message negative>
                      <Message.Header>Sorry, authentification failed</Message.Header>
                          <p>{this.prop.errorMessage}</p>
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

export default SignUpThree;