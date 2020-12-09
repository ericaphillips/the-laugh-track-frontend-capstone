import React from "react"
import { Route } from "react-router-dom"
import { SpecialList } from "./specials/SpecialList"
import { SpecialProvider } from "./specials/SpecialProvider"

export const ApplicationViews = (props) => {
    return (
        <>
        <SpecialProvider>
            <Route exact path="/specials" render={
                props => <SpecialList {...props} />
            } />
            {/* <Route exact path ="/employees/create" render={
                props => <SpecialForm {...props} />
            } /> */}
        </SpecialProvider>
        </>
    )
}
