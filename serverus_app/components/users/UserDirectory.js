import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import redux from 'react-redux';
import GenericCard from '../common/GenericCard';

export default class UserDirectory extends React.Component{
    constructor(props){
        super(props);
        this.storage = firebase.storage();
        this.isPageMounted = true;

        this.state = {
            userData: []
        }

        this.loadUserCards = this.loadUserCards.bind(this);
    }

    componentWillUnmount(){
        this.isPageMounted = false;
    }

    componentDidMount(){

    }

    //Loads User Cards into Directory. URL should be gotten from firebase.
    loadUserCards(){
        return(
            <div>
                This is a test.
            </div>
        );
    }

    render(){
        return(
            <div>
                <h2 style={UserDirStyle._header}>This is the User Directory</h2>
                <div className="container-fluid">
                    <div className="row">
                        {this.loadUserCards}
                    </div>
                </div>
            </div>
        );
    }
}

let UserDirStyle = {
    _header: {
        alignText: "center"
    }
}