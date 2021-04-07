import React from "react"
import {
    Card,
    CardBody,
    Row,
    Col,
    Button,
    Form,
    Input,
    Label,
    FormGroup,
} from "reactstrap"
import { history } from "../../../history"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import SweetAlert from "sweetalert2";

import UserService from "../../../services/UserService";

class UserAccount extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    }

    componentDidMount() {
        const { first_name, last_name, email, phone } = this.props.location.state;
        
        this.setState({
            firstName: first_name ,
            lastName: last_name ,
            email: email ,
            phone: phone ,
        })
    }

    handleUpdateUser = (e) => {
        e.preventDefault()
        const { firstName, lastName, email, phone } = this.state;
        const { user_id } = this.props.location.state;

        const payload = {
            user_id: user_id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
        }

        UserService.update({ updatedUser: payload }).then(response => {
            console.log(response.data);
            SweetAlert.fire("Updated", "Success");
            history.push("/users/list");
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

    handleResetInfo = () => {
        this.setState({
            firstName: "" ,
            lastName: "" ,
            email: "" ,
            phone: "" ,
        })
    }

    render() {
        const { firstName, lastName, email, phone } = this.state;
        return (
            <div>
                <Breadcrumbs
                    breadCrumbTitle="Edit User"
                    breadCrumbParent="Users"
                    breadCrumbActive="Edit"
                />
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody className="pt-2">
                                <Form onSubmit={e => e.preventDefault()}>
                                    <Row>
                                        <Col md="6" sm="12">
                                            <FormGroup>
                                            <Label for="firstName">First Name</Label>
                                            <Input
                                                type="text"
                                                id="firstName"
                                                placeholder="First Name"
                                                value={firstName}
                                                onChange={(e) => this.setState({firstName: e.target.value})}
                                                required
                                            />
                                            </FormGroup>
                                        </Col>
                                        <Col md="6" sm="12">
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
                                        <Col md="6" sm="12">
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
                                        <Col md="6" sm="12">
                                            <FormGroup>
                                                <Label for="phone">Phone</Label>
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
                                        <Col
                                            className="d-flex justify-content-end flex-wrap mt-2"
                                            sm="12"
                                        >
                                            <Button.Ripple className="mr-1" color="primary" onClick={this.handleUpdateUser}>
                                            Save Changes
                                            </Button.Ripple>
                                            <Button.Ripple color="flat-warning" onClick={this.handleResetInfo}>Reset</Button.Ripple>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default UserAccount
