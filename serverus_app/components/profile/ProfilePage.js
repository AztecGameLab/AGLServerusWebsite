import React, { Component } from 'react';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { Grid, Icon, Card, Tab, Button, List, Popup, Feed, Dropdown, TextArea, Input } from 'semantic-ui-react';
import IconPicker from '../common/IconPicker';
import roles from '../common/roleOptions';
import badgeDescriptions from '../common/badgeOptions';

//DATA IS IN userData!! userData.firstName for example
const ProfilePage = (props) => {
    const userData = props.profileObject.info;
    const roleOptions = roles;
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
                                            fluid multiple selection options={roles}
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
                            <div style = {{fontSize: '15px'}}>
                            <Input icon = 'facebook' label='http://facebook.com/' placeholder='username' />
                            <Input icon = 'facebook' label='http://facebook.com/' placeholder='username' />
                            <Input icon = 'facebook' label='http://facebook.com/' placeholder='username' />
                            </div>
                            :
                            <div>
                                <Button circular color='facebook' icon='facebook' href={''} />
                                <Button circular color='twitter' icon='twitter' href={''} />
                                <Button circular color='linkedin' icon='linkedin' href={''} />
                                <Button circular color='instagram' icon='instagram' href={''} />
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
                            </Card.Header>
                        </Card.Content>

                        <Card.Content>
                            <Card.Description>
                                <Icon name='quote left' size = 'small' />
                                {props.editMode ? 
                                    <div>
                                        <TextArea 
                                            style = {{width: '100%'}} 
                                            placeholder='Hi tell us about yourself! :)' 
                                            onChange = {props.handleBioInput}/>
                                        <Button 
                                            onClick = {props.handleBioSubmission} 
                                            fluid 
                                            icon = 'save' 
                                            color = 'green' 
                                            content = 'Save My bio' 
                                            size = 'small'/>
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
                                add a game here!
                            </Card.Description>
                        </Card.Content>

                        <Card.Content>
                            <Card.Header>
                                <Icon name = 'tint' size = 'huge' color = 'teal'/> Art
                            </Card.Header>
                        </Card.Content>

                        <Card.Content>
                            <Card.Description>
                                add a soundtrack here!
                            </Card.Description>
                        </Card.Content>

                        <Card.Content>
                            <Card.Header>
                                <Icon name = 'music' size = 'huge' color = 'teal'/> Music
                            </Card.Header>
                        </Card.Content>

                        <Card.Content>
                            <Card.Description>
                                add a game here!
                            </Card.Description>
                        </Card.Content>

                        <Card.Content>
                            <Card.Header>
                               <Icon name = 'hand victory' size = 'huge' color = 'teal'/> Friends
                            </Card.Header>
                        </Card.Content>

                        <Card.Content>
                            <Card.Description>
                                friends here, they'll float too
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
