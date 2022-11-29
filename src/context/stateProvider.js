import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, childern }) => {
    return (
        // returns a component that has a provider
        <StateContext.Provider vlaue={useReducer(reducer, initialState)}>
            {childern}
        </StateContext.Provider>
    );
};

export const useStateValue = () => useContext(StateContext);
