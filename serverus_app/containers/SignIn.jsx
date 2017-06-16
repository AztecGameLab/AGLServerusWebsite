import React from 'react'
import style from '../style/style.css'
import SignUp from './SignUp.jsx'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

export default class SignIn extends React.Component {
    state = {
        email:'',
        username:'',
        password:''
    }
    render() {
        return (
            
            <Router>
            <div>
            <h1 className = "current-page">Sign In!</h1>
                 <form >
                    <input className = "input_username" 
                            type = "text" 
                            placeholder = "Username"/>
                    <br>
                    </br>
                    <input className = "input_password" 
                            type = "password" 
                            placeholder = "Password"/>
                    <br>
                    </br>
                
                <button 
                    type = "button" 
                    id = "btn-login" 
                    className="btn btn-primary btn-lg btn-success"> Login </button>
               
                </form>
                 <Link to="/signup">Sign up!</Link>
                <Route path="/signup" component={SignUp} />
            </div>
            </Router>
        );
    }
}

