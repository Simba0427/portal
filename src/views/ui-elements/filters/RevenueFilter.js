import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  FormGroup,
  Label,
  Row,
  Col,
  Input,
} from "reactstrap"
// import Flatpickr from "react-flatpickr";
import Select from "react-select";

import MembershipService from '../../../services/MembershipService';
import { logoutWithJWT } from "../../../redux/actions/auth/loginActions"
import { onGetRevenueByFilter } from "../../../redux/reducers/revenue/RevenueRedux"

export default function MembershipFilter(props) {
    const dispatch = useDispatch();

    const resCurrentOfficeId = useSelector(state => state.officeReducer.currentOffice);

    const [accountsData, setAccountsData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    // const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [stringAccounts, setStringAccounts] = useState("");

    useEffect(() => {
        // get accounts from officernd api
        MembershipService.getAccounts().then(response => {
            let rowData = [];
            if (response.data.status === 200) {
                let resData = response.data.result;
                rowData = onConvertSelectArray(resData)
            } else if (response.data.status === 401) {
                dispatch(logoutWithJWT());
            }
            setAccountsData(rowData);
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
    }, [dispatch]);

    const onConvertSelectArray = (resData) => {
        let rowData = [];
        for (let i = 0; i < resData.length; i++) {
            let payload = {
                value: resData[i]._id,
                label: resData[i].name,
            }
            rowData = [...rowData, payload];
        }
        return rowData;
    }

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

    const handleSelectFilter = (type) => (items) => {
        if (type === "accounts") {
            // setSelectedAccounts(items);
            setStringAccounts(convertArrayToString(items));
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
            accounts: type === "accounts" ? data : stringAccounts,
            officeId: resCurrentOfficeId ? resCurrentOfficeId : location_id,
        }

        dispatch(onGetRevenueByFilter(payload));
    }
    
    return (
        <Row>
            <Col lg="3" md="6" sm="12">
                <FormGroup className="mb-0">
                    <Label for="department">Start</Label>
                    <Input 
                        placeholder='dd/mm/yyyy' 
                        type="date" 
                        className='form-control' 
                        value={startDate} 
                        name="start_date" 
                        onChange={handleSelectDate('startDate')} 
                        required/>
                </FormGroup>
            </Col>
            <Col lg="3" md="6" sm="12">
                <FormGroup className="mb-0">
                    <Label for="department">End</Label>
                    <Input 
                        placeholder='dd/mm/yyyy' 
                        type="date" 
                        className='form-control' 
                        value={endDate} 
                        name="end_date" 
                        onChange={handleSelectDate("endDate")}
                        required/>
                </FormGroup>
            </Col>
            <Col lg="3" md="6" sm="12">
                <FormGroup className="mb-0">
                    <Label for="department">Account</Label>
                    <Select
                        isMulti
                        name="accounts"
                        options={accountsData}
                        className="React"
                        classNamePrefix="select"
                        onChange={handleSelectFilter("accounts")}
                    />
                </FormGroup>
            </Col>
        </Row>

    )
}