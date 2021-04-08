import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Button,
  Label
} from "reactstrap"
import fgImg from "../../../assets/img/logo/logo-main.png"
import { history } from "../../../history"
import "../../../assets/scss/pages/authentication.scss"

import SweetAlert from "sweetalert2";

import UserService from "../../../services/UserService";

class ForgotPassword extends React.Component {

  handleChangePassword = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)

    const param = {
      email: formData.get('email'),
      newPwd: "12345678",
    }

    UserService.recoverPassword(param).then(response => {
      if (response.data.state) {
        SweetAlert.fire("Updated", "Success");
      } else {
        SweetAlert.fire("Error", "Incorrect your old password","error");
      }
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

  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center"
              >
                <img src={fgImg} alt="fgImg" className="login-logo-image" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 py-1">
                  <CardHeader className="pb-1">
                    <CardTitle>
                      <h4 className="mb-0">Recover your password</h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title">
                    Please enter your email address and we'll send you
                    instructions on how to reset your password.
                  </p>
                  <CardBody className="pt-1 pb-0">
                    <Form onSubmit={this.handleChangePassword}>
                      <FormGroup className="form-label-group">
                        <Input type="text" placeholder="Email" id = "email" name = "email" required />
                        <Label>Email</Label>
                      </FormGroup>
                      <div className="float-md-left d-block mb-1">
                        <Button.Ripple
                          color="primary"
                          outline
                          className="px-75 btn-block"
                          onClick={() => history.push("/login")}
                        >
                          Back to Login
                        </Button.Ripple>
                      </div>
                      <div className="float-md-right d-block mb-1">
                        <Button.Ripple
                          color="primary"
                          type="submit"
                          className="px-75 btn-block"
                          // onClick={e => {
                          //   e.preventDefault()
                          //   history.push("/login")
                          // }}
                        >
                          Recover Password
                        </Button.Ripple>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default ForgotPassword
