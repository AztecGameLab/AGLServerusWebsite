//React & Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Actions
import { loadGames } from "../../features/siteData/siteDataActions";

//Selectors
import { selectIsGameDirectoryCached, selectGameDirectory, selectLoadGameDirectoryStatus } from "../../features/siteData/siteDataSelectors";

//Components
import { Button } from "semantic-ui-react";
import GameGrid from "./GameGrid";

class GameDirectory extends Component {
  componentDidMount() {
    const { isGameDirectoryCached, loadGames } = this.props;
    if (!isGameDirectoryCached) {
      loadGames();
    }
  }

  render() {
    const { loadGames, games } = this.props;
    return (
      <div>
        <GameGrid games={games} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isGameDirectoryCached: selectIsGameDirectoryCached(state),
    games: selectGameDirectory(state),
    gameDirectoryLoadStatus: selectLoadGameDirectoryStatus(state)
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
