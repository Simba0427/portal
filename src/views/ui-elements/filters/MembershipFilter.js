import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  FormGroup,
  Label,
  Row,
  Col,
  Input
} from "reactstrap"
// import Flatpickr from "react-flatpickr";
import Select from "react-select";

import { onGetPlans, onGetAccounts, onGetPlanTypes, onGetMembershipByFilter } from "../../../redux/reducers/filter/filterReducer"


export default function MembershipFilter(props) {
    const dispatch = useDispatch();

    const resCurrentOfficeId = useSelector(state => state.officeReducer.currentOffice);
    const resPlanData = useSelector(state => state.filterReducer.plansData);
    const resPlanTypesData = useSelector(state => state.filterReducer.planTypesData);
    const resAccountData = useSelector(state => state.filterReducer.accountsData);

    useEffect(() => {
        dispatch(onGetPlans());
        dispatch(onGetAccounts());
        dispatch(onGetPlanTypes());
    }, [dispatch])

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedPlans, setSelectedPlans] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [selectedPlanTypes, setSelectedPlanTypes] = useState([]);
    const [stringPlans, setStringPlans] = useState("");
    const [stringAccounts, setStringAccounts] = useState("");
    const [stringPlanTypes, setStringPlanTypes] = useState("");

    // const onConvertSelectArray = (resData) => {
    //     let rowData = [];
    //     for (let i = 0; i < resData.length; i++) {
    //         let payload = {
    //             value: resData[i]._id,
    //             label: resData[i].name,
    //         }
    //         rowData = [...rowData, payload];
    //     }
    //     return rowData;
    // }

    const handleSelectDate = type => e => {
        if (type === "startDate") {
            setStartDate(onConvertSelectDate(type, e.target.value));
            onDispatchFilterData(type, onConvertSelectDate(type, e.target.value));
        } else if (type === "endDate") {
            setEndDate(onConvertSelectDate(type, e.target.value));
            onDispatchFilterData(type, onConvertSelectDate(type, e.target.value));
        }
    }

    const onConvertSelectDate = (type, date) => {
        const dateArr = date.split("-");

        if (type === "startDate")
            return dateArr[0] + "-" + dateArr[1] + "-01";
        else {
            if (dateArr[1] === "01" || dateArr[1] === "03" || dateArr[1] === "05" || dateArr[1] === "07" || dateArr[1] === "08" || dateArr[1] === "10" || dateArr[1] === "12")
                return dateArr[0] + "-" + dateArr[1] + "-31";
            else if (dateArr[1] === "04" || dateArr[1] === "05" || dateArr[1] === "06" || dateArr[1] === "09" || dateArr[1] === "11")
                return dateArr[0] + "-" + dateArr[1] + "-30";
            else 
                return dateArr[0] + "-" + dateArr[1] + "-29";
        }
    }

    const handleSelectFilter = type => items => {
        if (type === "plans") {
            setSelectedPlans(items);
            setStringPlans(convertArrayToString(items));
            onDispatchFilterData(type, convertArrayToString(items));
        } else if (type === "accounts") {
            setSelectedAccounts(items);
            setStringAccounts(convertArrayToString(items));
            onDispatchFilterData(type, convertArrayToString(items));
        } else if (type === "planTypes") {
            setSelectedPlanTypes(items);
            setStringPlanTypes(convertArrayToString(items));
            onDispatchFilterData(type, convertArrayToString(items));
        }
    }

    const convertArrayToString = array => {
        let string = "";
        for (let i = 0; i < array.length; i++) {
            string += array[i].value;
            if (i !== array.length - 1) {
                string += ","
            }
        }
        return string;
    }

    const onDispatchFilterData = (type, data) => {
        const { location_id } = localStorage.getItem("userToken") !== "" ? JSON.parse(localStorage.getItem("userData")) : {};

        let payload = {
            startDate: type === "startDate" ? data : startDate,
            endDate: type === "endDate" ? data : endDate,
            plans: type === "plans" ? data : stringPlans,
            accounts: type === "accounts" ? data : stringAccounts,
            planTypes: type === "planTypes" ? data : stringPlanTypes,
            officeId: resCurrentOfficeId ? resCurrentOfficeId : location_id,
        }

        dispatch(onGetMembershipByFilter(payload));
    }
    
    return (
        <Row>
            <Col lg="2" md="6" sm="12">
                <FormGroup className="mb-0">
                    <Label for="department">Start</Label>
                    {/* <Flatpickr
                        className="form-control"
                        value={startDate}
                        options={{ altInput: true, altFormat: "F, Y", dateFormat: "Y-m-d", }}
                        onChange={date => {
                            setStartDate(date);
                        }}
                    /> */}
                    <Input onChange={handleSelectDate('startDate')} placeholder='dd/mm/yyyy' type="date" className='form-control' value={startDate} name="start_date" required/>
                </FormGroup>
            </Col>
            <Col lg="2" md="6" sm="12">
                <FormGroup className="mb-0">
                    <Label for="department">End</Label>
                    <Input onChange={handleSelectDate('endDate')} placeholder='dd/mm/yyyy' type="date" className='form-control' value={endDate} name="end_date" required/>
                </FormGroup>
            </Col>
            <Col lg="2" md="6" sm="12">
                <FormGroup className="mb-0">
                    <Label for="department">Plan</Label>
                    <Select
                        isMulti
                        name="plans"
                        options={resPlanData}
                        className="React"
                        classNamePrefix="select"
                        value={selectedPlans}
                        onChange={handleSelectFilter("plans")}
                    />
                </FormGroup>
            </Col>
            <Col lg="2" md="6" sm="12">
                <FormGroup className="mb-0">
                    <Label for="department">Account</Label>
                    <Select
                        isMulti
                        name="accounts"
                        options={resAccountData}
                        className="React"
                        classNamePrefix="select"
                        value={selectedAccounts}
                        onChange={handleSelectFilter("accounts")}
                    />
                </FormGroup>
            </Col>
            <Col lg="2" md="6" sm="12">
                <FormGroup className="mb-0">
                    <Label for="department">Plan Type</Label>
                    <Select
                        isMulti
                        name="planTypes"
                        options={resPlanTypesData}
                        className="React"
                        classNamePrefix="select"
                        value={selectedPlanTypes}
                        onChange={handleSelectFilter("planTypes")}
                    />
                </FormGroup>
            </Col>
        </Row>

    )
}