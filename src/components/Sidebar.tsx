import React from "react";
import useConfirmDialog from "../lib/hooks/useConfirmDialog";
import useAuth from "../lib/hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { styled, useTheme } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

const StyledFigure = styled("figure")`
  width: 100%;
  aspect-ratio: 1 / 1;
  padding-inline: 0.5rem;
  margin-inline: auto;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
import Logo from "../assets/react.svg";
import { MenuBook, OpenInNewTwoTone, Settings } from "@mui/icons-material";
const Aside = () => {
  const theme = useTheme();
  const iconSx = { color: theme.palette.primary.main };
  const { openConfirmDialog } = useConfirmDialog();
  const { handleLogout } = useAuth();
  const { pathname } = useLocation();
  return (
    <>
      <Sidebar
      backgroundColor="#84a98c"
        rootStyles={{
          boxShadow: "0px 1px 5px rgba(0,0,0,0.5)",
          position: "relative",
          zIndex: "10",
        }}>
        <StyledFigure>
          <img
            style={{ width: "100%", maxWidth: "5rem" }}
            src={Logo}
            alt="Lin La Pyae Wun"
          />
        </StyledFigure>
        <Menu
          menuItemStyles={{
            button: ({ active }) => {
              return {
                color: "#22223b",
                display: "flex",
                alignItems: "center",
                backgroundColor: active ? "#cad2c520" : undefined,
                "&:hover": {
                  backgroundColor: "#cad2c520",
                },
              };
            },
          }}>
          <MenuItem
            active={pathname === "/dashboard"}
            component={<Link to="/dashboard" />}
            icon={<DashboardIcon sx={iconSx} />}>
            Dashboard
          </MenuItem>
          <MenuItem
            active={pathname.includes("/dashboard/menu-items")}
            component={<Link to="/dashboard/menu-items" />}
            icon={<MenuBook sx={iconSx} />}>
            Menu Item
          </MenuItem>
          <MenuItem
            active={pathname.includes("/dashboard/menu-categories")}
            icon={<OpenInNewTwoTone sx={iconSx} />}
            component={<Link to="/dashboard/menu-categories" />}>
            Menu Category
          </MenuItem>
          <MenuItem
            active={pathname.includes("/dashboard/setting")}
            icon={<Settings sx={iconSx} />}
            component={<Link to="/dashboard/settings" />}>
            Settings
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default Aside;
