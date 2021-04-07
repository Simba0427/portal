import { history } from "../../../history"
import http from "../../../utility/AxiosInstance"
import SweetAlert from "sweetalert2";

export const loginWithJWT = user => {

  return dispatch => {
    http.post("/login", {
        email: user.email,
        password: user.password
      })
      .then(response => {
        var loggedInUser
        
        if (response.data.state) {
          loggedInUser = response.data.user;

          http.get("/officernd/getAccessToken", {
            headers: {
              Authorization: "Bearer " + loggedInUser.token
            },
          }).then(response => {
            console.log(response.data)
            if (response.data.status === 200) {
              console.log(response.data.result.access_token)
              
              localStorage.setItem("accessToken", response.data.result.access_token);
              localStorage.setItem("userToken", loggedInUser.token);
              localStorage.setItem("userData", JSON.stringify(loggedInUser));

              dispatch({
                type: "LOGIN_WITH_JWT",
                payload: { loggedInUser, loggedInWith: "jwt" },
                isLoggedIn: true
              })

              history.push("/active-members");
              window.location.reload(false);
            } else {
              dispatch({ type: "LOGOUT_WITH_JWT", payload: { }, isLoggedIn: false });
              history.push("/login")
            }
          })
          .catch(err => console.log(err))

        } else {
          SweetAlert.fire("Error", "Incorrect your username or password","error");
          dispatch({
            type: "LOGIN_WITH_JWT",
            payload: { login: "incorrect", loggedInWith: "jwt" },
            isLoggedIn: false,
          })
        }
      })
      .catch(err => console.log(err))
  }
}

export const logoutWithJWT = () => {
  return dispatch => {
    localStorage.setItem("userToken", "");
    localStorage.setItem("userData", "");
    localStorage.setItem("accessToken", "");

    dispatch({ type: "LOGOUT_WITH_JWT", payload: { }, isLoggedIn: false })
    history.push("/login");
    window.location.reload(false);
  }
}

export const changeRole = role => {
  return dispatch => dispatch({ type: "CHANGE_ROLE", userRole: role })
}
