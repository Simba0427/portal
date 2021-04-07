import React from "react"
import * as Icon from "react-feather"

const currentUser = localStorage.getItem("userToken") !== "" ? JSON.parse(localStorage.getItem("userData")) : null;
const userRole = currentUser ? currentUser.user_role : null;

const navigationConfig = [
  {
    type: "location",
    groupTitle: "Location : ",
  },
  // {
  //   id: "dashboard",
  //   title: "Dashboard",
  //   type: "item",
  //   icon: <Icon.Home size={20} />,
  //   permissions: ["admin"],
  //   navLink: "/",
  // },
  {
    id: "members",
    title: "Active Members",
    type: "item",
    icon: <Icon.User size={20} />,
    permissions: ["admin"],
    navLink: "/active-members"
  },
  // {
  //   id: "companies",
  //   title: "Companies",
  //   type: "item",
  //   icon: <Icon.CheckSquare size={20} />,
  //   permissions: ["admin"],
  //   navLink: "/companies",
  // },
  // {
  //   id: "memberships",
  //   title: "Memberships",
  //   type: "item",
  //   icon: <Icon.CheckSquare size={20} />,
  //   permissions: ["admin"],
  //   navLink: "/memberships",
  // },
  // {
  //   id: "revenue",
  //   title: "Revenue",
  //   type: "item",
  //   icon: <Icon.CheckSquare size={20} />,
  //   permissions: ["admin"],
  //   navLink: "/revenue",
  // },
  // {
  //   id: "billing",
  //   title: "Billing",
  //   type: "item",
  //   icon: <Icon.CheckSquare size={20} />,
  //   permissions: ["admin"],
  //   navLink: "/billing",
  // },
  {
    id: "reports",
    title: "Reports",
    type: "item",
    icon: <Icon.Calendar size={20} />,
    permissions: ["admin"],
    navLink: "/reports"
  },
  { 
    id: "userList",
    title: "Users",
    type: userRole === "admin" ? "item" : "",
    icon: <Icon.User size={20} />,
    permissions: ["admin"],
    navLink: "/users/list"
  }, 
  {
    id: "accountSettings",
    title: "Account Settings",
    type: "item",
    icon: <Icon.Settings size={20} />,
    permissions: ["admin"],
    navLink: "/account-settings"
  },
]

export default navigationConfig
