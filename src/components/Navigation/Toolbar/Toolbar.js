import React from "react";
import PropTypes from "prop-types";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "./NavigationItems/NavigationItems";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <HamburgerIcon clicked={props.showSidedraw} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </header>
    );
};

toolbar.propTypes = {
    showSidedraw: PropTypes.func,
};

export default toolbar;
