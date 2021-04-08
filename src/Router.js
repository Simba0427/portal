import React, { Suspense, lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { history } from "./history"
import { connect } from "react-redux"
import Spinner from "./components/@vuexy/spinner/Loading-spinner"
import { ContextLayout } from "./utility/context/Layout"

// Route-based code splitting
const dashboard = lazy(() => import("./views/pages/dashboard/Dashboard"))
const activeMembers = lazy(() => import("./views/pages/active-members/ActiveMembers"))
const companies = lazy(() => import("./views/pages/companies/Companies"))
const memberships = lazy(() => import("./views/pages/memberships/Memberships"))
const revenue = lazy(() => import("./views/pages/revenue/Revenue"))
const billing = lazy(() => import("./views/pages/billing/Billing"))
const reports = lazy(() => import("./views/pages/reports/Reports"))
const userList = lazy(() => import("./views/pages/users/Users"))
const userEdit = lazy(() => import("./views/pages/users_old/UserEdit"))
const accountSettings = lazy(() => import("./views/pages/account-settings/AccountSettings"))

const Login = lazy(() => import("./views/pages/auth/login/Login"))
const forgotPassword = lazy(() =>
  import("./views/pages/auth/ForgotPassword")
)
const lockScreen = lazy(() => import("./views/pages/auth/LockScreen"))
const resetPassword = lazy(() =>
  import("./views/pages/auth/ResetPassword")
)
const register = lazy(() =>
  import("./views/pages/auth/register/Register")
)
const error404 = lazy(() => import("./views/pages/misc/error/404"))
const error500 = lazy(() => import("./views/pages/misc/error/500"))
const authorized = lazy(() => import("./views/pages/misc/NotAuthorized"))
const maintenance = lazy(() => import("./views/pages/misc/Maintenance"))


// Set Layout and Component Using App Route
const RouteConfig = ({ component: Component, fullLayout, children, ...rest }) => (
  <Route
    {...rest}
    render={props => 
        (
          <ContextLayout.Consumer>
            {context => {
              let LayoutTag =
                fullLayout === true
                  ? context.fullLayout
                  : context.state.activeLayout === "horizontal"
                  ? context.horizontalLayout
                  : context.VerticalLayout
              return (
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              )
            }}
          </ContextLayout.Consumer>
        )
    }
  />
)

const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole,
  }
}

const AppRoute = connect(mapStateToProps)(RouteConfig)

class AppRouter extends React.Component {

  state = {
    currentUser: [],
  }

  componentDidMount() {
    if (localStorage.getItem("userToken") !== "") {
      this.setState({
        currentUser: localStorage.getItem("userData") !== "" ? JSON.parse(localStorage.getItem("userData")) : [],
      });
    }
  }

  componentWillMount() {
    if (localStorage.getItem("userToken") === "" || localStorage.getItem("userToken") === null) {
      history.push("/login");
    } 
    else {
      this.setState({
        currentUser: localStorage.getItem("userData") !== "" ? JSON.parse(localStorage.getItem("userData")) : [],
      });
    }
  }

  render() {
    const { currentUser } = this.state;

    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={activeMembers} />
          <AppRoute path="/active-members" component={activeMembers} />
          <AppRoute path="/companies" component={companies} />
          <AppRoute path="/memberships" component={memberships} />
          <AppRoute path="/revenue" component={revenue} />
          <AppRoute path="/billing" component={billing} />
          <AppRoute path="/reports" component={reports} />
          <AppRoute path="/account-settings" component={accountSettings} />

          {currentUser ? 
            currentUser.user_role === "admin" ? 
            <>
              <AppRoute path="/users/list" component={userList} />
              <AppRoute path="/users/edit" component={userEdit} />
            </> : null
            :null
          }

          
          <AppRoute path="/login" component={Login} fullLayout />
          <AppRoute path="/register" component={register} fullLayout />
          <AppRoute
            path="/forgot-password"
            component={forgotPassword}
            fullLayout
          />
          <AppRoute
            path="/lock-screen"
            component={lockScreen}
            fullLayout
          />
          <AppRoute
            path="/reset-password"
            component={resetPassword}
            fullLayout
          />
          <AppRoute path="/misc/error/404" component={error404} fullLayout />
          <AppRoute path="/misc/error/500" component={error500} fullLayout />
          <AppRoute
            path="/misc/not-authorized"
            component={authorized}
            fullLayout
          />
          <AppRoute
            path="/misc/maintenance"
            component={maintenance}
            fullLayout
          />
          <AppRoute component={error404} fullLayout />
        </Switch>
      </Router>
    )
  }
}

export default AppRouter
