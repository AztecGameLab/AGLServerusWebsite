import React, { Component } from 'react';
import { Image as CloudImage, CloudinaryContext } from 'cloudinary-react';
import { Grid, Icon, Card, Tab, Button, List, Popup, Feed, Dropdown, TextArea, Input, Label } from 'semantic-ui-react';
import {Timeline, TimelineEvent} from 'react-event-timeline';

const PatchNotes = (props) => {
    return(
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h1 style = {{textAlign: 'center'}}>Aztec Game Lab Patch Nodes</h1>
            <hr/>
            <br/>
            <Timeline>
                <TimelineEvent
                 title = "Genesis"
                 createdAt = "May 2017"
                 icon = {<Icon name = "gamepad"/>}
                 container = 'card'
                 iconStyle = {{color: 'white', fontSize: '20px', textAlign: 'center'}}
                 style = {{}}
                 >
                 hi
                
                </TimelineEvent>
            </Timeline>
            
        </div>
    );
}

export default PatchNotes;