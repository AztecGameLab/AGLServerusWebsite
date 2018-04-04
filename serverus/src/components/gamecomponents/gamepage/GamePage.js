import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom"; 
import Lightbox from 'react-images';
import Slider from 'react-slick';
import SlickNextArrow from '../../assets/arrows/SlickNextArrow';
import SlickPrevArrow from '../../assets/arrows/SlickPrevArrow';
import { Card, Grid, Image, Label, Header, Comment, Icon } from 'semantic-ui-react';

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

  createScreenshots = (value, key) => {
    return(
      <div key={key} style={{textAlign: "center", key: {key}}}>
        <Image style={{maxHeight: 250, borderRadias: 5, cursor: 'zoom-in'}} onDoubleClick={this.showScreenshot} src={value.url}/>
      </div>
    )
  }

  showScreenshot = e => {
    
  }

  goToPrevious = () => {
    //TODO Implement
  }

  goToNext = () => {
    //TODO Implement
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
    const { loadingStatus, currentGame, currentUser } = this.props;
    let that = this;
    var screenshots;
    if(currentGame.screenshots){
      var slidesToShow = currentGame.screenshots.length < 3 ? 1 : 3;
      var settings = {
        accessibility: false,
        centerMode: true,
        centerPadding: 0,
        customPaging: function(i){
          return <a><img alt="" style={{ maxHeight: 24, height: '-webkit-fill-available' }} src={that.props.currentGame.screenshots[i].url} /></a>
        },
        dots: true,
        dotsClass: 'slick-dots slick-thumb',
        focusOnSelect: true,
        infinite: true,
        pauseOnHover: true,
        speed: 400,
        slidesToShow: slidesToShow,
        nextArrow: <SlickNextArrow noArrow={false}/>,
        prevArrow: <SlickPrevArrow noArrow={false}/>
      }
      screenshots = currentGame.screenshots.map(this.createScreenshots);
      if(screenshots){
        var lightBox = <Lightbox images={currentGame.screenshots} currentImage={0} enableKeyboardInput/>
      }
    }
    return <div>{loadingStatus === "loading" ? <Loading loadingMessage="Retrieving Game..." /> :
      <div>
        <CloudinaryContext cloudName="aztecgamelab-com">
          <Grid>
            <Grid.Column />
            <Grid.Column width={8}>
              <Card fluid>
                <Card.Content>
                  <Card.Header><h3 style={{ textAlign: "center", fontSize: "5em" }}>{currentGame.title}</h3></Card.Header>
                  <div>
                    <Slider {...settings}>
                      {screenshots}
                    </Slider>
                    {lightBox}
                  </div>
                  <div>
                    {currentGame.description}
                  </div>
                </Card.Content>
              </Card>
              <Card fluid>
                <Card.Content>
                  {(!currentUser) ?
                    <div>
                      Can Vote
                    </div> :
                    <div>
                      Can Not Vote
                    </div>
                  }
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
                  <Grid columns={2}>
                    <Grid.Column>
                      <Header>Authors</Header>
                    </Grid.Column>
                    <Grid.Column>
                      {currentGame.authors.map((author, idx) => {
                        return(
                          <div key={idx}>
                            <Label basic as={Link} to={"/user/"+author}><Icon name="user"/>{author}</Label>
                          </div>
                        );
                      })}
                    </Grid.Column>
                  </Grid>
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
