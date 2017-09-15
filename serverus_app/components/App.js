import React, { PropTypes } from 'react';
import axios from 'axios';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountActions from './actions/accountActions';
import HeaderMenu from './common/HeaderMenu';
import Footer from './common/Footer';
import LoginModel from './login/LoginModel';
import tags from './cards/tags.css'
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
                var refString = 'accounts/' + user.displayName;
                var userUrlRef = firebase.database().ref(refString);
                userUrlRef.on('value', function (snapshot) {
                    var that2 = that;
                    if (that2.state.modelIsOpen) return;
                    axios.get(snapshot.val().data)
                        .then(function (response) {
                            var that3 = that2;
                            if (!that3.props.accounts[0])
                                that3.props.actions.loadAccount(response.data);
                        }).then(function () {
                            var that3 = that2;
                            that3.setState({
                                loggedIn: true
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
        if (this.state.signedUp) {
            window.location.reload();
        } else {
            this.setState({
                signedUp: true
            })
        }
    }
    signOut = () => {
        firebase.auth().signOut().then(window.location.reload())
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            })
        this.props.actions.signOutAccount();
    }

    render() {
        return (
            <div>
                <HeaderMenu loggedIn={this.state.loggedIn} showModel={this.openLogin} signOut={this.signOut}></HeaderMenu>
                <div style={AppStyle.mainContent}>{this.props.children}</div>
                <Footer />
                <LoginModel activeIndex={this.state.activeIndex} isOpen={this.state.modelIsOpen} close={this.closeLogin} changeTab={this.changeTabIndex} signedUp={this.signedUp} />
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(accountActions, dispatch)
        //this will go through the courseActions file and wrap with dispatch
    };
}
function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts
        //this means i would like to access by this.props.accounts
        // the data within the state of our store named by root reducer
        // ownProps are the props of our component CoursesPage
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

export default connect(mapStateToProps, mapDispatchToProps)(App);