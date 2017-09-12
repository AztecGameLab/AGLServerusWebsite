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
import AdminHome from './AdminHome';
import AdminEmail from './AdminEmail';
import AdminWriter from './AdminWriter';
import styles from './admin.css';

export default class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const panes = [
            { menuItem: {icon: 'home', content: 'Home' }, render: () => <Tab.Pane className = 'adminPane'><AdminHome/></Tab.Pane> },
            { menuItem: {content: 'Writer', icon: 'book'}, render: () => <Tab.Pane className='adminPane'><AdminWriter/></Tab.Pane> },
            { menuItem: {content: 'Email', icon: 'mail'}, render: () => <Tab.Pane className='adminPane'><AdminEmail/></Tab.Pane> },
        ]
        return (
            <div>
                <Segment raised>
                    <Tab menu={{ fluid: true, vertical: true }} panes={panes} />
                </Segment>
            </div>
        );
    }
}