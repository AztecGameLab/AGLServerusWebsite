import {Card, Dimmer, Loader, Grid, Icon, Feed, Label, Button} from 'semantic-ui-react';
import React from 'react';
import md5 from 'md5';
const InboxLayout = (props) => {
    var userData = props.profileObject.info;

    // "inbox":{
    //     "friendRequests":{},
    //     "teamRequests":{},
    //     "myRequests":{
    //         "dopedicc":"sent"
    //     }
    // }

    const friendRequestMapper = (requests) => {
        if(Object.keys(requests).length > 0) {
            var keys = Object.keys(requests);
            return (keys.map((key)=> 
                    <Feed.Content key={md5(key)}>
                        <Icon name= 'hand peace' size='large' />
                            {key + ' sent you a friend request!'} 
                            <br/>
                            <Button circular color='green' icon='check' onClick = {() => props.acceptFriend(key)}/>
                            {false && <Button circular color='google plus' icon='cancel' onClick = {() => props.declineFriend(key)}/>}
                    </Feed.Content>
            ));
        }
        else {
            return <Feed.Content key={'emptyFriends'}>
                    <Icon name= 'hourglass empty' size='large' />
                        No friend invites at this time.
                    </Feed.Content>;
        }
    };

    const teamRequestMapper = (requests) => {
        if(Object.keys(requests).length > 0) {
            var keys = Object.keys(requests);
            return (keys.map((key)=> 
                    <Feed.Content key={md5(key)+ 3}>
                        <Icon name= 'github alternate' size='large' />
                            {key + ' sent you a team request!'} 
                            <Button circular color='green' icon='check' />
                            <Button circular color='google plus' icon='cancel' />
                    </Feed.Content>
            ));
        }
        else {
            return <Feed.Content key={'emptyFriends'}>
                    <Icon name= 'hourglass empty' size='large' />
                        No team invites at this time.
                    </Feed.Content>;
        }
    };

    const sentRequestMapper = (requests) => {
        if(Object.keys(requests).length > 0) {
            var keys = Object.keys(requests);
            return (keys.map((key)=> 
                    <Feed.Content key={md5(key)+ 5}>
                        <Icon name= 'hand outline right' size='large' />
                            {'You sent ' + key + ' a friend request '} 
                            <br/>
                            <Icon name = 'spinner' size = 'large'/> 
                                {'Status: ' + requests[key]}
                    </Feed.Content>
            ));
        }
        else {
            return <Feed.Content key={'emptyFriends'}>
                    <Icon name= 'hourglass empty' size='large' />
                        No sent requests at this time.
                    </Feed.Content>;
        }
    };

    return(
        <div>
        {props.loading ? 
            <Dimmer active>
                <Loader>Loading</Loader>
            </Dimmer>
            :
            <div>
            <br/><br/><br/>
            <Grid columns={3} divided centered>
                <Grid.Column width = {5}>
                </Grid.Column>
                <Grid.Column width = {6}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>
                                <Icon name = 'inbox' size = 'huge'/>Inbox
                            </Card.Header>
                        </Card.Content>
                        
                        <Card.Content>
                            <Card.Header>
                            <Icon name = 'add user' size = 'large'/> Friend Invites
                            <hr/>
                                <Feed>
                                    {friendRequestMapper(userData.inbox.friendRequests)}
                                </Feed>
                            </Card.Header>
                        </Card.Content>

                        <Card.Content>
                            <Card.Header>
                            <Icon name = 'pied piper alternate' size = 'big'/> Team Invites
                            <hr/>
                                <Feed>
                                    {teamRequestMapper(userData.inbox.teamRequests)}
                                </Feed>
                            </Card.Header>
                        </Card.Content>

                        <Card.Content>
                            <Card.Header>
                            <Icon name = 'cubes' size = 'large'/> My Requests
                            <hr/>
                                <Feed>
                                    {sentRequestMapper(userData.inbox.myRequests)}
                                </Feed>
                            </Card.Header>
                        </Card.Content>

                    </Card>
                </Grid.Column>
                <Grid.Column width = {5}>
                </Grid.Column>
            </Grid>
            <br/><br/><br/>
            </div>
        }
        </div>
    );
};

export default InboxLayout;