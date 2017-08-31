import React from 'react';
import Highlight from './Highlight';
import NewsFeed from './NewsFeed';
import GamesFeed from './GamesFeed';

class HomePage extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Welcome to the Aztec Game Lab!</h1>
                <Highlight/>
                <div className="row col-lg-12" style={homeStyle.sideContainer}></div>
                <div className="row col-lg-12"><GamesFeed style={homeStyle.sideStyle}/></div>
                <div className="row col-lg-12"><NewsFeed style={homeStyle.sideStyle}/></div>
            </div>
        );
    }
}
export default HomePage;

let homeStyle = {
    sideContainer: {
        display: 'flex',
        'flexDirection': 'row',
        width: '100%'
    },

    sideStyle: {
        display: "inline-block"
    }
};