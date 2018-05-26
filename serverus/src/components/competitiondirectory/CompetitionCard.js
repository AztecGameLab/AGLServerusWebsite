import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const CompCard = props => {
    return(
        <Card
            as={Link}
            color="green"
        />
    );
};

export default CompCard;