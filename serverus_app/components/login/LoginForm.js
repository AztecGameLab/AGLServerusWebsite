import React, {Component} from 'react';
import { Button, Form, Checkbox } from 'semantic-ui-react';
import firebase from 'firebase';
import {connect} from 'react-redux';
import * as accountActions from '../actions/accountActions';
import {bindActionCreators} from 'redux';
import axios from 'axios';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        };
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.loginRandom = this.loginRandom.bind(this);
    }
    handleEmailInput(e) {
        this.setState({
            email: e.target.value
        });
    }
    handlePasswordInput(e) {
        this.setState({
            password: e.target.value
        });
    }
    handleSubmission() {
        var that = this;
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(function(response) {
            var that2 = that;
            if (response){
                var refString = 'accountData/' + response.uid;
                var userUrlRef = firebase.database().ref(refString);
                userUrlRef.on('value', function(snapshot) {
                    var that3 = that2;
                    axios.get(snapshot.val().data)
                    .then(function(response) {
                        var that4 = that3;
                        that4.props.actions.loadAccount(response.data);
                        alert('User LOADED IN redux!!!');
                    })
                })
            }

        })
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        });
    }
    loginRandom(){
        this.setState({
            email: 'antsinmyeyesJohnson@gmail.com',
            password: 'fridgesforsale'
        },this.handleSubmission());
        alert('Logged in random!');
    }
    render() {
        return (
            <div>
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
                    type='password'
                    onChange={this.handlePasswordInput} />
                </Form.Field>
                </div>
                <Form.Field>
                    <Button onClick = {this.handleSubmission}>
                        LOGIN
                    </Button>
                    <Button onClick = {this.loginRandom}>
                        LOAD RANDOM USER
                    </Button>
                </Form.Field>
            </div>
        );
    }
}

var modalStyle = {
  spacing: {
    margin: '15px',
    width: "100%",
    display: "block",
    color: 'black'
  }
};

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(accountActions,dispatch)
        //this will go through the courseActions file and wrap with dispatch
    };
}

export default connect(null, mapDispatchToProps)(LoginForm);