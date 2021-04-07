import React, { useState } from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    CustomInput,
} from "reactstrap";

import { API_HOST } from "../../../utility/AxiosInstance";
import ReportService from "../../../services/ReportService";

export default function ReportFileUploadModal(props) {
    const {openFileUploadModal, onCloseFileUploadModal, selectedRow} = props;

    const [uploadFile, setUploadFile] = useState([]);
    // const [uploadedFilePath, setUploadedFilePath] = useState("");

    const handleUploadFile = (e) => {
        let reader = new FileReader();

        reader.onload = (event) => {
            ReportService.uploadFile({
                base64File: event.target.result
            }).then(result=>{
                console.log(API_HOST + "/uploads/" + result.data.value);
                let filePath = API_HOST + "/uploads/" + result.data.value;
                
                handleUpdateReport(filePath)
            }).catch(error=>{
                console.log(error);
            });
        };
        reader.readAsDataURL(uploadFile);

        onCloseFileUploadModal();
        setUploadFile([]);
        // window.location.reload(false);
    }

    const handleUpdateReport = (filePath) => {
        const payload = {
            report_id: selectedRow.report_id,
            file_path: filePath,
            file_name: uploadFile.name,
        }

        ReportService.update({ updatedReport: payload }).then(response => {
            console.log(response.data);
            window.location.reload(false);
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

    return (
        <Modal
            isOpen={openFileUploadModal}
            toggle={onCloseFileUploadModal}
            className="modal-dialog-centered"
        >
            <ModalHeader toggle={onCloseFileUploadModal}>
                Report
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for="first-Name" className="mb-1">Upload File ( *.pdf )</Label>
                    <CustomInput
                        type="file"
                        id="exampleCustomFileBrowser"
                        name="customFile"
                        onChange={(e) => setUploadFile(e.target.files[0])}
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleUploadFile}>
                    Upload File
                </Button>{" "}
            </ModalFooter>
        </Modal>
    )
}