import { Card, Label, Segment, Divider, Grid, Image } from 'semantic-ui-react';
import React from 'react';
import { Link } from 'react-router';

//This Is the template for a generic card.
//This is intended as a read only slot. 
/*
The Expected incoming schema should look like this

*/
class GenericCard extends React.Component {
    constructor(props) {
        super(props);
        //Iniitialize state variables
        this.state = {
            title: props.value.title,
            type: props.value.type,
            descrip: props.value.descrip,
            date: props.value.date,
            author: props.value.author,
            ratings: props.value.ratings,
            roles: "",
            showRoles: false,
            showRatings: (props.value.type === 'b') ? true : false,
            viewCount: props.value.viewCount,
            showViewCount: (props.value.type === 'b' || props.value.type === 't') ? true : false,
            tags: props.value.tags,
            url: props.value.url
        };

        this.toggleUserFavorited = this.toggleUserFavorited.bind(this);
    }

    //Toggles if the user has favorited a card or not... Should call back to the json. 
    toggleUserFavorited(e) {
        this.setState({ favorited: e.target.value });
        //Some Firebase shit to update the this value.
    }

    colorSolver(typeString){
        if(typeString==='u')
            return 'red';
        else if(typeString==='b')
            return 'blue';
        else if(typeString==='g')
            return 'green';
        else if(typeString==='t')
            return 'yellow';
    }

    textSolver(typeChar){
        if(typeChar==='u')
            return 'User';
        else if(typeChar==='g')
            return 'Game';
        else if(typeChar==='t')
            return 'Team';
        else if(typeChar==='b')
            return 'Blog';
    }

    render() {
        let ratingsVisible = this.state.showRatings;
        let viewsVisible = this.state.showViewCount;
        let profilePic = require('./demoProfileImage.jpg');
        let color = this.colorSolver(this.state.type);
        let ribbonName = this.textSolver(this.state.type);
        return (
            <div id="GenericCardContainer">
                <Card>
                    <Card.Content>
                        <Grid columns={2} stretched>
                            <Grid.Column>
                            <Image 
                            fluid
                            label={{as:'a', color: color, content: ribbonName, ribbon:true}}
                            src={profilePic}
                            />
                            </Grid.Column>
                            <Divider vertical></Divider>
                            <Grid.Column>
                                <div style={CardStyle.Main}>
                                    <h2>{this.state.title}</h2>    
                                    <h5>{this.state.date}</h5>
                                    <h4><p>{this.state.descrip}</p></h4>                      
                                </div>
                            </Grid.Column>
                            </Grid>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

//CSS Styling
var CardStyle = {
    Main: {
        color: "#000000"
    }
};

export default GenericCard;