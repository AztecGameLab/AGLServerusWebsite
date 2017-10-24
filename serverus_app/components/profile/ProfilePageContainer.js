//Imports
import React from 'react';
import { Icon, Loader } from 'semantic-ui-react';
import firebase from 'firebase';
import axios from 'axios';
import ProfilePage from './ProfilePage';
import { connect } from 'react-redux';

//AGL API
import { LoadProfile, IsLoggedIn, IsYourProfile, EditProfile } from '../AGL';


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
        editedProfile.bio = this.state.bio;
        if (this.state.facebookLink.length > 0) {
            editedProfile.facebookLink = 'https://www.facebook.com/' + this.state.facebookLink;
        }
        if (this.state.twitterLink.length > 0) {
            editedProfile.twitterLink = 'https://twitter.com/' + this.state.twitterLink;
        }
        if (this.state.linkedinLink.length > 0) {
            editedProfile.linkedInLink = 'https://www.linkedin.com/in/' + this.state.linkedinLink;
        }
        if (this.state.instagramLink.length > 0) {
            editedProfile.instagramUser = 'https://instagram.com/' + this.state.instagramLink;
        }
        if (this.state.slackUser.length > 0) {
            editedProfile.slackUser = this.state.slackUser;
        }
        this.setState({
            editMode: false,
            profileObject: editedProfile
        }, function() {
            firebase.auth().onAuthStateChanged(async function (user) {
                if (user) {
                    
                    let response = await EditProfile(user.displayName, user.uid, that.state.profileObject);
                }
                else{
                    return alert('WARNING FALSIFIED EDIT');
                }
            }); 
        });
    }
    handleProfileInput(e) {
        const yourAccount = this.state.profileObject;
        yourAccount.showcaseImage = e.target.name;
        this.setState({
            profileObject: yourAccount
        });
    }
    handleRolesInput(e, { value }) {
        const yourAccount = this.state.profileObject;
        yourAccount.roles = value;
        this.setState({
            rolesSelected: value,
            profileObject: yourAccount
        });
    }
    handleBioInput(e) {
        const yourAccount = this.state.profileObject;
        yourAccount.bio = e.target.value
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
        if(this.state.profileObject.info) {
            if (this.state.profileObject.username != this.props.match.params.username) {
                window.scrollTo(0, 0);
                this.setState({
                    profileObject: await LoadProfile(this.props.match.params.username),
                    yourAccount: IsYourProfile(this.props.accounts, this.props.match.params.username)
                });
            } 
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.accounts.length > 0) {
            this.setState({
                loggedIn: true,
                yourAccount: IsYourProfile(this.props.accounts, this.props.match.params.username),
            });  
        }
    }
    async componentWillMount() {
        let userData = await LoadProfile(this.props.match.params.username);
        
        this.setState({
            profileObject: userData,
            rolesSelected: userData.roles,
            bio: userData.bio
        });        
    }

    render() {
        let loggedIn = this.state.loggedIn;
        var currentComponent;
        if (this.state.profileObject.firstName != null) {
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

