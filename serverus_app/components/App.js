import React, { PropTypes } from 'react';
import axios from 'axios';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as accountActions from './actions/accountActions';
import HeaderMenu from './common/HeaderMenu';
import LoginModel from './login/LoginModel';
require('../../favicon.ico');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            signedUp: false,
            modelIsOpen: false,
            activeIndex: 0
        };
        this.openLogin = this.openLogin.bind(this);
        this.closeLogin = this.closeLogin.bind(this);
        this.changeTabIndex = this.changeTabIndex.bind(this);
    }

    componentWillMount() {
        var that = this;
        this.isPageMounted = false;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var refString = 'accountData/' + user.displayName;                
                var userUrlRef = firebase.database().ref(refString);
                userUrlRef.on('value', function(snapshot) {
                    var that2 = that;
                    if (that2.state.modelIsOpen && that2.state.signedUp) return;
                    axios.get(snapshot.val().data)
                    .then(function(response) {
                        debugger;
                        var that3 = that2;
                        that3.props.actions.loadAccount(response.data);
                        alert('User LOADED IN redux!!!');
                    }).then(function() {
                        var that3 = that2;
                        that3.setState ({
                            loggedIn : true
                        });
                    });
                });
            }
            else {
                console.log('NO USER LOGGED IN');
            }
        })
    }

    openLogin(activeIndex) {
        this.changeTabIndex(activeIndex);
        this.setState({
            modelIsOpen: true
        });
    }
    changeTabIndex(activeIndex) {
        this.setState({
            activeIndex: activeIndex
        });
    }
    closeLogin() {
        this.setState({
            modelIsOpen: false
        });
    }
    
    signedUp = () => {
        if(this.state.signedUp) {
            window.location.reload();
        } else {
            this.setState({
                signedUp: true
            })
        }
    }
    signOut = () => {
        debugger;
        firebase.auth().signOut().then(function() {
            alert('USER SIGNED OUT!!');
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        })
        this.props.actions.signOutAccount();
        this.setState({
            loggedIn: false
        });
    }

    render() {
        // var header = this.state.loggedIn == true ? true : false;
        return (
            <div>
                <HeaderMenu loggedIn={this.state.loggedIn} showModel={this.openLogin} signOut={this.signOut}></HeaderMenu>
                <div style={AppStyle.mainContent}>{this.props.children}</div>
                <LoginModel activeIndex={this.state.activeIndex} isOpen={this.state.modelIsOpen} close={this.closeLogin} changeTab={this.changeTabIndex} signedUp={this.signedUp}/>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(accountActions,dispatch)
        //this will go through the courseActions file and wrap with dispatch
    };
}

var AppStyle = {

    mainContent: {
        color: 'white',
        marginLeft: 0,
        fontSize: '1.5em',
        zIndex: -1
    }
};

App.propTypes = {
    children: PropTypes.object
};

export default connect(null, mapDispatchToProps)(App);