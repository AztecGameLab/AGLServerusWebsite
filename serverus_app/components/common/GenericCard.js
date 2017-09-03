import {Card} from 'semantic-ui-react';
import React from 'react';
import {Link} from 'react-router';

//This Is the template for a generic card.
//This is intended as a read only slot. 
export default class GenericCard extends React.Component{
    constructor(props){
        super(props);

        //Iniitialize state variables
        this.state = {
            title: props.title,
            type: props.type,
            descrip: props.descrip,
            date: props.date,
            author: props.author,
            ratings: props.ratings,
            showRatings: (props.type === 'b') ? true : false,
            viewCount: props.viewCount,
            showViewCount: (props.type === 'b' || props.type === 't') ? true : false, 
            tags: props.tags,
            url: prosp.url
        };

        this.toggleUserFavorited = this.toggleUserFavorited.bind(this);
    }

    //Toggles if the user has favorited a card or not... Should call back to the json. 
    toggleUserFavorited(e){
        this.setState({favorited: e.target.value});
        //Some Firebase shit to update the this value.
    }

    render(){
        let ratingsVisible = this.state.showRatings;
        let viewsVisible = this.state.showViewCount;

        return(
            <div id="GenericCardContainer">
                <div class="card">
                    <div>
                        User IconHere
                        <div class="ui raised segment">
                        if(this.state.type==='b'){
                            <a class="ui ribbon label">{this.type}</a>
                        }
                        </div>
                    </div>
                    <div class="content right floated">
                        <div class="header">
                            {this.state.title}
                        </div>
                        <div class="meta">
                            {this.state.author}
                            {this.state.date}
                        </div>
                        <div class="description">
                            {this.state.descrip}
                        </div>
                        <div>
                            Tags: {this.state.tags}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//CSS Styling
let CardStyle={

};