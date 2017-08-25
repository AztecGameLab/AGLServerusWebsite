import React from 'react';
import { Link } from 'react-router';
import firebase from 'firebase';
import { Button, Dropdown, Icon, Sticky } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountActions from '../actions/accountActions';
import styles from './header.css';
import logo from './logo.css';


const HeaderMenu = (props) => {
    return (
        <div className="row">
            <div className="logo"><img className="logo" src={require('./AGL_banner_white_border_subtraction.jpg')} /></div>
            <Sticky className="sticker" style={{ zIndex: 1000 }}>
                <div className="col-lg-12 navContainer">
                    <div className="col-lg-2 navlink" ><Link to="/"><button className="ps-btn"><Icon name='home' />Home</button></Link></div>
                    <div className="col-lg-2 navlink" ><Link to="/games"><button className="ps-btn"><Icon name='gamepad' />Games</button></Link></div>
                    <div className="col-lg-2 navlink" ><Link to="/"><button className="ps-btn"><Icon name='camera' />Channels</button></Link></div>
                    <div className="col-lg-2 ps-dropdown"><button className="ps-btn"><Icon name='newspaper' />Blog</button>
                        <div className="dropdown-content col-lg-2">
                            <Link to="/createpost">Create Blog Post</Link>
                            <Link to="/markdown">View My Blog Posts</Link>
                        </div>
                    </div>
                    <div>
                        {props.loggedIn ? <div>
                            <Dropdown style={HeaderStyle.dropdown} text='Profile' icon='user circle' floating labeled button className='icon'>
                                <Dropdown.Menu>
                                    <Dropdown.Item icon='sign out' text='Sign out' onClick = {props.signOut} />
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                            : <div>
                                <Button.Group>
                                    <Button inverted color='green' onClick={() => props.showModel(0)}>Login</Button>
                                    <Button.Or />
                                    <Button inverted color='blue' onClick={() => props.showModel(1)}>Sign Up</Button>
                                </Button.Group>
                            </div>}
                    </div>
                </div>
            </Sticky>
        </div>);
};
var HeaderStyle = {
    dropdown: {
        position: 'fixed',
        right: 0
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

export default connect(mapStateToProps, null)(HeaderMenu)
