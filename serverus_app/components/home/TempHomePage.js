import React from 'react';
import {
    Segment,
    Image,
    Grid,
    Card,
    Button
} from 'semantic-ui-react';

export default class TempHome extends React.Component {
    render() {
        return (
            <div style={{ color: 'black' }}>
                <Segment basic style={{ minHeight: "700px" }}>
                    <Image src="http://res.cloudinary.com/aztecgamelab-com/image/upload/v1505454116/bg_qgt59c.jpg" />
                </Segment>
                <Segment basic style={ContentStyle.Default}>
                    <Grid columns={2}>
                        <Grid.Column>
                            <div style={ContentStyle.Card}>
                                <h1>Upcoming Workshops</h1>
                                <Segment basic style={{ padding: "20px" }} />
                                <ul style={{padding: "14px", fontSize: '1.5em'}}> 
                                    <li style={{padding: '14px'}}>Learn Unity: 9/22</li>
                                    <li style={{padding: '14px'}}>Your First Game... Part1: 9/29</li>
                                    <li style={{padding: '14px'}}>Your First Game... Part2: 10/6</li>
                                    <li style={{padding: '14px'}}>[TBA...]</li>
                                </ul>
                                <Segment basic style={{ padding: "150px" }} />
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <a href="/about">
                                <div style={ContentStyle.Card}>
                                    <h1>About Us</h1>
                                    <p style={{fontSize: "1.5em"}}>
                                        Aztec Game Lab was founded with three goals. Build a Community of Game Developers at San Diego State University. Provide resources for aspiring game developers, and host guest speakers, workshops, and gamejams. 
                                    </p>
                                </div>
                            </a>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment basic style={{color:'white'}}>
                    <div style={ContentStyle.Card}>
                        <h1>Interested in joining our Exective Board</h1>
                        <p>
                            <h3>Interested in helping run one of the most unique clubs on campus? We are looking for more people to help run this club. If you are interested, click the button below and APPLY!</h3>
                        </p>
                        <Button color="orange" as='a' href='https://drive.google.com/open?id=1cy-1gNI7DelqkA_9QNTOng8usYsg8kREWTymt5Ov9dk'>Apply Here!</Button>
                    </div>
                </Segment>
            </div>
        );
    }
}

let ContentStyle = {
    Default: {
        color: 'white',
        minHeight: '500px'
    },

    Card: {
        borderStyle: 'dotted',
        borderRadius: '4px',
        height: '100%',
        textAlign: 'center',
        padding: '6px'
    }
};