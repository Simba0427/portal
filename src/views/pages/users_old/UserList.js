import React, { useState, useEffect } from "react";

import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ListView from '../../ui-elements/data-list/ListView'
import UserService from '../../../services/UserService'


export default function UserListComponent(props) {

    const columnDefs = [
        {
            headerName: "Username",
            field: "name",
            width: 300,
            filter: true,
            cellRendererFramework: params => {
                const userData = params.data;
                return (
                    <div>{userData.first_name + " " + userData.last_name}</div>
                )
            }
        },
        {
            headerName: "Email",
            field: "email",
            filter: true,
            width: 350
        },
        {
            headerName: "Phone",
            field: "phone",
            filter: true,
            width: 250,
        },
        {
            headerName: "Status",
            field: "status",
            filter: true,
            width: 150,
            cellRendererFramework: params => {
                const userData = params.data;
                return (
                    <div className="badge badge-pill badge-success-green">
                        {userData.user_role}
                    </div>
                )
            }
        },
        {
            headerName: "Created At",
            field: "created_at",
            filter: true,
            width: 300,
        },
    ];
    
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        let unmounted = false;

        UserService.getAll().then(response => {
            if (!unmounted) {
                setUserList(response.data);
            }
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
        return () => { unmounted = true };
    }, [])

    return (
        <div>
            <Breadcrumbs
                breadCrumbTitle="Users"
                breadCrumbParent="Users"
                breadCrumbActive="List"
            />
            <ListView 
                rowData={userList}
                columnDefs={columnDefs}
                menu="User"
                isAddButton={false}
                isFilter={false}
            />
        </div>
    )
}