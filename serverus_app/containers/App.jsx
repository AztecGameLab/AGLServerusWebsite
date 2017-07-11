import React from 'react'
import style from '../style/style.css'
import OuterFrame from '../components/OuterFrame.jsx'

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
                <OuterFrame loggedIn={loggedIn}
                    loginAuth={this.loginAuth} />
            </div>
        )
    }
}


