import React from "react"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"

export default function Dashboard(props) {
    return (
        <div>
            <Breadcrumbs
                breadCrumbTitle="Dashboard"
                breadCrumbParent="Dashboard"
                breadCrumbActive="Dashboard"
            />
        </div>
    )
}