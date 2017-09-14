import { Button, Card, Label, Divider, Grid, Icon, Popup } from 'semantic-ui-react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountActions from '../actions/accountActions';
import rolesOptions from '../common/roleOptions';

class UserCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friend: false,
            loggedIn: false
        };
        this.toggleAddFriend = this.toggleAddFriend.bind(this);
    }

    toggleAddFriend() {
        var that = this;
        const previousState = this.state.friend;

        var info = this.props.accounts[0].info;
        if (!previousState) {
            if (!info.friends.includes(this.props.keyUrl))
                info.friends.push(this.props.keyUrl);
        } else {
            info.friends.splice(info.friends.indexOf(this.props.info.username));
        }
        var data = {
            uid: this.props.accounts[0].uid,
            info: this.props.accounts[0].info
        };
        var file = new Blob([JSON.stringify(data)], { type: 'application/json' });
        var pathRef = firebase.storage().ref('accounts/' + data.info.username + '.json');
        pathRef.put(file).then(function () {
            pathRef.getDownloadURL().then(function (url) {
                var username = firebase.auth().currentUser.displayName;
                firebase.database().ref('accounts/' + username).set({
                    data: url
                });
            });
        });
        this.setState({
            friend: !previousState
        });
    }

    roleMapper = (roles) => {
        let objectList = [];
        roles.map((userRole) => {
            objectList.push(rolesOptions.find(role => role.value === userRole));
        });
        return (objectList.map((role, idx) =>
            <Icon key={idx} color="grey" name={role.icon} style={{ marginRight: 25 }} />
        ));
    };
    

    render() {
        let friend = this.state.friend;
        let loggedIn = this.props.accounts[0] ? true : null;
        return (
            <div id="UserCardContainer">
                <Card as={Link} to={"/u/" + this.props.user.info.username} style={CardStyle.card}>
                    <Card.Content>
                        <Grid columns={3} stretched>
                            <Grid.Column width={6} style={{ paddingRight: 0 }}>
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
                            <Grid.Column width={8} style={{ paddingRight: 0 }}>
                                <div style={CardStyle.Main}>
                                    <Card.Content>
                                        <Card.Description>
                                            <Icon name='quote left' size='small' />
                                            {this.props.user.info.bio} hi there georgie
                                <Icon name='quote right' size='small' />
                                        </Card.Description>
                                    </Card.Content>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={2} style={{ paddingRight: 0, height: 69 }}>
                                {loggedIn ? friend ? <Popup content='Remove that bitch' trigger={<Button circular icon="remove user" color="red" onClick={this.toggleAddFriend} />}/> :
                                <Popup content='Add friend!' trigger={<Button circular icon="add user" color="blue" onClick={this.toggleAddFriend} />}/> : null}
                            </Grid.Column>
                            <div style={CardStyle.gridTag}>
                                {this.roleMapper(this.props.user.info.roles)}
                            </div>
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
    gridTag: {
        marginLeft: 15,
    }
}
