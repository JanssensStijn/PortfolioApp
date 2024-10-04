import { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { Box, Toolbar, List, CssBaseline, Typography, Divider, IconButton, Backdrop} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { ListItem, ListItemButton, ListItemIcon, ListItemText,} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LoginIcon from "@mui/icons-material/Login";

import {Outlet, useNavigate} from "react-router-dom";
import { AdminNav } from "./adminNav";
import { visitorPages } from "./pages";
import { useUserContext } from "../providers/userProvider";
import { usePersonalDataContext } from "../providers/personalProvider";
import { SocialIcon } from "./partials/socialIcon";

const logo = "logo4sj.png";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: 'var(--drawerBackColor)',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: 'var(--drawerBackColor)',
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
    backgroundColor: 'var(--drawerBackColor)',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const LogoImg = styled('img')({
    maxHeight: 50, // Adjust as needed
    marginRight: 10, // Adjust as needed
});

export const SharedMenu = () => {
  const { user } = useUserContext();
  const {personalData} = usePersonalDataContext();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {setOpen(true);};
  const handleDrawerClose = () => {setOpen(false);};

  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar >
            <IconButton
                id="menuButton"
                color="inherit"
                aria-label="open main drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
                }}
            >
                <MenuIcon aria-label="foldout main drawer"/>
            </IconButton>
            <LogoImg src={logo} alt="Logo" />
            <Typography 
                variant="h6" 
                noWrap 
                component="div" 
                sx={{ 
                    fontFamily: 'Roboto', // Change the font family to your desired font
                    fontWeight: 'regular', // Change the font weight if needed
                    fontSize: '2.5rem', // Change the font size if needed
                    background: `linear-gradient(0deg, #6b5fef 30%, #6bffcf 60%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
                >
                Stijn Janssens
            </Typography>
            {!user && <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              sx={{
                marginLeft: "auto",
                ...(open && { display: "none" }),
              }} 
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
                <LoginIcon />
            </IconButton>}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{color: 'var(--drawerColor)'}} />
            ) : (
              <ChevronLeftIcon sx={{color: 'var(--drawerColor)'}}/>
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {visitorPages.filter(page => page.label !== "Login").map((page) => (
            <ListItem key={page.label} disablePadding sx={{ display: "block" }}
                onClick={(e) => {
                e.preventDefault();
                navigate(page.route);
              }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: 'var(--drawerColor)',
                  }}
                >
                  {page.icon}
                </ListItemIcon>
                <ListItemText primary={page.label} sx={{ opacity: open ? 1 : 0, color: 'white' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List sx={{ marginTop: "auto" }}>
            {personalData?.linkedin &&
             <SocialIcon label="LinkedIn" icon={<LinkedInIcon />} link={personalData.linkedin} open={open} />}
            {personalData?.github &&
              <SocialIcon label="GitHub" icon={<GitHubIcon />} link={personalData.github} open={open} />}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh'}}>
        <DrawerHeader />
            {user && 
              <AdminNav>
                <Outlet />
              </AdminNav>
            }
            {!user && <Outlet />}
      </Box>
    </Box>
  );
};
