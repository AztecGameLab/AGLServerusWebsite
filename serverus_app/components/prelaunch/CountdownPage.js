import React from 'react';
import style from './splash.css';

class CountdownPage extends React.Component {

    componentDidMount() {
        // Update the count down every 1 second
        let time = setInterval(function () {
            let countDownDate = new Date("September 4, 2017 23:59:59").getTime();
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
                    <h2>Official Launch: September 4th, 2017 </h2>
                    <p id="demo" className = 'demo'></p>
                    <h1> We are creating a game development community at SDSU! </h1>
                    <h2 className = 'majors'>All majors and disciplines welcome and encouraged! </h2>
                    <h1 className = 'create'>Come and create something awesome!</h1>
                    <h1><a href = "https://goo.gl/forms/sR6TJXXXM1p9tJ0u1">Keep notified and click me! </a></h1>
                    
                    <hr/>
                    
                    <div className = 'fb'>
                        Join Our  <a href="https://www.facebook.com/groups/1924130084493685/" className="fa fa-facebook"></a>acebook Group!
                     </div>
                </div>
            </div>
        );
    }
}


export default CountdownPage;