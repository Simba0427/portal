import React from "react"
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap"
import * as Icon from "react-feather"
import { history } from "../../../history"

const handleNavigation = (e, path) => {
  e.preventDefault()
  history.push(path)
}

const UserDropdown = props => {
  const isAuthenticated = localStorage.getItem("userToken") !== "" ? true : false;

  return (
    <DropdownMenu right>
      <DropdownItem
        tag="a"
        href="#"
        onClick={e => handleNavigation(e, "/account-settings")}
      >
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">Edit Profile</span>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem
        tag="a"
        href="#"
        onClick={e => {
          e.preventDefault()
          if (isAuthenticated) {
            return props.logoutWithJWT()
          }
        }}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Log Out</span>
      </DropdownItem>
    </DropdownMenu>
  )
}

class NavbarUser extends React.PureComponent {

  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {this.props.userName}
              </span>
              <span className="user-status">Available</span>
            </div>
            <span data-tour="user">
              <img
                src={this.props.userImg}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    )
  }
}
export default NavbarUser
