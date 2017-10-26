import React from 'react';
import {
    Segment,
    Image,
    Grid,
    Card,
    Button,
    Icon,
    List,
    Input,
    Message
} from 'semantic-ui-react';
import NewsFeed from './NewsFeed';
import Parallax from 'parallax-js';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { CloudinaryContext, Image as CloudImage } from 'cloudinary-react';
import { Fade, Flip, Rotate, Zoom } from 'react-reveal';
var Mousetrap = require('mousetrap');
import styles from './glowingAnimation.css';
import stylings from '../../customfonts/alien.css';

import { EmailTakenCheck, addToNewsletter } from '../AGL';

class TempHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectorPosition: '23', //for left //false for right
            blinking: true,
            emailTaken: false,
            errorMessage: '',
            successMessage: '',
            email: '',
            loading: false,
            konami: false
        };
        this.selectLeft = this.selectLeft.bind(this);
        this.selectRight = this.selectRight.bind(this);
        this.selectButton = this.selectButton.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.accounts[0] && this.props.accounts == []) {
            this.refL.focus();
        }
    }

    handleLeftRef = c => {
        this.refL = c;
    }
    handleRightRef = c => {
        this.refR = c;
    }

    newsletterAdd = async () => {
        this.setState({
            loading: true
        });
        debugger;
        console.log(this.state.email);
        let emailCheck = await EmailTakenCheck(this.state.email);
        const isTaken = emailCheck.emailTaken;
        const isValid = emailCheck.validEmail;
        if (isValid == false) {
            this.setState({
                emailTaken: false,
                errorMessage: 'Invalid email format, try again!',
                successMessage: '',
                loading: false
            });
            return;
        }
        else if (isTaken) {
            this.setState({
                emailTaken: true,
                errorMessage: 'No worries, you are already signed up! :)',
                successMessage: '',
                loading: false
            });
            return;
        }
        else {
            let response = await addToNewsletter(this.state.email);
            debugger;
            this.setState({
                emailTaken: false,
                successMessage: response,
                errorMessage: '',
                loading: false
            });
        }
    }
    handleEmailInput = (e) => {
        this.setState({
            email: e.target.value
        });
        console.log(this.state.email);
    }

    selectLeft() {
        this.refL.focus();
        this.setState({
            selectorPosition: '24',
            blinking: true
        });
    }

    selectRight() {
        debugger;
        this.refR.focus();
        this.setState({
            selectorPosition: '74',
            blinking: true
        });
    }

    selectButton() {
        debugger;
        if (this.state.selectorPosition == '24') {
            this.props.showModal(0);
        }
        else {
            this.props.showModal(1);
        }
    }

    konami = () => {
        debugger;
        this.setState({
            konami: true
        });
    }

    componentDidMount() {
        this.parallax = new Parallax(this.scene);
        Mousetrap.bind('up up down down left right left right b a', this.konami);

        Mousetrap.bind('left', this.selectLeft);
        Mousetrap.bind('right', this.selectRight);
        Mousetrap.bind('enter', this.selectButton);
    }

    componentWillUnmount() {
        this.parallax.disable();
        Mousetrap.unbind('up up down down left right left right b a', this.konami);
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
        /*
                                    <CloudImage className="layer" data-hover-only={true} data-depth="0.01" publicId="WebsiteAssets/ParallaxV2/1.png" style={{ width: "100%" }} />
                                    <CloudImage className="layer" data-hover-only={true} data-depth="0.05" publicId="WebsiteAssets/ParallaxV2/2.png" style={{ width: "100%" }} />
        
                                    <CloudImage className="layer" data-hover-only={true} data-depth="0.1" publicId="WebsiteAssets/ParallaxV2/3.png" style={{ width: "100%" }} />
                                    <CloudImage className="layer" data-hover-only={true} data-depth="0.2" publicId="WebsiteAssets/ParallaxV2/4.png" style={{ width: "100%" }} />
        */
        return (
            <div >
                <CloudinaryContext cloudName='aztecgamelab-com'>
                    <div>
                        <div ref={el => this.scene = el}>
                            {this.state.konami && <CloudImage className="layer" data-hover-only={true} data-depth="0.1" publicId="WebsiteAssets/ParallaxV2/konami.png" style={{ width: "100%" }} />}
                            {!this.state.konami && <CloudImage className="layer" data-hover-only={true} data-depth="0.15" publicId="WebsiteAssets/ParallaxV2/0.png" style={{ width: "100%" }} />}
                            <CloudImage className="layer" data-hover-only={true} data-depth="0.3" publicId="WebsiteAssets/ParallaxV2/2.png" style={{ width: "100%" }} />
                            <CloudImage className="layer" data-hover-only={true} data-depth="0.45" publicId="WebsiteAssets/ParallaxV2/3.png" style={{ width: "100%" }} />
                            <CloudImage className="layer" data-hover-only={true} data-depth="0.55" publicId="WebsiteAssets/ParallaxV2/dva.png" style={{ width: "100%" }} />
                            <CloudImage className="layer" data-hover-only={true} data-depth="0.55" publicId="WebsiteAssets/ParallaxV2/sombra.png" style={{ width: "100%" }} />
                            <CloudImage className="layer" data-hover-only={true} data-depth="0.55" publicId="WebsiteAssets/ParallaxV2/6.png" style={{ width: "100%" }} />
                            <CloudImage className="layer" data-hover-only={true} data-depth="0.9" publicId="WebsiteAssets/ParallaxV2/7.png" style={{ width: "100%" }} />
                        </div>
                        {this.state.konami &&
                            <div>
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                            </div>}
                        {this.props.accounts[0] ?
                            null
                            :
                            <div>
                                <Button inverted size='massive' className='loadSave' style={homeStyle.buttonLeft} onClick={() => this.props.showModal(0)} ref={this.handleLeftRef} >LOAD SAVE</Button>
                                <Button inverted size='massive' className='newSave' style={homeStyle.buttonRight} onClick={() => this.props.showModal(1)} ref={this.handleRightRef} >NEW GAME</Button>
                                <Icon className='selectorBlink' name='caret up' size='huge'
                                    style=
                                    {{
                                        //caret up
                                        //hand outline up
                                        position: 'absolute',
                                        left: `${this.state.selectorPosition}%`,
                                        top: '75%',
                                    }}
                                />
                            </div>}

                    </div>
                    <Grid columns={2} padded>
                        <Grid.Row>
                            <Grid.Column width={9} >
                                <Fade left>
                                    <iframe src="https://calendar.google.com/calendar/embed?showNav=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;%23ffffff&amp;src=aztecgamelab%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FLos_Angeles" style={{ border: "solid 6px #4D36E9", width: "100%", minHeight: "600px", frameborder: "0", scrolling: "no" }}></iframe>
                                </Fade>
                            </Grid.Column>

                            <Grid.Column width={7} textAlign='center'>
                                <Fade right delay={200}>
                                    <div>
                                        <h1>Check out our upcoming events!</h1>
                                        <hr />
                                        <p>
                                            <Icon name='marker' size='big' /> We meet every Friday at 2:00 pm in Adams Humanities 1120!
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
                        </Grid.Row>
                        <br />
                        <br />
                        <Grid.Row>
                            <Grid.Column textAlign='center' width={6}>
                                <Fade left delay={300}>
                                    <p>What is Aztec Game Lab?</p>
                                </Fade>
                                <Fade right delay={350}>
                                    <h1>We are glad you asked!</h1>
                                </Fade>
                                <hr />
                                <Fade up delay={360}>
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
                                <Fade up delay={650}>
                                    <h1>Come and join us!</h1>
                                    <br />
                                </Fade>

                            </Grid.Column>
                            <br />
                            <br />
                            <Grid.Column width={9} floated='right'>
                                <CloudImage style={homeStyle.groupPhoto} publicId="WebsiteAssets/groupPhoto.jpg" />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={7}>
                                <Fade left delay={850}>
                                    <CloudImage style={{ width: '100%' }} publicId="WebsiteAssets/testenv.png" />
                                </Fade>
                            </Grid.Column>
                            <Grid.Column width={8} textAlign='center'>
                                <Zoom delay={1000}>
                                    <div>
                                        <h1> Let's get in touch!</h1>
                                        <hr />
                                        <p>We would love to hear from you! Feel free to shoot us an email and drop by!</p>
                                        <List divided relaxed horizontal inverted>
                                            <List.Item icon='users' content='Aztec Game Lab' />
                                            <List.Item icon='map' content='San Diego, CA' />
                                            <List.Item icon='mail' content={<a href='mailto:aztecgamelab@gmail.com'>aztecgamelab@gmail.com</a>} />
                                            <List.Item icon='linkify' content={<a href='https://aztecgamelab.com/'>aztecgamelab.com</a>} />
                                        </List>
                                        <br /><br />
                                        <p> Join our social media groups and slack channel!</p>
                                        <List divided relaxed horizontal inverted>
                                            <List.Item icon='facebook' content={<a href='https://www.facebook.com/groups/aztecgamelab/'>Facebook</a>} />
                                            <List.Item icon='instagram' content={<a href='https://www.instagram.com/aztecgamelab/'>Instagram</a>} />
                                            <List.Item icon='twitter' content={<a href='https://twitter.com/AztecGameLab'>Twitter</a>} />
                                            <List.Item icon='slack' content={<a href='http://ec2-13-59-179-171.us-east-2.compute.amazonaws.com:3000/'>Slack Invite</a>} />
                                        </List>
                                        <br /><br /><br /><br /><br />
                                        <p>Prefer email? Awesome! Sign up for our weekly newsletter!</p>
                                        <Input type='text' placeholder="Email Address" action>
                                            <input onChange={this.handleEmailInput} />
                                            <Button
                                                color='red'
                                                content='Submit'
                                                icon='mail'
                                                onClick={this.newsletterAdd}
                                                loading={this.state.loading}
                                            />
                                        </Input>
                                        {this.state.errorMessage.length > 0 && <Message info>
                                            <Message.Header>Heads up!</Message.Header>
                                            <p>{this.state.errorMessage}</p>
                                        </Message>}
                                        {this.state.successMessage.length > 0 && <Message positive>
                                            <Message.Header>Success!</Message.Header>
                                            <p>{this.state.successMessage}</p>
                                        </Message>}
                                    </div>
                                </Zoom>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br />
                </CloudinaryContext>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts
    };
}

export default connect(mapStateToProps, null)(TempHome)

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
        fontFamily: 'AlienEncounters, Arial, sans-serif',
        fontWeight: 'normal',
        fontStyle: 'normal',
        position: 'absolute',
        fontSize: '130%',
        left: '20%',
        top: '70%',
        zIndex: 90,
        color: 'black',
        transitionDuration: '0.4s',
        borderRadius: '20px'
    },
    buttonRight: {
        fontFamily: 'AlienEncounters, Arial, sans-serif',
        fontWeight: 'normal',
        fontStyle: 'normal',
        position: 'absolute',
        fontSize: '130%',
        position: 'absolute',
        left: '70%',
        top: '70%',
        zIndex: 90,
        color: 'black',
        transitionDuration: '0.4s',
        borderRadius: '20px'
    }
};