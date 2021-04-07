import * as firebase from "firebase/app"
import { history } from "../../../history"
import "firebase/auth"
import "firebase/database"
import { config } from "../../../authServices/firebase/firebaseConfig"
import http from "../../../utility/AxiosInstance"

// Init firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

let firebaseAuth = firebase.auth()

export const signupWithFirebase = (email, password, name) => {
  return dispatch => {
    let userEmail = null,
      loggedIn = false

    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        firebaseAuth.onAuthStateChanged(user => {
          result.user.updateProfile({
            displayName: name
          })
          if (user) {
            userEmail = user.email
            loggedIn = true
            dispatch({
              type: "SIGNUP_WITH_EMAIL",
              payload: {
                email: userEmail,
                name,
                isSignedIn: loggedIn
              }
            })
            dispatch({
              type: "LOGIN_WITH_EMAIL",
              payload: {
                email: userEmail,
                name
              }
            })
          }
        })
        history.push("/")
      })
      .catch(error => {
        console.log(error.message)
      })
  }
}

export const signupWithJWT = (firstName, lastName, email, password, phone) => {
  return dispatch => {
    http.post("/register", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        phone: phone,
        user_role: "user"
      })
      .then(response => {
        var loggedInUser

        if(response.data){
          loggedInUser = response.data.user

          dispatch({
            type: "LOGIN_WITH_JWT",
            payload: { loggedInUser, loggedInWith: "jwt" }
          })

          history.push("/login")
        }
      })
      .catch(err => console.log(err))
  }
}
