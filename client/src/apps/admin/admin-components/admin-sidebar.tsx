import React, {useState} from 'react';
import clsx from 'clsx';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ProductContainer from "./product-container";
import {NavLink, Route, Switch} from "react-router-dom";
import CategoryContainer from "./category-container";
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import PetsIcon from '@material-ui/icons/Pets';
import {Button, Collapse} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {logout} from "../../../redux/auth-reducer";
import {useDispatch} from "react-redux";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AdminContacts from "./admin-contacts";
import AdminAbout from "./admin-about";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',

            background: "white",
            zIndex: 1,
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            paddingTop: 24,
            paddingBottom: 24,
            paddingRight: 24,
            paddingLeft: 90,
        },
        logout: {
            marginLeft: 'auto'
        }
    }),
);

export default function SidebarAdmin() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openColl, setOpenColl] = React.useState(false);
    const [title, setTitle] = useState('Admin panel')

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOnLogout = () => {
        dispatch(logout())
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                       {title}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.logout}
                        startIcon={<ExitToAppIcon />}
                        onClick={handleOnLogout}
                    >Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem component={NavLink} to='/admin/products'>
                        <ListItemIcon><LibraryAddIcon/></ListItemIcon>
                        <ListItemText primary='Products'/>
                    </ListItem>
                    <ListItem component={NavLink} to='/admin/categories'>
                        <ListItemIcon><PetsIcon/></ListItemIcon>
                        <ListItemText primary='Categories'/>
                    </ListItem>
                </List>
                <Divider/>
                <ListItem button onClick={() => setOpenColl(!openColl)}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {openColl ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openColl} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem component={NavLink} to='/admin/contacts'>
                            <ListItemIcon>
                                <PetsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Contacts" />
                        </ListItem>
                        <ListItem component={NavLink} to='/admin/about'>
                            <ListItemIcon>
                                <PetsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="About us" />
                        </ListItem>
                    </List>
                </Collapse>
            </Drawer>
            <main className={classes.content}>
                <Switch>
                    <Route exact path='/admin/products' render={() => <ProductContainer setTitle={setTitle}/>}/>
                    <Route exact path='/admin/categories' component={CategoryContainer}/>
                    <Route exact path='/admin/contacts' component={AdminContacts}/>
                    <Route exact path='/admin/about'  render={() => <AdminAbout setTitle={setTitle}/>}/>
                </Switch>
            </main>
        </div>
    );
}
