import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ProductContainer from "./product-container";
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import CategoryContainer from "./category-container";
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import PetsIcon from '@material-ui/icons/Pets';
import {Button, Collapse, IconButton} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {logout} from "../../../redux/auth-reducer";
import {useDispatch} from "react-redux";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AdminContacts from "./admin-contacts";
import AdminAbout from "./admin-about";
import AdminHome from "./admin-home";
import UserList from "./admin-user-list";
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ContactsIcon from '@material-ui/icons/Contacts';
import GroupIcon from '@material-ui/icons/Group';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import OrderList from "./order-list";
import OrderContainer from "./order-container";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        rootMobile: {
            display: 'flex',
            flexDirection: 'column',
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
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: drawerWidth,
            flexShrink: 0,
            top: 60,
            background: "white",
            zIndex: 1,
            height: 'fit-content',
            boxShadow: '0 0 0 1px rgba(0, 0, 255, .06)',
            borderRadius: 4,
        },
        drawerMobileView: {
            position: 'static',
            width: '100%',
            padding: '0 8px',
            display: 'none',
        },
        toShow: {
            display: 'block',
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
            paddingLeft: 24,
        },
        logout: {
            marginLeft: 'auto'
        },
        activeTab: {
            background: 'rgba(0,0,0,0.04)'
        },
         burger: {
            padding: 0,
             marginRight: 20,
             color: 'white'
         }
    }),
);

export default function SidebarAdmin() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openColl, setOpenColl] = React.useState(false);
    const [openMenu, setOpenMenu] = React.useState(false);
    const [title, setTitle] = useState('Admin panel');

    const isMobile = useMediaQuery('(max-width: 798px)');

    const handleOnLogout = () => {
        dispatch(logout())
    };

    return (
        <div className={isMobile ? classes.rootMobile : classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={classes.appBar}
            >
                <Toolbar>
                    {isMobile && <IconButton className={classes.burger} onClick={() => setOpenMenu(!openMenu)}>
                        {!openMenu ?  <MenuIcon /> :  <CloseIcon />}
                    </IconButton>}
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
            <div className={`${classes.drawer} ${isMobile ? classes.drawerMobileView : ''} ${openMenu ? classes.toShow : ''}`}>
                <Divider/>
                <List>
                    <ListItem component={NavLink} to='/admin/products' activeClassName={classes.activeTab}>
                        <ListItemIcon><LibraryAddIcon/></ListItemIcon>
                        <ListItemText primary='Products'/>
                    </ListItem>
                    <ListItem component={NavLink} to='/admin/categories' activeClassName={classes.activeTab}>
                        <ListItemIcon><PetsIcon/></ListItemIcon>
                        <ListItemText primary='Categories'/>
                    </ListItem>
                </List>
                <Divider/>
                <ListItem button onClick={() => setOpenColl(!openColl)}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Site info"/>
                    {openColl ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openColl} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem component={NavLink} to='/admin/homepage' activeClassName={classes.activeTab}>
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Home page" />
                        </ListItem>
                        <ListItem component={NavLink} to='/admin/contacts' activeClassName={classes.activeTab}>
                            <ListItemIcon>
                                <ContactsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Contacts" />
                        </ListItem>
                        <ListItem component={NavLink} to='/admin/about' activeClassName={classes.activeTab}>
                            <ListItemIcon>
                                <InfoIcon/>
                            </ListItemIcon>
                            <ListItemText primary="About us" />
                        </ListItem>
                    </List>
                </Collapse>
                <Divider/>
                <List component="div" disablePadding>
                    <ListItem component={NavLink} to='/admin/users' activeClassName={classes.activeTab}>
                        <ListItemIcon>
                            <GroupIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                </List>
                <List component="div" disablePadding>
                    <ListItem component={NavLink} to='/admin/orders' activeClassName={classes.activeTab}>
                        <ListItemIcon>
                            <GroupIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Orders" />
                    </ListItem>
                </List>
            </div>
            <main className={classes.content}>
                <Switch>
                    <Route exact path='/admin'>
                        <Redirect to="/admin/products" />
                    </Route>
                    <Route exact path='/admin/products' render={() => <ProductContainer setTitle={setTitle}/>}/>
                    <Route exact path='/admin/categories' render={() => <CategoryContainer setTitle={setTitle}/>}/>
                    <Route exact path='/admin/contacts' render={() => <AdminContacts setTitle={setTitle}/>}/>
                    <Route exact path='/admin/about'  render={() => <AdminAbout setTitle={setTitle}/>}/>
                    <Route exact path='/admin/homepage'  render={() => <AdminHome setTitle={setTitle}/>}/>
                    <Route exact path='/admin/users'  render={() => <UserList setTitle={setTitle}/>}/>
                    <Route exact path='/admin/orders'  render={() => <OrderContainer setTitle={setTitle}/>}/>
                </Switch>
            </main>
        </div>
    );
}
