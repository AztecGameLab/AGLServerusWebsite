import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import Slider from 'react-slick';
import MarkdownCard from '../markdown/MarkdownCard';
import GenericCard from '../cards/GenericCard';

export default class NewsFeed extends React.Component {
    constructor(props) {
        super(props);

        this.storage = firebase.storage();
        this.isPageMounted = true;
        this.noPostLoaded = 0;
        this.state = {
            postData: []
        };

        this.loadMarkdownPosts = this.loadMarkdownPosts.bind(this);
    }

    componentDidMount() {
        var that = this;
        var markdownUrlRef = firebase.database().ref('allArticles/');

        markdownUrlRef.once('value', function (snapshot) {
            if (!snapshot.val()) return;
            that.setState({
                postData: []
            });
            Object.keys(snapshot.val()).reverse().map(function (key, index) {
                that.setState(prevState => ({
                    postData: prevState.postData.concat({
                        hashKey: key
                    })
                }));
            });
            var values = [];
            Object.values(snapshot.val()).reverse().map(function (value, idx) {
                values.push(axios.get(value));
            });
            Promise.all(values).then(function (response) {
                that.noPostLoaded++;
                // Only store 10 most recent posts
                for (var i = 0; response.length < 10 ? i < response.length : i <= 10; i++) {
                    var tempState = that.state.postData.slice();
                    tempState[i] = {
                        hashKey: tempState[i]["hashKey"],
                        data: response[i].data
                    };
                    that.setState({
                        postData: tempState
                    });
                }
            });
        });
    }

    /**
     * Loads an individual blog posts
     * @param value
     * @returns {XML}
     */
    loadMarkdownPosts = (value) => {
        if (value.data) {
            return (
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4" key={value.hashKey} >
                    <GenericCard keyUrl={value.hashKey} value={value.data} />
                </div>
            );
        }
    }

    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1
        };
        var val = 0;
        if (this.state.postData.length > 0) {
            this.state.postData.map(function(obj, i) {
                if (obj.data) {
                    val++;
                }
            })
        }
        var mdPost = (val >= this.noPostLoaded && val > 0) ? this.state.postData.map(this.loadMarkdownPosts) : null
        return (
            <div>
                <h1>News Feed </h1>
                <div className="container-fluid">
                    <div className="row">
                        {mdPost ? <Slider className="col-lg-12 col-md-12 col-sm-12 col-xs-12" {...settings}>{mdPost}</Slider> : null}
                    </div>
                </div>
            </div>
        );
    }
}

var markdownStyle = {
    textAlign: 'center',
    backgroundColor: 'gray'
};