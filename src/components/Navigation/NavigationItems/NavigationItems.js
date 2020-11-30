import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHamburger, 
  faShoppingCart, 
  faUserShield,
  faSignOutAlt, 
} from '@fortawesome/free-solid-svg-icons';

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  const iconStyle = {
    color: "#F2A30F", 
    fontSize: "20px",
    padding: "0px 8px",
    width: "28px"
  };

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">
        {props.icon ?
          <FontAwesomeIcon icon={faHamburger} style={iconStyle} />
          : null
        }
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ?
      <NavigationItem exact link="/orders"> 
        {props.icon ?
          <FontAwesomeIcon icon={faShoppingCart} style={iconStyle} />
          : null 
        }
        Orders
      </NavigationItem> : null}
      {!props.isAuthenticated ? 
            <NavigationItem link="/auth">
              {props.icon ? 
                <FontAwesomeIcon icon={faUserShield} style={iconStyle} />
                : null
              }
              Authenticate
            </NavigationItem>
            : 
            <NavigationItem link="/logout">
              {props.icon ? 
                <FontAwesomeIcon icon={faSignOutAlt} style={iconStyle} />
                : null
              }
              Log Out
            </NavigationItem>
      }
    </ul>
  );
};

export default NavigationItems;
