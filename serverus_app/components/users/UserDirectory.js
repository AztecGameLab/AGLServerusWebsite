import React from 'react';
import axios from 'axios';
import redux from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, Grid, Icon, Menu, Search, Loader } from 'semantic-ui-react';
import UserCard from '../common/cards/UserCard';
import roleOptions from '../common/options/roleOptions.json';
import { FilterRoles, NumberOfUsers, UserPagination } from '../AGL';
import { CloudinaryContext, Image as CloudImage } from 'cloudinary-react';


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
            numberOfPages: 0,
            currentPage: 1
        }
        this.findUserCard = this.findUserCard.bind(this);
        this.roleFix = this.roleFix.bind(this);
        this.findUserCard = this.findUserCard.bind(this);
        this.listPageNumbers = this.listPageNumbers.bind(this);
        this.selectPage = this.selectPage.bind(this);
    }

    async componentWillMount() {
        let result = await UserPagination(0, this.state.resultsToShow);
        let accountsObj = result[0];
        let numberOfPages = result[1];
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
    async findUserCard(role, idx) {
        var { selected, selectedRoles, userData } = this.state;
        let filteredRoles;
        let numberOfPages;
        let currentPage;
        if (selected[idx] == 'unselectedIcon') {
            selected[idx] = 'selectedIcon';
            selectedRoles.push(role);
            var result = await FilterRoles(selectedRoles, this.state.currentPage - 1);
            filteredRoles = result[0];
            numberOfPages = result[1];
        } else {
            var result;
            selected[idx] = 'unselectedIcon';
            selectedRoles.splice(selectedRoles.indexOf(role), 1);
            if (selectedRoles.length == 0) {
                result = await UserPagination(0, this.state.resultsToShow);
            } else {
                result = await FilterRoles(selectedRoles, 0);
            }
            filteredRoles = result[0];
            numberOfPages = result[1];
            currentPage = 1;
        }
        this.setState({
            selected: selected,
            userData: filteredRoles,
            showUsers: Object.values(filteredRoles),
            selectedRoles: selectedRoles,
            numberOfPages: numberOfPages,
            currentPage: currentPage ? currentPage : this.state.currentPage
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
        e.persist();
        window.scrollTo(0, 0);
        //tell kdo to restore accounts username keys lowercase or uppercase or consistency when querying
        let result = await UserPagination(e.target.value, this.state.resultsToShow, this.state.selectedRoles);
        let accountsObj = result[0];
        const currentState = this.state;
        currentState.userData = [];
        Object.values(accountsObj).map(user => {
            currentState.userData.push(user);
        });
        this.setState({
            userData: currentState.userData,
            showUsers: currentState.userData,
            currentPage: e.target.value - 1
        });
    }

    render() {
        var { roles, selected, showUsers, userData } = this.state;
        var pages = this.listPageNumbers();
        return (
                <div>
                <br/><br/><br/><br/><br/><br/><br/><br/>
                    {this.state.userData.length < 5 && <Loader inverted content='Loading' />}
                    <Menu stackable >
                        <Grid columns={12} style={UserDirStyle.menu}>
                            <Grid.Column />
                            {roleOptions.roles.map((role, idx) => {
                                return (<Grid.Column className={selected[idx]}
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
                                    {showUsers.map((user, idx) => {
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