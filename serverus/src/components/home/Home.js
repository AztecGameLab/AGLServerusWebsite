import React, { Component } from "react";
import { Grid, Image, Segment } from 'semantic-ui-react'

//Components
import ReactPlayer from "react-player";

//Stylings
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div>
        <Segment.Group>

        </Segment.Group>
        <Segment.Group>
          
        </Segment.Group>
        <Segment.Group>

        </Segment.Group>
        <Segment.Group>
          <Segment vertical textAlign='center' style={thirdPart}>
            <Grid columns={1}>
              <Grid.Row>
                <Grid.Column>
                  <Header as='h2'>A special thank you to our sponsors for their help!</Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid columns={2}>
              <Grid.Column>
                <Image src="https://res.cloudinary.com/aztecgamelab-com/image/upload/c_scale,w_300/v1522789701/VIVE_xp3jad.png" />
              </Grid.Column>
              <Grid.Column>
                <Image src="https://res.cloudinary.com/aztecgamelab-com/image/upload/c_scale,w_300/v1522789700/PlayStation_dkb1c1.png" />
              </Grid.Column>
            </Grid>
          </Segment>
        </Segment.Group>
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
