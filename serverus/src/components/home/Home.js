import React, { Component } from "react";
import { Container, Dimmer, Divider, Grid, Header, Icon, Image, Segment, Statistic, StatisticValue } from "semantic-ui-react";

//Components
import ReactPlayer from "react-player";
import { Image as CloudImage, CloudinaryContext, Transformation } from "cloudinary-react";

//Stylings
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div>
        {/* 1ST SECTION: VIDEO */}
        {/* Fix: Create a Youtube video using the image itself */}
        <Container fluid>
          <ReactPlayer url="https://www.youtube.com/embed/AQiAEczCASw" playing loop muted height="900px" width="100%">
            <Dimmer active={true}>
              <Image publicId="AGLBanner.png" />
            </Dimmer>
          </ReactPlayer>
        </Container>

        <Divider hidden />
        {/* 2ND SECTION: STATISTICS */}
        <Container>
          <Segment inverted="true">
            <Statistic.Group widths="3" size="huge">
              <Statistic color="red" inverted="true">
                <Statistic.Value>
                  <Icon name="user circle" />160+
                </Statistic.Value>
                <Statistic.Label>Team Members</Statistic.Label>
              </Statistic>
              <Statistic color="violet" inverted="true">
                <Statistic.Value>
                  <Icon name="cogs" />4
                </Statistic.Value>
                <Statistic.Label>Workshops Hosted</Statistic.Label>
              </Statistic>
              <Statistic color="purple" inverted="true">
                <Statistic.Value>
                  <Icon name="gamepad" />3
                </Statistic.Value>
                <Statistic.Label>Gamejams Completed</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Segment>
        </Container>

        <Divider section />
        {/* 3RD SECTION: ABOUT US */}
        <Container>
          
        </Container>
        
        <Divider section />
        {/* 4TH SECTION: SPONSORSHIP */}
        <Container fluid>
          <Container vertical textAlign="center" style={thirdPart}>
            <Grid columns={1}>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h2">A special thank you to our sponsors for their help!</Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid columns={2}>
              <Grid.Column>
                <CloudinaryContext cloudName="aztecgamelab-com">
                  <CloudImage publicId="VIVE.png" centered>
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
          </Container>
        </Container>
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
