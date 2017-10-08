import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import { Dropdown, Input, Menu, Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { JsonEditor } from 'react-json-edit';
import { LoadAllUsers, UpdateUser, UpdateAllUsers } from '../AGL';
import userTemplate from '../common/userTemplate.json';


const https = require('https');

export default class AdminJSONEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userTemplate: JSON.parse(JSON.stringify(userTemplate)),
            accounts: null,
            accInfo: null,
            selectedUser: null,
            editingAllUsers: false
        }
        this.updateSchema = this.updateSchema.bind(this);
        this.chooseUser = this.chooseUser.bind(this);
        this.changeVal = this.changeVal.bind(this);
        this.removeDefaults = this.removeDefaults.bind(this);
        this.backupData = this.backupData.bind(this);
    }

    async componentDidMount() {
        let accounts = await LoadAllUsers();
        accounts.temp.unshift({ key: 'selectAllAccounts', text: 'All accounts', value: 'ALL_USERS' });
        this.setState({
            accounts: accounts.users,
            accInfo: accounts.temp
        });
    }
    backupData() {
        let now = new Date();
        now = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        let backupFile = new Blob([JSON.stringify(this.state.accounts)], { type: 'application/json' });
        var backupRef = firebase.storage().ref('backups/' + now + '.json');
        backupRef.put(backupFile);
    }

    chooseUser(e, { value }) {
        if (value == 'ALL_USERS') {
            const usrTemplate = JSON.parse(JSON.stringify(userTemplate));
            this.setState({
                selectedUser: usrTemplate,
                editingAllUsers: true
            });
        } else {
            this.setState({
                selectedUser: this.state.accounts[value],
                editingAllUsers: false
            });
        }
    }
    decideOperations(selectedUser, userTemplate) {
        let missingKeys = [];
        const copyOfUserTemplate = JSON.parse(JSON.stringify(userTemplate));
        const copyOfSelectedUser = JSON.parse(JSON.stringify(selectedUser));
        //Check for Deleted keys             
        Object.keys(copyOfUserTemplate.info).forEach(key => {
            //If selected user does not have 
            if (!this.state.selectedUser.info.hasOwnProperty(key)) {
                missingKeys.push(key);
            }
        });

        //Send to cloud missingKeys and selectedUser
        let addedUserFields = this.removeDefaults(copyOfSelectedUser);
        if (Object.keys(addedUserFields.info).length > 0) {
            //edit all users and add
            let accounts = Object.assign({}, this.state.accounts);
            Object.keys(accounts).map(username => {
                let user = accounts[username].info;
                Object.keys(addedUserFields.info).map(key => {
                    user[key] = addedUserFields.info[key];

                });
            });
        }
        if (missingKeys.length > 0) {
            //edit all users and delete
            //cloud functions
        }
    }

    updateSchema() {
        //Edit all accounts flag
        if (this.state.selectedUser.uid == "default") {
            decideOperations(selectedUser, userTemplate);
        } else {
            //Cloud function to update single user storage/database
            UpdateUser(this.state.selectedUser);
        }
    }
    removeDefaults = (obj) => {
        delete obj["uid"];
        Object.keys(obj.info).forEach((key) => (obj.info[key] == 'default') && delete obj.info[key]);
        return obj;
    };

    changeVal(json) {
        console.log("New Changes:", json);
        this.setState({
            selectedUser: json
        });
    }
    render() {
        let {
            accounts,
            accInfo,
            selectedUser } = this.state;
        return (
            <div style={{ color: 'black' }}>

                <Dropdown fluid search selection placeholder='Select a user' options={accInfo} onChange={this.chooseUser} /><hr />
                {selectedUser ?
                    <div>
                        <Button color="teal" onClick={this.updateSchema}>Update {this.state.editingAllUsers ? "All Users" : "This User"}</Button>
                        {this.state.editingAllUsers && <Button color="olive" onClick={this.backupData}> Back Up Data</Button>}
                        <hr />
                        <JsonEditor value={selectedUser} propagateChanges={this.changeVal} />
                    </div> : null}
            </div>
        );
    }
}