import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

class Home extends Component {


  render() {
    return (
      <div>
        Home Page
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  };
}
export default connect(mapStateToProps, null)(Home);
