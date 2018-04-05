import React, { Component } from "react";
import GridRow, { Image, Button, Header, Dimmer, Grid, Segment, Modal } from "semantic-ui-react";

import ExecBoardData from "./ExecutiveBoard";

class About extends Component {
  state = {};

  handleDimmerEnter = (e, person) => {
    debugger;
    this.setState({
      [person]: true
    });
  };

  render() {
    const execComponents = ExecBoardData.map(personData => {
      if (this.state[personData.name]) {
        console.log("DIMMER", this.state[personData.name].toString);
      }
      return (
        <Grid.Column key={personData.name}>
          <Modal
            trigger={
              <div>
                <Dimmer.Dimmable
                  as={Image}
                  dimmed={this.state[personData.name] || false}
                  onMouseEnter={e => this.handleDimmerEnter(e, personData.name)}
                  src={personData.imageURL}
                />
                {personData.name}
                {personData.title}
              </div>
            }
          >
            modal content
            {personData.bio}
          </Modal>
        </Grid.Column>
      );
    });

    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Aztec Game Lab</h1>

        <Grid textAlign="center">
          <Grid.Row>
            <Grid.Column width={4}>
              <Image src="https://scontent.fsan1-1.fna.fbcdn.net/v/t1.0-9/20729751_1587725544582112_5081200574316416443_n.jpg?_nc_cat=0&oh=0a63b6ad6a1a149264a07d537aa6a638&oe=5B2D458E" />
            </Grid.Column>
            <Grid.Column width={9} textAlign="center">
              <p>About us Description</p>
            </Grid.Column>
          </Grid.Row>
          <h3 style={{ textAlign: "center" }}>Exec Board</h3>
          <Grid.Row> <Image size ="large" wrapped src="https://scontent-lax3-1.xx.fbcdn.net/v/t31.0-8/21248531_288460691561684_5861760460387346584_o.jpg?_nc_cat=0&oh=5f06cb5da4f0c691ebc8c997d57002aa&oe=5B69D8B9" />
          </Grid.Row>
          <Grid.Row>{execComponents}</Grid.Row>
          <h1 style={{ textAlign: "center" }}>History</h1>
          <Grid.Row>
            <Grid.Column width={9} textAlign="center">
              <p>History of how we became about</p>
            </Grid.Column>
            <Grid.Column width={4}>
              <Image src="https://scontent-lax3-1.xx.fbcdn.net/v/t31.0-8/21752559_292167087857711_9105781865774832213_o.jpg?_nc_cat=0&oh=918734f27d0d4a92bfba39388e3cbb10&oe=5B292524" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default About;
