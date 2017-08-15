import React from 'react';
import style from './splash.css';

class CountdownPage extends React.Component {

    componentDidMount() {
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
    render() {
        return (
            <div className="bgimg">
                <div className="middle">
                    <img src={require('./logo.png')} />
                    <h2>Official Launch: </h2>
                    <h1>August 28th, 2017</h1>
                    <p id="demo"></p>
                        <div className="form-group">
                                <a href = "https://goo.gl/forms/QEilMKW3t5Re2VFY2" className="btn btn-outline-success btn-lrg" > Notify Me!</a>
                        </div>
                        Join Our  <a href="https://www.facebook.com/groups/1924130084493685/" className="fa fa-facebook"></a>acebook Group!
                </div>
            </div>
        );
    }
}


export default CountdownPage;