import React from 'react';
import axios from 'axios';
import redux from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, Grid, Icon, Menu, Search, Loader } from 'semantic-ui-react';
import UserCard from '../common/cards/UserCard';
import roleOptions from '../common/options/roleOptions.json';
import { NumberOfUsers, UserPagination } from '../AGL';
import {CloudinaryContext, Image as CloudImage} from 'cloudinary-react';


export default class UserDirectory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: [],
            showUsers: [],
            selectedRoles: [],
            selected: [],
            resultsToShow: 24,
            numberOfUsers: 0,
            numberOfPages: 0
        }
        this.findUserCard = this.findUserCard.bind(this);
        this.roleFix = this.roleFix.bind(this);
        this.findUserCard = this.findUserCard.bind(this);
        this.listPageNumbers = this.listPageNumbers.bind(this);
        this.selectPage = this.selectPage.bind(this);
    }

    async componentWillMount() {
        let length = await NumberOfUsers();
        let numberOfPages = Math.ceil(length / this.state.resultsToShow);
        let accountsObj = await UserPagination(0, this.state.resultsToShow);
        const currentState = this.state;
        Object.values(accountsObj).map(user => {
            currentState.userData.push(user);
            currentState.selected.push('unselectedIcon');
        });
        this.setState({
            roles: roleOptions.roles,
            userData: currentState.userData,
            showUsers: currentState.userData,
            numberOfUsers: length,
            numberOfPages: numberOfPages
        });
    }

    //Loads User Cards into Directory. URL should be gotten from firebase.
    findUserCard(role, idx) {
        var { selected, selectedRoles, userData } = this.state;
        let tempUsers = [];
        if (selected[idx] == 'unselectedIcon') {
            selected[idx] = 'selectedIcon';
            selectedRoles.push(role);
            userData.map(user => {
                selectedRoles.forEach(sRole => {
                    if (user.roles.includes(sRole)) {
                        if (!tempUsers.includes(user))
                            tempUsers.push(user);
                    }
                });
            });
        } else {
            selected[idx] = 'unselectedIcon';
            selectedRoles.splice(selectedRoles.indexOf(role), 1);
            userData.map(user => {
                selectedRoles.forEach(sRole => {
                    if (user.roles.includes(sRole)) {
                        if (!tempUsers.includes(user))
                            tempUsers.push(user);
                    }
                });
            });
        }
        if (selectedRoles.length == 0) {
            tempUsers = userData;
        }
        this.setState({
            selected: selected,
            showUsers: tempUsers,
            selectedRoles: selectedRoles
        });
    }
    roleFix(roleText) {
        if (roleText.slice(-3) == 'ing') {
            return roleText = roleText.slice(0, -3) + 'ors';
        }
        else if (roleText.slice(-2) == 'nt') {
            return roleText;
        }
        else {
            return roleText + 's';
        }
    }

    listPageNumbers() {
        let pages = [];
        for (var i = 0; i < this.state.numberOfPages; i++) {
            pages.push(<Button key={i} value={i} onClick={(e) => { this.selectPage(e) }}>{i + 1}</Button>)
        }
        return pages;
    }

    async selectPage(e) {
        window.scrollTo(0, 0);        
        //tell kdo to restore accounts username keys lowercase or uppercase or consistency when querying
        let accountsObj = await UserPagination(e.target.value, this.state.resultsToShow);
        const currentState = this.state;
        currentState.userData = [];
        currentState.selected = [];
        Object.values(accountsObj).map(user => {
            currentState.userData.push(user);
            currentState.selected.push('unselectedIcon');
        });
        this.setState({
            userData: currentState.userData,
            showUsers: currentState.userData,
        });
    }

    render() {
        var { roles } = this.state;
        var { userData } = this.state;
        var pages = this.listPageNumbers();
        return (
                <div>
                <br/><br/><br/><br/><br/><br/><br/><br/>
                    {this.state.userData.length < 5 && <Loader inverted content='Loading' />}
                    <Menu stackable >
                        <Grid columns={12} style={UserDirStyle.menu}>
                            <Grid.Column />
                            {roleOptions.roles.map((role, idx) => {
                                return (<Grid.Column className={this.state.selected[idx]}
                                    key={idx} style={{ marginTop: 15, marginBottom: 15, cursor: "pointer" }}
                                    onClick={() => this.findUserCard(role.text, idx)} >
                                    <br /><Icon link size="huge" color="teal" name={role.icon} /><br />{
                                        this.roleFix(role.text)
                                    }</Grid.Column>)
                            })}
                            <Grid.Column />
                        </Grid>
                    </Menu>
                    <br />
                    <div className="container-fluid">
                        <div className="row col-lg-12 col-lg-offset-1" style={UserDirStyle.grid}>
                            <div className="col-lg-10" style={UserDirStyle.grid}>
                                <Grid columns={3} >
                                    {this.state.showUsers.map((user, idx) => {
                                        return <Grid.Column key={idx}><UserCard user={user}></UserCard></Grid.Column>
                                    })}
                                </Grid>
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 15 }}>{pages}</div>
                    <br /><br /><br />
                </div>
        );
    }
}

let UserDirStyle = {
    _header: {
        textAlign: "center"
    },
    grid: {
        paddingLeft: 0
    },
    menu: {
        width: '100%',
        textAlign: 'center'
    }
}