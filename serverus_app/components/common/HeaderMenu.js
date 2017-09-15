import React from 'react';
import { Link } from 'react-router';
import firebase from 'firebase';
import { Button, Dropdown, Icon, Menu, Popup } from 'semantic-ui-react';
import {Image, CloudinaryContext} from 'cloudinary-react';
import { connect } from 'react-redux';
import styles from './header.css';
import logo from './logo.css';


class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeItem: 'home',
            loggedIn: false,
            accounts: null
        }

    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.loggedIn && nextProps.loggedIn)
            return false;
        else {
            this.setState({
                loggedIn: true,
                accounts: nextProps.accounts
            })
            return true;
        }
    }
    render() {
        let logo = require('../login/blacklogo.png');
        const { activeItem } = this.state
        return (
            <div className="row" style={HeaderStyle.header}> 
            <CloudinaryContext cloudName='aztecgamelab-com'>
                    <Menu stackable inverted  >
                        <Menu.Item className="logo" active={activeItem === 'home'} onClick={this.handleItemClick} as={Link} to='/'>
                                <div >
                                    <Image publicId="WebsiteAssets/blacklogo.png" >
                                    </Image>
                                </div>
                        </Menu.Item>
                        <Popup
                            trigger={<Menu.Item disabled name='competitions' active={activeItem === 'competitions'} ><Icon size = 'big' name='trophy' />Competitions</Menu.Item> }
                            content='First Competition Coming Soon!'
                            size = 'large'
                        />          
                        <Popup
                            trigger={<Menu.Item disabled name='games' active={activeItem === 'games'} ><Icon size = 'big' name='gamepad' />Games</Menu.Item>}
                            content='Game Submissions Coming Soon!'
                            size = 'large'
                        />              
                        <Menu.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick} as={Link} to='/u/'><Icon size = 'big' name='users'/>Users</Menu.Item>
                        <Menu.Item name='calendar' active={activeItem === 'calendar'} onClick={this.handleItemClick} as={Link} to='/calendar'><Icon size = 'big' name='checked calendar' />Calendar</Menu.Item>
                        <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} as={Link} to='/about'><Icon size = 'big' name='send outline' />About Us</Menu.Item>  
                        {this.state.loggedIn ?
                            this.state.accounts[0].info.authLevel == 2 ? 
                                <Dropdown item text="Articles">
                                    <Dropdown.Menu>
                                        <Dropdown.Item icon='edit' as={Link} to='/create/announcement' text="Create Article" />
                                        <Dropdown.Item icon="newspaper" as={Link} to='/articles' text="View all Articles" />
                                    </Dropdown.Menu>
                                </Dropdown>
                            :
                            <Menu.Item name='articles' active={activeItem === 'articles'} onClick={this.handleItemClick} as={Link} to='/a/-Ku0ZDLuuQfDd1aRXeEF'><Icon name='newspaper' size = 'big'/>View All Articles</Menu.Item>
                        :
                        <Menu.Item name='articles' active={activeItem === 'articles'} onClick={this.handleItemClick} as={Link} to='/a/-Ku0ZDLuuQfDd1aRXeEF'><Icon name='newspaper' size = 'big'/>View All Articles</Menu.Item>
                    }
                    { this.state.loggedIn ? 
                        this.state.accounts[0].info.authLevel == 2 ? 
                            <Menu.Item name="admin" active={activeItem==='admin'} onClick={this.handleItemClick} as={Link} to="/admin"><Icon name="dashboard"/>Dashboard</Menu.Item>
                            : <div/>
                            : <div/>
                    }
                    {this.state.loggedIn ?
                        <Menu.Menu position='right'>
                            <Dropdown floating item trigger=
                            {
                                <div>
                                <div style = {HeaderStyle.profilePic}>
                                    <Image publicId= {this.state.accounts[0].info.showcaseImage}>
                                    </Image>
                                </div>
                                Welcome {this.state.accounts[0].info.firstName + ' ' + this.state.accounts[0].info.lastName + '!'}
                                </div>
                            } icon={null} style={HeaderStyle.profile}>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={'/u/' + this.state.accounts[0].info.username} icon='user circle' text='My Account' />
                                    <Dropdown.Item as={Link} to={'/inbox/' + this.state.accounts[0].info.username} icon='inbox' text='My Inbox' />
                                    <Dropdown.Item icon='sign out' text='Sign out' onClick={this.props.signOut} />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                        :
                        <Menu.Menu position='right'>
                            <Menu.Item onClick={() => this.props.showModel(0)}><Icon name = 'sign in' size = 'big'/> Login!</Menu.Item>
                            <Menu.Item onClick={() => this.props.showModel(1)} style={HeaderStyle.profile}><Icon name = 'signup' size = 'big'/> Sign Up!</Menu.Item>
                        </Menu.Menu>}
                </Menu>
                </CloudinaryContext>
            </div>);
    }
};
var HeaderStyle = {
    header: {
        position: 'sticky',
        top: 0,
        zIndex: 1
    },
    logo: {
        maxWidth: 150,
        maxHeight: '100%'
    },
    profile: {
        paddingRight: 30
    },
    profilePic: {
        padding: '20px',
        width: '42px'
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

export default connect(mapStateToProps, null)(HeaderMenu)
