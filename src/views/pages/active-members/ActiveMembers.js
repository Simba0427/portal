import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ListView from '../../ui-elements/data-list/ListView'
import Loader from '../../ui-elements/loader/loader';

import { onGetMemberByFilter } from "../../../redux/reducers/filter/filterReducer"

export default function ActiveMembersComponent(props) {
    const dispatch = useDispatch();

    const columnDefs = [
        {
            headerName: "Name",
            field: "name",
            filter: true,
            width: 250,
            cellRendererFramework: params => {
                const memberData = params.data;
                return (
                    <div className="multi-line-column member-address">
                        <span className="member-name">{memberData.name}</span><br />
                        {memberData.address != null ?
                            <span><i className="fa fa-map-marker-alt member-icon" aria-hidden="true"></i>
                                {memberData.address.name + " "}
                            </span> : null
                        }
                       
                    </div>
                )
            }
        },
        {
            headerName: "Company",
            field: "team",
            filter: true,
            width: 250,
            cellRendererFramework: params => {
                const teamData = params.data.team;
                if(teamData != null) {
                    return (
                        <div className="multi-line-column member-address">
                            <span className="member-name">{teamData.name}</span>
                        </div>
                    )
                } else {
                    return (
                        <div className="multi-line-column member-address">
                            <span className="member-name">-</span>
                        </div>
                    )
                }
                
            }
        },
        // {
        //     headerName: "Payment",
        //     field: "paymentDetails",
        //     filter: true,
        //     width: 200,
        // },
        // {
        //     headerName: "Status",
        //     field: "status",
        //     filter: true,
        //     width: 200,
        //     cellRendererFramework: params => {
        //         const memberData = params.data;
        //         return (
        //             <div>
        //             {   memberData.status === "active" ? 
        //                     <div className="badge badge-pill badge-success-green">
        //                         {memberData.status}
        //                     </div> :
        //                     <div className="badge badge-pill badge-warning-grey">
        //                         {memberData.status}
        //                     </div>
        //             }
        //             {memberData.role === "User" ?
        //                 <div className="badge badge-pill badge-success-green">
        //                     {memberData.role}
        //                 </div> : null
        //             }
        //             {memberData.calculatedStage === "new" ? 
        //                 <div className="badge badge-pill badge-success-green">
        //                     {memberData.calculatedStage}
        //                 </div> : null
        //             }
        //             </div>
        //         )
        //     }
        // },
        // {
        //     headerName: "Created At",
        //     field: "createdAt",
        //     filter: true,
        //     width: 200,
        //     cellRendererFramework: params => {
        //         const data = params.data;
        //         return (
        //             <div>{moment(data.createdAt).format('MMM DD YYYY, h:mm:ss a')}</div>
        //         )
        //     }
        // },
        // {
        //     headerName: "Modified At",
        //     field: "modifiedAt",
        //     filter: true,
        //     width: 200,
        //     cellRendererFramework: params => {
        //         const data = params.data;
        //         return (
        //             <div>{moment(data.modifiedAt).format('MMM DD YYYY, h:mm:ss a')}</div>
        //         )
        //     }
        // },
        
        {
            headerName: "Office",
            field: "membership",
            filter: true,
            width: 350,
            cellRendererFramework: params => {
                const memberData = params.data;
                if(memberData.membership != null) {
                    return (
                        <div className="multi-line-column">
                            <span className="membership-discount-price">{memberData.membership.name}</span>
                        </div>
                    )
                } else {
                    
                    return (
                        <div>-</div>
                    );
                }
                
            }
        },
        {
            headerName: "Monthly Fee",
            field: "membership",
            filter: true,
            width: 200,
            cellRendererFramework: params => {
                const memberData = params.data;
                if(memberData.membership != null) {
                    return (
                        <div className="multi-line-column">
                            <span className="membership-discount-price">${memberData.membership.discountedPrice}</span>
                        </div>
                    )
                } else {
                    
                    return (
                        <div>-</div>
                    );
                }
                
            }
        },
        {
            headerName: "Email",
            field: "email",
            filter: true,
            width: 300
        },
        {
            headerName: "Phone",
            field: "phone",
            filter: true,
            width: 300
        }
    ];

    const resCurrentOfficeId = useSelector(state => state.officeReducer.currentOffice);
    let resMemberData = useSelector(state => state.filterReducer.memberData);
    const isFetchData = useSelector(state => state.filterReducer.isFetchData);
    
    useEffect(() => {
        const { location_id } = localStorage.getItem("userToken") !== "" ? JSON.parse(localStorage.getItem("userData")) : {};

        const fetchData = async () => {
            let payload = {
                officeId: resCurrentOfficeId ? resCurrentOfficeId : location_id,
            }
            await dispatch(onGetMemberByFilter(payload));
        }

        fetchData();
    }, [dispatch])

    return (
        <div>
            {!isFetchData && (<Loader /> )}
            {isFetchData && (
                <>
                    <Breadcrumbs
                        breadCrumbTitle="Active Members"
                        breadCrumbParent="Pages"
                        breadCrumbActive="Active Members"
                        hideDetail = {true}
                    />
                    <ListView 
                        rowData={resMemberData}
                        columnDefs={columnDefs}
                        menu="Active Member"
                        isFilter={false}
                    />
                </>
            )}
        </div>
    )
}