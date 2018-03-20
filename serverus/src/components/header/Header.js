// React + React-Redux + Router
import React from "react";
import { Link, Router } from "react-router-dom";
import { history } from "../../features/API/History_API/historyFunctions";

// Components
import { Icon, Menu } from "semantic-ui-react";
import { Image as CloudImage, CloudinaryContext, Transformation } from "cloudinary-react";
import HeaderDropdown from "../usercomponents/headerdropdown/HeaderDropdown";

const Header = () => {
  // Create list of Menu Items with settings
  const MenuObjects = [
    { name: "Competitions", logo: "trophy", route: "/competitions" },
    { name: "Game Directory", logo: "gamepad", route: "/games" },
    { name: "User Directory", logo: "users", route: "/users" }
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
      <Menu secondary stackable borderless>
        <Menu.Item key="home" as={Link} to="/">
          <CloudinaryContext cloudName="aztecgamelab-com">
            <CloudImage publicId="WebsiteAssets/Parallax/AGL_retro_parallax_layer2.png">
              <Transformation width="150" crop="scale" />
            </CloudImage>
          </CloudinaryContext>
        </Menu.Item>

        {MenuItemComponents}

        <Menu.Menu position="right" style={{ paddingRight: "20px" }}>
          <Menu.Item>
            <HeaderDropdown />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Router>
  );
};

export default Header;
