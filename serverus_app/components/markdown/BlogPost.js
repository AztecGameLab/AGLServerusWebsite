import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import MarkdownCard from './MarkdownCard';

export default class BlogPost extends React.Component {
    constructor(props) {
        super(props);

        this.storage = firebase.storage();
        this.state = {
            postData: []
        };

        this.loadMarkdownPosts = this.loadMarkdownPosts.bind(this);
    }

    componentDidMount() {
        var that = this;
        var postUrlRef = firebase.database().ref('postURL');

        postUrlRef.on('value', function (snapshot) {
            that.setState({
                postData: []
            });
            Object.keys(snapshot.val()).map(function (key, index) {
                that.setState(prevState => ({
                    postData: prevState.postData.concat({
                        hashKey: key
                    })
                }));
            });
            Object.values(snapshot.val()).map(function (value, idx) {
                axios.get(value).then(function (response) {
                    var tempState = that.state.postData.slice();
                    tempState[idx] = {
                        hashKey: tempState[idx]["hashKey"],
                        data: response.data
                    };
                    that.setState({
                        postData: tempState
                    });
                });
            });

        });
    }

    /**
     * Loads an individual blog posts
     * @param value
     * @returns {XML}
     */
    loadMarkdownPosts(value) {
        if(value.data) {
            return (
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={value.hashKey} >
                    <MarkdownCard value = {value.data}/>
                </div>
            );
        }
    }

    render() {
         return (
            <div style={markdownStyle}>
                <h1>Previous Blog Posts</h1>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 col-lg-offset-2" >
                            {this.state.postData.map(this.loadMarkdownPosts)}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

var markdownStyle = {
    textAlign: 'center'
};