import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  let validationError = null;

  if(props.invalid && props.touched){
    validationError = <p><strong>Please enter a valid value</strong></p>
  }

  const inputClasses = [classes.InputElement];

  if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = <input className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
      break;
    case "textarea":
      inputElement = <textarea className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
      break;
    case "select":
      inputElement = (
        <select
        className={classes.InputElement} 
        value={props.value} onChange={props.changed}>
         {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}> 
              {option.displayValue} 
            </option>
          ))}
        </select>
        )
      break;
    default:
      inputElement = <input className={inputClasses.join(" ")} {...props.elementConfig} value={props.value}/>;
  }

  const iconStyle = {   
    color:"#f2a30f",
    borderRight: "1px solid #f2f2f2",
    width: "30px",
    fontSize: "20px",
    padding: "8px",
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      <div className={classes.InputElementContainer}>
        {props.icon ? 
          <FontAwesomeIcon icon={props.icon} style={iconStyle}/>
          : null
        }
        {inputElement}
      </div>
      {validationError}
    </div>
  );
};

export default Input;
