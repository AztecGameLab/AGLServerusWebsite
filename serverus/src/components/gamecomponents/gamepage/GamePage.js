import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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

  render() {
    const { loadingStatus, currentGame } = this.props;
    return <div>{loadingStatus === "loading" ? <Loading loadingMessage="Retrieving Game..." /> : <ReactJson src={currentGame} />}</div>;
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
