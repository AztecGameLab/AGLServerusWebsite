// React + React-Redux + Router
import React from "react";
import { Link } from "react-router-dom";

// Components
import { Icon, Menu, Button } from "semantic-ui-react";
import { Image as CloudImage, CloudinaryContext } from "cloudinary-react";

const Header = () => {
  // Create list of Menu Items with settings
  const MenuObjects = [
    { name: "Competitions", logo: "trophy", route: "/competitions" },
    { name: "Game Directory", logo: "gamepad", route: "/g" },
    { name: "User Directory", logo: "users", route: "/u/" },
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
    <div>
      <Menu secondary stackable borderless>
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
    </div>
  );
};

export default Header;
