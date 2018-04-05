import React from "react";

//Components
import { Card } from "semantic-ui-react";
import UserCard from "./UserCard";

//Utility
import { isObject } from "lodash";

const UserGrid = props => {
  const UserCards = Object.keys(props.users).map(UserKey => {
    if (isObject(props.users[UserKey])) {
      return <UserCard key={UserKey} UserData={props.users[UserKey]} route={UserKey} />;
    } else {
      return <div>?</div>;
    }
  });
  return (
    <Card.Group centered itemsPerRow={3}>
      {UserCards}
    </Card.Group>
  );
};

export default UserGrid;
