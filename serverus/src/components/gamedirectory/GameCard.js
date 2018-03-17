import React from "react";
import { Card } from "semantic-ui-react";

const GameCard = props => {
  return <Card image={props.gameData.showcase.url} header={props.gameData.title} meta={props.gameData.authors} description={props.gameData.description} extra={props.gameData.selectedTags} />;
};

export default GameCard;