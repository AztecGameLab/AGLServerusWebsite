import React from 'react';
import {
    Segment,
    Image,
    Grid,
    Card,
    Button
} from 'semantic-ui-react';
import NewsFeed from './NewsFeed';

export default class TempHome extends React.Component {
    render() {
        return (
            <div style={{ color: 'black' }}>
                    <Segment basic style={{ color: 'white' }}>
                        {/* <div className="row col-lg-12"><NewsFeed style={homeStyle.sideStyle} /></div> */}
                        <div style={ContentStyle.Card}>
                            <br />
                            <h1>Aztec Game Lab</h1>
                            <p>
                                <br />
                                <h3>Aztec Game Lab was founded with three goals. Build a Community of Game Developers at San Diego State University. Provide resources for aspiring game developers, and host guest speakers, workshops, and gamejams. </h3>
                                <br /><br />

                            </p>
                        </div>
                    </Segment>
                <Segment basic>
                    <Image src="https://res.cloudinary.com/aztecgamelab-com/image/upload/v1505454116/bg_qgt59c.jpg" />
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
        height: '50%',
        textAlign: 'center',
        padding: '6px'
    }
};

let homeStyle = {
    margin: {
        paddingLeft: 30
    },
    sideStyle: {
        display: "inline-block"
    }
};