import React from "react";
import PropTypes from "prop-types";

//Components
import { Loader } from "semantic-ui-react";

const Loading = props => {
  return (
    <div>
      <Loader active inline="centered" size="big">
        {props.loadingMessage}
      </Loader>
    </div>
  );
};

Loading.propTypes = {
  loadingMessage: PropTypes.string.isRequired
};

export default Loading;

//Usage:
// Quickly create placeholder loading components
// <Loading loadingMessage="Retrieving profile..." />
// <Loading loadingMessage="Retrieving games..." />
