import React, { Component } from 'react';
import { List, Icon, Label} from 'semantic-ui-react';


/*
<Label color='yellow' horizontal> <Icon name='database' size = 'large'/>Database</Label>
<Label color='green' horizontal> <Icon name='bug' size = 'large'/>Bugfix</Label>
<Label color='grey' horizontal> <Icon name='wrench' size = 'large'/>Configurations</Label>
<Label color='blue' horizontal> <Icon name='code' size = 'large'/>Development</Label>
<Label color='red' horizontal> <Icon name='folder open' size = 'large'/>Aztec Game Lab Sererus Genesis</Label>

*/

const PatchNotes = (props) => {

    const MonthHeader = (text) => {
        return(
            <h3 style = {{textAlign: 'center'}}> {text}</h3>
        );
    }
    const DatabaseNote = (text) => {
        return(
            <List.Item>
                <Label color='yellow' horizontal> <Icon name='database' size = 'large'/>Database</Label>
                <span style = {{fontSize: '16px', color: 'white'}}>{text} </span>
            </List.Item>
        );
    }
    const BugfixNote = (text) => {
        return(
            <List.Item>
                <Label color='green' horizontal> <Icon name='bug' size = 'large'/>Bugfix</Label>
                <span style = {{fontSize: '16px', color: 'white'}}>{text} </span>
            </List.Item>
        );
    }
    const DevelopmentNote = (text) => {
        return(
            <List.Item>
                <Label color='blue' horizontal> <Icon name='code' size = 'large'/>Development</Label>
                <span style = {{fontSize: '16px', color: 'white'}}>{text} </span>
            </List.Item>
        );
    }
    const ConfigurationNote = (text) => {
        return(
            <List.Item>
                <Label color='grey' horizontal> <Icon name='wrench' size = 'large'/>Configuration</Label>
                <span style = {{fontSize: '16px', color: 'white'}}>{text} </span>
            </List.Item>
        );
    }
    const InProgressNote = (text) => {
        return(
            <List.Item>
                <Label color='orange' horizontal> <Icon name='ellipsis horizontal' size = 'large'/>In Progress</Label>
                <span style = {{fontSize: '16px', color: 'white'}}>{text} </span>
            </List.Item>
        );
    }

    return(
        <div style = {{color: 'white'}}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h1 style = {{textAlign: 'center'}}>Aztec Game Lab Patch Notes</h1>
            <br/>
            <List animated relaxed divided selection inverted>
                
                {MonthHeader('April 2017')}
                <List.Item>
                    <Label color='red' horizontal> <Icon name='folder open' size = 'large'/>Website Genesis</Label> 
                    <span style = {{fontSize: '16px', color: 'white'}}>Aztec Game Lab Website Initialization</span>         
                </List.Item>
                {DevelopmentNote('Prototype Navigation Bar')}

                {MonthHeader('May 2017')}
                {ConfigurationNote('Upgraded Babel Presets')}
                {DatabaseNote('Firebase Hosting Integration')}

                {MonthHeader('June 2017')}
                {DevelopmentNote('Prototype Account Creation')}
                {BugfixNote('React Routing fix for single page')}

                {MonthHeader('July 2017')}
                {DevelopmentNote('Prototype Login & Logout')}
                {ConfigurationNote('Added React Redux & Transform Decorators')}
                {ConfigurationNote('Cleaned up App structure and CSS styling system')}
                {DevelopmentNote('Header, Navigation and Routes rehaul')}
                
                {MonthHeader('August 2017')}
                {DevelopmentNote('Prototype Markdown Editor')}
                {DatabaseNote('Load Posts from Firebase')}
                {BugfixNote('CSS Fixes for IE and Firefox')}
                {ConfigurationNote('Semantic UI integration')}
                {DevelopmentNote('Prototype Sign Up & Login Modal ')}
                {DatabaseNote('Added store for user and firebase account sytem')}
                {DevelopmentNote('React Transitions and load user action & reducer')}
                {DevelopmentNote('Prototype Blog Posting')}
                {DatabaseNote('Account Signout')}
                {DevelopmentNote('Unique Route URL Loading')}
                {DevelopmentNote('Splashpage with Countdown')}
                {BugfixNote('Modal Bounce, open Semantic issue')}
                {DevelopmentNote('Prototype User Directory ')}
                {DatabaseNote('Sign Up Field Validation and Preliminary Email Check')}
                
                {MonthHeader('September 2017')}
                {BugfixNote('Header redesign with Semantic')}
                {DevelopmentNote('Prototype Footer')}
                {DevelopmentNote('Error Page, Calendar Page and Generic Card')}
                {DatabaseNote('Added new fields to user schema')}
                {DatabaseNote('Added Cloudinary Image Backend')}
                {DevelopmentNote('Profile Icons! Cute Animals')}
                {DevelopmentNote('Markdown Preview Cards')}
                {ConfigurationNote('Avatar editor for scaling images')}
                {BugfixNote('Fixed broken buttons on sign up')}
                {DevelopmentNote('Sign up email dispatch!')}
                {ConfigurationNote('AWS configurations for routing emails and data')}
                {BugfixNote('Fixed transformations and footer')}
                {DevelopmentNote('Prototype Profile Page')}
                {DevelopmentNote('Profile Page Editing v1')}
                {DevelopmentNote('Favorite card functionality')}
                {DevelopmentNote('User Directory and Filtering by role!')}
                {DevelopmentNote('Unique Article URL loading')}
                {DevelopmentNote('Prototype Friend Feature')}
                {BugfixNote('Fixed unneeded images and Email Dispatch routing')}
                {BugfixNote('Special characters check for username')}
                {BugfixNote('Fixed social media link editing')}
                {BugfixNote('Refactored redux files and style files')}
                {DevelopmentNote('Prototype Search Bar')}
                {DatabaseNote('AGL API initialization')}
                {DevelopmentNote('Prototype Admin features - JSON/Email')}
                {DatabaseNote('Google Cloud Functions Backend Layer')}
                

                {MonthHeader('October 2017')}
                <List.Item>
                    <Label color='red' horizontal> <Icon name='folder open' size = 'large'/>Cloud Functions Genesis</Label> 
                    <span style = {{fontSize: '16px', color: 'white'}}>Complete database rehaul and API rewrite</span>         
                </List.Item>
                {DevelopmentNote('New encryption method')}
                {DatabaseNote('API integration with Load User')}
                {DatabaseNote('Markdown Editor with Cloud Functions')}
                {ConfigurationNote('Secured site with complete serverside system')}
                {DevelopmentNote('Password Reset Feature')}
                {DatabaseNote('Upload and retrieve from Cloudinary')}
                {BugfixNote('Password fix, https fix, isemail fix')}
                {DevelopmentNote('Pagination in Progress')}
                {ConfigurationNote('Google Cloud Platform for middleware usage')}
                {ConfigurationNote('Updated NPM packages (react, router, babel-env, webpack, semantic)')}
                {DevelopmentNote('Parallax and Home Page Visual Update')}
                {DevelopmentNote('Newsletter Sign Up feature')}

                <h1 style = {{textAlign: 'center'}}>Road Map</h1>
                {InProgressNote('Game Creation')}
                {InProgressNote('Game Directory')}
                {InProgressNote('Competitions Page')}
                {InProgressNote('Reintroducing Friends and Request System')}
                {InProgressNote('Finalizing Admin Dash')}
                {BugfixNote('Pagination & Sign Out')}
                
            </List>
            <br/>
            <br/>
            <br/>
        </div>
    );
}

export default PatchNotes;