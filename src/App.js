import './App.css';
import { Route, Redirect } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { Logout } from "./components/auth/Logout"

export const App = () => (
  <>
      <Route render={() => {
          // The user id is saved under the key app_user_id in local Storage. Change below if needed!
            if (localStorage.getItem("app_user_id")) {
                return (
                    <>
                        <button className="logout--button" onClick={Logout}>
                            Log Out
                        </button>
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
    )