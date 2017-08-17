import React, { Component } from 'react';
import { Popup, Button, Header, Modal, Form, Checkbox } from 'semantic-ui-react';
import Stepper from 'react-stepper-horizontal';
import { connect } from 'react-redux';
import * as accountActions from '../actions/accountActions';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';

class LoginModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newAccount: {
        firstName: '',
        lastName: '',
        email: '',
        password:''
      }
    };
    this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
    this.handleLastNameInput = this.handleLastNameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.onSubmission = this.onSubmission.bind(this);
    this.exampleTestUser = this.exampleTestUser.bind(this);

  }
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
  onSubmission() {
    debugger;
    var that = this;
    this.props.actions.createAccount(this.state.newAccount);
    const newUserData = this.state.newAccount;
    debugger;
    firebase.auth().createUserWithEmailAndPassword(newUserData.email, newUserData.password).catch(function(error) {
      debugger;
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      // ...
    });
    //TODO: TURN new user's info (this.state.newAccount) into new userdata.txt containing user's info 
    // Package the User UID from account creation as key and pair with download url for the userdata.txt
  }
  exampleTestUser(user, index) {
    debugger;
    return (
      <div key = {index}> 
        {user.firstName}
        <hr/>
        {user.lastName}
        <hr/>
        {user.email}
      </div>
    );
  }
  render() {
    return (
        <Modal style={modalStyle.size} dimmer={'blurring'} open={this.props.isOpen} onClose={this.props.close} size={'tiny'}>
          <Form>
            <div style={modalStyle.spacing}>
            <Form.Field>
              <label>First Name</label>
              <input 
                placeholder='First Name' 
                onChange={this.handleFirstNameInput}/>
            </Form.Field>
            </div>
            <div style={modalStyle.spacing}>
            <Form.Field>
              <label>Last Name</label>
              <input 
                placeholder='Last Name'
                onChange={this.handleLastNameInput} />
            </Form.Field>
            </div>
            <div style={modalStyle.spacing}>
            <Form.Field>
              <label>Email</label>
              <input
                placeholder='Email:'
                onChange={this.handleEmailInput} />
            </Form.Field>
            </div>
            <div style={modalStyle.spacing}>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder='Password:'
                onChange={this.handlePasswordInput} />
            </Form.Field>
            </div>
            <div style={modalStyle.spacing}>
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            </div>
            <div style={modalStyle.spacing}>
            <Button
              type='submit'
              onClick={this.onSubmission}>Create Account!</Button>
              </div>
          </Form>
          <Stepper steps={[{ title: 'Step One' }, { title: 'Step Two' }, { title: 'Step Three' }, { title: 'Step Four' }]} activeStep={0} />
          {/* <hr/>
          {this.props.users.map(this.exampleTestUser)} */}
        </Modal>
    )
  }
}

function mapStateToProps(state, ownProps) {
    return {
        users: state.accounts//this means i would like to access by this.props.users
        // the data within the state of our store named by root reducer
        // ownProps are the props of our component LoginModel
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(accountActions,dispatch)
        //this will go through the courseActions file and wrap with dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModel);

var modalStyle = {
  size: {
    height: '75%',
    overflow: 'auto'
  },
  spacing: {
    margin: '15px'
  }
}