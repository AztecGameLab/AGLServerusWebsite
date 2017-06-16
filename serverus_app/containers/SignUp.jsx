import React from 'react';
import style from '../style/style.css';
import * as firebase from 'firebase';

export default class SignUp extends React.Component {
    state = {
        email:'',
        username:'',
        password:'',
        firebaseUser: null
    };
    
    signUpAuth = () => {
        const promise = firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error){
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    };
    handleEmail(event) {
        this.setState({email: event.target.value});
    }
    handlePass(event) {
        this.setState({password: event.target.value});
    }
    render() {
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePass = this.handlePass.bind(this);
    const auth = firebase.auth();
        auth.onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                console.log(firebaseUser);
            }
    });
    const {
        email,
        username,
        password
    } = this.state;

        return (
            
            <div>
                 <form >
                    <input className = "input_email" onChange={this.handleEmail}
                            type = "text" value = {this.state.email}
                            placeholder = "Email"/>
                    <br>
                    </br>
                    <input className = "input_password" onChange={this.handlePass}
                            type = "password" value = {this.state.password}
                            placeholder = "Password"/>
                    <br>
                    </br>
                <button id = "btn-sign-up"
                    type="button" onClick = {this.signUpAuth}
                    className="btn btn-primary btn-lg btn-info"> Sign Up </button>
                </form>
            </div>
        );
        
    }
}

