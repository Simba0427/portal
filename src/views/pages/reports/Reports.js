import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
    Button, 
} from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ListView from '../../ui-elements/data-list/ListView'
import Loader from '../../ui-elements/loader/loader';

import ReportService from '../../../services/ReportService';
import ReportFileUploadModal from "../../ui-elements/modals/ReportFileUploadModal";
import { onGetReportsByFilter } from '../../../redux/reducers/report/ReportRedux';


export default function ReportsComponent(props) {
    const dispatch = useDispatch();

    const columnDefs = [
        {
            headerName: "Type",
            field: "type",
            filter: true,
            width: 450,
        },
        {
            headerName: "Location",
            field: "location",
            filter: true,
            width: 400,
        },
        // {
        //     headerName: "File",
        //     field: "file_name",
        //     filter: true,
        //     width: 450,
        // },
        {
            headerName: "File Action",
            field: "file",
            filter: true,
            width: 450,
            cellRendererFramework: params => {
                const reportData = params.data;
                const currentUser = JSON.parse(localStorage.getItem("userData"));
                return (
                    <div>
                        {currentUser.user_role === "admin" ? 
                            <Button.Ripple color="primary" onClick={handleOpenFileUploadModal(reportData)}>Post</Button.Ripple> : 
                            <Button.Ripple color="success" onClick={handleDownloadFile(reportData)}>Download</Button.Ripple>
                        }
                    </div>
                )
            }
        },
    ];

    const resCurrentOfficeId = useSelector(state => state.officeReducer.currentOffice);
    let resReportData = useSelector(state => state.reportRedux.reportData);
    const isFetchData = useSelector(state => state.reportRedux.isFetchData);

    const [openFileUploadModal, setOpenFileUploadModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState([]);

    useEffect(() => {
        const { location_id } = localStorage.getItem("userToken") !== "" ? JSON.parse(localStorage.getItem("userData")) : {};
        let payload = {
            officeId: resCurrentOfficeId ? resCurrentOfficeId : location_id,
        }
        dispatch(onGetReportsByFilter(payload));
    }, []);

    const handleOpenFileUploadModal = reportData => () => {
        setSelectedRow(reportData);
        setOpenFileUploadModal(true);
    }
    
    const handleCloseFileUploadModal = () => {
        setOpenFileUploadModal(false);
    }

    const handleDownloadFile = reportData => () => {
        if (reportData.file_path) {
            ReportService.downloadFile(reportData);
        } else {
            console.log("Not exist files");
        }
    }

    return (
        <div>
            {!isFetchData && (<Loader /> )}
            {isFetchData && (
                <>
                <Breadcrumbs
                    breadCrumbTitle="Reports"
                    breadCrumbParent="Page"
                    breadCrumbActive="Reports"
                />
                <ListView 
                    rowData={resReportData}
                    columnDefs={columnDefs}
                    menu="Report"
                    isAddButton={true}
                    isFilter={false}
                />
                <ReportFileUploadModal openFileUploadModal={openFileUploadModal} onCloseFileUploadModal={handleCloseFileUploadModal} selectedRow={selectedRow}/>
                </>
            )}
        </div>
    )
}