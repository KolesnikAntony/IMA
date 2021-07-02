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
import AdminHome from "./admin-home";

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
            position: 'sticky',
            top: 60,
            background: "white",
            zIndex: 1,
            height: 'fit-content',
            boxShadow: '0 0 0 1px rgba(0, 0, 255, .06)',
            borderRadius: 4
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
        }
    }),
);

export default function SidebarAdmin() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openColl, setOpenColl] = React.useState(false);
    const [title, setTitle] = useState('Admin panel');

    const handleOnLogout = () => {
        dispatch(logout())
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={classes.appBar}
            >
                <Toolbar>
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
            <div className={classes.drawer}>
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
                                <PetsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Home page" />
                        </ListItem>
                        <ListItem component={NavLink} to='/admin/contacts' activeClassName={classes.activeTab}>
                            <ListItemIcon>
                                <PetsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Contacts" />
                        </ListItem>
                        <ListItem component={NavLink} to='/admin/about' activeClassName={classes.activeTab}>
                            <ListItemIcon>
                                <PetsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="About us" />
                        </ListItem>
                    </List>
                </Collapse>
            </div>
            <main className={classes.content}>
                <Switch>
                    <Route exact path='/admin/products' render={() => <ProductContainer setTitle={setTitle}/>}/>
                    <Route exact path='/admin/categories' component={CategoryContainer}/>
                    <Route exact path='/admin/contacts' component={AdminContacts}/>
                    <Route exact path='/admin/about'  render={() => <AdminAbout setTitle={setTitle}/>}/>
                    <Route exact path='/admin/homepage'  render={() => <AdminHome setTitle={setTitle}/>}/>
                </Switch>
            </main>
        </div>
    );
}
