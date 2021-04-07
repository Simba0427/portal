import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ListView from '../../ui-elements/data-list/ListView'
import Loader from '../../ui-elements/loader/loader';

import { onGetMembershipByFilter } from "../../../redux/reducers/filter/filterReducer"

// const data = [
//     {
//         addOns: [],
//         calculatedDiscountAmount: 0,
//         calculatedStatus: "expired",
//         createdAt: "2020-01-02T15:49:45.439Z",
//         createdBy: "5de60ef738d1d7031802c764",
//         deposit: 0,
//         discountAmount: 0,
//         discountedPrice: 200,
//         endDate: "2020-02-10T00:00:00.000Z",
//         fees: [],
//         intervalCount: 1,
//         intervalLength: "month",
//         invoices: [],
//         isPersonal: false,
//         locked: false,
//         member: "5e0e10f45efad9034762b165",
//         modifiedAt: "2020-02-11T05:02:20.657Z",
//         modifiedBy: "59634800f789d0e140b0c414",
//         move: null,
//         name: "LocalWorks Access",
//         office: "5d1bcda0dbd6e40010479eec",
//         organization: "5de60ed538d1d7031802c1cc",
//         plan: "5d89579baba5fe01524bedcc",
//         price: 200,
//         startDate: "2020-01-01T00:00:00.000Z",
//         status: "approved",
//         type: "month_to_month",
//         _id: "5e0e1119718a66035ef81188",
//     }
// ]

export default function MembershipsComponent(props) {
    const dispatch = useDispatch();

    const columnDefs = [
        {
            headerName: "Name",
            field: "name",
            width: 200,
            filter: true,
            cellRendererFramework: params => {
                const rowData = params.data;
                return (
                    <div className="multi-line-column member-address">
                        <span className="member-name">{rowData.name}</span><br />
                        {/* <span><i className="fa fa-map-marker-alt member-icon" aria-hidden="true"></i>
                            {" " + rowData.officeName}
                        </span>
                        {rowData.phone ? 
                            <span>{" "}<i className="fa fa-phone-alt member-icon" aria-hidden="true"></i>{rowData.phone}</span> : null
                        } */}
                        <span className="member-email-icon">{" "}<i className="fa fa-envelope member-icon" aria-hidden="true"></i></span>
                    </div>
                )
            }
        },
        {
            headerName: "Member",
            field: "memberName",
            width: 200,
            filter: true,
        },
        {
            headerName: "Start Date",
            field: "startDate",
            width: 200,
            filter: true,
            cellRendererFramework: params => {
                const rowData = params.data;
                return (
                    <div>{moment(rowData.startDate).format('MMM DD YYYY, h:mm:ss a')}</div>
                )
            }
        },
        {
            headerName: "End Date",
            field: "endDate",
            width: 200,
            filter: true,
            cellRendererFramework: params => {
                const rowData = params.data;
                return (
                    <div>{moment(rowData.endDate).format('MMM DD YYYY, h:mm:ss a')}</div>
                )
            }
        },
        {
            headerName: "Discounted Amounts",
            field: "discountAmount",
            width: 200,
            filter: true,
        },
        {
            headerName: "Total Amounts",
            field: "calculatedDiscountAmount",
            width: 200,
            filter: true,
        },
        {
            headerName: "Status",
            field: "status",
            filter: true,
            width: 150,
            cellRendererFramework: params => {
                const rowData = params.data;
                return (
                    <>
                    {rowData.calculatedStatus === "active" ?
                        <div className="badge badge-pill badge-success-green">
                            {rowData.calculatedStatus}
                        </div> :
                        <div className="badge badge-pill badge-warning-grey">
                            {rowData.calculatedStatus}
                        </div>
                    }
                    </>
                )
            }
        },
        {
            headerName: "Created At",
            field: "createdAt",
            filter: true,
            width: 200,
            cellRendererFramework: params => {
                const data = params.data;
                return (
                    <div>{moment(data.createdAt).format('MMM DD YYYY, h:mm:ss a')}</div>
                )
            }
        },
    ];
    
    const resCurrentOfficeId = useSelector(state => state.officeReducer.currentOffice);
    let resMembershipData = useSelector(state => state.filterReducer.membershipData);
    const isFetchData = useSelector(state => state.filterReducer.isFetchData);

    useEffect(() => {
        const { location_id } = localStorage.getItem("userToken") !== "" ? JSON.parse(localStorage.getItem("userData")) : {};
        let payload = {
            startDate: "",
            endDate: "",
            plans: "",
            accounts: "",
            planTypes: "",
            officeId: resCurrentOfficeId ? resCurrentOfficeId : location_id,
        }
        dispatch(onGetMembershipByFilter(payload));
    }, [dispatch, resCurrentOfficeId])

    return (
        <div>
            {!isFetchData && (<Loader /> )}
            {isFetchData && (
                <>
                    <Breadcrumbs
                        breadCrumbTitle="Memberships"
                        breadCrumbParent="Page"
                        breadCrumbActive="Memberships"
                    />
                    <ListView 
                        rowData={resMembershipData}
                        columnDefs={columnDefs}
                        menu="Memberships"
                        isAddButton={false}
                        isFilter={true}
                    />
                </>
            )}
        </div>
    )
}