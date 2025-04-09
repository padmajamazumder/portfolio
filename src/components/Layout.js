import React from 'react';

const Layout = ({ children }) => {
    // No navbar or footer, just render children directly
    return <>{children}</>;
};

export default Layout;
