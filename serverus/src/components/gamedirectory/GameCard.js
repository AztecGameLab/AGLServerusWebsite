import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
const GameCard = props => {
  return (
    <Card
      as={Link}
      to={props.route}
      image={props.gameData.showcase.url}
      header={props.gameData.title}
      meta={props.gameData.authors}
      description={props.gameData.description}
      extra={props.gameData.selectedTags}
    />
  );
};

export default GameCard;
