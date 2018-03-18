//React & Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Actions
import { loadUsers, filterUserDirectory } from "../../features/siteData/siteDataActions";

//Selectors
import { selectIsUserDirectoryCached, selectUserDirectory, selectLoadUserDirectoryStatus } from "../../features/siteData/siteDataSelectors";

//Components
import UserGrid from "./UserGrid";

class UserDirectory extends Component {
  componentDidMount() {
    const { isUserDirectoryCached, loadUsers } = this.props;
    if (!isUserDirectoryCached) {
      loadUsers();
    }
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <UserGrid users={users} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserDirectoryCached: selectIsUserDirectoryCached(state),
    users: selectUserDirectory(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDirectory);
