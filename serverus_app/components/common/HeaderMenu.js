import React from 'react';
import { Link } from 'react-router';
import { Icon, Sticky} from 'semantic-ui-react';
import styles from './header.css';
import logo from './logo.css';


const HeaderMenu = (props) => {
    return (
        <div className="row">
            <div className="logo"><img className="logo" src={require('./AGL_banner_white_border_subtraction.jpg')}/></div>
            <Sticky className="sticker" style={{zIndex: 1000}}>
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
                <div className="navlink user col-lg-1" ><Link to="/login"><button id="log-btn" type="button" className="ps-btn">Sign in</button></Link></div>
                <div className="navlink user col-lg-1" ><Link to="/signup"><button className="ps-btn">Sign Up</button></Link></div>
            </div>
            </Sticky>
        </div>);
};
export default HeaderMenu;
