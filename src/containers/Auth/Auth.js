import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import { updateObject, checkValidity } from "../../shared/utility";
import * as actions from "../../store/actions/index";

const Auth = (props) => {
   const [authForm, setAuthForm] = useState({
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                  type:"email",
                  placeholder: "Your E-mail"
                },
                value: "test@test.com",
                validation: {
                  required: true,
                  isEmail: true,
                },
                valid: false,
                touched: false,
              },
              password: {
                elementType: "input",
                elementConfig: {
                  type:"password",
                  placeholder: "Password"
                },
                value: "123456",
                validation: {
                  required: true,
                  minLength: 6,
                },
                valid: false,
                touched: false,
              },
        },
      })

    const [isSignedUp, setIsSignedUp] = useState(true);

    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() => {
      if(!buildingBurger && authRedirectPath){
        onSetAuthRedirectPath();
      }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);


    const inputChangeHandler = (event, controlName) => {
      const updatedControls = updateObject(authForm, {
        [controlName]: updateObject(authForm[controlName], {
          value:  event.target.value,
          valid: checkValidity(event.target.value, authForm[controlName]),
          touched: true,
        })
      });
      setAuthForm(updatedControls);
    }

    const submitHandler = (event) => {
      event.preventDefault();
      props.onAuth(authForm.controls.email.value, 
                        authForm.controls.password.value,
                        isSignedUp);
    };

    const switchAuthModeHandler = () => {
      setIsSignedUp(!isSignedUp);
    };

        const formElementsArray = [];
        for(let key in authForm){
          formElementsArray.push({
            id: key,
            config: authForm[key],
          })
        }

        let form = formElementsArray.map(formElement => (
            <Input key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value} 
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangeHandler(event, formElement.id)} />
        ))

        if(props.loading){
          form = <Spinner />;
        }

        let errorMessage = null;

        if(props.error) {
          errorMessage = (
          <p>{props.error.message}</p>
          );
        }

        let authRedirect = null;

        if(props.isAuthenticated){
          authRedirect = <Redirect to={props.authRedirect} />;
        }


        return (
          <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={(event) => submitHandler(event)}>
              {form} 
              <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button btnType="Danger" clicked={switchAuthModeHandler}>
              SWITCH TO {isSignedUp ? "SIGN IN" : "SIGN UP" }
            </Button>
          </div>
        )
    }


const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    buildingBurger: state.burgerBuilder.building,
    authRedirect: state.auth.authRedirectPath,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignedUp) => dispatch(actions.auth(email, password, isSignedUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);