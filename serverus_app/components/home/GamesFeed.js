import React from 'react';

//Randomly displays games submitted from the past 30 days.
export default class GamesFeed extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1>Games Feed</h1>
                <p>Games Feed will be displayed here.</p>
            </div>
        );
    }
}