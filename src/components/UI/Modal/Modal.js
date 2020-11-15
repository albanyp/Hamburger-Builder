import React from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
    return (
      <Aux>
        <Backdrop show={props.show} onClick={props.modalClosed} />
        <div
          style={{
            transform: props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity:  props.show ? "1" : "0",
          }}
          className={classes.Modal}
        >
          {props.children}
        </div>
      </Aux>
    );
  };

export default React.memo( Modal, 
  (prevProps, nextProps) => (
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
));
