import React from "react";

//Components
import { Grid } from "semantic-ui-react";
import GameCard from "./GameCard";

//Utility
import { isObject } from "lodash";

const GameGrid = props => {
  const gameCards = Object.keys(props.games).map(gameKey => {
    if (isObject(props.games[gameKey])) {
      return (
        <Grid.Column key={gameKey}>
          <GameCard gameData={props.games[gameKey]} route={gameKey} />
        </Grid.Column>
      );
    }
  });
  return (
    <Grid padded relaxed centered>
      <Grid.Row columns={4}>{gameCards}</Grid.Row>
    </Grid>
  );
};

export default GameGrid;
