import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as accountActions from '../actions/accountActions';
import MarkdownCard from './MarkdownCard';

class BlogPost extends React.Component {
    constructor(props) {
        super(props);

        this.storage = firebase.storage();
        this.isPageMounted = true;
        this.state = {
            postData: []
        };

        this.loadMarkdownPosts = this.loadMarkdownPosts.bind(this);
    }

    componentWillUnmount() {
        this.isPageMounted = false;
    }
    
    componentDidMount() {
        if (!this.props.accounts[0]) return;
        var that = this;
        var markdownUrlRef = firebase.database().ref('articles/' + this.props.accounts[0].uid);

        markdownUrlRef.on('value', function (snapshot) {
            if (!that.isPageMounted) return;
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
            var values = [];
            Object.values(snapshot.val()).map(function (value, idx) {
                values.push(axios.get(value));
            });
            Promise.all(values).then(function(response) {
                response.map(function(obj, i) {
                    var tempState = that.state.postData.slice();
                    tempState[i] = {
                        hashKey: tempState[i]["hashKey"],
                        data: obj.data
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

function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts
        //this means i would like to access by this.props.accounts
        // the data within the state of our store named by root reducer
        // ownProps are the props of our component CoursesPage
    };
}
export default connect(mapStateToProps, null)(BlogPost)

var markdownStyle = {
    textAlign: 'center'
};