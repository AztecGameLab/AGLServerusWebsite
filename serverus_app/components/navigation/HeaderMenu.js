import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Icon, Menu, Popup, Search } from 'semantic-ui-react';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { connect } from 'react-redux';
import styles from '../../styles/header.css';
import logo from '../../styles/logo.css';


class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'home',
            loggedIn: false,
            accounts: null,
            headerIcon: null
        }
    }
    handleItemClick = (e, {name}) => {
        this.setState({ activeItem: name });
    }



    componentWillReceiveProps(nextProps) {
        if (nextProps.accounts.length > 0) {
            let headerImage = nextProps.accounts[0].showcaseImage;
            headerImage = headerImage.slice(0, headerImage.indexOf("Small")) + "Extra" + headerImage.slice(headerImage.indexOf("Small"));
            this.setState({
                loggedIn: true,
                accounts: nextProps.accounts[0],
                headerIcon: headerImage
            });
        }
    }

    render() {
        const { activeItem } = this.state;
        return (
            <div className="row" id = 'header'>
                <CloudinaryContext cloudName='aztecgamelab-com'>
                    <Menu stackable inverted borderless >
                        <Menu.Item className="logo" active={activeItem === 'home'} onClick={this.handleItemClick} as={Link} to='/'>
                            <div >
                                <Image publicId="WebsiteAssets/blacklogo.png" >
                                </Image>
                            </div>
                        </Menu.Item>
                        <Popup
                            inverted
                            trigger={<Menu.Item name='competitions' active={activeItem === 'competitions'} as={Link} to='/competitions'><Icon size='big' name='trophy' />Competitions</Menu.Item>}
                            content='Woot! Come enter in AGLs first ever game jam!'
                            size='large'
                        />
                        <Popup
                            trigger={<Menu.Item disabled name='games' active={activeItem === 'games'} ><Icon size='big' name='gamepad' />Game Directory</Menu.Item>}
                            content='Game directory coming soon!'
                            size='large'
                        />
                        {false && <Menu.Item name='articles' active={activeItem === 'articles'} onClick={this.handleItemClick} as={Link} to='/'><Icon size='big' name='newspaper' />Article Posts</Menu.Item>}                        
                        <Menu.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick} as={Link} to='/u/'><Icon size='big' name='users' />User Directory</Menu.Item>
                        {false && <Menu.Item name='sponsors' active={activeItem === 'sponsors'} onClick={this.handleItemClick} as={Link} to='/'><Icon size='big' name='heart' />Sponsors</Menu.Item>  }                      
                        <Menu.Item name='patchNotes' active={activeItem === 'patchNodes'} onClick={this.handleItemClick} as={Link} to='/patchnotes'><Icon size='big' name='bug' />Patch Notes</Menu.Item>                        
                        
                          {this.state.loggedIn ?
                            this.props.access ?
                                <Dropdown item text="Articles">
                                    <Dropdown.Menu>
                                        <Dropdown.Item icon='edit' as={Link} to='/create/announcement' text="Create Article" />
                                        <Dropdown.Item icon='edit' as={Link} to='/create/game' text="Create Game" />
                                        <Dropdown.Item icon='edit' as={Link} to='/create/tutorial' text="Create Tutorial" />
                                    </Dropdown.Menu>
                                </Dropdown>
                                :
                                /*<Menu.Item name='articles' active={activeItem === 'articles'}><Icon name='newspaper' size='big' />View All Articles</Menu.Item>*/ null
                            :
                            /*<Menu.Item name='articles' active={activeItem === 'articles'}><Icon name='newspaper' size='big' />View All Articles</Menu.Item>*/ null
                        }
                        {this.state.loggedIn ?
                            this.props.access ?
                                <Menu.Item name="admin" active={activeItem === 'admin'} onClick={this.handleItemClick} as={Link} to="/admin"><Icon name="dashboard" />Dashboard</Menu.Item>
                                : <div />
                            : <div />
                        }                        

                        {this.state.loggedIn ?
                            <Menu.Menu position='right'>
                                <Dropdown floating item trigger=
                                    {
                                        <div>
                                            <div>
                                                <Image publicId={this.state.headerIcon} style={HeaderStyle.profilePic}>
                                                </Image>
                                                Welcome {this.state.accounts.firstName + ' ' + this.state.accounts.lastName + '!'}
                                            </div>
                                        </div>
                                    } icon={null} style={HeaderStyle.profile}>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={'/u/' + this.state.accounts.username} icon='user circle' text='My Profile' />
                                        {false && <Dropdown.Item as={Link} to={'/inbox/' + this.state.accounts.username} icon='inbox' text='My Inbox' />}
                                        <Dropdown.Item icon='sign out' text='Sign out' onClick={this.props.signOut} />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Menu>
                            :
                            <Menu.Menu position='right'>
                                {/* <Menu.Item><form onSubmit={this.props.search}><input className="form-control" style={{ color: 'black' }} type="text" placeholder="Search..." onChange={this.props.handleSearch} /></form></Menu.Item> */}
                                {false && <Menu.Item onClick={() => this.props.showModel(0)}><Icon name='sign in' size='big' /> Login!</Menu.Item>}
                                {false && <Menu.Item onClick={() => this.props.showModel(1)} style={HeaderStyle.profile}><Icon name='signup' size='big' /> Sign Up!</Menu.Item>}
                            </Menu.Menu>}
                    </Menu>
                </CloudinaryContext>
            </div>);
    }
};
var HeaderStyle = {
    header: {
        //position: 'sticky',
        //top: 0,
        //zIndex: 1
        background: 'transparent'
    },
    logo: {
        maxWidth: 150,
        maxHeight: '100%'
    },
    profile: {
        paddingRight: 30
    },
    profilePic: {
        paddingRight: 10
    }
}
function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts,
        access: state.access
        //this means i would like to access by this.state.accounts
        // the data within the state of our store named by root reducer
        // ownProps are the props of our component CoursesPage
    };
}

export default connect(mapStateToProps, null)(HeaderMenu)
