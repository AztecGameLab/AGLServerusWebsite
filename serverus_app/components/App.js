import React from 'react';
import axios from 'axios';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountActions from './redux/actions/accountActions';
import * as adminActions from './redux/actions/adminActions';
import Routes from '../routes';
import HeaderMenu from './navigation/HeaderMenu';
import Footer from './navigation/Footer';
import LoginModel from './login/LoginModel';
import tags from '../styles/tags.css';
import { IsAdmin, LoadProfile, WildCard } from './AGL';
import HomePage from './home/TempHomePage';

const history = createHistory();
require('../../favicon.ico');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            signedUp: false,
            modelIsOpen: false,
            activeIndex: 0,
            history: history
        };
        this.openLogin = this.openLogin.bind(this);
        this.closeLogin = this.closeLogin.bind(this);
        this.changeTabIndex = this.changeTabIndex.bind(this);
        this.signedUp = this.signedUp.bind(this);
        this.signOut = this.signOut.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.search = this.search.bind(this);
    }

    componentWillMount() {
        var that = this;
        this.isPageMounted = false;
        //Move to API 
        firebase.auth().onAuthStateChanged(async function (user) {
            if (user) {
                let userObj = await LoadProfile(user.displayName);
                let isAdmin = await IsAdmin(user.uid);
                if (!that.props.accounts[0]) {
                    that.props.accountActions.loadAccount(userObj);
                    that.props.adminActions.giveAccess(isAdmin);
                    that.setState({
                        loggedIn: true,
                        isAdmin: isAdmin    //not used anywhere
                    });
                }
            }
        });
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

    handleSearch = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    search = (e) => {
        //Prevent Search input to clear
        e.preventDefault();
        e.stopPropagation();

        //Redirects to specified path
        history.push("/search/" + this.state.search);
        //AGL API call to retrieve search data, I was thinking we could firebase here to store in redux store for faster async results and 
        //in the SearchDirectory component we can have a componentDidUpdate to listen for a flag when query results are successfully pushed into store.
    }
    //{this.props.children }
    render() {
        return (
            <Router history={history} >
                <div>
                    <div style={AppStyle.mainContent}>
                        {/* {React.cloneElement(<HomePage/>, { showModal: this.openLogin})} */}
                        <Routes showModal={this.openLogin} />
                        <HeaderMenu style={AppStyle.transparentOverlay} loggedIn={this.state.loggedIn} handleSearch={this.handleSearch} search={this.search}></HeaderMenu>
                    </div>
                    <Footer />
                    <LoginModel activeIndex={this.state.activeIndex} isOpen={this.state.modelIsOpen} close={this.closeLogin} changeTab={this.changeTabIndex} signedUp={this.signedUp} />
                </div>
            </Router>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        accountActions: bindActionCreators(accountActions, dispatch),
        adminActions: bindActionCreators(adminActions, dispatch)
        //this will go through the courseActions file and wrap with dispatch
    };
}
function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts,
        access: state.access,
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
    },
    transparentOverlay: {
        position: 'absolute',
        top: 0
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);