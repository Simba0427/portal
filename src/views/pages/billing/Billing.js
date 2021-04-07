import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ListView from '../../ui-elements/data-list/ListView'
import Loader from '../../ui-elements/loader/loader';

import { onGetBillingByFilter } from "../../../redux/reducers/filter/filterReducer"

// const data = [
//     {
//         allocatedAmount: 0,
//         allocations: [],
//         amount: 200,
//         baseTotal: 200,
//         billingDetails: "5e6bb96a9a43140010b5f4fb",
//         canDelete: false,
//         canEdit: false,
//         canVoid: false,
//         charges: [
//             {
//                 account: "5d1bcda0dbd6e40010479ed7",
//                 addOns: [],
//                 description: "LocalWorks Access, Jan 1, 2020 - Jan 31, 2020",
//                 discount: 0,
//                 endDate: "2020-02-01T00:00:00.000Z",
//                 membership: "5e0e1119718a66035ef81188",
//                 office: "5d1bcda0dbd6e40010479eec",
//                 plan: "5d89579baba5fe01524bedcc",
//                 quantity: 1,
//                 startDate: "2020-01-01T00:00:00.000Z",
//                 taxRate: "5d1bcda0dbd6e40010479ee4",
//                 unitPrice: 200,
//                 vatPercent: 0,
//             }
//         ],
//         createdAt: "2020-01-02T15:50:20.416Z",
//         createdBy: "5de60ef738d1d7031802c764",
//         date: "2020-01-01T00:00:00.000Z",
//         discount: 0,
//         discountAmount: 0,
//         documentType: "invoice",
//         dueDate: "2020-01-06T00:00:00.000Z",
//         invoiceLines: [
//             {
//                 account: "Stripe Card",
//                 amount: 200,
//                 createdAt: "2020-01-05T23:28:25.942Z",
//                 createdBy: "5e0e116e718a66035ef828ab",
//                 currency: "USD",
//                 date: "2020-01-05T23:28:28.287Z",
//                 integration: {providerChargeId: "ch_1FxiWEArkK3MN4jAvN5r96OK"},
//                 modifiedAt: "2020-01-05T23:28:25.942Z",
//                 modifiedBy: "5e0e116e718a66035ef828ab",
//                 reference: "**** **** **** 9127 (MasterCard)",
//                 source: "OfficeR&D",
//                 status: "success",
//                 _id: "5e1271198e55c305e8080e15",
//             }
//         ],
//         isFailed: false,
//         isOverdue: false,
//         isPaid: true,
//         isPersonal: false,
//         isSent: true,
//         lines: [
//             {
//                 account: "5d1bcda0dbd6e40010479ed7",
//                 addOns: [],
//                 description: "LocalWorks Access, Jan 1, 2020 - Jan 31, 2020",
//                 discount: 0,
//                 endDate: "2020-02-01T00:00:00.000Z",
//                 membership: "5e0e1119718a66035ef81188",
//                 office: "5d1bcda0dbd6e40010479eec",
//                 plan: "5d89579baba5fe01524bedcc",
//                 quantity: 1,
//                 startDate: "2020-01-01T00:00:00.000Z",
//                 taxRate: "5d1bcda0dbd6e40010479ee4",
//                 unitPrice: 200,
//                 vatPercent: 0,
//             }
//         ],
//         linkedDocuments: [],
//         member: "5e0e10f45efad9034762b165",
//         modifiedAt: "2020-03-11T08:55:37.917Z",
//         modifiedBy: "5a13f68b7f0c37160024d176",
//         number: "INV-2020003",
//         office: "5d1bcda0dbd6e40010479eec",
//         organization: "5de60ed538d1d7031802c1cc",
//         paidAmount: 200,
//         payableAmount: 0,
//         pendingAmount: 0,
//         periodEnd: "2020-01-31T00:00:00.000Z",
//         periodStart: "2020-01-01T00:00:00.000Z",
//         reference: "",
//         source: "OfficeRnD",
//         status: "paid",
//         subtotal: 200,
//         taxType: "noTax",
//         team: null,
//         templates: ["invoice_primary"],
//         totalAmount: 200,
//         vatAmounts: [],
//         _id: "5e0e113c718a66035ef81d8c",
//     },
// ]

export default function BillingComponent(props) {
    const dispatch = useDispatch();

    const columnDefs = [
        {
            headerName: "Number",
            field: "number",
            filter: true,
            width: 250,
            checkboxSelection: true,
        },
        {
            headerName: "Status",
            field: "payment",
            width: 200,
            cellRendererFramework: params => {
                const memberData = params.data;
                return (
                    <div className="multi-line-column member-address">
                    {   memberData.isPaid ? 
                            <div className="badge badge-pill badge-success-light-green state-report multi-line-state">
                                Paid
                            </div> :
                            <div className="badge badge-pill badge-warning-grey state-report multi-line-state">
                                Pending
                            </div>
                    }
                    <br />
                    {
                        memberData.isSent ? 
                            <div className="badge badge-pill badge-success-light-green state-report">
                                Sent
                            </div> : 
                            <div className="badge badge-pill badge-success-former state-report">
                                Not Sent
                            </div>
                    }
                    </div>
                )
            }
        },
        {
            headerName: "ISSUE DATE",
            field: "date",
            width: 250,
            cellRendererFramework: params => {
                const data = params.data;
                return (
                    <div>{moment(data.date).format('MMM DD YYYY, h:mm:ss a')}</div>
                )
            }
        },
        {
            headerName: "DUE DATE",
            field: "dueDate",
            width: 300,
            cellRendererFramework: params => {
                const memberData = params.data;
                return (
                    <div className="multi-line-column member-address">
                        <span className="member-name">{moment(memberData.date).format('MMM DD YYYY, h:mm:ss a')}</span><br />
                        <span>{moment(memberData.date).format('MMM DD YYYY, h:mm:ss a') + " - " + moment(memberData.dueDate).format('MMM DD YYYY, h:mm:ss a')}</span>
                    </div>
                )
            }
        },
        {
            headerName: "Amount",
            field: "amount",
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
    let resBillingData = useSelector(state => state.filterReducer.billingData);
    const isFetchData = useSelector(state => state.filterReducer.isFetchData);

    useEffect(() => {
        const { location_id } = localStorage.getItem("userToken") !== "" ? JSON.parse(localStorage.getItem("userData")) : {};
        let payload = {
            officeId: resCurrentOfficeId ? resCurrentOfficeId : location_id,
        }

        dispatch(onGetBillingByFilter(payload));
    }, [dispatch])

    return (
        <div>
            {!isFetchData && (<Loader /> )}
            {isFetchData && (
                <>
                <Breadcrumbs
                    breadCrumbTitle="Billing"
                    breadCrumbParent="Page"
                    breadCrumbActive="Billing"
                />
                <ListView 
                    rowData={resBillingData}
                    columnDefs={columnDefs}
                    menu="Billing"
                />
                </>
            )}
        </div>
    )
}