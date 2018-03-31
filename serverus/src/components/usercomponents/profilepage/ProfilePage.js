import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Components
import Loading from "../../utility/Loading";
import ReactJson from "react-json-view";

//Actions
import { loadProfile } from "../../../features/siteData/siteDataActions";

//Selectors
import { selectSiteDataStatus, makeSelectUser } from "../../../features/siteData/siteDataSelectors";

class ProfilePage extends Component {
  componentDidMount() {
    const { loadProfile, currentUser } = this.props;
    const { username } = this.props.match.params;
    if (!currentUser) {
      debugger;
      loadProfile(username);
    }
  }
  render() {
    const { loadingStatus, currentUser } = this.props;
    return <div>{loadingStatus === "loading" ? <Loading loadingMessage="Retrieving Profile..." /> : <ReactJson src={currentUser} />}</div>;
  }
}

const makeMapStateToProps = () => {
  const selectUser = makeSelectUser();
  const mapStateToProps = (state, props) => {
    return {
      loadingStatus: selectSiteDataStatus(state).userProfile,
      currentUser: selectUser(state, props)
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadProfile
    },
    dispatch
  );

export default connect(makeMapStateToProps, mapDispatchToProps)(ProfilePage);
