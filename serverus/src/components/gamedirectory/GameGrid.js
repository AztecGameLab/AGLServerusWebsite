import React from "react";

//Components
import { Card } from "semantic-ui-react";
import GameCard from "./GameCard";

//Utility
import { isObject } from "lodash";

const GameGrid = props => {
  const gameCards = Object.keys(props.games).map(gameKey => {
    if (isObject(props.games[gameKey])) {
      return <GameCard key={gameKey} gameData={props.games[gameKey]} route={gameKey} />;
    } else {
      return <div>?</div>;
    }
  });
  return (
    <Card.Group centered itemsPerRow={4}>
      {gameCards}
    </Card.Group>
  );
};

export default GameGrid;
