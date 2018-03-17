//React & Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Actions
import { loadUsers } from "../../features/siteData/siteDataActions";

//Components
import { Button } from "semantic-ui-react";

class GameDirectory extends Component {
  render() {
    const { loadUsers } = this.props;
    return (
      <div>
        Game Directory
        <Button onClick={loadUsers}>Load Users</Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadUsers
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(GameDirectory);
