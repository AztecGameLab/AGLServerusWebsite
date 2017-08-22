import React from 'react';

//TODO Provide link to game page by clicking title.

const GamesCard = (props) =>{
    return(
        <div>
            <h4>{props.value.title}</h4>
            <h6>Created by: {props.value.author}</h6>
            <div>Download Count: {props.value.dlCount}</div>
            <div>
                Game Description here.
            </div>
        </div>
    );
};

export default GamesCard;