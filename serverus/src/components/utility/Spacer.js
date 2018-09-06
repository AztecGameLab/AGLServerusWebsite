import React from "react";
import PropTypes from "prop-types";

//Utility
import { range } from "lodash";

const Spacer = props => {
  const spaces = range(props.lines).map(num => {
    return <br key={num} />;
  });
  return spaces;
};

Spacer.propTypes = {
  lines: PropTypes.number.isRequired
};

export default Spacer;

//Usage:
// Quickly create line spaces programmatically
// <Spacer lines={3} />
