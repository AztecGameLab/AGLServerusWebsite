import React, { Component } from 'react';
import { Image as CloudImage, CloudinaryContext } from 'cloudinary-react';
import { Grid, Icon, Card, Tab, Button, List, Popup, Feed, Dropdown, TextArea, Input, Label } from 'semantic-ui-react';
import IconPicker from '../common/icon/IconPicker';
import { Link } from 'react-router-dom';
import roleOptions from '../common/options/roleOptions.json';
import badgeOptions from '../common/options/badgeOptions.json';
import md5 from 'md5';
import style from '../../styles/friend.css';
import roleNames from '../common/options/roleNamesOnly.json';

//DATA IS IN userData!! userData.firstName for example
const ProfilePage = (props) => {
    const userData = props.profileObject;

    const ImageLarge = (originalLink) => {
        return originalLink.replace("Small", "Large");
    };

    const dataPrettify = (originalDate) => {
        const parts = originalDate.split("/");
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[parts[0] - 1];
        const day = parts[1];
        const year = parts[2].split(" ")[0];
        return (month + " " + day + ", " + year);
    };

    //Move to API
    const roleMapper = (roles) => {
        let objectList = [];
        roles.map((userRole) => {
            objectList.push(roleOptions.roles.find(role => role.value === userRole));
        });
        return (objectList.map((role, idx) =>
            <div key={idx}>
                <Feed.Content key={idx}>
                    <Icon name={role.icon} size='large' />
                    {role.text}
                </Feed.Content>
            </div>
        ));
    };
    const friendMapper = (friendObject) => {
        if(friendObject.length > 0) {
            var keys = friendObject;
            return (keys.map((key)=> 
                <Feed.Content key={md5(key)+ 7} >
                    <Icon name= 'heart outline' size='large' />
                    <Link to= {'/u/' + key} className = 'friend'> {' @ ' + key} </Link>
                </Feed.Content>
            ));
        }
        else {
            return <div></div>;
        }
    };
    const badgeMapper = (badges) => {
        let objectList = [];
        //console.log(badgeOptions.badge);
        return (badges.map((badge, idx) =>
            <Popup
                key={idx}
                trigger={<CloudImage publicId={badge}></CloudImage>}
                header={'Early Adopter'}
                content={'Joined AGL in its first semester!'}
            />
        ));
    };

    const evalUsername = (username) => {
        if(username==='') return 'Username';
        return username;
    };

    const evalUserLastDelim = (username) => {
        username = String(username);
        let ret = username.substring(username.lastIndexOf('/')+1);
        if(ret === '' ) return 'Username';
        return ret;
    }

    return (
        <div>
        <CloudinaryContext cloudName='aztecgamelab-com' >
        <CloudImage publicId="WebsiteAssets/header.png" style = {{width: "100%"}}/>
        <br/><br/>
            <Grid columns={4} inverted padded>
                <Grid.Column width={1}>
                </Grid.Column>
                <Grid.Column width={3} >
                    <Card fluid>
                        <IconPicker
                            startingIcon={ImageLarge(userData.showcaseImage)}
                            handleProfileInput={props.handleProfileInput}
                            editEnabled={props.editMode} />
                        <Card.Content>
                            <Card.Header>
                                {userData.firstName + ' ' + userData.lastName}
                            </Card.Header>
                            <Card.Meta>
                                <Icon name='at' /> {userData.username}
                            </Card.Meta>
                            <br/>
                            {props.editMode ? 
                                <Input style = {{fontSize: '15px'}} iconPosition='left' onChange = {props.handleSlack} >
                                    <Icon name='slack' />
                                    <input placeholder={ evalUsername(userData.slackUser) }/>
                                </Input>
                            :
                            <Popup
                                trigger={
                                    <Label basic color = 'black' as='a'>
                                        <Icon name='slack' size = 'large'/> Slack
                                    </Label>}
                                header={'Slack Username'}
                                content={'@ ' + userData.slackUser}
                            />
                            }
                        </Card.Content>

                        <Card.Content>
                            <Card.Header>
                                <Feed>
                                    <Feed.Content>
                                        <Icon name='university' size='large' />
                                        {userData.school}
                                    </Feed.Content>
                                    <Feed.Content>
                                        <Icon name='student' size='large' />
                                        {userData.major}
                                    </Feed.Content>
                                    <Feed.Content>
                                        <Icon name='user plus' size='large' />
                                        {dataPrettify(userData.dateJoined)}
                                    </Feed.Content>
                                </Feed>
                            </Card.Header>
                        </Card.Content>

                        <Card.Content>
                            <Card.Header>
                                <Feed>
                                    {props.editMode ? 
                                        <Dropdown 
                                            placeholder='Roles' 
                                            fluid multiple selection options={roleNames.roles}
                                            value={props.rolesSelected} 
                                            onChange={props.handleRolesInput} /> : roleMapper(userData.roles)}
                                </Feed>
                            </Card.Header>
                        </Card.Content>

                        <Card.Content extra>
                            <CloudinaryContext cloudName='aztecgamelab-com'>
                                {badgeMapper(userData.badges)}
                            </CloudinaryContext>
                        </Card.Content>
                        <Card.Content extra>
                            {props.editMode ? 
                            <div>
                            <Input style = {{fontSize: '15px'}} iconPosition='left' onChange = {props.handleFacebook}>
                                <Icon name='facebook' />
                                <input placeholder={evalUserLastDelim(userData.facebookLink)}/>
                            </Input>
                            <Input style = {{fontSize: '15px'}} iconPosition='left' onChange = {props.handleTwitter}>
                                <Icon name='twitter' />
                                <input placeholder={evalUserLastDelim(userData.twitterLink)}/>
                            </Input>
                            <Input style = {{fontSize: '15px'}} iconPosition='left' onChange = {props.handleLinkedIn}>
                                <Icon name='linkedin' />
                                <input placeholder={evalUserLastDelim(userData.linkedInLink)}/>
                            </Input>
                            <Input style = {{fontSize: '15px'}} iconPosition='left' onChange = {props.handleInstagram}>
                                <Icon name='instagram' />
                                <input placeholder={evalUserLastDelim(userData.instagramUser)}/>
                            </Input>
                            </div>
                            :
                            <div>
                                <Button disabled = {userData.facebookLink.length < 30} circular color='facebook' icon='facebook' href={userData.facebookLink} />
                                <Button disabled = {userData.twitterLink.length < 30} circular color='twitter' icon='twitter' href={userData.twitterLink} />
                                <Button disabled = {userData.linkedInLink.length < 30} circular color='linkedin' icon='linkedin' href={userData.linkedInLink} />
                                <Button disabled = {userData.instagramUser.length < 30} circular color='instagram' icon='instagram' href={userData.instagramUser} />                                
                            </div>
                        }
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={9}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>
                                <Icon name = 'street view' size = 'huge' color = 'teal'/> About Me!
                                {(props.loggedIn && !props.yourAccount && false) && 
                                    <Popup 
                                        content='Add friend!' 
                                        trigger={<Button 
                                                    floated = 'right' 
                                                    size = 'massive' 
                                                    circular icon="add user" 
                                                    color="blue" />
                                                }/>}
                            </Card.Header>
                        </Card.Content>

                        <Card.Content>
                            <Card.Description>
                                <Icon name='quote left' size = 'small' />
                                {props.editMode ? 
                                    <div>
                                        <TextArea 
                                            maxLength = "300"
                                            style = {profileEdit.bio} 
                                            placeholder='Hi tell us about yourself! :)' 
                                            onChange = {props.handleBioInput}
                                            value = {props.bio}/>
                                            <div>{"Word Count: " + props.bio.length + " (must be less than 300 characters)"}</div>
                                    </div>
                                    : userData.bio}
                                <Icon name='quote right' size = 'small'/>
                            </Card.Description>
                        </Card.Content>

                        <Card.Content>
                            <Card.Header>
                                <Icon name = 'bomb' size = 'huge' color = 'teal'/> Games
                            </Card.Header>
                        </Card.Content>

                        <Card.Content>
                            <Card.Description>
                                Game submission coming soon!
                            </Card.Description>
                        </Card.Content>

                        <Card.Content>
                            <Card.Header>
                                <Icon name = 'tint' size = 'huge' color = 'teal'/> Art
                            </Card.Header>
                        </Card.Content>

                        <Card.Content>
                            <Card.Description>
                                Art submission coming soon!
                            </Card.Description>
                        </Card.Content>

                        <Card.Content>
                            <Card.Header>
                                <Icon name = 'music' size = 'huge' color = 'teal'/> Music
                            </Card.Header>
                        </Card.Content>

                        <Card.Content>
                            <Card.Description>
                                Music submission coming soon!
                            </Card.Description>
                        </Card.Content>

                        <Card.Content>
                            <Card.Header>
                               <Icon name = 'hand victory' size = 'huge' color = 'teal'/> Friends
                            </Card.Header>
                        </Card.Content>

                        <Card.Content>
                            <Card.Description>
                                {userData.friends == 0 && <div>Add a friend! </div>}
                                {userData.friends != null ? friendMapper(userData.friends) : null}
                            </Card.Description>
                        </Card.Content>
                        <hr />
                    </Card>
                </Grid.Column>
                <Grid.Column width={2}>
                    {
                    props.yourAccount && false &&
                    <div>
                        <Button 
                            fluid 
                            onClick = {props.editModeOn} 
                            icon = 'edit' 
                            color = 'blue' 
                            content = 'Edit My Profile!' 
                            size = 'medium'/>
                        <hr/>
                        <Button 
                            disabled = {!props.editMode} 
                            onClick = {props.editModeOff} 
                            fluid 
                            icon = 'save' 
                            color = 'green' 
                            content = 'Save My Changes!' 
                            size = 'medium'/>
                    </div>
                    }
                </Grid.Column>
            </Grid>
            <br/><br/><br/>
            </CloudinaryContext>
        </div>
    );
};


var profileEdit = {
    bio: {
        width: '100%',
        padding: '10px',
        borderRadius: '10px',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'green'
    }
};

/*
.ui.menu>.item:first-child {
    /* max-width: 200px; */
/* padding: 0; */
/*margin-left: 15px;*/
/* background-color: black; */



export default ProfilePage;
