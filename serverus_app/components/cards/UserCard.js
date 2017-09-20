import { Button, Card, Label, Divider, Grid, Icon, Popup } from 'semantic-ui-react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import React from 'react';
import { Link } from 'react-router';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountActions from '../actions/accountActions';
import rolesOptions from '../common/roleOptions';

class UserCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isYourFriend: false,
            loggedIn: false
        };
        this.toggleAddFriend = this.toggleAddFriend.bind(this);
    }

    toggleAddFriend() {
        var that = this;
        const previousState = this.state.isYourFriend;
        var friendInfo = this.props.user;
        var info = this.props.accounts[0].info;
        if (!previousState) {
            if (info.inbox.myRequests[friendInfo.info.username] == null)
                info.inbox.myRequests[friendInfo.info.username] = "sent";
        } else {
            delete info.inbox.myRequests[friendInfo.info.username];
        }
        var data = {
            uid: this.props.accounts[0].uid,
            info: this.props.accounts[0].info
        };
        var file = new Blob([JSON.stringify(data)], { type: 'application/json' });
        var pathRef = firebase.storage().ref('accounts/' + data.info.username + '.json');
        var friendRef = firebase.storage().ref('accounts/' + friendInfo.info.username + '.json');
        pathRef.put(file).then(function () {
            pathRef.getDownloadURL().then(function (url) {
                var username = firebase.auth().currentUser.displayName;
                firebase.database().ref('accounts/' + username).set({
                    data: url
                });
            });
        });
        if (friendInfo.info.inbox.friendRequests[this.props.accounts[0].info.username] == null) {
            friendInfo.info.inbox.friendRequests[this.props.accounts[0].info.username] = "pending";
        var friendData = {
            uid: friendInfo.uid,
            info: friendInfo.info
        };
        var friendFile = new Blob([JSON.stringify(friendData)], { type: 'application/json' });
        friendRef.put(friendFile).then(function () {
            friendRef.getDownloadURL().then(function (url) {
                firebase.database().ref('accounts/' + that.props.user.info.username).set({
                    data: url
                });
            });
        });
    } else {

    }
        this.setState({
            isYourFriend: !previousState
        });
    }

    roleMapper = (roles) => {
        let objectList = [];
        roles.map((userRole) => {
            objectList.push(rolesOptions.find(role => role.value === userRole));
        });
        return (objectList.map((role, idx) =>
            <Icon key={idx} color="grey" name={role.icon} style={{ marginRight: 20}} />
        ));
    };


    render() {
        let isYourFriend = this.state.isYourFriend;
        let loggedIn = this.props.accounts[0] ? true : null;
        return (
            <div id="UserCardContainer">
                <Card as={Link} style={CardStyle.card}>
                    <Card.Content>
                        <Grid columns={3} stretched>
                            <Grid.Column as={Link} to={"/u/" + this.props.user.info.username} width={6} style={{color: 'black', paddingRight: 0 }}>
                                <CloudinaryContext cloudName='aztecgamelab-com'>
                                    <Image publicId={this.props.user.info.showcaseImage} />
                                </CloudinaryContext>
                                <Card.Content>
                                    <Card.Header>
                                        {this.props.user.info.firstName + ' ' + this.props.user.info.lastName}
                                    </Card.Header>
                                    <Card.Meta>
                                        <Icon name='at' /> {this.props.user.info.username}
                                    </Card.Meta>
                                </Card.Content>
                            </Grid.Column>
                            <Divider vertical></Divider>
                            <Grid.Column width={8} style={{ paddingRight: 0, cursor: 'default' }}>
                                <div style={CardStyle.Main}>
                                    <Card.Content>
                                        <Card.Description>
                                            
                                            {this.props.user.info.bio.substring(0,150)}
                                            
                                        </Card.Description>
                                    </Card.Content>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={2} style={{ paddingRight: 0, height: 69 }}>
                                {loggedIn ? 
                                    (this.props.accounts[0].info.username == this.props.user.info.username) ? 
                                                                                                    null : 
                                                                                                    (!this.props.accounts[0].info.friends.hasOwnProperty(this.props.user.info.username)) ? 
                                    <Popup content='Add friend!' trigger={<Button circular icon="add user" color="blue" onClick={this.toggleAddFriend} />} /> :
                                    null : null}
                            </Grid.Column>
                            <Grid.Row style = {{marginLeft: 15, cursor: 'default'}}>
                            {this.roleMapper(this.props.user.info.roles)}
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card>
            </div>
        )
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
export default connect(mapStateToProps, null)(UserCard);

//CSS Styling
var CardStyle = {
    Main: {
        color: "#000000"
    },
    card: {
        width: '100%',
        color: 'black'
    },
    tags: {
        background: '#263238',
        color: 'white',
        paddingRight: 25,
        paddingLeft: 16
    },
}
