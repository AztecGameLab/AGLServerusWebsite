import React, { Component } from "react";
// import { connect } from "react-redux";

//Components
// import Tubular from "react-tubular";
// import YouTube from "react-youtube";
import ReactPlayer from "react-player";

//Selectors
// import { selectCurrentPage } from "../../features/siteData/siteDataSelectors";

//Stylings
import "./Home.css";

class Home extends Component {
  render() {
    // const { currentPageRoute } = this.props;

    // const opts = {
    //   height: "700px",
    //   width: "100%",
    //   playerVars: {
    //     // https://developers.google.com/youtube/player_parameters
    //     autoplay: 1,
    //     loop: 1,
    //     controls: 0,
    //     showinfo: 0,
    //     playlist: ["AQiAEczCASw"],
    //     disablekb: 1,
    //   }
    // };
    return (
      <div class="Page Contents">
        <div class="ui vertical center aligned segment" style={firstPart}>
          <ReactPlayer
            url="https://www.youtube.com/embed/AQiAEczCASw"
            playing="true"
            loop="true"
            muted="true"
            height="1070px"
            width="100%"
          />
          <div class="ui active dimmer">
            <div class="content" style={headerText}>
              <img
                src="http://res.cloudinary.com/aztecgamelab-com/image/upload/c_scale,h_675/v1522960410/AGL_banner_transparent_1_sjuzwm.png"
                alt="We are the Aztec Game Lab"
              />
            </div>
          </div>
        </div>
        <div class="ui vertical center aligned segment" style={thirdPart}>
          <div class="ui three column grid">
            <div class="three wide column" />
            <div class="ten wide column">
              <div class="ui inverted segment">
                <div class="ui three huge statistics">
                  <div class="ui red inverted statistic">
                    <div class="value">
                      <i aria-hidden="true" class="user circle icon" /> 160+
                    </div>
                    <div class="label">Team Members</div>
                  </div>
                  <div class="ui violet inverted statistic">
                    <div class="value">
                      <i aria-hidden="true" class="cogs icon" /> 3
                    </div>
                    <div class="label">Workshops</div>
                  </div>
                  <div class="ui purple inverted statistic">
                    <div class="value">
                      <i aria-hidden="true" class="gamepad icon" /> 2
                    </div>
                    <div class="label">Gamejams</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="three wide column" />
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

// const mapStateToProps = state => {
//   return {
//     currentPageRoute: selectCurrentPage(state)
//   };
// };

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

// export default connect(mapStateToProps)(Home);
export default Home;
