//React & Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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
    return <div>{loadingStatus === "loading" ? <Loading loadingMessage="Retrieving Games..." /> : <GameGrid games={games} />}</div>;
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
