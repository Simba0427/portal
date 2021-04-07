import React from "react"
import { Form, FormGroup, Input, Label, Button } from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"
import { connect } from "react-redux"
import { signupWithJWT } from "../../../../redux/actions/auth/registerActions"
import { history } from "../../../../history"

class RegisterJWT extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
    phone: "",
  }

  handleRegister = e => {
    e.preventDefault()

    if (this.state.password !== this.state.confirmPass) {
      this.setState({
        password: "",
        confirmPass: "",
      })
    } else {
      this.props.signupWithJWT(
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.password,
        this.state.phone,
      )
    }
  }

  render() {
    return (
      <Form action="/" onSubmit={this.handleRegister}>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="First Name"
            required
            value={this.state.firstName}
            onChange={e => this.setState({ firstName: e.target.value })}
          />
          <Label>First Name</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Last Name"
            required
            value={this.state.lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
          />
          <Label>Last Name</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="email"
            placeholder="Email"
            required
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Label>Email</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Password"
            required
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Label>Password</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Confirm Password"
            required
            value={this.state.confirmPass}
            onChange={e => this.setState({ confirmPass: e.target.value })}
          />
          <Label>Confirm Password</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="number"
            placeholder="Phone Number"
            required
            value={this.state.phone}
            onChange={e => this.setState({ phone: e.target.value })}
          />
          <Label>Phone</Label>
        </FormGroup>
        <FormGroup>
          <Checkbox
            color="primary"
            icon={<Check className="vx-icon" size={16} />}
            label=" I accept the terms & conditions."
            defaultChecked={true}
          />
        </FormGroup>
        <div className="d-flex justify-content-between">
          <Button.Ripple
            color="primary"
            outline
            onClick={() => {
              history.push("/login")
            }}
          >
            Login
          </Button.Ripple>
          <Button.Ripple color="primary" type="submit">
            Register
          </Button.Ripple>
        </div>
      </Form>
    )
  }
}
const mapStateToProps = state => {
  return {
    values: state.auth.register
  }
}
export default connect(mapStateToProps, { signupWithJWT })(RegisterJWT)
