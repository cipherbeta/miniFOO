import React from 'react';

import Header from '../components/layout/header';
import Footer from '../components/layout/footer';

const Layout = (props) => {
    return(
        <div className="AppLayoutWrapper">
            <Header/>

            {props.children}


        </div>
    );
};

export default Layout;