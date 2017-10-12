import React from 'react';
import {
    Segment,
    Image,
    Grid,
    Card,
    Button,
    Icon
} from 'semantic-ui-react';
import NewsFeed from './NewsFeed';
import Parallax from 'parallax-js';
import Slider from 'react-slick';
import { CloudinaryContext, Image as CloudImage } from 'cloudinary-react';
import { Fade, Flip, Rotate, Zoom } from 'react-reveal';
var Mousetrap = require('mousetrap');
import styles from './glowingAnimation.css';

export default class TempHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectorPosition: '23', //for left //false for right
            blinking: true
        };
        this.selectLeft = this.selectLeft.bind(this);
        this.selectRight = this.selectRight.bind(this);
        this.selectButton = this.selectButton.bind(this);
    }

    selectLeft() {
        this.setState({
            selectorPosition: '23',
            blinking: true
        });
    }

    selectRight() {
        debugger;
        this.setState({
            selectorPosition: '73',
            blinking: true
        });
    }

    selectButton() {
        if (this.state.selectorPosition == '23'){
            this.props.showModel(0);
        }
        else {
            this.props.showModel(1);
        }
    }

    componentDidMount() {
        this.parallax = new Parallax(this.scene);
        this.interval = setInterval(this.mrBlinkyxD, 800);
        Mousetrap.bind('up up down down left right left right b a',
            () => {
                alert('konami code');
            }
        );    

        Mousetrap.bind('left', this.selectLeft);
        Mousetrap.bind('right', this.selectRight);
        Mousetrap.bind('enter', this.selectButton);
    }

    componentWillUnmount() {
        this.parallax.disable();
        Mousetrap.unbind('up up down down left right left right b a',
        () => {
            alert('konami code');
        }
    );    

    Mousetrap.unbind('left', this.selectLeft);
    Mousetrap.unbind('right', this.selectRight);
    Mousetrap.unbind('enter', this.selectButton);
    
    }

    mrBlinkyxD = () => {
        const prevState = this.state.blinking;
        this.setState({
            blinking: !prevState
        });
    }
    
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 350,
            slidesToShow: 1,
        };

        return (
            <div >
                <CloudinaryContext cloudName='aztecgamelab-com'>
                <div>
                    <div ref={el => this.scene = el}>
                        <CloudImage className="layer" data-hover-only = {true} data-depth="0.00" publicId="WebsiteAssets/Parallax/AGL_retro_parallax_layer0.png" style = {{width: "100%"}}/>
                        <CloudImage className="layer" data-hover-only = {true} data-depth="0.07" publicId="WebsiteAssets/Parallax/AGL_retro_parallax_layer1.png" style = {{width: "100%"}}/>
                        <CloudImage className="layer" data-hover-only = {true} data-depth="0.60" publicId="WebsiteAssets/Parallax/AGL_retro_parallax_layer2.png" style = {{width: "100%"}}/>                    
                    </div>
                    <Button inverted size = 'massive' className = 'loadSave' style = {homeStyle.buttonLeft} onClick={() => this.props.showModel(0)}>LOAD SAVE</Button>    
                    <Button inverted size = 'massive' className = 'newSave' style = {homeStyle.buttonRight} onClick={() => this.props.showModel(1)}>NEW GAME</Button> 
                    {this.state.blinking && <Icon name = 'hand outline up' size = 'huge' 
                    style = 
                    {{
                        position: 'absolute',
                        left: `${this.state.selectorPosition}%`,
                        top: '78%',
                    }}
                    />}

                </div>
                    <Grid columns={2}>

                        <Grid.Column width={9} >
                            <Fade left>
                                <iframe src="https://calendar.google.com/calendar/embed?showNav=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;%23ffffff&amp;src=aztecgamelab%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FLos_Angeles" style={{ border: "solid 6px #4D36E9", width: "100%", minHeight: "600px", frameborder: "0", scrolling: "no" }}></iframe>
                            </Fade>
                        </Grid.Column>

                        <Grid.Column width={6} textAlign='center'>
                            <Fade right>
                                <div>
                                    <br />
                                    <h1>Check out our upcoming events!</h1>
                                    <hr />
                                    <p>
                                        We meet every week on Fridays at 2:00 pm in AH1120!
                            </p>
                                    <Slider {...settings} >
                                        <CloudImage publicId="WebsiteAssets/Step1.jpg" />
                                        <CloudImage publicId="WebsiteAssets/Step2.jpg" />
                                        <CloudImage publicId="WebsiteAssets/Step3.jpg" />
                                        <CloudImage publicId="WebsiteAssets/Step4.jpg" />
                                        <CloudImage publicId="WebsiteAssets/Step5.jpg" />
                                        <CloudImage publicId="WebsiteAssets/Step6.png" />
                                    </Slider>

                                    <br />
                                </div>
                            </Fade>
                        </Grid.Column>

                        <Grid.Column textAlign='center' width={6}>
                            <Fade left delay={300}>
                                <h3>What is Aztec Game Lab?</h3>
                            </Fade>
                            <Fade right delay={400}>
                                <h1>We are glad you asked!</h1>
                            </Fade>
                                <hr />
                            <Fade up delay={400}>
                                <p>
                                    Aztec Game Lab was conceived and envisioned since 2016. We came together at the beginning of this summer to officially organize our efforts.
                                </p>
                            </Fade>
                                <br />
                            <Fade up delay={400}>
                                <p>
                                    We have been planning our events and activities along with a lasting hope for what we wish to see this club grow into. In fact, we did not want to be a cookie cutter club.
                                    We are setting out to create game development community and we want everyone to get involved. That means all disciplines and soon, sponsors and game studios!
                                </p>
                            </Fade>
                                <br />
                            <Fade up delay={600}>
                                <p>
                                    We also took a risk and we wanted our own platform to showcase our members and games! That's why we have been coding this website for the last 3 months non-stop! This site is hand coded!
                                    There are so many talented people at SDSU and we can see that there are creative people all around us just waiting to get started!
                                </p>
                            </Fade>
                                <br />
                            <Fade up delay={700}>
                                <h1>Come and join us!</h1>
                                <br />
                            </Fade>
                            
                        </Grid.Column>


                        <Grid.Column width={9} floated='right'>
                                <CloudImage style={homeStyle.groupPhoto} publicId="WebsiteAssets/groupPhoto.jpg" />
                        </Grid.Column>


                    </Grid>
                </CloudinaryContext>
            </div>
        );
    }
}

// <Grid columns={3} fluid>
// <Grid.Column textAlign = 'center' color= "black">
//   <Icon name = 'checked calendar' size = 'big'/> Schedule
// </Grid.Column>
// <Grid.Column textAlign = 'center'  color= "black">
//   <Icon name = 'info circle' size = 'big'/> About Us
// </Grid.Column>
// <Grid.Column textAlign = 'center' color= "black">
//   <Icon name = 'talk outline' size = 'big'/> Contact Us
// </Grid.Column>
// </Grid>
//<div className="row col-lg-12"><NewsFeed style={homeStyle.sideStyle} /></div>

let homeStyle = {
    margin: {
        paddingLeft: 30
    },
    sideStyle: {
        display: "inline-block"
    },
    groupPhoto: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    buttonLeft: {
        position: 'absolute',
        left: '20%',
        top: '70%',
        zIndex: 90
    },
    buttonRight: {
        position: 'absolute',
        left: '70%',
        top: '70%',
        zIndex: 90
    }
};