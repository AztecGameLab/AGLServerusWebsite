import React from 'react';
import { Link } from 'react-router';
import firebase from 'firebase';
import { Button, Dropdown, Icon, Image, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountActions from '../actions/accountActions';
import styles from './header.css';
import logo from './logo.css';


class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: 'home' }

    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        let logo = require('../login/blacklogo.png');
        const { activeItem } = this.state
        return (
            <div className="row" style={HeaderStyle.header}> 
                    <Menu stackable inverted  >
                        <Menu.Item className="logo" active={activeItem === 'home'} onClick={this.handleItemClick} as={Link} to='/'><Image style={HeaderStyle.logo} src={logo} /></Menu.Item>
                        <Menu.Item name='games' active={activeItem === 'games'} onClick={this.handleItemClick} as={Link} to='/games'><Icon size = 'big' name='gamepad' />Games</Menu.Item>
                        <Menu.Item name='competitions' active={activeItem === 'competitions'} onClick={this.handleItemClick} as={Link} to='/competitions'><Icon size = 'big' name='trophy' />Competitions</Menu.Item>                          
                        <Menu.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick} as={Link} to='/u/'><Icon size = 'big' name='users'/>Users</Menu.Item>
                        <Menu.Item name='calendar' active={activeItem === 'calendar'} onClick={this.handleItemClick} as={Link} to='/calendar'><Icon size = 'big' name='checked calendar' />Calendar</Menu.Item>
                        <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} as={Link} to='/about'><Icon size = 'big' name='info circle' />About Us</Menu.Item>  
                        {this.props.loggedIn ?
                            this.props.accounts[0].info.authLevel == 2 ? 
                                <Dropdown item text="Articles">
                                    <Dropdown.Menu>
                                        <Dropdown.Item icon='edit' as={Link} to='/create/announcement' text="Create Article" />
                                        <Dropdown.Item icon="newspaper" as={Link} to='/articles' text="View all Articles" />
                                    </Dropdown.Menu>
                                </Dropdown> 
                                :
                                <Menu.Item name='articles' active={activeItem === 'articles'} onClick={this.handleItemClick} as={Link} to='/articles'><Icon size = 'big' name='newspaper' />View All Articles</Menu.Item>  
                            :
                            <Menu.Item name='articles' active={activeItem === 'articles'} onClick={this.handleItemClick} as={Link} to='/articles'><Icon size = 'big' name='newspaper' />View All Articles</Menu.Item>  
                        }
                        {this.props.loggedIn ?
                            <Menu.Menu position='right'>
                                <Dropdown item trigger={<div><Icon name="dashboard"></Icon>Welcome {this.props.accounts[0].info.firstName + ' ' + this.props.accounts[0].info.lastName + '!'}</div>} icon={null} style={HeaderStyle.profile}>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={'/u/' + this.props.accounts[0].info.username} icon='user circle' text='My Account' />
                                        <Dropdown.Item icon='sign out' text='Sign out' onClick={this.props.signOut} />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Menu>
                            :
                            <Menu.Menu position='right'>
                                <Menu.Item name='Login' onClick={() => this.props.showModel(0)}> <Icon size = 'big' name='sign in'/>Login! </Menu.Item>
                                <Menu.Item name='SignUp' onClick={() => this.props.showModel(1)}  style={HeaderStyle.profile}> <Icon size = 'big' name='signup'/> Sign Up!</Menu.Item>
                            </Menu.Menu>}
                    </Menu>
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
