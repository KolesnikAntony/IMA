import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ProductList from "./products-list";
import ProductCreate from "./product-create";
import ProductEdit from "./product-edit";
import CategoryList from "./category-list";

function TabPanel(props: any) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box mt={2}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props: any) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ProductsContainer() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    const [mode, setMode] = useState('list');
    const [productId, setProductId] = useState('');

    const handleMode = useCallback((type: string) => {
        if (type === 'list') {
            return <ProductList setMode={setMode} setProductId={setProductId}/>
        } else if (type === 'edit') {
            return <ProductEdit setMode={setMode} productId={productId}/>
        } else if (type === 'create') {
            return <ProductCreate setMode={setMode}/>
        }
    }, [mode]);


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                >
                    <LinkTab label="Products" href="/drafts" {...a11yProps(0)} />
                    <LinkTab label="Categories" href="/trash" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {handleMode(mode)}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CategoryList/>
            </TabPanel>
        </div>
    );
}