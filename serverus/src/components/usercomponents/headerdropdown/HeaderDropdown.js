import React, { Component } from "react";

import { Dropdown, Label } from "semantic-ui-react";

class HeaderDropdown extends Component {
  render() {
    return (
      <div>
        <Label circular color="blue" floating>
          3
        </Label>
        <Dropdown fluid basic color="blue" button floating text="Username Here">
          <Dropdown.Menu>
            <Dropdown.Header>Signed In as Username</Dropdown.Header>
            <Dropdown.Item icon="user" text="View Profile" />
            <Dropdown.Item icon="users" text="View Teams" />
            <Dropdown.Divider />
            <Dropdown.Item icon="edit" text="Edit Profile" />
            <Dropdown.Item icon="setting" text="Account Settings" />
            <Dropdown.Item icon="comment" text="Messages" description="3 New" />
            <Dropdown.Divider />
            <Dropdown.Item icon="help circle" text="Help" />
            <Dropdown.Item icon="sign out" text="Log Out" />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default HeaderDropdown;
