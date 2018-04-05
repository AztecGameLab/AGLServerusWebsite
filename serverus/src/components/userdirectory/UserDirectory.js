//React & Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, Grid, Header } from "semantic-ui-react";

//Actions
import { loadUsers, filterUserDirectory } from "../../features/siteData/siteDataActions";

//Selectors
import { selectIsUserDirectoryCached, selectUserDirectory, selectSiteDataStatus } from "../../features/siteData/siteDataSelectors";

//Components
import UserGrid from "./UserGrid";
import Loading from "../utility/Loading";

class UserDirectory extends Component {
  componentDidMount() {
    const { isUserDirectoryCached, loadUsers } = this.props;
    if (!isUserDirectoryCached) {
      loadUsers();
    }
  }

  render() {
    const { users, loadingStatus } = this.props;
    return <div>{loadingStatus === "loading" ? <Loading loadingMessage="Retrieving Users..." /> :
      <div>
      <Grid>
        <Grid.Column width={3}>
          <Card fluid>
            <Card.Content>
              <Header dividing>Users</Header>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={12}>
          <UserGrid users={users} />
        </Grid.Column>
      </Grid>

      </div>}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isUserDirectoryCached: selectIsUserDirectoryCached(state),
    users: selectUserDirectory(state),
    loadingStatus: selectSiteDataStatus(state).userDirectory
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
