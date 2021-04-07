import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  FormGroup,
  Label,
  Row,
  Col,
} from "reactstrap"
import Select from "react-select";

import { onGetBillingByFilter } from "../../../redux/reducers/filter/filterReducer"


const company = [
    { value: "All", label: "All" },
    { value: "A Vibe Entertainment", label: "A Vibe Entertainment" },
    { value: "Aadmi Consulting", label: "Aadmi Consulting" },
]

export default function BillingFilter(props) {
    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    // const [selectedCompany, setSelectedCompany] = useState("");
    // const [selectedMember, setSelectedMember] = useState("");

    const handleSelectDate = type => e => {
        if (type === "startDate") {
            setStartDate(e.target.value);
            onDispatchFilterData(type, e.target.value);
        } else if (type === "endDate") {
            setEndDate(e.target.value);
            onDispatchFilterData(type, e.target.value);
        }
    }

    const handleSelectFilter = (type) => (items) => {
        if (type === "company") {
            // setSelectedCompany(items);
        } else if (type === "members") {
            // setSelectedMember(items);
        }
    }

    // const convertArrayToString = array => {
    //     let string = "";
    //     for (let i = 0; i < array.length; i++) {
    //         string += array[i].value;
    //         if (i !== array.length - 1) {
    //             string += ","
    //         }
    //     }
    //     return string;
    // }

    const onDispatchFilterData = (type, data) => {
        let payload = {
            startDate: type === "startDate" ? data : startDate,
            endDate: type === "endDate" ? data : startDate,
        }

        dispatch(onGetBillingByFilter(payload));
    }
    
    return (
        <Row>
            <Col lg="4" md="6" sm="12">
                <FormGroup className="mb-0">
                    <Label for="department">Start</Label>
                    <input onChange={handleSelectDate('startDate')} placeholder='dd/mm/yyyy' type="date" className='form-control' value={startDate} name="start_date" required/>
                </FormGroup>
            </Col>
            <Col lg="4" md="6" sm="12">
                <FormGroup className="mb-0">
                    <Label for="department">End</Label>
                    <input onChange={handleSelectDate('endDate')} placeholder='dd/mm/yyyy' type="date" className='form-control' value={endDate} name="end_date" required/>
                </FormGroup>
            </Col>
            <Col lg="4" md="6" sm="12">
                <FormGroup className="mb-0">
                    <Label for="department">company</Label>
                    <Select
                        name="company"
                        options={company}
                        className="React"
                        classNamePrefix="select"
                        onChange={handleSelectFilter("company")}
                    />
                </FormGroup>
            </Col>
            {/* <Col lg="3" md="6" sm="12">
                <FormGroup className="mb-0">
                    <Label for="department">Account</Label>
                    <Select
                        isMulti
                        name="accounts"
                        options={accounts}
                        className="React"
                        classNamePrefix="select"
                        onChange={handleSelectFilter("accounts")}
                    />
                </FormGroup>
            </Col> */}
        </Row>
    )
}