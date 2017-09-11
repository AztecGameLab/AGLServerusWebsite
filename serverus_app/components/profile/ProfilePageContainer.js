import React from 'react';
import {Icon, Loader} from 'semantic-ui-react';
import firebase from 'firebase';
import axios from 'axios';
import ProfilePage from './ProfilePage';

export default class ProfilePageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileObject: {},
            notFound: false
        };
        //bind edits to data here!
    }
    handleProfileInput(e) {
        debugger;
        const newAccount = this.state.profileObject;
        newAccount.info.showcaseImage = e.target.name;
        this.setState({
          profileObject: newAccount,
          startingIcon: e.target.name
        });
      }
    componentWillMount() {
        var that = this;
        console.log(this.props.routeParams.username);
        var userRef = firebase.database().ref('accounts/' + this.props.routeParams.username);
        userRef.on('value', function (snapshot) {
            if (!snapshot.val()) {
                that.setState({
                    notFound: true
                });
                return;
            } else {
                axios.get(snapshot.val().data).then(function (response) {
                    var that2 = that;
                    that2.setState({
                        profileObject: response.data
                    });
                });
            }
        });
    }

    render() {
        var currentComponent;
        if (this.state.profileObject.info != null){
            currentComponent = (
                <ProfilePage profileObject = {this.state.profileObject}/>
            );
        }
        else if (this.state.notFound){
            currentComponent = (
                <div style={ProfilePageStyle.NotFound}>
                    <Icon name="warning sign" />
                    <h1>User Not Found</h1>    
                </div>);
            } 
        else {
            currentComponent = (<Loader inverted>Loading</Loader>);
        }

        return(
            <div>
                {
                    currentComponent
                }
            </div>  
                );
            }
    }

var ProfilePageStyle = {
    NotFound:{
        display: "block",
        margin: "auto",
        width: "50%",
        border: "2px dotted white",
        top: "50%",
        left: "50%",
        justifyContent: "centered"
    }
};