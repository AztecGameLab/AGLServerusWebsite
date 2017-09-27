//Imports
import React from 'react';
import { Icon, Loader } from 'semantic-ui-react';
import firebase from 'firebase';
import axios from 'axios';
import ProfilePage from './ProfilePage';
import { connect } from 'react-redux';

//AGL API
import { LoadUser, IsLoggedIn, IsYourProfile } from '../AGL';


class ProfilePageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileObject: {},
            notFound: false,
            editMode: false,
            loggedIn: false,
            yourAccount: false,
            rolesSelected: [],
            bio: '',
            facebookLink: '',
            twitterLink: '',
            linkedinLink: '',
            instagramLink: '',
            slackUser: ''

        };
        //bind edits to data here!
        this.editModeOn = this.editModeOn.bind(this);
        this.editModeOff = this.editModeOff.bind(this);
        this.handleProfileInput = this.handleProfileInput.bind(this);
        this.handleRolesInput = this.handleRolesInput.bind(this);
        this.handleBioInput = this.handleBioInput.bind(this);
        this.handleFacebook = this.handleFacebook.bind(this);
        this.handleTwitter = this.handleTwitter.bind(this);
        this.handleLinkedIn = this.handleLinkedIn.bind(this);
        this.handleInstagram = this.handleInstagram.bind(this);
        this.handleSlack = this.handleSlack.bind(this);
    }
    editModeOn() {
        this.setState({
            editMode: true
        });
    }

    editModeOff() {
        var that = this;
        let editedProfile = this.state.profileObject;
        editedProfile.info.bio = this.state.bio;
        if (this.state.facebookLink.length > 0) {
            editedProfile.info.facebookLink = 'https://www.facebook.com/' + this.state.facebookLink;
        }
        if (this.state.twitterLink.length > 0) {
            editedProfile.info.twitterLink = 'https://twitter.com/' + this.state.twitterLink;
        }
        if (this.state.linkedinLink.length > 0) {
            editedProfile.info.linkedInLink = 'https://www.linkedin.com/in/' + this.state.linkedinLink;
        }
        if (this.state.instagramLink.length > 0) {
            editedProfile.info.instagramUser = 'https://instagram.com/' + this.state.instagramLink;
        }
        if (this.state.slackUser.length > 0) {
            editedProfile.info.slackUser = this.state.slackUser;
        }
        this.setState({
            editMode: false,
            profileObject: editedProfile
        }, function () {
            var that2 = that;
            var accountRef = firebase.storage().ref('accounts/' + this.state.profileObject.info.username + '.json');
            var yourFile = new Blob([JSON.stringify(this.state.profileObject)], { type: 'application/json' });
            accountRef.put(yourFile).then(function () {
                accountRef.getDownloadURL().then(function (url) {
                    firebase.database().ref('accounts/' + that.state.profileObject.username).set({
                        data: url
                    });
                    return;
                });
            });
        });

    }
    handleProfileInput(e) {
        const yourAccount = this.state.profileObject;
        yourAccount.info.showcaseImage = e.target.name;
        this.setState({
            profileObject: yourAccount
        });
    }
    handleRolesInput(e, { value }) {
        const yourAccount = this.state.profileObject;
        yourAccount.info.roles = value;
        this.setState({
            rolesSelected: value,
            profileObject: yourAccount
        });
    }
    handleBioInput(e) {
        const yourAccount = this.state.profileObject;
        yourAccount.info.bio = e.target.value
        this.setState({
            bio: e.target.value,
            profileObject: yourAccount
        });
    }
    handleFacebook(e) {
        this.setState({
            facebookLink: e.target.value
        });
    }
    handleTwitter(e) {
        this.setState({
            twitterLink: e.target.value
        });
    }
    handleLinkedIn(e) {
        this.setState({
            linkedinLink: e.target.value
        });
    }
    handleInstagram(e) {
        this.setState({
            instagramLink: e.target.value
        });
    }
    handleSlack(e) {
        this.setState({
            slackUser: e.target.value
        });
    }


    async componentDidUpdate(nextProps, nextState) {
        debugger;
        if(this.state.profileObject.info) {
            if (this.state.profileObject.info.username != this.props.routeParams.username) {
                window.scrollTo(0, 0);
                this.setState({
                    profileObject: await LoadUser(this.props.routeParams.username),
                    yourAccount: IsYourProfile(this.props.accounts, this.props.routeParams.username)
                });
            } 
        }
    }
    
    async componentWillMount() {
        let userData = await LoadUser(this.props.routeParams.username);
        this.setState({
            profileObject: userData,
            loggedIn: IsLoggedIn(this.props.accounts),
            yourAccount: IsYourProfile(this.props.accounts, this.props.routeParams.username),
            rolesSelected: userData.info.roles,
            bio: userData.info.bio
        });        
        debugger;
        
    }

    render() {
        let loggedIn = this.state.loggedIn;
        var currentComponent;
        if (this.state.profileObject.info != null) {
            currentComponent = (
                <ProfilePage
                    profileObject={this.state.profileObject}
                    editMode={this.state.editMode}
                    editModeOn={this.editModeOn}
                    editModeOff={this.editModeOff}
                    loggedIn={loggedIn}
                    yourAccount={this.state.yourAccount}
                    handleProfileInput={this.handleProfileInput}
                    handleRolesInput={this.handleRolesInput}
                    rolesSelected={this.state.rolesSelected}
                    handleBioInput={this.handleBioInput}
                    bio={this.state.bio}
                    handleFacebook={this.handleFacebook}
                    handleTwitter={this.handleTwitter}
                    handleLinkedIn={this.handleLinkedIn}
                    handleInstagram={this.handleInstagram}
                    handleSlack={this.handleSlack}
                    slackUser={this.state.slackUser} />
            );
        }
        else if (this.state.notFound) {
            currentComponent = (
                <div style={ProfilePageStyle.NotFound}>
                    <Icon name="warning sign" />
                    <h1>User Not Found</h1>
                </div>);
        }
        else {
            currentComponent = (<Loader inverted>Loading</Loader>);
        }

        return (
            <div>
                {
                    currentComponent
                }
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts
        //this means i would like to access by this.props.accounts
        // the data within the state of our store named by root reducer
        // ownProps are the props of our component CoursesPage
    };
}

var ProfilePageStyle = {
    NotFound: {
        display: "block",
        margin: "auto",
        width: "50%",
        border: "2px dotted white",
        top: "50%",
        left: "50%",
        justifyContent: "centered"
    }
};

export default connect(mapStateToProps, null)(ProfilePageContainer)

