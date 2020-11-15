import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
// import { checkPropTypes } from "prop-types";

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    {props.isAuthenticated ? 
    <NavigationItem exact link="/orders"> 
          Orders
    </NavigationItem> : null}
    {!props.isAuthenticated ? 
          <NavigationItem link="/auth">Authenticate</NavigationItem>
          : <NavigationItem link="/logout">Log Out</NavigationItem>
    }
  </ul>
);

export default NavigationItems;
