import React from 'react';
import firebase from 'firebase';
import Slider from 'react-slick';
import GenericCard from '../common/cards/GenericCard';
import { GetAllArticles } from '../AGL';
import reactStyles from '../../styles/react-slick.css';

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

    async componentDidMount() {
        let articles = await GetAllArticles();
        this.setState({
            postData: articles[0]
        });
    }

    /**
     * Loads an individual blog posts
     * @param value
     * @returns {XML}
     */
    loadMarkdownPosts = (key) => {
            return (
                <div key={key} >
                    <GenericCard keyUrl={key} value={this.state.postData[key]} />
                </div>
            );
    }

    render() {
        var settings = {
            dots: true,
            dotsClass: 'slick-dots',
            infinite: true,
            speed: 400,
            slidesToShow: 3,
            slidesToScroll: 1,
            nextArrow: <SlickNextArrow/>,
            prevArrow: <SlickPrevArrow/>
        };
        var val = 0;
        if (Object.values(this.state.postData).length > 0) {
            Object.values(this.state.postData).map(function(obj, i) {
                if (obj) {
                    val++;
                }
            });
        }
        var mdPost = (val >= this.noPostLoaded && val > 0) ? Object.keys(this.state.postData).map(this.loadMarkdownPosts) : null
        return (
            <div>
                <h1>News Feed </h1>
                <div className="container-fluid">
                    <div className="row">
                        {mdPost ? <Slider {...settings}>
                            {mdPost}
                            </Slider> : null}
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

var markdownStyle = {
    textAlign: 'center',
    backgroundColor: 'gray'
};

const SlickNextArrow = (props) => {
    const {className, style, onClick} = props;
    return(
        <button className="slick-next" onClick={onClick}/>
    )
}

const SlickPrevArrow = (props) => {
    const {className, style, onClick} = props;
    return(
        <button className="slick-prev" onClick={onClick}/>
    )
}