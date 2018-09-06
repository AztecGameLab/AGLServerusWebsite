import React from "react";

//Components
import { Message } from "semantic-ui-react";

const ErrorMessage = props => {
  return (
    <div>
      <Message negative>
        <p>{props.message}</p>
      </Message>
    </div>
  );
};

export default ErrorMessage;
