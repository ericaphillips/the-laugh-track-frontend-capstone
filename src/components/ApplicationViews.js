import React from "react"
import { Route } from "react-router-dom"
import { SpecialList } from "./specials/SpecialList"
import { SpecialProvider } from "./specials/SpecialProvider"
import { SpecialForm } from "./specials/SpecialForm"
import { SpecialLengthProvider } from "./SpecialDropdowns/SpecialLengthProvider"
import { SpecialPlatformProvider } from "./SpecialDropdowns/SpecialPlatformProvider"
import { SpecialGenreProvider } from "./SpecialDropdowns/SpecialGenreProvider"

export const ApplicationViews = (props) => {
    return (
        <>
    <SpecialGenreProvider>
    <SpecialPlatformProvider>
    <SpecialLengthProvider>
        <SpecialProvider>
            <Route exact path="/specials" render={
                props => <SpecialList {...props} />
            } />
            <Route exact path ="/specials/create" render={
                props => <SpecialForm {...props} />
            } />
        </SpecialProvider>
    </SpecialLengthProvider>
    </SpecialPlatformProvider>
    </SpecialGenreProvider>
        </>
    )
}
