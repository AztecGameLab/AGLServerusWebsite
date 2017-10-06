import React from 'react';
import {Image} from 'semantic-ui-react';

class AboutPage extends React.Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Image src="http://res.cloudinary.com/aztecgamelab-com/image/upload/v1505456528/IMG_6825-1_z2q9mm.jpg"/>
                <div style={{padding: '20px'}}>
                <hr/>
                <br/><br/><br/>
                    <h1>About Us</h1>
                    <p>
                    Aztec Game Lab was conceived and envisioned since 2016. We came together at the beginning of this summer to officially organize our efforts.
                    </p>
                    <br/>
                    <p>
                    We have been planning our events and activities along with a lasting hope for what we wish to see this club grow into. In fact, we did not want to be a cookie cutter club.
                    We are setting out to create game development community and we want everyone to get involved. That means all disciplines and soon, sponsors and game studios! 
                    </p>
                    <br/>
                    <p>We also took a risk and we wanted our own platform to showcase our members and games! That's why we have been coding this website for the last 3 months non-stop! This site is hand coded!</p>
                    <p>
                    There are so many talented people at SDSU and we can see that there are creative people all around us just waiting to get started! 
                    </p>
                    <br/>
                    <h1>Not everyone can be an professional game developer, but everyone can make games.</h1>
                    <br/>
                    <h2>Come and join us! We're just getting started! </h2>
                </div>
                <br/><br/><br/>
                <hr/>
            </div>
        );
    }
}

export default AboutPage;