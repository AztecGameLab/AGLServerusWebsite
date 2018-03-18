import React from "react";

//Components
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Image as CloudImage, CloudinaryContext } from "cloudinary-react";

const UserCard = props => {
  return (
    <Card as={Link} to={"user/" + props.route}>
      <CloudinaryContext cloudName="aztecgamelab-com">
        <CloudImage publicId={props.UserData.showcaseImage} />
      </CloudinaryContext>
      <Card.Content>
        <Card.Header>{props.UserData.username}</Card.Header>
      </Card.Content>
      <Card.Description>{props.UserData.bio}</Card.Description>
    </Card>
  );
};

export default UserCard;
