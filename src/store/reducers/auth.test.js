import React from "react";
import Reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe("auth reducer", () => {
    it("should return the initialState", () => {
        expect(Reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/",
        });
    });

    it("should store a token after log in", () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/",
        }, 
        { 
            type: actionTypes.AUTH_SUCCESS,
            idToken: "some-token",
            userId: "some-user",
        })).toEqual({
            token: "some-token",
            userId: "some-user",
            error: null,
            loading: false,
            authRedirectPath: "/",
        });
    });
});