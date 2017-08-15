import React from 'react';
import * as firebase from 'firebase';

export default class SignUpPage extends React.Component {

    render() {
        return (
            
            <div>
                 <form >
                    <input className = "input_email" onChange={this.handleEmail}
                            type = "text" value = {this.state.email}
                            placeholder = "Email"/>
                    <br/>
                    <br/>
                    <input className = "input_password" onChange={this.handlePass}
                            type = "password" value = {this.state.password}
                            placeholder = "Password"/>
                    <br/>
                    <br/>
                <button id = "btn-sign-up"
                    type="button" onClick = {this.signUpAuth}
                    className="btn btn-primary btn-lg btn-info"> Sign Up </button>
                </form>
            </div>

        );
    }
}

