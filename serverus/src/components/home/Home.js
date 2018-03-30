import React, { Component } from "react";

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
          <div class = "Directions">
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
          <div class = "Community Pictures">
          </div>
        </div>
      </div>
    )
  }
}

// Inline Styles
const firstPart = {
  background: "#1B1C1D",
  minHeight: "700px",
  textAlign: "center",
}

const secondPart = {
  background: "#FFFFFF",
  padding: "8em"
}

const headerText = {
  marginTop: "3em",
  marginBottom: "0em",
  fontSize: "4em",
  fontWeight: "normal",
}

export default Home;