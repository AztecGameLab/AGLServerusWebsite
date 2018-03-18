import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const GameCard = props => {
  return (
    <Card
      as={Link}
      to={"game/" + props.route}
      image={props.gameData.showcase.url}
      header={props.gameData.title}
      meta={props.gameData.authors}
      description={props.gameData.description}
      color="red"
    />
  );
};

export default GameCard;
