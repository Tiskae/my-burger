import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>
                Burger Builder
            </NavigationItem>
            {props.isAuthenticated ? (
                <NavigationItem link="/orders">My orders</NavigationItem>
            ) : null}
            {props.isAuthenticated ? (
                <NavigationItem link="/logout">Logout</NavigationItem>
            ) : (
                <NavigationItem link="/auth">Authenticate</NavigationItem>
            )}
        </ul>
    );
};

export default navigationItems;
