import React from 'react';
import { Button, Container, Grid, Header, Icon, Menu, Segment, Tab } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminJSONEditor from './AdminJSONEditor';
import AdminHome from './AdminHome';
import AdminEmail from './AdminEmail';
import AdminWriter from './AdminWriter';
import styles from '../../styles/admin.css';

const panes = [
    { menuItem: { icon: 'home', content: 'Home', key: "1" }, render: () => <Tab.Pane className='adminPane'><AdminHome /></Tab.Pane> },
    { menuItem: { content: 'Writer', icon: 'book', key: "2" }, render: () => <Tab.Pane className='adminPane'><AdminWriter /></Tab.Pane> },
    { menuItem: { content: 'Email', icon: 'mail', key: "3" }, render: () => <Tab.Pane className='adminPane'><AdminEmail /></Tab.Pane> },
    { menuItem: { content: 'JSON', icon: 'tasks', key: "4" }, render: () => <Tab.Pane className='adminPanel'> <AdminJSONEditor /> </Tab.Pane> }

]

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: null,
            accountLevel: 0,
            isAdmin: "loading",
            count: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.count > 0) {
            if (nextProps.access) {
                this.setState({
                    isAdmin: "isAdmin"
                });
            } else {
                this.setState({
                    isAdmin: "isNotAdmin"
                });
            }
        } else {
            let currentState = this.state.count;
            currentState++;
            this.setState({
                count: currentState
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.isAdmin == "loading" ?
                    null
                    :
                    this.state.isAdmin == "isAdmin" ?
                        <Segment raised>
                            <Tab menu={{ fluid: true, vertical: true }} panes={panes} />
                        </Segment>
                        :
                        <Redirect to="/404" />
                }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        access: state.access,
        accounts: state.accounts
    };
}

export default connect(mapStateToProps, null)(AdminDashboard)