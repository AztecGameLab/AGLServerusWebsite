import React, { Component } from "react";

//Components
import { Image, Grid, Modal, Divider, Card, Button } from "semantic-ui-react";

//JSON Data
import ExecBoardData from "./ExecutiveBoard";

class About extends Component {
  render() {
    const execComponents = ExecBoardData.map(boardMemberData => {
      return (
        <Grid.Column key={boardMemberData.name} width={3}>
          <Modal
            basic
            trigger={
              <div>
                <Card raised key={boardMemberData.name} style={{ marginBottom: "1em" }}>
                  <Image src={boardMemberData.imageURL} />
                  <Card.Header> {boardMemberData.name}</Card.Header>
                  <Card.Meta> {boardMemberData.title}</Card.Meta>
                  <Card.Content extra>
                    <p>Original Founding Team 2016</p>
                  </Card.Content>
                </Card>
              </div>
            }
          >
            <Grid centered padded>
              <Grid.Row>
                <h2 style={{ textAlign: "center" }}>
                  <div>{boardMemberData.name}</div>
                  <div> {boardMemberData.title}</div>
                </h2>
              </Grid.Row>
              <Divider />
              <Grid.Row>
                <Grid.Column width={7}>
                  <Image size="large" src={boardMemberData.imageURL} />
                </Grid.Column>
                <Grid.Column width={9}>{boardMemberData.bio}</Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal>
        </Grid.Column>
      );
    });

    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Aztec Game Lab</h1>

        <Grid textAlign="center" padded>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image src="https://scontent.fsan1-1.fna.fbcdn.net/v/t1.0-9/20729751_1587725544582112_5081200574316416443_n.jpg?_nc_cat=0&oh=0a63b6ad6a1a149264a07d537aa6a638&oe=5B2D458E" />
            </Grid.Column>
            <Grid.Column width={9} textAlign="center">
              <p>About us Description</p>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <h2 style={{ textAlign: "center" }}>Executive Board</h2>
          </Grid.Row>
          <Grid.Row>{execComponents}</Grid.Row>
          <Divider />
          <Grid.Row>
            <Button
              as="a"
              href="https://docs.google.com/forms/d/1cy-1gNI7DelqkA_9QNTOng8usYsg8kREWTymt5Ov9dk/edit"
              target="_blank"
              color="green"
              size="massive"
            >
              Interested in joining?
            </Button>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default About;
