import React, {Component} from 'react';
import { Button, Form, Checkbox, Input, Icon, Label } from 'semantic-ui-react';
import firebase from 'firebase';
// import {connect} from 'react-redux';
// import * as accountActions from '../actions/accountActions';
// import {bindActionCreators} from 'redux';
import axios from 'axios';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            loading: false,
            loaded: false,
            error: false
        };
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
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
        this.setState({
            loading:true
        });
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(function(response) {
            var that2 = that;
            if (response){
                var refString = 'accounts/' + response.displayName;
                var userUrlRef = firebase.database().ref(refString);
                userUrlRef.on('value', function(snapshot) {
                    var that3 = that2;
                    axios.get(snapshot.val().data)
                    .then(function(response) {
                        var that4 = that3;
                        // that4.props.actions.loadAccount(response.data);
                        that4.setState({
                            loading: false,
                            loaded: true
                        });
                        window.location.reload();
                    });
                });
            }
        })
        .catch(function(error) {
        var that2 = that;
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        that2.setState({
            error: true,
            loading: false
        });
        // ...
        });
    }
    render() {
        var loggedIn = !this.state.loaded || !this.state.email || !this.state.password ? false: true;
        return (
            <Form onSubmit={this.handleSubmission}>
                <div style={modalStyle.spacing}>
                    <Form.Field>
                        <label>Email</label>
                            <Input inverted placeholder='Email' iconPosition='left' style={{width: '100%'}}> 
                                <Icon name='mail outline' />
                                <input onChange={this.handleEmailInput} />
                            </Input>
                    </Form.Field>
                </div>
                <div style={modalStyle.spacing}>
                    <Form.Field>
                        <label>Password</label>
                        <Input inverted placeholder='Password' iconPosition='left' style={{width: '100%'}}>
                        <Icon name='unlock alternate' />
                        <input
                            type='password'
                            onChange={this.handlePasswordInput} />
                        </Input>
                    </Form.Field>
                </div>
                <div style={modalStyle.forgot}>  
                    <Label as='a' color = 'blue' href = 'https://goo.gl/forms/Lfxp7iaOZ49nk9Xm1'>
                    <Icon name='question circle' />  
                    Forgot your username or password?
                    </Label>
                </div>
                <div style={modalStyle.spacing}>
                    <Button fluid color='green' size='massive' disabled={this.state.buttonDisable}
                        loading={this.state.loading}>
                            {loggedIn ? 'Signed In!' : this.state.error ? 'Invalid username or password! Try Again!': 'Login' }
                    </Button>
                </div>
            </Form>
        );
    }
}

var modalStyle = {
  spacing: {
    margin: '15px',
    width: "100%",
    display: "block",
    color: 'black'
  },
  forgot: {
      color: 'white',
      textAlign: 'right'
  }
};

// function mapDispatchToProps(dispatch){
//     return {
//         actions: bindActionCreators(accountActions,dispatch)
//         //this will go through the courseActions file and wrap with dispatch
//     };
// }

// export default connect(null, mapDispatchToProps)(LoginForm);
export default LoginForm;