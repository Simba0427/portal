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
import ReportService from "../../../services/ReportService"


export default function ReportModalForm(props) {
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

    const handleSelectLocation = (items) => {
        console.log(items);
        if (items) {
            setSelectedLocations(items)
        } else {
            setSelectedLocations([]);
        }
    }

    const handleSubmitReport = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        if (openModalType === "create") {
            const payload = {
                type: formData.get('type'),
                location: selectedLocations.label,
                location_id: selectedLocations.value,
            }

            ReportService.create({ createdReport: payload }).then(response => {
                console.log(response.data);
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
                report_id: selectedRow.report_id,
                type: formData.get('type'),
                location: selectedLocations.label,
                location_id: selectedLocations.value,
            }

            ReportService.update({ updatedReport: payload }).then(response => {
                console.log(response.data);
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

        onInitialData();
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
                {openModalType === "create" ? "Add Report" : "Update Report"}
            </ModalHeader>
            <Form onSubmit={handleSubmitReport}>
                <ModalBody>
                    <FormGroup>
                        <Label for="type">Type:</Label>
                        <Input
                            type="text"
                            id="type"
                            placeholder="Type"
                            name="type"
                            defaultValue={selectedRow !== null ? selectedRow.type : ""}
                            required
                        />
                    </FormGroup>
                    {/* <FormGroup>
                        <Label for="customFile">Upload File ( *.pdf ):</Label>
                        <CustomInput
                            type="file"
                            id="customFileBrowser"
                            name="customFile"
                            required
                        />
                    </FormGroup> */}
                    <FormGroup>
                        <Label for="locations">Locations:</Label>
                        <Select
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
                            {openModalType === "create" ? "Add Report" : "Update Report"}
                        </Button>{" "}
                    </ModalFooter>
                </Form>
        </Modal>
    )
}