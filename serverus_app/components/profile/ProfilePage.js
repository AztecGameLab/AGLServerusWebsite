import React, { Component } from 'react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import { Grid, Icon, Card, Tab, Button } from 'semantic-ui-react';
import IconPicker from '../common/IconPicker';
import ProfilePane from './ProfilePane';
import PortfolioPane from './PortfolioPane';
import TeamsPane from './TeamsPane';

//DATA IS IN userData!! userData.firstName for example
const ProfilePage = (props) => {
    const imageLarge = (originalLink) => {
        return originalLink.replace("Small", "Large");
    };
    const dataPrettify = (originalDate) => {
        var parts = originalDate.split("/");
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var month = monthNames[parts[0] - 1];
        var day = parts[1];
        var year = parts[2].split(" ")[0];
        return (month + " " + day + ", " + year);
    };
    const userData = props.profileObject.info;
    const panes = [
        {
            menuItem: { key: 'Profile', icon: 'home', content: 'Profile' },
            render: () => <Tab.Pane attached={false}>
                <ProfilePane userData={props.profileObject.info} />
            </Tab.Pane>
        },

        {
            menuItem: { key: 'Portfolio', icon: 'folder open', content: 'Portfolio' },
            render: () => <Tab.Pane attached={false}>
                <PortfolioPane userData={props.profileObject.info} />
            </Tab.Pane>
        },

        {
            menuItem: { key: 'Teams', icon: 'group', content: 'Teams' },
            render: () => <Tab.Pane attached={false}>
                <TeamsPane userData={props.profileObject.info} />
            </Tab.Pane>
        }
    ];

    return (
        <div>
            <Grid columns={2} inverted padded>
                <Grid.Column width={4}>
                    <Card>
                        <IconPicker
                            startingIcon={imageLarge(userData.showcaseImage)}
                            handleProfileInput={props.handleProfileInput}
                            editEnabled={false} />
                        <Card.Content>
                            <Card.Header>
                                {userData.firstName + ' ' + userData.lastName}
                            </Card.Header>
                            <Card.Meta>
                                <Icon name='at' />{userData.username}
                            </Card.Meta>
                            <Card.Description>
                                {userData.bio}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            badges and such go here
                    </Card.Content>
                        <Card.Content extra>
                        <Button circular color='facebook' icon='facebook' />
                        <Button circular color='twitter' icon='twitter' />
                        <Button circular color='linkedin' icon='linkedin' />
                        <Button circular color='instagram' icon='instagram' />
                    </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={12}>
                    Sections
                <Tab menu={{ attached: false }} panes={panes} />
                </Grid.Column>
            </Grid>
        </div>
    );
};

/*
.ui.menu>.item:first-child {
    /* max-width: 200px; */
/* padding: 0; */
/*margin-left: 15px;*/
/* background-color: black; */



export default ProfilePage;
=======
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
>>>>>>> dev-markdown
