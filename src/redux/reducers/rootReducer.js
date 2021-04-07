import { combineReducers } from "redux"
import calenderReducer from "./calendar/"
import emailReducer from "./email/"
import chatReducer from "./chat/"
import todoReducer from "./todo/"
import customizer from "./customizer/"
import auth from "./auth/"
import navbar from "./navbar/Index"
import dataList from "./data-list/"
import filterReducer from "./filter/filterReducer"
import officeReducer from "./offices/officeReducer"
import revenueRedux from "./revenue/RevenueRedux"
import reportRedux from "./report/ReportRedux"
import userRedux from "./user/userRedux"

const rootReducer = combineReducers({
  calendar: calenderReducer,
  emailApp: emailReducer,
  todoApp: todoReducer,
  chatApp: chatReducer,
  customizer: customizer,
  auth: auth,
  navbar: navbar,
  dataList: dataList,
  filterReducer: filterReducer,
  officeReducer: officeReducer,
  revenueRedux: revenueRedux,
  reportRedux: reportRedux,
  userRedux: userRedux,
})

export default rootReducer
