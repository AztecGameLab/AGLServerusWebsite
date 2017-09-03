import {Card} from 'semantic-ui-react';
import React from 'react';
import {Link} from 'react-router';

//This Is the template for a generic card.
//This is intended as a read only slot. 
/*
The Expected incoming schema should look like this

*/
export default class GenericCard extends React.Component{
    constructor(props){
        super(props);
        debugger;
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
                            <a class="ui ribbon label">{this.state.type}</a>
                        }
                        </div>
                    </div>
                    <div className="content">
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
var CardStyle={

};