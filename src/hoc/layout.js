import React from 'react';


const Layout = (props) => {
    return(
        <div className="AppLayoutWrapper">

            {props.children}


        </div>
    );
};

export default Layout;