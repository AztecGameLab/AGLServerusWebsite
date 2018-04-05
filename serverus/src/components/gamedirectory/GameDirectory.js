//React & Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Grid, Card, Header, Table } from "semantic-ui-react";

//Actions
import { loadGames } from "../../features/siteData/siteDataActions";

//Selectors
import { selectIsGameDirectoryCached, selectGameDirectory, selectSiteDataStatus } from "../../features/siteData/siteDataSelectors";

//Components
import GameGrid from "./GameGrid";
import Loading from "../utility/Loading";

class GameDirectory extends Component {
  componentDidMount() {
    const { isGameDirectoryCached, loadGames } = this.props;
    if (!isGameDirectoryCached) {
      loadGames();
    } else {
      return <div>?</div>;
    }
  }

  render() {
    const { games, loadingStatus } = this.props;
    return <div>{loadingStatus === "loading" ? <Loading loadingMessage="Retrieving Games..." /> :
      <div>
        <Grid>
          <Grid.Column width={3}>
            <Card fluid>
              <Card.Content>
                <Header dividing>Games</Header>

              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={11}>
            <GameGrid games={games} />
          </Grid.Column>
        </Grid>
      </div>
    }</div>;
  }
}

const mapStateToProps = state => {
  return {
    isGameDirectoryCached: selectIsGameDirectoryCached(state),
    games: selectGameDirectory(state),
    loadingStatus: selectSiteDataStatus(state).gameDirectory
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadGames
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(GameDirectory);
