import React from 'react';
import firebase from 'firebase';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { GetArticle } from '../AGL';
import ArticleCard from '../common/cards/ArticleCard';

class ArticlePage extends React.Component {
    constructor(props) {
        super(props);
        this.isPageMounted = true;
        this.state = {
            loggedIn: false,
            postData: {},
            favorited: false,
            edit: false,
        };
    }

    async componentWillMount() {
        if (this.props.routeParams.articleId) {
            let article = await GetArticle("all", this.props.routeParams.articleId);
            this.setState({
                postData: article
            });
        }
    }

    render() {
        let loaded = this.state.postData.title ? true : false;
        return (
            <div style={articleStyle.article}>
                {loaded ?
                    <div className="container-fluid">
                        <Grid style={{ marginTop: 0 }} className="row">
                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 col-lg-offset-2" >
                                <ArticleCard postData={this.state.postData} />
                            </div>
                        </Grid>
                    </div> : null}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts
        //this means i would like to access by this.state.accounts
        // the data within the state of our store named by root reducer
        // ownProps are the props of our component CoursesPage
    };
}
export default connect(mapStateToProps, null)(ArticlePage)

var articleStyle = {
    article: {
        textAlign: 'center',
        color: 'black',
        marginTop: 25,
        marginBottom: 25
    }
};