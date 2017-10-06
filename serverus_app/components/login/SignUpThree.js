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
import {UsernameTakenCheck, RedIdTakenCheck} from '../AGL';

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
      redIDFirstClick: false,
      redIDWarning: false,
      redIDFilled: false,      
      existingUsernames: [],
      loading: false,
      rolesSelected: [],
      redIDTaken: false,      
      usernameInvalid: false
    };
    this.usernameCheck = this.usernameCheck.bind(this);
    this.formComplete = this.formComplete.bind(this);
    this.rolesCheck = this.rolesCheck.bind(this);
    this.redIDCheck = this.redIDCheck.bind(this);
    
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
    console.log('input form')
    var validInputs = !this.state.usernameInvalid && !this.state.vulgarUsername && !this.state.redIDWarning;
    var isTaken = this.state.usernameTaken || this.state.usernameLimit || this.state.redIDTaken;
    var inputsFilled = this.state.redIDFilled && this.state.usernameFilled && (this.state.rolesSelected.length > 0);
    if(validInputs){
      if (inputsFilled) {
        if (!isTaken) {
            this.setState({
              buttonDisable: false
            });
            return;
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
    var redInput = document.getElementById('red');    
      return (
          <div>
            <div style={modalStyle.spacing}>
              <Grid divided='vertically'>
                <Grid.Row columns={2}>
                  <Grid.Column width={5} >
                  <br/>
                    <IconPicker startingIcon= {this.props.startingIcon} 
                                handleProfileInput = {this.props.handleProfileInput}
                                editEnabled = {true}/>
                  </Grid.Column>
                  <Grid.Column width={11} >
                    <Form.Field>
                    <Popup
                    trigger = { <label> San Diego State University </label>}
                    content = 'More schools coming later!'
                    />
                    <hr/>
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
                            {this.state.usernameFilled && !this.state.usernameTaken && !this.state.usernameLimit && !this.state.vulgarUsername && 
                              <Label circular color='green' pointing='left'><Icon name='checkmark' /></Label>}
                          </Input>
                          </div>}
                        content='This will be your display username and how others see you!'
                      />
                      <br/>
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
            <div style={{ padding: '20px' }}>
            <Grid>
              <Grid.Column floated='left' width={1}>
                <Button circular icon size='big' onClick={() => this.props.changePhase(-1)}>
                  <Icon name='angle double left' />
                </Button>
              </Grid.Column>
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

export default SignUpThree;