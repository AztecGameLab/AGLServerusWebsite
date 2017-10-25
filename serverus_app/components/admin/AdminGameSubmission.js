import React, { Component } from 'react';
import { Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { LoadGames, ApproveGame, DisapproveGame } from '../AGL';

class AdminGameSubmission extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pendingGames: {}
        }
    }

    async componentWillMount() {
        let pendingGames = await LoadGames();
        this.setState({
            pendingGames: pendingGames
        });
    }

    approveGame = async (gameId) => {
        let response = await ApproveGame(gameId);
        var currentState = this.state.pendingGames;
        currentState[gameId].approve = "approved";
        this.setState({
            pendingGames: currentState
        });
    }

    disapproveGame = async (gameId) => {
        let response = await DisapproveGame(gameId);
        var currentState = this.state.pendingGames;
        currentState[gameId].approve = "disapproved";
        this.setState({
            pendingGames: currentState
        });
    }

    render() {
        var { pendingGames } = this.state;
        var showGames;
        if (pendingGames != {}) {
            showGames = Object.keys(pendingGames).map((gameId, key) => {
                return (
                    <h1 key={key}>
                        <div className="col-lg-10 col-md-10">
                            <Link style={{ color: 'black' }} to={'/g/' + gameId}><u>{pendingGames[gameId].title}</u></Link>
                        </div>
                        {pendingGames[gameId].approved == "pending" ?
                            <div>
                                <Button onClick={() => this.approveGame(gameId)} color="green" >Approve</Button>
                                <Button onClick={() => this.disapproveGame(gameId)} color="red" >Reject</Button>
                            </div> :
                            <Label color={pendingGames[gameId].approved == "approved" ? "green" : "red"} content={pendingGames[gameId].approved}></Label>}
                        <hr />
                    </h1>
                );
            })
        }
        return (
            <div>
                <h1 style={{ fontSize: '3em', color: 'black' }}>Games</h1>
                <hr />
                {showGames}
            </div>
        );
    }
}

export default AdminGameSubmission;