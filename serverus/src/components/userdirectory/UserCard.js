import React from "react";

//Components
import { Card, Icon, Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Image as CloudImage, CloudinaryContext } from "cloudinary-react";

import roleOptions from "../assets/roles/roleOptions.json";

const UserCard = props => {
  const roleMapper = roles => {
    let objectList = [];
    roles.map(userRole => {
      return objectList.push(roleOptions.roles.find(role => role.value === userRole));
    });
    return objectList.map((role, idx) => (<Icon size="large" key={idx} name={role.icon} color="black"/>));
  }

  return (
    <Card as={Link} to={"user/" + props.route}>
      <Grid>
        <Grid.Column width={6}>
          <CloudinaryContext cloudName="aztecgamelab-com">
            <CloudImage publicId={props.UserData.showcaseImage} />
          </CloudinaryContext>
          <Card.Content>
            <Header>{props.UserData.username}</Header>
          </Card.Content>
        </Grid.Column>
        <Grid.Column width={10} style={{color: "black"}}>
          <Card.Description>{props.UserData.bio}</Card.Description>
        </Grid.Column>
      </Grid>
      <Card.Content>{roleMapper(props.UserData.roles)}</Card.Content>
    </Card>
  );
};

export default UserCard;
