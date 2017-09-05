import React from 'react';
import Highlight from './Highlight';
import NewsFeed from './NewsFeed';
import GamesFeed from './GamesFeed';

class HomePage extends React.Component {
    render() {
        return (
            <div className="container-fluid" style={homeStyle.margin} >
                <h1>Welcome to the Aztec Game Lab!</h1>
                <Highlight/>
                <div className="row col-lg-12"><GamesFeed style={homeStyle.sideStyle}/></div>
                <div className="row col-lg-12"><NewsFeed style={homeStyle.sideStyle}/></div>  
            </div>
        );
    }
}
export default HomePage;

let homeStyle = {
    margin: {
        paddingLeft: 30
    },
    sideStyle: {
        display: "inline-block"
    }
};