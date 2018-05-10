import React from 'react';

import Header from '../components/layout/header';

const Layout = (props) => {
    return(
        <div className="AppLayoutWrapper">
            <Header/>

            {props.children}


        </div>
    );
};

export default Layout;