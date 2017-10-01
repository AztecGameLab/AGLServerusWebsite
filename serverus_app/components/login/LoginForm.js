import React, {Component} from 'react';
import { Button, Form, Checkbox, Input, Icon, Label, Message } from 'semantic-ui-react';
import firebase from 'firebase';
import axios from 'axios';

import {AGLRencryption, isUserRencrypted, AGLEncryption, isPrecryptCorrect} from '../AGL';

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

    // async componentWillMount() {
    //     debugger;
    // }
    //"5888c044e58629859636455310dd72570072ae8a8487808f7c8ce45c7b1647bc71c2b6210bfade3c3e582764f541be8b06372da540ff020b7b8386c86e232697"
    //"5888c044e58629859636455310dd72570072ae8a8487808f7c8ce45c7b1647bc71c2b6210bfade3c3e582764f541be8b06372da540ff020b7b8386c86e232697"


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
    async handleSubmission() {
        debugger;
        const username= this.state.email;
        const password = this.state.password;
        var that = this;
        this.setState({
            loading:true
        });
        debugger;
        let reCryptCheck  = await isUserRencrypted(username, password);
        debugger;
        if(reCryptCheck == false)
        {
            debugger;
            let passwordCorrect = await isPrecryptCorrect(username, password);
            debugger;
            if(passwordCorrect.correctPass == true) {
                debugger;
                let response = await AGLRencryption(username, password);
                debugger;
                if (response.data.error){
                    this.setState({
                        error: true,
                        loading: false,
                        errMessage: response.data.error
                    });
                    return;//GTFO
                }
            }
        }
        // let reCryptCheck = await AGLRencryption(this.state.email, this.state.password);
        // if (reCryptCheck
        debugger;
        let encryptedPass = await AGLEncryption(password);
        debugger;
        firebase.auth().signInWithEmailAndPassword(this.state.email, encryptedPass)
            .then(function(response) {
                window.location.reload();
            })
            .catch(function(error) {
            var that2 = that;
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
                that2.setState({
                    error: true,
                    loading: false,
                    errMessage: errorMessage
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
                            Login!
                    </Button>
                </div>
                {this.state.error && <Message negative>
                    <Message.Header>Sorry, authentification failed</Message.Header>
                        <p>{this.state.errMessage}</p>
                </Message>}
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

export default LoginForm;