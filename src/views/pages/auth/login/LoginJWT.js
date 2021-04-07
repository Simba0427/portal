import React from "react"
import { Link } from "react-router-dom"
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Mail, Lock, Check } from "react-feather"
import { loginWithJWT } from "../../../../redux/actions/auth/loginActions"
import { connect } from "react-redux"

class LoginJWT extends React.Component {
  state = {
    email: "",
    password: "",
    remember: false, 
  }

  componentDidMount() {
    localStorage.setItem("userToken", "");
    localStorage.setItem("userData", "");
    localStorage.setItem("accessToken", "");
  }

  handleLogin = e => {
    e.preventDefault()
    this.props.loginWithJWT(this.state)
  }

  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-5">
          <Form action="/" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Mail size={15} />
              </div>
              <Label>Email</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Lock size={15} />
              </div>
              <Label>Password</Label>
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="Remember me"
                defaultChecked={false}
                onChange={this.handleRemember}
              />
              <div className="float-right">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </FormGroup>
            <div className="d-flex justify-content-between">
              {/* <Button.Ripple
                color="primary"
                outline
                onClick={() => {
                  history.push("/register")
                }}
              >
                Register
              </Button.Ripple> */}
              <Button.Ripple color="primary" type="submit">
                Login
              </Button.Ripple>
            </div>
          </Form>
        </CardBody>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  // console.log(state.auth.login)
  return {
    loginValues: state.auth.login
  }
}
export default connect(mapStateToProps, { loginWithJWT })(LoginJWT)
