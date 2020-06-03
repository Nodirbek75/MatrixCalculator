import React from 'react';
import './Layout.scss'
const Layout = (props) => (
    <div className='Layout'>
        <div>{props.children}</div>
    </div>
)

export default Layout;