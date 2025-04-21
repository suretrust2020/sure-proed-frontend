import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { MdPerson } from "react-icons/md";
import { useAuthDispatch } from "../../contexts/auth";
import { Link, useNavigate } from "react-router";

import { removeFromStorage } from "../../utils/storage";
function NavProfileMenu() {
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeFromStorage("student");
    removeFromStorage("teacher");
    authDispatch({ type: "REMOVE_CURRENTUSER" });
    authDispatch({ type: "SET_CURRENTUSER_ROLE", payload: "" });
    navigate("/");
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<MdPerson fontSize={"26px"} />}
        rounded={"full"}
        aria-label="Profile"
        alt="Profile"
      ></MenuButton>
      <MenuList>
        <MenuItem as={Link} to="/dashboard">
          Dashboard
        </MenuItem>
        <MenuItem onClick={handleLogout}> Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default NavProfileMenu;
