import React from 'react';

import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from "./SideDrawer.module.css";

const sideDrawer = (props) => {
    
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    
    return (
        <React.Fragment>
            <Backdrop 
            show={props.show} 
            click={props.close}/>
            <div className={attachedClasses.join(" ")} onClick={props.close} >
                <Logo />
                <nav>
                    <NavItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </React.Fragment>
    );
}
 
export default sideDrawer;