import React from 'react';
import {Icon} from 'semantic-ui-react';
import firebase from 'firebase';
import axios from 'axios';

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        var that = this;
        console.log(this.props.routeParams.username);
        var userRef = firebase.database().ref('accounts/' + this.props.routeParams.username);
        userRef.on('value', function (snapshot) {
            if (!snapshot.val()) {
                //alert('No user found');
                return;
            } else {
                console.log(snapshot.val());
                axios.get(snapshot.val().data).then(function (response) {
                    var that2 = that;
                    that2.setState({
                        data: response.data
                    });
                });
            }
        });
    }

    render() {
        var profileInfo = this.state.data.info ? true : null;
        return (
            <div>
                {profileInfo ? 
                <div>
                    Hello my name is {this.state.data.info.firstName} {this.state.data.info.lastName}
                </div>
                    : <div style={ProfilePageStyle.NotFound}>
                        <Icon name="warning sign" />
                        <h1>User Not Found</h1>    
                    </div>}
            </div>
        );
    }
}

var ProfilePageStyle = {
    NotFound:{
        display: "block",
        margin: "auto",
        marginTop: '15%',
        width: "50%",
        border: "2px dotted white",
        top: "50%",
        left: "50%",
        textAlign: 'center'
    }
};