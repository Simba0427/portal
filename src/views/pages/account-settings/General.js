import React from "react"
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col
} from "reactstrap"
import SweetAlert from "sweetalert2";

import UserService from "../../../services/UserService";

class General extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    visible: true
  }

  componentDidMount() {
    const { first_name, last_name, email, phone } = JSON.parse(localStorage.getItem("userData"));
    
    this.setState({
        firstName: first_name ,
        lastName: last_name ,
        email: email ,
        phone: phone ? phone : "" ,
    })
  }

  handleUpdateUser = (e) => {
    e.preventDefault()
    const { firstName, lastName, email, phone } = this.state;
    const { user_id } = JSON.parse(localStorage.getItem("userData"));

    const payload = {
        user_id: user_id,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
    }

    UserService.update({ updatedUser: payload }).then(response => {
      SweetAlert.fire("Your account was Updated", "Success");

    })
    .catch(error => {
        if (error.response) {
            console.log("ERROR ", error.response.data);
        } else if (error.request) {
            console.log("ERROR ", error.request);
        } else {
            console.log("Bad Request");
        }
    });
  }

  dismissAlert = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { firstName, lastName, email, phone } = this.state;
    return (
      <React.Fragment>
        <Form className="mt-2" onSubmit={e => e.preventDefault()}>
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input id="firstName" placeholder="First Name" value={firstName} onChange={(e) => this.setState({firstName: e.target.value})} required/>
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="username">Last Name</Label>
                <Input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => this.setState({lastName: e.target.value})}
                    required
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                    type="text"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => this.setState({email: e.target.value})}
                    required
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="phone">Phone Number</Label>
                <Input
                    type="text"
                    id="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => this.setState({phone: e.target.value})}
                    required
                />
              </FormGroup>
            </Col>
            <Col className="d-flex justify-content-start flex-wrap" sm="12">
              <Button.Ripple className="mr-50" type="submit" color="primary" onClick={this.handleUpdateUser}>
                Save Changes
              </Button.Ripple>
              <Button.Ripple type="submit" color="danger">
                Cancel
              </Button.Ripple>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    )
  }
}
export default General
