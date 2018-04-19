import React, { Component } from "react";

//Components
import ReactPlayer from "react-player";

//Stylings
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="Page Contents">
        <div className="ui vertical center aligned segment" style={firstPart}>
          <ReactPlayer url="https://www.youtube.com/embed/AQiAEczCASw" playing loop muted height="1070px" width="100%" />
          <div className="ui active dimmer">
            <div className="content" style={headerText}>
              <img
                src="http://res.cloudinary.com/aztecgamelab-com/image/upload/c_scale,h_675/v1522960410/AGL_banner_transparent_1_sjuzwm.png"
                alt="We are the Aztec Game Lab"
              />
            </div>
          </div>
        </div>
        <div className="ui vertical center aligned segment" style={thirdPart}>
          <div className="ui three column grid">
            <div className="three wide column" />
            <div className="ten wide column">
              <div className="ui inverted segment">
                <div className="ui three huge statistics">
                  <div className="ui red inverted statistic">
                    <div className="value">
                      <i aria-hidden="true" className="user circle icon" /> 160+
                    </div>
                    <div className="label">Team Members</div>
                  </div>
                  <div className="ui violet inverted statistic">
                    <div className="value">
                      <i aria-hidden="true" className="cogs icon" /> 3
                    </div>
                    <div className="label">Workshops Hosted</div>
                  </div>
                  <div className="ui purple inverted statistic">
                    <div className="value">
                      <i aria-hidden="true" className="gamepad icon" /> 2
                    </div>
                    <div className="label">Gamejams Completed</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="three wide column" />
          </div>
        </div>
        <div className="ui vertical stripe segment" style={secondPart}>
          <div className="ui middle aligned stackable grid container">
            <div className="row">
              <div className="eight wide column">
                <div className="ui raised very padded text container segment">
                  <h2 className="ui header">When and where are the lab meetings?</h2>
                  <p>
                    We meet every Friday from 1 PM to 3 PM (PST)!
                    <br />
                    <br />At SDSU we're located in the VITaL lab which is at the bottom and center of the Adams Humanities building!
                  </p>
                  <div className="ui tertiary segment">
                    Instructional Technology Services<br />
                    Adams Humanities, 1st Floor<br />
                    San Diego State University<br />
                    5500 Campanile Dr.<br />
                    San Diego, CA 92182-8114<br />
                  </div>
                </div>
              </div>
              <div className="eight wide right floated column">
                <img
                  className="ui rounded image"
                  src="https://res.cloudinary.com/aztecgamelab-com/image/upload/v1522731700/SDSUMAP1_x2vo4a.png"
                  alt="secret location"
                />
              </div>
            </div>
            <div className="row">
              <div className="eight wide column">
                <img
                  className="ui rounded image"
                  src="https://res.cloudinary.com/aztecgamelab-com/image/upload/v1/WebsiteAssets/groupPhoto.jpg"
                  alt="the guild"
                />
              </div>
              <div className="eight wide right floated column">
                <div className="ui raised very padded text container segment">
                  <h2 className="ui header">What community events does the lab hold?</h2>
                  <p>
                    Our events range from game jams (hackathon for video games), software workshops, and our scheduled meetings! We also have
                    development hours for those who want a space to work on their games!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui vertical center aligned segment" style={thirdPart}>
          <row>
            <h2 className="ui header">A special thank you to our sponsors for their help!</h2>
          </row>
          <div className="ui four column grid">
            <div className="column" />
            <div className="middle aligned column">
              <img src="https://res.cloudinary.com/aztecgamelab-com/image/upload/c_scale,w_300/v1522789701/VIVE_xp3jad.png" alt="HTC Vive" />
            </div>
            <div className="middle aligned column">
              <img
                src="https://res.cloudinary.com/aztecgamelab-com/image/upload/c_scale,w_300/v1522789700/PlayStation_dkb1c1.png"
                alt="PlayStation"
              />
            </div>
            <div className="column" />
          </div>
        </div>
      </div>
    );
  }
}

// Inline Styles
const headerText = {
  fontSize: "4em",
  fontWeight: "normal"
};

const firstPart = {
  height: "700px",
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
