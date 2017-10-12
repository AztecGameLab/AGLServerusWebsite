import { Button, Card, Label, Divider, Grid, Icon, Popup } from 'semantic-ui-react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import roleOptions from '../options/roleOptions.json';
import { SendFriendRequest } from '../../AGL';

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
        const { isYourFriend } = this.state;
        var friendInfo = this.props.user;
        //change redux prop
        var myInfo = this.props.accounts[0];
        if (!isYourFriend) {
            if (myInfo.inbox.myRequests[friendInfo.username] == null)
                myInfo.inbox.myRequests[friendInfo.username] = "sent";
        } else {
            delete myInfo.inbox.myRequests[friendInfo.username];
        }

        if (friendInfo.inbox.friendRequests[myInfo.username] == null) {
            friendInfo.inbox.friendRequests[myInfo.username] = "pending";
        } 
        
        SendFriendRequest(myInfo, friendInfo);

        this.setState({
            isYourFriend: !isYourFriend
        });
    }

    //Move to API
    roleMapper = (roles) => {
        let objectList = [];
        roles.map((userRole) => {
            objectList.push(roleOptions.roles.find(role => role.value === userRole));
        });
        return (objectList.map((role, idx) =>
            <Icon key={idx} color="grey" name={role.icon} style={{ marginRight: 20 }} />
        ));
    };


    render() {
        let isYourFriend = this.state.isYourFriend;
        let loggedIn = this.props.accounts[0] ? true : null;
        return (
            <div id="UserCardContainer">
                <Card style={CardStyle.card}>
                    <Card.Content>
                        <Grid columns={3} stretched>
                            <Grid.Column as={Link} to={"/u/" + this.props.user.username} width={6} style={{ color: 'black', paddingRight: 0 }}>
                                <CloudinaryContext cloudName='aztecgamelab-com'>
                                    <Image publicId={this.props.user.showcaseImage} />
                                </CloudinaryContext>
                                <Card.Content>
                                    <Card.Header>
                                        {this.props.user.firstName + ' ' + this.props.user.lastName}
                                    </Card.Header>
                                    <Card.Meta>
                                        <Icon name='at' /> {this.props.user.username}
                                    </Card.Meta>
                                </Card.Content>
                            </Grid.Column>
                            <Divider vertical></Divider>
                            <Grid.Column width={8} style={{ paddingRight: 0, cursor: 'default' }}>
                                <div style={CardStyle.Main}>
                                    <Card.Content>
                                        <Card.Description>

                                            {this.props.user.bio.substring(0, 150)}

                                        </Card.Description>
                                    </Card.Content>
                                </div>
                            </Grid.Column>
                            {/* <Grid.Column width={2} style={{ paddingRight: 0, height: 69 }}>
                                {loggedIn ?
                                    (this.props.accounts[0].username == this.props.user.username) ?
                                        null :
                                        (!this.props.accounts[0].friends.hasOwnProperty(this.props.user.username)) ?
                                            <Popup content='Add friend!' trigger={<Button circular icon="add user" color="blue" onClick={this.toggleAddFriend} />} /> :
                                            null : null}
                            </Grid.Column> */}
                            <Grid.Row style={{ marginLeft: 15, cursor: 'default' }}>
                                {this.roleMapper(this.props.user.roles)}
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
