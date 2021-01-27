import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useAuthDispatch, useAuthState } from "../../Context/userContext";
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DrawerLeft from "../Drawer/drawer";
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import TranslateOutlinedIcon from '@material-ui/icons/TranslateOutlined';
import english from "../../img/english.png";
import germany from "../../img/germany.png";
//import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: 1600,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },

    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 300,
    },
}));

const Navbar = () => {
    const dispatch = useAuthDispatch() // read dispatch method from context
    const userDetails = useAuthState() //read user details from context
    const [openNotification, setOpenNotification] = useState()
    //console.log('kl', userDetails.user.status);

    const classes = useStyles();
    const theme = useTheme();
    const [auth, setAuth] = React.useState(true);

    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorChangeLanguage, setAnchorChangeLanguage] = useState(null)
    const open = Boolean(anchorEl);
    const openLanguageMenu = Boolean(anchorChangeLanguage)

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
        //onClick={handleOpenNotificationDrawer(anchor, false)}
        //onKeyDown={handleOpenNotificationDrawer(anchor, false)}
        >
            <List>

                <ListItem button>
                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                    <ListItemText primary="Notifications" />
                </ListItem>

            </List>
            <Divider />

        </div>
    );
    /* اضافه کردن قسمت پرانتز ایونت باعث شد که مشکل بسته نشدن درایر وقتی کاربر رو صفحه کلیک میکنه حل بشه */
    const handleOpenNotificationDrawer = (item) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenNotification(item)

    };
    const handleChange = (event) => {
        setAuth(event.target.checked);
    };
    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };
    const handleChangeLanguage = (event) => {
        setAnchorChangeLanguage(event.currentTarget)
    }
    const handleDrawerClose = (item) => {

        setDrawerOpen(item);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseLanguageMenu = () => {
        setAnchorChangeLanguage(null)
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>

            <div className={classes.root}>
                <FormGroup>
                    {/* <FormControlLabel
                    control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                    label={auth ? 'Logout' : 'Login'}
                /> */}
                </FormGroup>
                <AppBar position="static">

                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>

                        </Typography>
                        <div>
                            <IconButton
                                aria-label="Languages"
                                aria-controls="menu-language"
                                aria-haspopup="true"
                                onClick={handleChangeLanguage}
                                color="inherit"
                            >
                                <TranslateOutlinedIcon />
                            </IconButton>
                            <Menu
                                id="menu-language"
                                anchorEl={anchorChangeLanguage}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={openLanguageMenu}
                                onClose={handleCloseLanguageMenu}
                            >
                                <div style={{ display: "flex", alignItems: 'center', flexDirection: 'row' }} >
                                    <img src={english} alt="english" style={{ marginLeft: '10px' }} />
                                    <MenuItem onClick={handleClose}>English</MenuItem>
                                </div>
                                <div style={{ display: "flex", alignItems: 'center', flexDirection: 'row' }} >
                                    <img src={germany} alt="germany" style={{ marginLeft: '10px' }} />
                                    <MenuItem onClick={handleClose}>Germany</MenuItem>
                                </div>

                            </Menu>

                        </div>
                        <div>
                            <IconButton
                                aria-label="Notifications"
                                aria-controls=""
                                aria-haspopup="true"
                                onClick={handleOpenNotificationDrawer(true)}
                                color="inherit"
                            >
                                <NotificationsActiveOutlinedIcon />
                            </IconButton>

                        </div>

                        {auth && (
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >

                                    <div style={{ display: "flex", alignItems: 'center', flexDirection: 'row' }} >
                                        <PersonIcon fontSize="large" style={{ paddingLeft: '8px' }} />
                                        <MenuItem onClick={handleClose}>{userDetails.user.data.Result.Agent.FirstName} {userDetails.user.data.Result.Agent.LastName}</MenuItem>
                                    </div>
                                    <div style={{ display: "flex", alignItems: 'center', flexDirection: 'row' }} >
                                        <PeopleIcon fontSize="large" style={{ paddingLeft: '8px' }} />
                                        <MenuItem onClick={handleClose}>{userDetails.user.data.Result.DefaultAgency.Name} </MenuItem>
                                    </div>
                                    <div style={{ display: "flex", alignItems: 'center', flexDirection: 'row' }} >
                                        <AlternateEmailIcon fontSize="large" style={{ paddingLeft: '8px' }} />
                                        <MenuItem onClick={handleClose}>{userDetails.user.data.Result.Agent.Email} </MenuItem>
                                    </div>
                                    <Divider />
                                    <div style={{ display: "flex", alignItems: 'center', flexDirection: 'row' }} >
                                        <AutorenewIcon fontSize="large" style={{ paddingLeft: '8px' }} />
                                        <MenuItem onClick={handleClose}>Switch Agancy</MenuItem>
                                    </div>
                                    <div style={{ display: "flex", alignItems: 'center', flexDirection: 'row' }} >
                                        <ExitToAppIcon fontSize="large" style={{ paddingLeft: '8px' }} />
                                        <MenuItem onClick={handleClose}>LogOut</MenuItem>
                                    </div>
                                </Menu>
                            </div>
                        )}

                    </Toolbar>
                </AppBar>
                {openNotification &&
                    <div>
                        <Drawer
                            anchor={'right'}
                            open={openNotification}
                            transitionDuration={{ enter: 500, exit: 1000 }}
                            onClose={handleOpenNotificationDrawer(false)}
                            onOpen={handleOpenNotificationDrawer(true)}
                        >
                            {list('right')}
                        </Drawer>
                    </div>
                }
                <DrawerLeft openDrawer={drawerOpen} closeDrawer={handleDrawerClose} />
                {/* <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={drawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer> */}
            </div>
        </>
    )
}

export default Navbar;