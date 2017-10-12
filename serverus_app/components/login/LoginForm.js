import React, {Component} from 'react';
import { Button, Form, Checkbox, Input, Icon, Label, Message, Grid, Popup } from 'semantic-ui-react';
import firebase from 'firebase';
import axios from 'axios';
var md5 = require('md5');
var randomstring = require('randomstring');
var validator = require("email-validator");
import {Link} from 'react-router';

import {AGLRencryption, isUserRencrypted, AGLEncryption, EditProfile, usernameToEmail, GetAllEmails} from '../AGL';

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

    async componentWillMount() {


            // let emailList = await GetAllEmails();
            // 
            //encrypted resposne
        
        // let pass = randomstring.generate({
        //     length: 6,
        //     charset: 'R3ACTAGL69GODNATHANAZTECGAMELABYOUNMONEY$$$AUTISM',
        //     readable: true,
        //     capitialization: true
        //   });
        //   
        // var auth = firebase.auth();
        // 
        // auth.sendPasswordResetEmail('kevindokhoale@gmail.com').then(function() {
        //     alert("xD");
        //   }).catch(function(error) {
        //     // An error happened.
        //   });
        //
        //let response = await EditProfile('Kevin Do', 'YBqyzzPuFdbBQpVNjNK9DR3x6HG2', {name: 'Kevin Do2', newVal: 'xD'});
        // const accsRef = firebase.database().ref("BackupAcc");
        //     accsRef.once('value', function (snapshot){
        //         // console.log(snapshot.val());
        //         Object.values(snapshot.val()).forEach( (user) => {
        //             
        //             const validKey = md5(user.email);
        //             
        //             let newPair = {[validKey]: user.username }
        //             firebase.database().ref("usernameLookup/").update(newPair);
        //         });
        //     });
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
    async handleSubmission(e) {
        e.stopPropagation();
        e.preventDefault();
        
        let email = this.state.email;
        
        if (validator.validate(this.state.email) == false){
            email = await usernameToEmail(this.state.email);
        }
        const password = this.state.password;
        const encryptedPass = await AGLEncryption(password);
        var that = this;
        this.setState({
            loading:true,
            encryptedPass: encryptedPass,
            email: email
        });
        
        let reCryptCheck  = await isUserRencrypted(email);
        
        if(reCryptCheck == false)
        {
            
            let response = await AGLRencryption(email, password);
            
            if (response.data == "Wrong Password"){
                this.setState({
                    error: true,
                    loading: false,
                    errMessage: "Wrong Pass"
                });
                return;//GTFO
            }
            else {
                let encryptedPass = await AGLEncryption(password);
                
                firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.encryptedPass)
                    .then(function(response) {
                        window.location.reload();
                        return;
                    })
                    .catch(function(error) {
                    var that2 = that;
                    var errorCode = error.code;
                    var errorMessage = error.message;
                        that2.setState({
                            error: true,
                            loading: false,
                            errMessage: errorMessage
                        });
                        return;
                    });
            }
        }
        else {
            
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.encryptedPass)
                .then(function(response) {
                    window.location.reload();
                    return;
                })
                .catch(function(error) {
                var that2 = that;
                var errorCode = error.code;
                var errorMessage = error.message;
                    that2.setState({
                        error: true,
                        loading: false,
                        errMessage: errorMessage
                    });
                    return;
                });
        }
    }

    render() {
        var loggedIn = !this.state.loaded || !this.state.email || !this.state.password ? false: true;
        return (
            <Form onSubmit={(e) => this.handleSubmission(e)}>
            <br/>            
            <Grid>
                <Grid.Column width = {1}>
                    <Icon name = 'flag checkered' size = 'big' />
                </Grid.Column>
                <Grid.Column width = {11}>
                    <h3>Load your save file!</h3>
                </Grid.Column>
            </Grid>
            <hr/>
                <div style={modalStyle.spacing}>
                    <Form.Field>
                    <Popup
                    trigger={    
                        <div>
                        <label>Email or Username</label>
                            <Input inverted placeholder='Email or Username' iconPosition='left' style={{width: '100%'}}> 
                                <Icon name='magic' />
                                <input onChange={this.handleEmailInput} />
                            </Input>
                        </div>
                    }
                    content = 'Case sensitive'
                    />
                    </Form.Field>
                </div>
                <div style={modalStyle.spacing}>
                    <Form.Field>
                        <label>Password</label>
                        <Input inverted placeholder='Password' iconPosition='left' style={{width: '100%'}}>
                        <Icon name='privacy' />
                        <input
                            type='password'
                            onChange={this.handlePasswordInput} />
                        </Input>
                    </Form.Field>
                </div>
                <div style={modalStyle.forgot}>  
                    <Label as={Link} to='forgotpassword' target="_blank" color = 'teal'>
                    <Icon name='question circle' size = "large" />  
                    Forgot your password?
                    </Label>
                </div>
                <div style={modalStyle.spacing}>
                    <Button fluid color='green' size='massive' disabled={this.state.buttonDisable}
                        loading={this.state.loading}>
                        <Icon  size = 'large' name = 'power'/>
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