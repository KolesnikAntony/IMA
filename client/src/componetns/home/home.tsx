import React, {FC} from 'react';
import './home.scss';
import Intro from "./intro/intro";
import Catalog from "./catalog/catalog";



const Home = () => {
    return <>
        <Intro/>
        <Catalog/>
    </>

};

export default Home;