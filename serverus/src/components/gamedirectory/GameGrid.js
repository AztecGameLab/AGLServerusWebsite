import React from "react";

//Components
import { Grid } from "semantic-ui-react";
import GameCard from "./GameCard";

const GameGrid = props => {
  const gameCards = Object.values(props.games).map(gameData => {
    return (
      <Grid.Column key={gameData.title}>
        <GameCard gameData={gameData} />
      </Grid.Column>
    );
  });
  return (
    <Grid padded relaxed centered>
      <Grid.Row columns={4}>{gameCards}</Grid.Row>
    </Grid>
  );
};

export default GameGrid;
