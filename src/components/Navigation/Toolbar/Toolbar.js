import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import MenuIcon from "../MenuIcon/MenuIcon";

const Toolbar = (props) => (
  <header className={classes.Toolbar} open={props.open}>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <MenuIcon show={props.open} />
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
  </header>
);

export default Toolbar;
