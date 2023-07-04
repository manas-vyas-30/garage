import GarageIcon from "@mui/icons-material/Garage";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logoutUser } from "../../api/authApi";
import { IStore } from "../../app/store";
import { isObjEmpty } from "../../utils/isObjEmpty";

const pages = [
  {
    route: "/appointment",
    name: "Appointment",
  },
  {
    route: "/garage",
    name: "Garage",
  },
  {
    route: "/report",
    name: "Report",
  },
  {
    route: "/about",
    name: "About",
  },
  {
    route: "/manage",
    name: "Manage",
  },
  {
    route: "/showroom",
    name: "Showroom",
  },
];

const settings = [
  {
    route: "/profile",
    name: "Profile",
  },
  {
    name: "Logout",
  },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: IStore) => state.auth);

  const [anchorElNav, setAnchorElNav] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const [anchorElUser, setAnchorElUser] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const linkStyle = { color: "inherit", textDecoration: "none" };

  const handleOpenNavMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.currentTarget;
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Box sx={{ mx: 2 }}>
        <Toolbar disableGutters>
          <Link to="/" style={linkStyle}>
            <GarageIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Manas' Garage
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link to={page.route} style={linkStyle}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link to="/" style={linkStyle}>
            <GarageIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          </Link>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "0.3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link key={page.name} to={page.route} style={linkStyle}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          {isObjEmpty(auth.loggedInUser) ? (
            <Link to="/signup" style={linkStyle}>
              <Button color="inherit">signup</Button>
            </Link>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={auth.loggedInUser.name.toLowerCase()}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={async () => {
                      if (setting.name === "Logout") {
                        await dispatch(logoutUser() as unknown as AnyAction);
                        Swal.fire(
                          "SUCCESS!",
                          "User logged out successfully!",
                          "success"
                        );
                        navigate("/login");
                      }
                      handleCloseUserMenu();
                    }}
                  >
                    <Link to={setting.route || ""} style={linkStyle}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
