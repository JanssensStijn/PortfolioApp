import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate } from 'react-router-dom';
import { useUserContext } from '../providers/userProvider';
import { ReactNode } from 'react';
import { adminPages } from './pages';
import { Badge } from '@mui/material';
import { useMessagesContext } from '../providers/messageProvider';
import { MessageDetailsType } from '../firebase/messageTypes';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: 'var(--drawerBackColor)',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: 'var(--drawerBackColor)',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: 'auto',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: 'var(--drawerBackColor)',
  ...(open && {
    width: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    marginTop: 8,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const AdminNav = ({children}: {children: ReactNode}) => {
    
  const {logout} = useUserContext();
  const navigate = useNavigate();
  const messages = useMessagesContext().messages;
  const unreadMessages = messages?.filter((message: MessageDetailsType) => message.status === 'unread').length;
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (<>
    <Box sx={{ display: 'flex', }}>
      <CssBaseline />
      
      <AppBar position="fixed" open={open} sx={{ display: 'flex'}}>
        <Toolbar>
          <DrawerHeader>
          <IconButton 
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerClose}
          edge="start"
          sx={{
            ...(!open && { display: 'none' }),
            color: 'var(--drawerColor)',
          }}>
            {theme.direction === 'rtl' ? 
            <ChevronLeftIcon sx={{color: 'var(--drawerColor)'}}/>
            : <ChevronRightIcon sx={{color: 'var(--drawerColor)'}}/>}
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>Admin</Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="end"
            sx={{
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon aria-label='foldout admin drawer'/>
          </IconButton>
        </DrawerHeader>
        </Toolbar>
      </AppBar>
      
      <Box component="main" sx={{ flexGrow: 1}}>
        {children}
      </Box>
    
      <Drawer variant="permanent" open={open} anchor='right' sx={{backgroundColor: 'transparent'}}>
        
        <Divider />
        <List sx={{marginTop: 8}}>
          {adminPages.map((page) => (
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
                  {page.label === "Inbox" && 
                    <Badge badgeContent={unreadMessages} color="error">{page.icon}</Badge>
                  }
                  {(page.label !== "Inbox") &&
                    <>{page.icon}</>
                  }
                </ListItemIcon>
                <ListItemText primary={page.label} sx={{ opacity: open ? 1 : 0, color: 'white' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider    />

        <List sx={{ marginTop: "auto" }}>
          <Divider />
          <ListItem key="Logout" disablePadding sx={{ display: "block" }}
                    onClick={(e) => {
                    e.preventDefault();
                    logout();
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
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0, color: 'white' }} />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
    </Box>
    </>
  );
}
