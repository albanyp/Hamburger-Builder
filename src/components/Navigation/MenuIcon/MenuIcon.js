import React from "react";
import classes from "./MenuIcon.module.css";

const MenuIcon = (props) => (
  <div onClick={props.show} className={classes.IconContainer}>
    <div className={classes.Icon}></div>
    <div className={classes.Icon}></div>
    <div className={classes.Icon}></div>
  </div>
);

export default MenuIcon;
