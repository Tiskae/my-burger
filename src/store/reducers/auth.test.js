import reducer from "./auth";
import * as actions from "../actions/actionTypes";
import { useStore } from "react-redux";

describe("Auth reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual({
            idToken: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/",
        });

        expect(
            reducer(null, {
                type: actions.AUTH_SUCCESS,
                idToken: "some-token",
                userId: "some-id",
            })
        ).toEqual({
            idToken: "some-token",
            userId: "some-id",
            error: null,
            loading: false,
            authRedirectPath: "/",
        });
    });
});
