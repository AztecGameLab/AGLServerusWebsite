import React, { Component } from 'react';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { Grid, Icon, Card, Tab, Button, List, Popup, Feed, Dropdown, TextArea, Input, Label } from 'semantic-ui-react';
import IconPicker from '../common/IconPicker';
import roles2 from '../common/roleOptions2';
import badgeDescriptions from '../common/badgeOptions';

//DATA IS IN userData!! userData.firstName for example
const ProfilePage = (props) => {
    const userData = props.profileObject.info;
    const roleOptions = roles2;
    const badgeDescriptions = badgeDescriptions;

    const imageLarge = (originalLink) => {
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

    const roleMapper = (roles) => {
        let objectList = [];
        roles.map((userRole) => {
            objectList.push(roleOptions.find(role => role.value === userRole));
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
    const badgeMapper = (badges) => {
        let objectList = [];
        //console.log(badgeDescriptions.badge)
        return (badges.map((badge, idx) =>
            <Popup
                key={idx}
                trigger={<Image publicId={badge}></Image>}
                header={'Early Adopter'}
                content={'Joined AGL in its first semester!'}
            />
        ));
    };

    return (
        <div>
        <br/><br/>
            <Grid columns={4} inverted padded>
                <Grid.Column width={1}>
                </Grid.Column>
                <Grid.Column width={3} >
                    <Card fluid>
                        <IconPicker
                            startingIcon={imageLarge(userData.showcaseImage)}
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
                                <Input style = {{fontSize: '15px'}} iconPosition='left' placeholder='Username' onChange = {props.handleSlack} value = {props.slackUser}>
                                    <Icon name='slack' />
                                    <input />
                                </Input>
                            :
                            <Popup
                                trigger={
                                    <Label basic color = 'black' as='a'>
                                        <Icon name='slack' size = 'large'/> Slack
                                    </Label>}
                                header={'Slack Username'}
                                content={'@ ' + props.slackUser}
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
                                            fluid multiple selection options={roles2}
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
                            <Input style = {{fontSize: '15px'}} iconPosition='left' placeholder='Username' onChange = {props.handleFacebook}>
                                <Icon name='facebook' />
                                <input />
                            </Input>
                            <Input style = {{fontSize: '15px'}} iconPosition='left' placeholder='Username' onChange = {props.handleTwitter}>
                                <Icon name='twitter' />
                                <input />
                            </Input>
                            <Input style = {{fontSize: '15px'}} iconPosition='left' placeholder='Username' onChange = {props.handleLinkedIn}>
                                <Icon name='linkedin' />
                                <input />
                            </Input>
                            <Input style = {{fontSize: '15px'}} iconPosition='left' placeholder='Username' onChange = {props.handleInstagram}>
                                <Icon name='instagram' />
                                <input />
                            </Input>
                            </div>
                            :
                            <div>
                                <Button disabled = {userData.facebookLink.length == 25} circular color='facebook' icon='facebook' href={userData.facebookLink} />
                                <Button disabled = {userData.twitterLink.length == 20} circular color='twitter' icon='twitter' href={userData.twitterLink} />
                                <Button disabled = {userData.linkedInLink.length == 28} circular color='linkedin' icon='linkedin' href={userData.linkedInLink} />
                                <Button disabled = {userData.instagramUser.length == 26} circular color='instagram' icon='instagram' href={userData.instagramUser} />                                
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
                                {(props.loggedIn && !props.yourAccount) && 
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
                            </Card.Description>
                        </Card.Content>
                        <hr />
                    </Card>
                </Grid.Column>
                <Grid.Column width={2} fluid>
                    {
                    props.yourAccount && 
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
