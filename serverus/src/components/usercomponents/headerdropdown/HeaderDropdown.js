import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Components
import { Dropdown, Label, Confirm } from "semantic-ui-react";
import { Link } from "react-router-dom";

//Actions
import { logOutAccount } from "../../../features/auth/authActions";

//Selectors
import { selectUserData } from "../../../features/userSession/userSelectors";

class HeaderDropdown extends Component {
  state = {
    confirmLogoutOpen: false
  };

  toggleLogOutConfirm = () => {
    this.setState({ confirmLogoutOpen: !this.state.confirmLogOut });
  };

  render() {
    const { logOutAccount, userData } = this.props;
    const { confirmLogoutOpen } = this.state;
    return (
      <div>
        <Label circular color="blue" floating>
          0
        </Label>
        <Dropdown fluid basic color="blue" button floating text={"Hello " + userData.displayName + "!"}>
          <Dropdown.Menu>
            <Dropdown.Header>{"Logged in as " + userData.displayName}</Dropdown.Header>
            <Dropdown.Item as={Link} to={"/user/" + userData.displayName} icon="user" text="View Profile" />
            <Dropdown.Item disabled icon="users" text="View Teams" />
            <Dropdown.Item disabled icon="address book outline" text="View Friends" />
            <Dropdown.Divider />
            <Dropdown.Item disabled icon="bar chart" text="Dashboard" />
            <Dropdown.Item disabled icon="edit" text="Edit Profile" />
            <Dropdown.Item disabled icon="setting" text="Account Settings" />
            <Dropdown.Item disabled icon="comments" text="Messages" description="0 New" />
            <Dropdown.Divider />
            <Dropdown.Item disabled icon="help circle" text="Help" />
            <Dropdown.Item disabled icon="flag" text="Submit Feedback" />
            <Dropdown.Item icon="sign out" text="Log Out" onClick={this.toggleLogOutConfirm} />
          </Dropdown.Menu>
        </Dropdown>
        <Confirm
          open={confirmLogoutOpen}
          onCancel={this.toggleLogOutConfirm}
          onConfirm={logOutAccount}
          header="Logging out"
          content="Are you sure you want to log out? "
          cancelButton="Cancel"
          confirmButton="Confirm"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: selectUserData(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logOutAccount
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDropdown);
