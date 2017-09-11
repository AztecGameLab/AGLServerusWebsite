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