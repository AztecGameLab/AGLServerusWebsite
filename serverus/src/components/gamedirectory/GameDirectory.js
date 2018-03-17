//React & Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Actions
import { loadUsers, filterUserDirectory } from "../../features/siteData/siteDataActions";

//Selectors
import { selectIsUserDirectoryCached, selectUserDirectory, selectLoadUserDirectoryStatus } from "../../features/siteData/siteDataSelectors";

//Components
import { Button } from "semantic-ui-react";

class GameDirectory extends Component {
  componentWillMount() {
    const { isUserDirectoryCached, loadUsers } = this.props;
    if (!isUserDirectoryCached) {
      console.log("not cached", isUserDirectoryCached);
      loadUsers();
    }
  }

  render() {
    const { loadUsers, filterUserDirectory } = this.props;
    return (
      <div>
        Game Directory
        <Button onClick={loadUsers}>Load Users</Button>
        <Button onClick={filterUserDirectory}>Filter Users</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserDirectoryCached: selectIsUserDirectoryCached(state),
    userDirectory: selectUserDirectory(state),
    userDirectoryLoadStatus: selectLoadUserDirectoryStatus(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadUsers,
      filterUserDirectory
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(GameDirectory);
