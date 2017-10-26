import React from 'react';
import { Grid, Icon, Button, List, Label, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { flipInX } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { enrollInGameJam, checkSignInAlready } from '../AGL';

const animations = {
    flipInX: {
        animation: 'x 0.5s',
        animationName: Radium.keyframes(flipInX, 'flipInX')
    }
}
//style = {animations.flipInX}

class CompetitionsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            buttonText: 'LOGIN TO JOIN',
            loading: false
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.accounts.length > 0) {
            //check if already entered
            let response = await checkSignInAlready(nextProps.accounts[0].username);
            if (response == "Free to go") {
                this.setState({
                    loggedIn: true,
                    buttonText: 'JOIN NOW'
                });
            }
            else {
                this.setState({
                    loggedIn: true,
                    buttonText: 'YOU ARE ONE OF US'
                });
            }
        }
    }

    handleJoin = async () => {
        if (this.state.buttonText == 'JOIN NOW') {
            this.setState({
                loading: true
            });
            let response = await enrollInGameJam(this.props.accounts[0], this.props.accounts[0].username);
            if (response == "Successfully enrolled!") {
                this.setState({
                    loading: false,
                    buttonText: 'YOU ARE ONE OF US'
                });
            }
            //push to Halloween Jam/
        }
    }


    componentDidMount() {
        // Update the count down every 1 second
        this.time = setInterval(function () {
            let countDownDate = new Date("October 28, 2017 11:59:59").getTime();
            // Get todays date and time
            let now = new Date().getTime();

            // Find the distance between now an the count down date
            let distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            document.getElementById("demo").innerHTML = days + " Days   :   " + hours + " Hours    :   "
                + minutes + " Minutes   :   " + seconds + " Seconds ";
            if (days + hours + minutes + seconds == 0) {
                document.getElementById("demo").innerHTML = "COMPETITION HAS CLOSED ON OCTOBER 30TH";
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.time);
    }

    DatabaseNote = (text, color, icon) => {
        return (
            <List.Item>
                <Label color={color} horizontal> <Icon name={icon} size='large' />{text}</Label>
            </List.Item>
        );
    }

    render() {
        return (
            <div>
                <StyleRoot>
                    <br /><br /><br /><br /><br /><br />
                    <Grid centered columns={3} padded>
                        <Grid.Row>
                            <h3 style={{ textAlign: 'center', fontSize: '10em', width: '100%' }}>Aztec Game Lab's Halloween Jam</h3>
                            {this.state.loggedIn}
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={3}>
                            </Grid.Column>

                            <Grid.Column width={10}>
                                <br /><br />
                                <h3 style={{ textAlign: 'center', fontSize: '3.3em', fontWeight: 'bold' }}>WONT YOU STAY WITH US THIS EVENING?</h3>
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <h3 style={{ textAlign: 'center', fontSize: '3em' }}>THE NIGHT IS YOUNG AND PEOPLE ARE SCHEMING</h3>
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <h3 style={{ textAlign: 'center', fontSize: '3.3em', fontWeight: 'bold' }}>JOIN US FOR TWO NIGHTS OF TERROR</h3>
                                <br /><br />
                                <h3 style={{ textAlign: 'center', fontSize: '3em' }}>FULL OF OLD FASHIONED CODE AND ERROR</h3>
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <h3 style={{ textAlign: 'center', fontSize: '3.3em' }}>ASSEMBLE YOUR MOB OF ONE TO FIVE</h3>
                                <br /><br />
                                <h3 style={{ textAlign: 'center', fontSize: '5em', fontWeight: 'bold' }}>MAKE A GAME THAT MAKES US FEEL ALIVE!</h3>
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <h3 style={{ textAlign: 'center', fontSize: '3.3em' }}>BE WARY OF CHEATING AND PLAGARISM</h3>
                                <br /><br />
                                <h3 style={{ textAlign: 'center', fontSize: '3.2em' }}>YOU WILL BE CAUGHT</h3>
                                <h3 style={{ textAlign: 'center', fontSize: '3.5em' }}>YOU WILL BE CAUGHT</h3>
                                <h3 style={{ textAlign: 'center', fontSize: '3.8em' }}>YOU WILL BE CAUGHT</h3>
                                <br /><br />
                                <br /><br />
                            </Grid.Column>

                            <Grid.Column width={3}>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>

                            <Grid.Column width={16} textAlign='center'>
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <h3 style={{ textAlign: 'center', fontSize: '8em' }}>TIME IS TICKING</h3>
                                <br /><br />
                                <h3 style={{ textAlign: 'center', fontSize: '3.8em' }} id='demo'></h3>
                                <br /><br />
                                <Button
                                    loading={this.state.loading}
                                    inverted size='massive'
                                    style={{ fontFamily: 'ImaginaryFriend', fontSize: '6em' }}
                                    onClick={this.handleJoin}>

                                    {this.state.buttonText}

                                </Button>
                                <br /><br />
                                <br /><br />
                                <br /><br />
                                <h3 style={{ textAlign: 'center', fontSize: '3.8em' }}>we all float down here</h3>
                                <br />
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                    <br /><br /><br />
                </StyleRoot>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts
        //this means i would like to access by this.props.accounts
        // the data within the state of our store named by root reducer
        // ownProps are the props of our component CoursesPage
    };
}

export default connect(mapStateToProps, null)(CompetitionsPage)

