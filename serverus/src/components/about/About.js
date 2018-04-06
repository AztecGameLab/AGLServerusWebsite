import React, { Component } from "react";
import { Image, Button, Header, Dimmer, Grid, Modal, Divider, Segment } from "semantic-ui-react";

import ExecBoardData from "./ExecutiveBoard";

class About extends Component {
  state = {};

  handleShow = () => this.setState({ active: true });
  /*handleHide = () => this.setState({ active: false })

  handleDimmerEnter = (event, boardMember) => {
    debugger;
    this.setState({
      [boardMember]: true
    });
  };
  */

  render() {
    const dimmedCard = this.state.dimmedCard;
    //const ExecBoardData = this.state.ExecBoardData

    const execComponents = ExecBoardData.map(boardMemberData => {
      /*
      if (this.state[boardMemberData.name]) {
        console.log("DIMMER", this.state[boardMemberData.name].toString);
      }
      */
      return (
        <Grid.Column key={boardMemberData.name}>
          <Modal
            trigger={
              <div>
                <Dimmer.Dimmable
                  key={boardMemberData.name}
                  as={Image}
                  /*dimmed={this.state[boardMemberData] || false}
                  onMouseEnter={e => this.handleDimmerEnter(e, boardMemberData.name)}
                  src={boardMemberData.imageURL}*/

                  dimmed={dimmedCard === boardMemberData.name ? true : false}
                  dimmer={{ active: dimmedCard === boardMemberData.name }}
                  onMouseEnter={() => {
                    this.handleShow(boardMemberData.name);
                  }}
                  onMouseLeave={() => {
                    this.handleShow("");
                  }}
                  src={boardMemberData.imageURL}
                />
                {boardMemberData.name}
                <p> </p>
                {boardMemberData.title}
              </div>
            }
          >
            <Grid style={{ Align: "center" }} padded>
              <Grid.Row>
                <h2 padded style={{ textAlign: "Center"}}>
                  {boardMemberData.name} <p> </p> {boardMemberData.title}
                </h2>
              </Grid.Row>
              <Divider/>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Image Align="center" size="small" src={boardMemberData.imageURL} />
                </Grid.Column>
                <Grid.Column Align="center" width={9}>
                  {boardMemberData.bio}
                </Grid.Column>
              </Grid.Row>
            </Grid>
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
          <Divider />
          <Grid.Row>
            <h2 style={{ textAlign: "center" }}>Exec Board 2017-2018</h2>
          </Grid.Row>
          <Grid.Row>
            {" "}
            <Image
              size="large"
              wrapped
              src="https://scontent-lax3-1.xx.fbcdn.net/v/t31.0-8/21248531_288460691561684_5861760460387346584_o.jpg?_nc_cat=0&oh=5f06cb5da4f0c691ebc8c997d57002aa&oe=5B69D8B9"
            />
          </Grid.Row>
          <Grid.Row>{execComponents}</Grid.Row>
          <Divider />
          <Grid.Row>
            <h1 style={{ textAlign: "center" }}>History</h1>
          </Grid.Row>
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
