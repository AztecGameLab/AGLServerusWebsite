import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Grid, Image, Label, Header, Comment } from 'semantic-ui-react';

import { Image as CloudImage, CloudinaryContext } from 'cloudinary-react';

//import CustomIcon from '../../assets/cards/CustomIcon';

//Components
import Loading from "../../utility/Loading";
import ReactJson from "react-json-view";

//Selectors
import { selectIsGameDirectoryCached, selectSiteDataStatus, makeSelectGame } from "../../../features/siteData/siteDataSelectors";

//Actions
import { loadGames } from "../../../features/siteData/siteDataActions";

class GamePage extends Component {
  componentDidMount() {
    const { isGameDirectoryCached, loadGames } = this.props;
    if (!isGameDirectoryCached) {
      loadGames();
    } else {
      return <div>?</div>;
    }
  }

  datePrettify = originalDate => {
    const parts = originalDate.split("/");
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[parts[0] - 1];
    const day = parts[1];
    const year = parts[2].split(" ")[0];
    return month + " " + day + ", " + year;
  };

  showGenreIcons = (genre, key) => {
    //TODO Implement this
  }

  minify = profileURL => {
    let headerImage = profileURL;
    headerImage = headerImage.slice(0, headerImage.indexOf("Small")) + "Extra" + headerImage.slice(headerImage.indexOf("Small"));
    return headerImage;
  }

  mapComments = comments => {
    const sortedByTime = Object.keys(comments).sort((a, b) => a - b);
    const commentList = sortedByTime.map((time) => {
      return(
        <div key={time}>
          <Comment>
            <CloudImage className="avatar" publicId={this.minify(comments[time].profilePic)}/>
            <Comment.Content>
              <Comment.Author>{ comments[time].username }</Comment.Author>
              <Comment.Metadata>{comments[time].timeSubmitted}</Comment.Metadata>
              <Comment.Text>{comments[time].text}</Comment.Text>
            </Comment.Content>
          </Comment>
        </div>
      );
    });
    return commentList;
  }

  render() {
    const { loadingStatus, currentGame } = this.props;
    return <div>{loadingStatus === "loading" ? <Loading loadingMessage="Retrieving Game..." /> :
      <div>
        <CloudinaryContext cloudName="aztecgamelab-com">
          <Grid>
            <Grid.Column />
            <Grid.Column width={8}>
              <Card fluid>
                <Card.Content>
                  <Card.Header><h3 style={{ textAlign: "center", fontSize: "5em" }}>{currentGame.title}</h3></Card.Header>
                  Preview Image
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Content>
                  Votes
              </Card.Content>
              </Card>
              <Card fluid>
                <Card.Content>
                  <Header>Comments</Header>
                  <div>
                    {this.mapComments(currentGame.comments)}
                  </div>
              </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={4}>
              <Card fluid>
                <Card.Content>
                  <Grid columns={2}>
                    <Grid.Column>
                      <Header>Team</Header>
                    </Grid.Column>
                    <Grid.Column>
                      {currentGame.teamName}
                    </Grid.Column>
                  </Grid>
                </Card.Content>
                <Card.Content>
                  <Header>Author</Header>
                </Card.Content>
                <Card.Content>
                  <Grid columns={2}>
                    <Grid.Column>
                      <Header>Date</Header>
                    </Grid.Column>
                    <Grid.Column>
                      {this.datePrettify(currentGame.date)}
                    </Grid.Column>
                  </Grid>
                </Card.Content>
                <Card.Content>
                  <Header>Category</Header>
                </Card.Content>
                <Card.Content>
                  <Grid columns={2}>
                    <Grid.Column>
                      <Header>Downloaded</Header>
                    </Grid.Column>
                    <Grid.Column>
                      {currentGame.dlCount} Times!
                  </Grid.Column>
                  </Grid>
                </Card.Content>
                <Card.Content>
                  <Grid columns={2}>
                    <Grid.Column>
                      <Header>Tags</Header>
                    </Grid.Column>
                    <Grid.Column>
                      {
                        currentGame.selectedTags.map((tag, idx) => {
                          return(<Label key={idx} tag>{tag}</Label>);
                        })
                      }
                    </Grid.Column>
                  </Grid>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </CloudinaryContext>
        <ReactJson src={currentGame} />
      </div>
    }
    </div>;
  }
}

const makeMapStateToProps = () => {
  const selectGame = makeSelectGame();
  const mapStateToProps = (state, props) => {
    return {
      loadingStatus: selectSiteDataStatus(state).gameDirectory,
      isGameDirectoryCached: selectIsGameDirectoryCached(state),
      currentGame: selectGame(state, props)
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadGames
    },
    dispatch
  );

export default connect(makeMapStateToProps, mapDispatchToProps)(GamePage);
