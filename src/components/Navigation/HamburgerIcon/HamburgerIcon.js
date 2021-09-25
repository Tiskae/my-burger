import React from "react";
import classes from "./HamburgerIcon.module.css";

const hamburgerIcon = (props) => (
    <div className={classes.Hamburger} onClick={props.clicked}>
        <div className={classes.Icon}></div>
    </div>
);

export default hamburgerIcon;
