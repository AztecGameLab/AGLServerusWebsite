import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import redux from 'react-redux';
import { Link } from 'react-router';
import { Divider, Grid, Icon, Menu, Search, Loader } from 'semantic-ui-react';
import UserCard from '../common/cards/UserCard';
import roleOptions from '../common/options/roleOptions.json';
import { LoadAllUsers} from '../AGL';


export default class UserDirectory extends React.Component {
    constructor(props) {
        super(props);
        this.storage = firebase.storage();

        this.state = {
            userData: [],
            showUsers: [],
            selectedRoles: [],
            selected: []
        }
        this.findUserCard = this.findUserCard.bind(this);
        this.roleFix = this.roleFix.bind(this);
    }

    async componentDidMount() {
        let accountsObj = await LoadAllUsers("userDirectory");
        const currentState = this.state;
        Object.values(accountsObj).map(user => {
            currentState.userData.push(user);
            currentState.selected.push('unselectedIcon');
        });
        this.setState({
            roles: roleOptions.roles,
            userData: currentState.userData,
            showUsers: currentState.userData
        
        });
        // var that = this;
        // var accountRef = firebase.database().ref('accounts');
        // accountRef.once('value', function (snapshot) {
        //     if (snapshot.val()) {
        //         var promises = [];
        //         let accountObjects = snapshot.val();
        //         delete(accountObjects[undefined]);
        //         Object.values(accountObjects).map(account => {
        //             promises.push(axios.get(account.data));
        //         });
        //         Promise.all(promises).then(response => {
        //             const currentState = that.state;
        //             response.map(result => {
        //                 currentState.userData.push(result.data);
        //                 currentState.showUsers.push(result.data);
        //                 currentState.selected.push('unselectedIcon');
        //             });
        //             that.setState({
        //                 roles: currentState.roles,
        //                 userData: currentState.userData
        //             });
        //         });
        //     }
        // });
    }

    //Loads User Cards into Directory. URL should be gotten from firebase.
    findUserCard(role, idx) {
        var { selected, selectedRoles, userData} = this.state;
        let tempUsers = [];
        if (selected[idx] == 'unselectedIcon') {
            selected[idx] = 'selectedIcon';
            selectedRoles.push(role);
            userData.map(user => {
                selectedRoles.forEach(sRole => {
                    if (user.roles.includes(sRole)) {
                        if(!tempUsers.includes(user))
                            tempUsers.push(user);
                    }
                });
            });
        } else {
            selected[idx] = 'unselectedIcon';
            selectedRoles.splice(selectedRoles.indexOf(role),1);
            userData.map(user => {
                selectedRoles.forEach(sRole => {
                    if (user.roles.includes(sRole)) {
                        if(!tempUsers.includes(user))
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
    roleFix(roleText){
        if(roleText.slice(-3) == 'ing'){
            return roleText = roleText.slice(0, -3) + 'ors';
        }
        else if (roleText.slice(-2) == 'nt'){
            return roleText;
        }
        else {
            return roleText + 's';
        }
    }
    render() {
        var { roles } = this.state;
        var { userData } = this.state;
        return (
            <div>
                <br/>
                {this.state.userData.length <5 && <Loader inverted content='Loading' />}
                <Menu stackable inverted>
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
                <br/>
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
                </div><br/><br/><br/>
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