import React, {Component} from "react";
import { connect } from "react-redux";
import Toolbar from "../Nav/Toolbar/Toolbar";
import SideDrawer from "../Nav/SideDrawer/SideDrawer";

import classes from "./Layout.module.css";

class Layout extends Component {

    state= {
        showSideDrawer: false
    }

    toggleSideDrawerHandler = () => {
        const showSideDrawerState = this.state.showSideDrawer;
        this.setState({
            showSideDrawer: !showSideDrawerState
        })
    }

    sideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar 
                    click={this.toggleSideDrawerHandler}
                    isAuth={this.props.isAuthenticated} />
                <SideDrawer 
                close={this.sideDrawerCloseHandler}
                show={this.state.showSideDrawer}
                isAuth={this.props.isAuthenticated} />
                <main className={classes.Content} >
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}    

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);