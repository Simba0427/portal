import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ListView from '../../ui-elements/data-list/ListView'
import { onGetMembershipByFilter } from "../../../redux/reducers/filter/filterReducer"

const data = [
    {
        addOns: [],
        calculatedDiscountAmount: 0,
        calculatedStatus: "expired",
        createdAt: "2020-01-02T15:49:45.439Z",
        createdBy: "5de60ef738d1d7031802c764",
        deposit: 0,
        discountAmount: 0,
        discountedPrice: 200,
        endDate: "2020-02-10T00:00:00.000Z",
        fees: [],
        intervalCount: 1,
        intervalLength: "month",
        invoices: [],
        isPersonal: false,
        locked: false,
        member: "5e0e10f45efad9034762b165",
        modifiedAt: "2020-02-11T05:02:20.657Z",
        modifiedBy: "59634800f789d0e140b0c414",
        move: null,
        name: "LocalWorks Access",
        office: "5d1bcda0dbd6e40010479eec",
        organization: "5de60ed538d1d7031802c1cc",
        plan: "5d89579baba5fe01524bedcc",
        price: 200,
        startDate: "2020-01-01T00:00:00.000Z",
        status: "approved",
        type: "month_to_month",
        _id: "5e0e1119718a66035ef81188",
    }
]

export default function MembershipsComponent(props) {
    const dispatch = useDispatch();

    const columnDefs = [
        {
            headerName: "Month",
            field: "month",
            width: 150,
            filter: true,
        },
        {
            headerName: "New Memberships",
            field: "newMemberships",
            width: 200,
            filter: true,
        },
        {
            headerName: "Terminated Memberships",
            field: "terminatedMemberships",
            width: 200,
            filter: true,
        },
        {
            headerName: "Active Memberships",
            field: "activeMemberships",
            width: 200,
            filter: true,
        },
        {
            headerName: "Net New/Churned Memberships",
            field: "netNewChernedMemberships",
            width: 200,
            filter: true,
        },
        {
            headerName: "New Revenue",
            field: "newRevenue",
            width: 200,
            filter: true,
            cellRendererFramework: params => {
                const memberData = params.data;
                return (
                    <div>{"$" + memberData.newRevenue}</div>
                )
            }
        },
        {
            headerName: "Lost Revenue",
            field: "lostRevenue",
            width: 200,
            filter: true,
            cellRendererFramework: params => {
                const memberData = params.data;
                return (
                    <div>{"-$" + memberData.lostRevenue}</div>
                )
            }
        },
        {
            headerName: "Total Membership Revenue",
            field: "totalRevenue",
            width: 200,
            filter: true,
            cellRendererFramework: params => {
                const memberData = params.data;
                return (
                    <div>{"$" + memberData.totalRevenue}</div>
                )
            }
        },
        {
            headerName: "Net New/Lost Revenue",
            field: "netRevenue",
            width: 200,
            filter: true,
            cellRendererFramework: params => {
                const memberData = params.data;
                return (
                    <div>{"$" + memberData.netRevenue}</div>
                )
            }
        },
        {
            headerName: "% New/Lost vs Previous Month",
            field: "netRevenueGainPercent",
            width: 200,
            filter: true,
            cellRendererFramework: params => {
                const memberData = params.data;
                return (
                    <div>{memberData.netRevenueGainPercent === null ? " --- " : memberData.netRevenueGainPercent + "%"}</div>
                )
            }
        },
        {
            headerName: "Discounted Memberships",
            field: "discountedMemberships",
            width: 200,
            filter: true,
        },
        {
            headerName: "Total Discounts",
            field: "totalDiscount",
            width: 200,
            filter: true,
            cellRendererFramework: params => {
                const memberData = params.data;
                return (
                    <div>{"$" + memberData.totalDiscount}</div>
                )
            }
        },
    ];
    
    const resCurrentOfficeId = useSelector(state => state.officeReducer.currentOffice);
    let resMembershipData = useSelector(state => state.filterReducer.membershipData);

    useEffect(() => {
        const { location_id } = localStorage.getItem("userToken") !== "" ? JSON.parse(localStorage.getItem("userData")) : {};
        let payload = {
            startDate: "",
            endDate: "",
            plans: "",
            accounts: "",
            planTypes: "",
            office: resCurrentOfficeId ? resCurrentOfficeId : location_id,
        }
        dispatch(onGetMembershipByFilter(payload));
    }, [])

    return (
        <div>
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
        </div>
    )
}