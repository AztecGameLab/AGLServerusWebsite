// React + React-Redux + Router
import React from "react";
import { Link, Router } from "react-router-dom";
import { history } from "../../features/API/History_API/historyFunctions";

// Components
import { Icon, Menu, Button } from "semantic-ui-react";
import { Image as CloudImage, CloudinaryContext } from "cloudinary-react";

const Header = () => {
  // Create list of Menu Items with settings
  const MenuObjects = [
    { name: "Competitions", logo: "trophy", route: "/competitions" },
    { name: "Game Directory", logo: "gamepad", route: "/games" },
    { name: "User Directory", logo: "users", route: "/users" },
    { name: "Resources", logo: "cubes", route: "/resources" }
  ];

  // Construct Menu Item Components using list
  const MenuItemComponents = MenuObjects.map(obj => {
    return (
      <Menu.Item key={obj.name} as={Link} to={obj.route}>
        <Icon size="big" name={obj.logo} />
        {obj.name}
      </Menu.Item>
    );
  });
  return (
    <Router history={history}>
      <Menu borderless>
        <Menu.Item key="home" as={Link} to="/">
          <CloudinaryContext cloudName="aztecgamelab-com">
            <CloudImage publicId="WebsiteAssets/blacklogo.png" />
          </CloudinaryContext>
        </Menu.Item>

        {MenuItemComponents}

        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/signup">
            <Button>Sign Up!</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Router>
  );
};

export default Header;
