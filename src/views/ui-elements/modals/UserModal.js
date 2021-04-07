import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import Select from "react-select";
import { onGetOffices } from "../../../redux/reducers/offices/officeReducer"
import UserService from "../../../services/UserService"


export default function ModalForm(props) {
    const dispatch = useDispatch();
    const {openModal, onCloseModal, openModalType, selectedRow } = props;

    useEffect(() => {
        dispatch(onGetOffices());
    }, [dispatch])

    const resOfficesData = useSelector(state => state.officeReducer.officesData);

    // const [formData, setFormData] = useState(null);
    // const [defaultSelectedLocationValue, setDefaultSelectedLocationValue] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    // const [isMultiSelect, setIsMultiSelect] = useState(true);

    // useEffect(() => {
    //     setFormData(selectedRow);
    // }, [selectedRow])

    const handleSelectLocation = (items) => {
        setSelectedLocations(items)
        // if (items) {
        //     if (!isMultiSelect) {
        //         if (items.value === "") {
        //             setSelectedLocations(resOfficesData[0]);
        //             handleSetMultiSelect(false, resOfficesData[0]);
        //         }
        //         else {
        //             setSelectedLocations(items);
        //             handleSetMultiSelect(true, items);
        //         }
        //     }
        //     else {
        //         for (let i = 0; i < items.length; i++) {
        //             if (items[i].value === "") {
        //                 setSelectedLocations(resOfficesData[0]);
        //                 handleSetMultiSelect(false, resOfficesData[0]);
        //             }
        //             else {
        //                 setSelectedLocations(items);
        //                 handleSetMultiSelect(true, items);
        //             }
        //         }
        //     }
        // } else {
        //     setDefaultSelectedLocationValue([]);
        // }
    }
    // const handleSetMultiSelect = (isMulti, selectedItems) => {
    //     setIsMultiSelect(isMulti);
    //     setDefaultSelectedLocationValue(selectedItems)
    // }
    const handleAddMember = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = selectedLocations.map(selectedLocation => selectedLocation.value);
        const labels = selectedLocations.map(selectedLocation => selectedLocation.label);
        if (openModalType === "create") {
            const payload = {
                first_name: formData.get('firstName'),
                last_name:  formData.get('secondName'),
                email: formData.get('email'),
                password: "portal123",
                user_role: "user",
                locations: labels.join("/"),
                location_id: values.join("/")
            }

            UserService.create(payload).then(response => {
                console.log(response.data);
                onInitialData();
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
        } else if (openModalType === "update") {
            const payload = {
                user_id: selectedRow.user_id,
                first_name: formData.get('firstName'),
                last_name:  formData.get('secondName'),
                email: formData.get('email'),
                locations: labels.join("/"),
                location_id: values.join("/")	
            }

            UserService.update({ updatedUser: payload }).then(response => {
                console.log(response.data);
                onInitialData();
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
    }

    const onInitialData = () => {
        // setFormData(null);
        // setDefaultSelectedLocationValue([]);
        setSelectedLocations([]);
        onCloseModal();
        window.location.reload(false);
    }

    return (
        <Modal
            isOpen={openModal}
            toggle={onCloseModal}
            className="modal-dialog-centered"
        >
            <ModalHeader toggle={onCloseModal}>
                {openModalType === "create" ? "Add Member" : "Update Member"}
            </ModalHeader>
            <Form onSubmit={handleAddMember}>
                <ModalBody>
                    <FormGroup>
                        <Label for="firstName">First Name:</Label>
                        <Input
                            type="text"
                            id="first-name"
                            placeholder="First Name"
                            name="firstName"
                            defaultValue={selectedRow !== null ? selectedRow.first_name : ""}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="secondName">Second Name:</Label>
                        <Input
                            type="text"
                            id="second-name"
                            placeholder="Second Name"
                            name="secondName"
                            defaultValue={selectedRow !== null ? selectedRow.last_name : ""}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email:</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Email Address"
                            name="email"
                            defaultValue={selectedRow !== null ? selectedRow.email : ""}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="locations">Locations:</Label>
                        <Select
                            isMulti
                            value={selectedLocations}
                            // isMulti={isMultiSelect ? true : false}
                            name="locations"
                            options={resOfficesData}
                            className="React"
                            classNamePrefix="select"
                            onChange={handleSelectLocation}
                        />
                    </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary">
                            {openModalType === "create" ? "Add Member" : "Update Member"}
                        </Button>{" "}
                    </ModalFooter>
                </Form>
        </Modal>
    )
}