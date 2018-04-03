import React, { Component } from "react";
// Import Timeline
import Tubular from "react-tubular";

class Home extends Component {
  render() {
    return (
      <div class="Page Contents">
        <div class="ui vertical center aligned segment" style={firstPart}>
          <Tubular // For this to show correctly, margin of ui menu must be 0
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
                Greetings adventurers!
              </h1>
              <h2 class="ui inverted header">The "Aztec Game Lab" guild welcomes you!</h2>
              <div class="Timeline" />
            </div>
          </div>
        </div>
        <div class="ui vertical stripe segment" style={secondPart}>
          <div class="ui middle aligned stackable grid container">
            <div class="row">
              <div class="eight wide column">
                <div class="ui raised very padded text container segment">
                  <h2 class="ui header">Directions to our guild?</h2>
                  <p>
                    Wander no further, the directions are here. Lots of text. Wander no further, the directions are here. Lots of text. Wander no
                    further, the directions are here. Lots of text. Wander no further, the directions are here. Lots of text. Wander no further, the
                    directions are here. Lots of text. Wander no further, the directions are here. Lots of text.
                  </p>
                </div>
              </div>
              <div class="six wide right floated column" />
            </div>
            <div class="row">
              <div class="six wide column" />
              <div class="eight wide right floated column">
                <div class="ui raised very padded text container segment">
                  <h2 class="ui header">What community events do we hold?</h2>
                  <p>
                    Wander no further, the directions are here. Lots of text. Wander no further, the directions are here. Lots of text. Wander no
                    further, the directions are here. Lots of text. Wander no further, the directions are here. Lots of text. Wander no further, the
                    directions are here. Lots of text. Wander no further, the directions are here. Lots of text.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ui vertical stripe segment" style={secondPart}>
          <div class="ui middle aligned stackable grid container">
            <div class="center aligned row">
              <h2 class="ui header">Thank you to our sponsors!</h2>
              <p>
                Wander no further, the directions are here. Lots of text. Wander no further, the directions are here. Lots of text. Wander no further,
                the directions are here. Lots of text. Wander no further, the directions are here. Lots of text. Wander no further, the directions are
                here. Lots of text. Wander no further, the directions are here. Lots of text.
              </p>
            </div>
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

export default Home;
