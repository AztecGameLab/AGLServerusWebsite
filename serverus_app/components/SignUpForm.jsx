import React from 'react';
import formStyle from '../style/signupstyle.css';

const Title = () => {
    return(
        <div className = 'signUpTitle'>
            <img src = {require('../assets/placeholder_logo.jpg')}/>
        </div>
    );
};

class CheckboxLine extends React.Component {
    
    render(){
        return(
            <div className = "checkBox">
                <input type="checkbox" classID="termsCheckBox"/>
                <label for = "termsCheckBox"> I agree to the terms and conditions listed 
                    <a href = "https://docs.google.com/document/d/1-o8hu1qmhTilCTsM-gMnImu5SjtchRoDftpSzLTBlHU/edit?usp=sharing"> here</a>
                </label>
            </div>
        );
    }
}

class InputFields extends React.Component{
//state = {validInputs: false};
constructor (props ){
    super(props);
    this.state = {
        email:'',
        pass:'',
        
    }
}
    render(){
        return(
            <form className = "form_signup">
                <input type = "text" 
                    className = 'inpt_firstNameInput'
                    placeholder = "First Name" required/><br/>
                <input type = "text" 
                    className = 'inpt_lastNameInput'
                    placeholder = "Last Name" required/><br/>
                <input type = "text" 
                    className = 'inpt_emailNameInput'
                    placeholder = "Email Address" required/><br/>
                <CheckboxLine />
                <button 
                    type = "button"
                    className="btn btn-primary btn-lg btn-success"> Create your account! </button>
            </form>
        );
    }
}

export default class SignUpApp extends React.Component{
  //  state = {completed: false};
    render(){
        return(
            <div className = "div_signup">
                <Title />
                <InputFields/>
            </div>
        );
    }

}

