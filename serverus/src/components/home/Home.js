import React, { Component } from "react";
import { Container, Divider, Grid, Header, Icon, List, Segment, Statistic } from "semantic-ui-react";

//Components
import YouTubePlayer from "react-player/lib/players/YouTube";
import { Image as CloudImage, CloudinaryContext, Transformation } from "cloudinary-react";

//Stylings
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div>
        {/* 1ST SECTION: VIDEO */}
        <Container fluid>
            <YouTubePlayer url="https://youtu.be/Uhs-JTzRWHk"
              volume="0"
              mute
              playing
              loop
              height="700px"
              width="100%"
            />
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

        <Divider hidden />
        {/* 3RD SECTION: ABOUT US */}
        <Container>
          <Grid columns="2">
            <Grid.Row>
              <Grid.Column>
                <Segment padded="true">
                  <Header as="h2">When and where are the lab meetings?</Header>
                  <p>
                    <s>We meet every Friday from 1 PM to 3 PM (PST)!</s>
                    <br />
                    <b>NOTE: No more meetings until further notice!</b>
                    <br />
                    <br />
                    At SDSU we're located in the VITaL lab which is at the bottom and center of the Adams Humanities building!
                  </p>
                  <Segment tertiary="true">
                    <p>
                      Instructional Technology Services<br />
                      Adams Humanities, 1st Floor<br />
                      San Diego State University<br />
                      5500 Campanile Dr.<br />
                      San Diego, CA 92182-8114<br />
                    </p>
                  </Segment>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <CloudinaryContext cloudName="aztecgamelab-com">
                  <CloudImage publicId="SDSUMAP.png">
                    <Transformation quality="100" radius="25" width="550" crop="fill" />
                  </CloudImage>
                </CloudinaryContext>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <CloudinaryContext cloudName="aztecgamelab-com">
                  <CloudImage publicId="WebsiteAssets/groupPhoto.jpg">
                    <Transformation quality="100" radius="25" width="550" crop="fill" />
                  </CloudImage>
                </CloudinaryContext>
              </Grid.Column>
              <Grid.Column>
                <Segment padded="true">
                  <Header as="h2">What community events does the lab hold?</Header>
                  <List>
                    <List.Item>
                      <List.Icon name="game" />
                      <List.Content>
                        <List.Header>Game Jams</List.Header>
                        <List.Description>
                          <br />
                          Hackathons for games! Game developers gather together in a controlled space to develop, share ideas, and create something
                          cool within an amount of time.
                        </List.Description>
                        <br />
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="cogs" />
                      <List.Content>
                        <List.Header>Workshops</List.Header>
                        <List.Description>
                          <br />
                          Workshops ranging from how to create a simple 2D game in Unity to how to work with shader script files! Level up your dev
                          skills!
                        </List.Description>
                        <br />
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="group" />
                      <List.Content>
                        <List.Header>Meetings</List.Header>
                        <List.Description>
                          <br />
                          The heart of the community. Trivia and prizes, talk about the hit games that are out and your favorite mechanics! VR free
                          time always after the meeting.
                        </List.Description>
                        <br />
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="code" />
                      <List.Content>
                        <List.Header>Dev Hours</List.Header>
                        <List.Description>
                          <br />
                          Need to work on homework? Your future game? We provide a space for you to dev, away from the entropic universe.
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        <Divider hidden />
        {/* 4TH SECTION: SPONSORSHIP */}
        <Container fluid>
          <Container vertical textAlign="center">
            <Grid columns={1}>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h1">A special thank you to our sponsors for their help!</Header>
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
      </div >
    );
  }
}



export default Home;
