import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import redux from 'react-redux';
import { Link } from 'react-router';
import { Divider, Grid, Icon, Menu, Search } from 'semantic-ui-react';
import UserCard from '../cards/UserCard';
import RoleOptions from '../common/roleOptions.json';
import tags from '../cards/tags.css';

export default class UserDirectory extends React.Component {
    constructor(props) {
        super(props);
        this.storage = firebase.storage();
        // this.isPageMounted = true;

        this.state = {
            roles: {
                "2D Artist": [],
                "3D Artist": [],
                "Business & Management": [],
                "Graphic Designer": [],
                'Level Designer': [],
                "Musician": [],
                'Programmer': [],
                "Sound Designer": [],
                "Voice Acting": [],
                "Writer": [],
            },
            userData: []
        }
        this.findUserCard = this.findUserCard.bind(this);
        this.loadUserCards = this.loadUserCards.bind(this);
    }

    componentWillMount() {
        var that = this;
        var accountRef = firebase.database().ref('accounts');
        accountRef.on('value', function (snapshot) {
            if (snapshot.val()) {
                var promises = [];
                Object.values(snapshot.val()).map(account => {
                    promises.push(axios.get(account.data));
                });
                Promise.all(promises).then(response => {
                    console.log(response[0].data.info.roles);
                    const currentState = that.state;
                    response.map(result => {
                        currentState.userData.push(result.data);
                        result.data.info.roles.forEach(role => {
                            currentState.roles[role].push(result.data);
                        });
                    });
                    that.setState({
                        roles: currentState.roles,
                        userData: currentState.userData
                    });
                });
            }
        });
    }

    //Loads User Cards into Directory. URL should be gotten from firebase.
    findUserCard(text) {
        var previousState = this.state;
        previousState.userData.push(this.state.roles[text]);
        this.setState({
            userData: previousState.userData
        });
    }
    loadUserCards(role, idx) {
        debugger;
        return role.map((user, idx) => {
            return (<Grid.Column key={idx}><UserCard user={user} /></Grid.Column>)
        })
    }

    render() {
        var { roles } = this.state;
        var { userData } = this.state;
        return (
            <div>
                <h2 style={UserDirStyle._header}>This is the User Directory</h2>
                <Menu stackable inverted>
                    <Grid columns={12} style={UserDirStyle.menu}>
                        <Grid.Column />
                        {RoleOptions.roles.map((role, idx) => {
                            return (<Grid.Column key={idx}><br /><Icon link size="huge" color="teal" name={role.icon} onClick={() => this.findUserCard(role.text, )} /><br />{role.text + 's'}</Grid.Column>)
                        })}
                        <Grid.Column />
                    </Grid>
                </Menu>
                <div className="container-fluid">
                    <div className="row col-lg-12 col-lg-offset-1" style={UserDirStyle.grid}>
                        <div className="col-lg-10" style={UserDirStyle.grid}>
                            <Grid columns={3} >
                                {this.state.userData.map((user, idx) => {
                                    return <Grid.Column key={idx}><UserCard user={user}></UserCard></Grid.Column>
                                })}
                            </Grid>
                        </div>
                    </div>
                </div>
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