import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ListView from '../../ui-elements/data-list/ListView'
import Loader from '../../ui-elements/loader/loader';

import { onGetCompanyByFilter } from "../../../redux/reducers/offices/officeReducer"

// const data = [
//     {
//         calculatedStage: "new",
//         calculatedStatus: "active",
//         cardType: "MasterCard",
//         createdAt: "2020-12-20T18:04:47.045Z",
//         createdBy: "5fdf923ee596072831496ba5",
//         description: "Podcasting, Sound Engineering, Music/Podcast Production, Photography & Video production ",
//         details: {},
//         email: "avibepodcast@gmail.com",
//         image: "//dzrjcxtasfoip.cloudfront.net/user-resources/organization/IMG_7246(1).jpg-1608487839717.jpeg",
//         isTeam: true,
//         modifiedAt: "2020-12-20T19:55:21.036Z",
//         modifiedBy: "5de60ef738d1d7031802c764",
//         name: "A Vibe Entertainment ",
//         office: "5d1bcda0dbd6e40010479eec",
//         organization: "5de60ed538d1d7031802c1cc",
//         paymentDetails: ["card"],
//         // properties: {
//         //     Company Description: "Podcasting, Sound Engineering, Music/Podcast Production, Photography & Video production ",
//         //     Years in Business: "2 years"
//         // },
//         tags: [],
//         url: "",
//         _id: "5fdf923fe596070a41496ba8",
//     },
// ]

export default function OfficesComponent(props) {
    const dispatch = useDispatch();

    const columnDefs = [
        {
            headerName: "Company Name",
            field: "image",
            width: 350,
            filter: true,
            cellRendererFramework: params => {
                return (
                    <div className="d-flex align-items-center cursor-pointer">
                        {params.data.image ?
                            <img
                                className="rounded-circle mr-50"
                                src={params.data.image}
                                alt="user avatar"
                                height="40"
                                width="40"
                            /> :
                            <i className="fa fa-building table-image-icon"></i>
                        }
                        <span>{params.data.name}</span>
                    </div>
                )
            }
        },
        {
            headerName: "Email",
            field: "email",
            filter: true,
            width: 300,
        },
        {
            headerName: "Status",
            field: "calculatedStatus",
            filter: true,
            width: 200,
            cellRendererFramework: params => {
                const officeData = params.data;
                return (
                    <div>
                    {officeData.calculatedStatus === "active" ? 
                            <div className="badge badge-pill badge-success-green">
                                {officeData.calculatedStatus}
                            </div> : 
                            <div className="badge badge-pill badge-warning-grey">
                                {officeData.calculatedStatus}
                            </div>
                    }
                    </div>
                )
            }
        },
        {
            headerName: "Payment",
            field: "paymentDetails",
            filter: true,
            width: 200,
        },
        {
            headerName: "MemberShip",
            field: "membership",
            filter: true,
            width: 200,
            cellRendererFramework: params => {
                return (
                    <div>
                        1 memberships
                    </div>
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
    let resCompaniesData = useSelector(state => state.officeReducer.companiesData);
    const isFetchData = useSelector(state => state.officeReducer.isFetchData);

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
        dispatch(onGetCompanyByFilter(payload));
    }, [dispatch])

    return (
        <div>
            {!isFetchData && (<Loader /> )}
            {isFetchData && (
                <>
                <Breadcrumbs
                    breadCrumbTitle="Companies"
                    breadCrumbParent="Pages"
                    breadCrumbActive="Companies"
                />
                <ListView 
                    rowData={resCompaniesData}
                    columnDefs={columnDefs}
                    menu="Office"
                    isFilter={false}
                />
                </>
            )}
        </div>
    )
}