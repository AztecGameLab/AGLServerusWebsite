import React from 'react';
import { Link } from 'react-router';
import firebase from 'firebase';
import { Button, Dropdown, Icon, Image, Menu, Sticky } from 'semantic-ui-react';
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
        let logo = require('./AGL_banner_white_border_subtraction.jpg');
        const { activeItem } = this.state
        return (
            <div className="row">
                <Sticky className="sticker" style={{ zIndex: 1000 }}>
                    <Menu stackable inverted pointing >
                        <Menu.Item active={activeItem === 'home'} onClick={this.handleItemClick} as={Link} to='/'><Image style={HeaderStyle.logo} src={logo} /></Menu.Item>
                        <Menu.Item name='games' active={activeItem === 'games'} onClick={this.handleItemClick} as={Link} to='/games'><Icon name='gamepad' />Games</Menu.Item>
                        <Dropdown item text="Articles">
                            <Dropdown.Menu>
                                <Dropdown.Item icon='edit' as={Link} to='/createpost' text="Create Article" />
                                <Dropdown.Item icon="newspaper" as={Link} to='/articles' text="View my articles" />
                            </Dropdown.Menu>
                        </Dropdown>
                        {this.props.loggedIn ?
                            <Menu.Menu position='right'>
                                <Dropdown name='Profile' icon='user circle' onClick={() => this.props.showModel(0)}>
                                    <Dropdown.Menu>
                                        <Dropdown.Item icon='sign out' text='Sign out' onClick={props.signOut} />
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Menu.Item name='LogOut' onClick={this.props.signOut}></Menu.Item>
                            </Menu.Menu>
                            :
                            <Menu.Menu position='right'>
                                <Menu.Item name='Login' onClick={() => this.props.showModel(0)}></Menu.Item>
                                <Menu.Item name='SignUp' onClick={() => this.props.showModel(1)}></Menu.Item>
                            </Menu.Menu>}
                    </Menu>
                </Sticky>
            </div>);
    }
};
var HeaderStyle = {
    logo: {
        display: 'block',
        width: '200px',
        height: 'auto'
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
