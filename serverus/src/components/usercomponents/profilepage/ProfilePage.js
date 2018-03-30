import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Components
import Loading from "../../utility/Loading";

//Actions
import { loadProfile } from "../../../features/siteData/siteDataActions";

//Selectors
import { selectSiteDataStatus } from "../../../features/siteData/siteDataSelectors";

class ProfilePage extends Component {
  componentDidMount() {
    const { loadProfile } = this.props;
    const { username } = this.props.match.params;
    loadProfile(username);
  }
  render() {
    const { loadingStatus } = this.props;
    return <div>{loadingStatus === "loading" ? <Loading loadingMessage="Retrieving Profile..." /> : <div>placeholder</div>}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loadingStatus: selectSiteDataStatus(state).userProfile
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadProfile
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
