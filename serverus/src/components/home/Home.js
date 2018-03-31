import React, { Component } from "react";
// Import Timeline
// Import form of parallax or cool intro background

class Home extends Component {
  render() {
    return (
      <div class = "Page Contents">
        <div class = "ui inverted vertical masthead center aligned segment" style = {firstPart}>
          <div class = "ui text container">
            <h1 class = "ui inverted header" style = {headerText}>
              Greetings adventurers!
            </h1>
            <h2>
              The "Aztec Game Lab" guild welcomes you!
            </h2>
            <div class = "Timeline">
            </div>
          </div>
        </div>
        <div class = "ui vertical stripe segment" style = {secondPart}>
          <div class = "ui middle aligned stackable grid container">
            <div class = "row">
              <div class = "eight wide column">
                <div class = "ui raised very padded text container segment">
                  <h2 class = "ui header">Directions to our guild?</h2>
                  <p>Wander no further, the directions are here. Lots of text.
                  Wander no further, the directions are here. Lots of text.
                  Wander no further, the directions are here. Lots of text.
                  Wander no further, the directions are here. Lots of text.
                  Wander no further, the directions are here. Lots of text.
                  Wander no further, the directions are here. Lots of text.
                  </p>
                </div>
              </div>
              <div class = "six wide right floated column">
              </div>
            </div>
            <div class = "row">
              <div class = "six wide column">
              </div>
              <div class = "eight wide right floated column">
                <div class = "ui raised very padded text container segment">
                  <h2 class = "ui header">What community events do we hold?</h2>
                  <p>Wander no further, the directions are here. Lots of text.
                  Wander no further, the directions are here. Lots of text.
                  Wander no further, the directions are here. Lots of text.
                  Wander no further, the directions are here. Lots of text.
                  Wander no further, the directions are here. Lots of text.
                  Wander no further, the directions are here. Lots of text.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Inline Styles

const headerText = {
  marginTop: "3em",
  marginBottom: "0em",
  fontSize: "4em",
  fontWeight: "normal",
}

const firstPart = {
  background: "#1B1C1D",
  minHeight: "700px",
  textAlign: "center",
}

const secondPart = {
  background: "#FFFFFF",
  padding: "8em"
}

export default Home;
