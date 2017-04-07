import React from 'react';
import formStyle from '../style/signupstyle.css';

const Title = () => {
    return(
        <div className = 'signUpTitle'>
            <img src = {require('../assets/placeholder_logo.jpg')}/>
        </div>
    );
};

// class checkboxLine extends React.Component {
//     render()
// }

class InputFields extends React.Component{
// state = {validInputs: false,};
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