import React from 'react';
import style from './splash.css';
import * as firebase from 'firebase';
var validator = require("email-validator");

class CountdownPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCountdown: '',
            emailInput: ''
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);

    }

    componentDidMount() {
        document.getElementsByClassName('alert')[0].style.display = 'none';
        // Update the count down every 1 second
        let time = setInterval(function () {
            let countDownDate = new Date("August 28, 2017 23:59:59").getTime();
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

        }, 1000);
    }

    handleInput(e) {
        this.setState({
            emailInput: e.target.value
        });
    }

    handleSubmission() {
        if (validator.validate(this.state.emailInput) == false || this.state.emailInput.length == 0) {
            setTimeout(function(){ document.getElementsByClassName('alert')[0].style.display = "block"; }(this), 600);
            return;
        }
    }
    render() {
    var alertEle = document.getElementsByClassName('alert')[0];
        return (
            <div className="bgimg">
                <div className="middle">
                    <img className="logo" src={require('./logo.png')} />
                    <h2>Official Launch: </h2>
                    <h1>August 28th, 2017</h1>
                    <p id="demo"></p>
                        <div className="alert" display = {this.state.invalidWarning}>
                            <span className="closebtn" onClick = {()=> {setTimeout(function(){ 
                                alertEle.style.opacity = "0";
                                alertEle.style.display = "none"; }, 600);}}>&times;</span>
                            <strong>Invalid Email</strong> Try Again! :)
                        </div>
                    <form>
                        <div className="form-group">
                                <a href = "https://goo.gl/forms/QEilMKW3t5Re2VFY2" className="btn btn-outline-success btn-lrg button hvr-grow" > Notify Me!</a>
                        </div>
                        Join Our  <a href="https://www.facebook.com/groups/1924130084493685/" className="fa fa-facebook"></a>acebook Group!
                    </form>
                </div>
            </div>
        );
    }
}


export default CountdownPage;