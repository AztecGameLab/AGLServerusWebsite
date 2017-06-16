import React from 'react'
import style from '../style/style.css'
import NavigationBar from '../components/NavigationBar.jsx'

export default class App extends React.Component {
    state = {
        loggedIn: false,
        authToken: ''
    }
    loginAuth = () => {
        //authorization TODO
        //Auto login testing for now
        this.setState(prevState => ({
            loggedIn: !prevState.loggedIn
        }));
    };

    render() {
        //Destructuring state objects
        const {
            loggedIn,
        } = this.state;
        
        return (
            <div>
                <NavigationBar loggedIn={loggedIn}
                    loginAuth={this.loginAuth} />
            </div>
        )
    }
}


