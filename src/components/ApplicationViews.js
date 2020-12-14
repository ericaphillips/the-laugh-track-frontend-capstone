import React from "react"
import { Route } from "react-router-dom"
import { SpecialList } from "./specials/SpecialList"
import { SpecialProvider } from "./specials/SpecialProvider"
import { SpecialForm } from "./specials/SpecialForm"
import { SpecialLengthProvider } from "./SpecialDropdowns/SpecialLengthProvider"
import { SpecialPlatformProvider } from "./SpecialDropdowns/SpecialPlatformProvider"
import { SpecialGenreProvider } from "./SpecialDropdowns/SpecialGenreProvider"
import { SpecialDetails } from "./specials/SpecialDetails"
import { UserProvider } from "./users/UserProvider"
import { ComedianProvider } from "./FavoriteComedians/ComedianProvider"
import { ComedianList } from "./FavoriteComedians/ComedianList"
import { ComedianForm } from "./FavoriteComedians/ComedianForm"
import { ComedianDetails } from "./FavoriteComedians/ComedianDetails"


export const ApplicationViews = (props) => {
    return (
        <>
    <UserProvider>
    <SpecialGenreProvider>
    <SpecialPlatformProvider>
    <SpecialLengthProvider>
        <SpecialProvider>
            <Route exact path="/specials" render={
                props => <SpecialList {...props} />
            } />
            <Route exact path ="/specials/createNewSpecial" render={
                props => <SpecialForm {...props} />
            } />
            {/* the route saves the number at the end of the URL 
            as a variable named specialId, which is then used in SpecialDetails
            */}
            <Route path ="/specials/:specialId(\d+)" render={
                props => <SpecialDetails {...props} />
            } />
            <Route path ="/specials/edit/:specialId(\d+)" render={
                props => <SpecialForm {...props} />
            } />
        </SpecialProvider>
    </SpecialLengthProvider>
    </SpecialPlatformProvider>
    </SpecialGenreProvider>
    </UserProvider>

    <UserProvider>
        <ComedianProvider>
            <Route exact path="/comedians" render={
                props => <ComedianList {...props} />
            } />
            <Route exact path="/comedians/createNewComedian" render={
                props => <ComedianForm {...props} />
            } />

            <Route path="/comedians/:comedianId(\d+)" render={
                props => <ComedianDetails {...props} />
            } />
            <Route path="/comedians/edit/:comedianId(\d+)" render={
                props => <ComedianForm {...props} />
            } />
        </ComedianProvider>
    </UserProvider>
        </>
    )
}
