import React, { Component } from "react";
// import HorizontalTimeline from "react-horizontal-timeline";
import Tubular from "react-tubular";

// const VALUES = [1, 2, 3];

class Home extends Component {
  state = { value: 0, previous: 0 };

  render() {
    return (
      <div class="Page Contents">
        <div class="ui vertical center aligned segment" style={firstPart}>
          <Tubular // For this to show correctly, margin of ui menu must be 0 or find a different parallax
            ratio={16 / 9} // Choose 4/3 or 16/9
            videoId={"AQiAEczCASw"} // Retrowave
            mute={true}
            repeat={true}
            width={window.innerWidth}
            wrapperZIndex={-1}
            increaseVolumeBy={0}
            start={0}
            ref={ref => {
              this.tubular = ref;
            }}
          />
          <div class="ui active dimmer">
            <div class="content">
              <h1 class="ui inverted header" style={headerText}>
                Greetings game devs!
              </h1>
              <h2 class="ui inverted header">The "Aztec Game Lab" welcomes you!</h2>
            </div>
          </div>
        </div>
        <div class="ui vertical stripe segment" style={secondPart}>
          <div class="ui middle aligned stackable grid container">
            <div class="row">
              <div class="eight wide column">
                <div class="ui raised very padded text container segment">
                  <h2 class="ui header">When and where are the lab meetings?</h2>
                  <p>
                    We meet every Friday from 1 PM to 3 PM (PST)!
                    <br />
                    <br />At SDSU we're located in the VITaL lab which is at the bottom and center of the Adams Humanities building!
                  </p>
                  <div class="ui tertiary segment">
                    Instructional Technology Services<br />
                    Adams Humanities, 1st Floor<br />
                    San Diego State University<br />
                    5500 Campanile Dr.<br />
                    San Diego, CA 92182-8114<br />
                  </div>
                </div>
              </div>
              <div class="eight wide right floated column">
                <img
                  class="ui rounded image"
                  src="https://res.cloudinary.com/aztecgamelab-com/image/upload/v1522731700/SDSUMAP1_x2vo4a.png"
                  alt="secret location"
                />
              </div>
            </div>
            <div class="row">
              <div class="eight wide column">
                <img
                  class="ui rounded image"
                  src="https://res.cloudinary.com/aztecgamelab-com/image/upload/v1/WebsiteAssets/groupPhoto.jpg"
                  alt="the guild"
                />
              </div>
              <div class="eight wide right floated column">
                <div class="ui raised very padded text container segment">
                  <h2 class="ui header">What community events does the lab hold?</h2>
                  <p>
                    Our events range from game jams (hackathon for video games), software workshops, and our scheduled meetings! We also have
                    development hours for those who want a space to work on their games!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ui vertical center aligned segment" style={thirdPart}>
          <row>
            <h2 class="ui header">A special thank you to our sponsors for their help!</h2>
          </row>
          <div class="ui four column grid">
            <div class="column" />
            <div class="middle aligned column">
              <img src="https://res.cloudinary.com/aztecgamelab-com/image/upload/c_scale,w_300/v1522789701/VIVE_xp3jad.png" alt="HTC Vive" />
            </div>
            <div class="middle aligned column">
              <img
                src="https://res.cloudinary.com/aztecgamelab-com/image/upload/c_scale,w_300/v1522789700/PlayStation_dkb1c1.png"
                alt="PlayStation"
              />
            </div>
            <div class="column" />
          </div>
        </div>
      </div>
    );
  }
}

// Inline Styles

const headerText = {
  marginTop: "-3em",
  marginBottom: "0em",
  fontSize: "4em",
  fontWeight: "normal"
};

const firstPart = {
  minHeight: "700px",
  textAlign: "center"
};

const secondPart = {
  background: "#FFFFFF",
  padding: "8em"
};

const thirdPart = {
  background: "#FFFFFF",
  padding: "6em"
};

export default Home;
