import React from 'react';
import {
    Grid,
    Icon,
    Button,
    Container,
    Segment,
    Header,
    Menu,
    Tab
} from 'semantic-ui-react';
import firebase from 'firebase';
import axios from 'axios';
import { connect } from 'react-redux';
import AdminJSONEditor from './AdminJSONEditor';
import AdminHome from './AdminHome';
import AdminEmail from './AdminEmail';
import AdminWriter from './AdminWriter';
import styles from '../../styles/admin.css';

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: null,
            accountLevel: 0,
            userName: ""
        };
        this.storage = firebase.storage();
    }

    render() {
        //var loggedIn = this.props.accounts[0].length > 0 ? this.props.accounts[0].info.accountLevel == 2 ? 'admin' : 'notAdmin' : false;
        let loggedIn = '';
        if(this.props.accounts.length > 0){
            if(this.props.accounts[0].authLevel == 2){
                loggedIn = 'admin';
            }else{
                loggedIn = 'notAdmin'
            }
        }
        const panes = [
            { menuItem: { icon: 'home', content: 'Home' }, render: () => <Tab.Pane className='adminPane'><AdminHome /></Tab.Pane> },
            { menuItem: { content: 'Writer', icon: 'book' }, render: () => <Tab.Pane className='adminPane'><AdminWriter /></Tab.Pane> },
            { menuItem: { content: 'Email', icon: 'mail' }, render: () => <Tab.Pane className='adminPane'><AdminEmail /></Tab.Pane> },
            { menuItem: { content: 'JSON', icon:'tasks' }, render: () => <Tab.Pane className='adminPanel'> <AdminJSONEditor/> </Tab.Pane> }
        ]
        if (loggedIn == 'admin') {
            return (
                <div>
                    <Segment raised>
                        <Tab menu={{ fluid: true, vertical: true }} panes={panes} />
                    </Segment>
                </div>
            );
        }else if(loggedIn == 'notAdmin'){
            return(<div>
                {this.props.history.push("/404")}
            </div>);
        }else{
            console.log("Returned to nothing");
            return(<div></div>);
        }

    }
}

function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts
    };
}

export default connect(mapStateToProps, null)(AdminDashboard)