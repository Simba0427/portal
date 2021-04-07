import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ListView from '../../ui-elements/data-list/ListView'

import { onGetReportForRevenueByFilter } from "../../../redux/reducers/revenue/RevenueRedux"

const resRevenueDetailsData = 
    {
        months: ["2020-12-01T00:00:00.000Z", "2021-01-01T00:00:00.000Z", "2021-02-01T00:00:00.000Z", "2021-03-01T00:00:00.000Z", "2021-04-01T00:00:00.000Z", "2021-05-01T00:00:00.000Z"],
        offices: [
            { _id: "5f5fcd51d4a59500a7cea785", name: "Alexandria, VA" }
        ],
        totalFeesByAccount: [
            { account: "One-off Fees", total: 100 },
            {},
            {},
            {},
            {},
            {}
        ],
        totalMembershipsByAccount: [
            [
                {account: "Membership Fees", total: 5135},
            ],
            [
                {account: "Membership Fees", total: 5730},
            ],
            [
                {account: "Membership Fees", total: 5730},
            ],
            [
                {account: "Membership Fees", total: 5730},
            ],
            [
                {account: "Membership Fees", total: 5730},
            ],
            [
                {account: "Membership Fees", total: 5730},
            ]
        ]
    }

const resRevenueRowsData = [
    {
        accounts: [
            { account: "Membership Fees", total: 625 },
            { account: "Membership Fees", total: 625 },
            { account: "Membership Fees", total: 625 },
            { account: "Membership Fees", total: 625 },
            { account: "Membership Fees", total: 625 },
            { account: "Membership Fees", total: 625 },
        ],
        customer: {
            calculatedStatus: "active",
            isTeam: true,
            name: "Symposit LLC",
            _id: "5f6e13a547eba20011c6d284",
        },
        total: [625, 625, 625, 625, 625, 625],
    },
    {
        accounts: [
            {account: "Membership Fees", total: 2145,},
            {account: "Membership Fees", total: 2145,},
            {account: "Membership Fees", total: 2145,},
            {account: "Membership Fees", total: 2145,},
            {account: "Membership Fees", total: 2145,},
            {account: "Membership Fees", total: 2145,},
            {account: "Membership Fees", total: 2145,},
        ],
        customer: {
            calculatedStatus: "active",
            isTeam: true,
            name: "Long & Foster",
            _id: "5fc661fa180a1f0683576e16",
        },
        total: [2145, 2145, 2145, 2145, 2145, 2145],
    },
]

export default function MembersComponent(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        let payload = {
            startDate: "",
            endDate: "",
            accounts: "",
        }
        dispatch(onGetReportForRevenueByFilter(payload));
    }, [])

    let resRevenueReportDetails = useSelector(state => state.revenueRedux.revenueReportDetails);
    let resRevenueReportRows = useSelector(state => state.revenueRedux.revenueReportRows);

    let [columnDefs, setColumDefs] = useState([]);

    useEffect(() => {
        if (resRevenueReportDetails.length !== 0) {
            let columnDefsData = [
                {
                    headerName: "Name",
                    field: "customer",
                    filter: true,
                    width: 300,
                    cellRendererFramework: params => {
                        const rowData = params.data;
                        return (
                            <div>
                                <b>{rowData.customer.name + " "}</b>
                                {rowData.customer.calculatedStatus === "active" ? 
                                    <div className="badge badge-pill badge-success-green">
                                        {rowData.customer.calculatedStatus}
                                    </div> : 
                                    <div className="badge badge-pill badge-warning-grey">
                                        {rowData.customer.calculatedStatus}
                                    </div>
                                }
                            </div>
                        )
                    }
                }
            ];
            const revenueMonths = resRevenueReportDetails.months;
            for (let i=0; i < revenueMonths.length; i++) {
                let column = {
                    headerName: onConvertDateToMonth(revenueMonths[i]),
                    field: onConvertDateToMonth(revenueMonths[i]),
                    filter: true,
                    width: 150,
                    cellRendererFramework: params => {
                        const rowData = params.data;
                        return (
                            <div>${rowData.total[i]}</div>
                        )
                    }
                }
                columnDefsData = [...columnDefsData, column];
            }
            // console.log(columnDefsData)
            setColumDefs(columnDefsData);
        }
    }, [])

    const onConvertDateToMonth = (dateTime) => {
        let monthArray = new Array();
        monthArray[0] = "January";
        monthArray[1] = "February";
        monthArray[2] = "March";
        monthArray[3] = "April";
        monthArray[4] = "May";
        monthArray[5] = "June";
        monthArray[6] = "July";
        monthArray[7] = "August";
        monthArray[8] = "September";
        monthArray[9] = "October";
        monthArray[10] = "November";
        monthArray[11] = "December";

        const chooseDate = new Date(dateTime);
        const month = monthArray[chooseDate.getMonth()];
        
        return month;
    };

    return (
        <div>
            <Breadcrumbs
                breadCrumbTitle="Revenue"
                breadCrumbParent="Page"
                breadCrumbActive="Revenue"
            />
            <ListView 
                rowData={resRevenueReportRows}
                columnDefs={columnDefs}
                menu="Revenue"
                isFilter={true}
            />
        </div>
    )
}