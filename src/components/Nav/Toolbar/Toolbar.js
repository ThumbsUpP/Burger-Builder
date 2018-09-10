import React from 'react';

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar} >
            <DrawerToggle 
            click={props.click} />
            <div><Logo /></div>
            <nav className={classes.Desktop}>
                <NavItems isAuthenticated={props.isAuth} />
            </nav>
        </header>
    )
}
 
export default toolbar;