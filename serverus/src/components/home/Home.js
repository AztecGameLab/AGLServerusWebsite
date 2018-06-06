import React, { Component } from "react";
import { Grid, Header, Image, Segment } from 'semantic-ui-react'

//Components
import ReactPlayer from "react-player";
import { Image as CloudImage, CloudinaryContext, Transformation } from "cloudinary-react";

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
                <CloudinaryContext cloudName="aztecgamelab-com">
                  <CloudImage publicId="VIVE_xp3jad.png" centered>
                    <Transformation width="300" crop="scale" quality="auto" responsive />
                  </CloudImage>
                </CloudinaryContext>
              </Grid.Column>
              <Grid.Column>
                <CloudinaryContext cloudName="aztecgamelab-com">
                  <CloudImage publicId="PlayStation.png">
                    <Transformation width="300" crop="scale" quality="auto" responsive />
                  </CloudImage>
                </CloudinaryContext>
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
