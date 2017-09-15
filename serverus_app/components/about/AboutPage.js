import React from 'react';
import {Image} from 'semantic-ui-react';

class AboutPage extends React.Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Image src="http://res.cloudinary.com/aztecgamelab-com/image/upload/v1505456528/IMG_6825-1_z2q9mm.jpg"/>
                <div style={{padding: '20px'}}>
                    <h1>About Us</h1>
                    <p>
                        Aztec Game Lab was founded with three goals. Build a Community of Game Developers at San Diego State University. Provide resources for aspiring game developers, and host guest speakers, workshops, and gamejams. 
                    </p>
                </div>
            </div>
        );
    }
}

export default AboutPage;