import React from 'react';

//Displays the most recently published News/Blog posts.
export default class NewsFeed extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h1>News Feed </h1>
                <p style={{color: 'lightgreen', padding: 10}}>TODO Implement News feed widget.</p>
            </div>
        );
    }
}