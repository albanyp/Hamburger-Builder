import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.css";

const NavigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink to={{ pathname: props.link }} activeClassName={classes.active}>
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;

/* 
- Using NavLink is not necessary if I use the props
  of a component loaded by a route
- The active class was not getting used originally
  (even though the active class was added by the
  Navlink) because of CSS Modules takes our classes
  and make them unique, so it needs to be set
  manually
*/
