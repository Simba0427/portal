import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ListView from '../../ui-elements/data-list/ListView'
import Loader from '../../ui-elements/loader/loader';

import { onGetRevenueByFilter } from "../../../redux/reducers/revenue/RevenueRedux"

// const resRevenueDetailsData = [
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
//         modifiedAt: "2021-01-09T07:15:23.651Z",
//         move: null,
//         name: "LocalWorks Access",
//         office: "5d1bcda0dbd6e40010479eec",
//         organization: "5de60ed538d1d7031802c1cc",
//         plan: "5ff9580b45b4815a30f187a4",
//         price: 200,
//         startDate: "2020-01-01T00:00:00.000Z",
//         status: "approved",
//         type: "month_to_month",
//         _id: "5e0e1119718a66035ef81188",
//     }
// ]

export default function MembersComponent(props) {
    const dispatch = useDispatch();

    const columnDefs = [
        {
            headerName: "Name",
            field: "name",
            width: 250,
            filter: true,
        },
        {
            headerName: "Type",
            field: "type",
            filter: true,
            width: 200,
        },
        {
            headerName: "Price",
            field: "price",
            filter: true,
            width: 200,
        },
        {
            headerName: "DiscountAmount",
            field: "discountAmount",
            filter: true,
            width: 200,
        },
        {
            headerName: "DiscountedPrice",
            field: "discountedPrice",
            filter: true,
            width: 200,
        },
        {
            headerName: "Status",
            field: "status",
            filter: true,
            width: 200,
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
    const resRevenueData = useSelector(state => state.revenueRedux.revenueData);
    const isFetchData = useSelector(state => state.revenueRedux.isFetchData);

    useEffect(() => {
        const { location_id } = localStorage.getItem("userToken") !== "" ? JSON.parse(localStorage.getItem("userData")) : {};
        let payload = {
            startDate: "",
            endDate: "",
            accounts: "",
            officeId: resCurrentOfficeId ? resCurrentOfficeId : location_id,
        }
        dispatch(onGetRevenueByFilter(payload));
    }, [dispatch])

    return (
        <div>
            {!isFetchData && (<Loader /> )}
            {isFetchData && (
                <>
                    <Breadcrumbs
                        breadCrumbTitle="Revenue"
                        breadCrumbParent="Page"
                        breadCrumbActive="Revenue"
                    />
                    <ListView 
                        rowData={resRevenueData}
                        columnDefs={columnDefs}
                        menu="Revenue"
                        isFilter={true}
                    />
                </>
            )}
        </div>
    )
}