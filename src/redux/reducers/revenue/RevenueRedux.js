import { logoutWithJWT } from "../../../redux/actions/auth/loginActions"

import RevenueService from '../../../services/RevenueService';

const FETCH_REVENUE = 'Revenue/FETCH_REVENUE';
const FETCH_REVENUE_REPORT_DETAILS = 'Revenue/FETCH_REVENUE_REPORT_DETAILS';
const FETCH_REVENUE_REPORT_ROWS = 'Revenue/FETCH_REVENUE_REPORT_ROWS';
const SET_FETCH_STATE = 'Revenue/SET_FETCH_STATE';

export const onGetRevenueByFilter = filterData => {
    return async dispatch => {
        RevenueService.getLeads(filterData).then(response => {
            let rowData
            if (response.data.status === 200) {
                rowData = response.data.result;
            } else if (response.data.status === 401) {
                dispatch(logoutWithJWT());
            } else {
                rowData = []
            }
            dispatch({ type: FETCH_REVENUE, revenueData: rowData })
            dispatch({ type: SET_FETCH_STATE, isFetchData: true })
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
    }
}
export const onGetReportForRevenueByFilter = filterData => {
    return async dispatch => {
        RevenueService.getReport(filterData).then(response => {
            let rowData
            if (response.data.status === 200) {
                rowData = response.data.result;

                const reportId = rowData._id;

                onGetRevenueReportDetails(reportId);
                onGetRevenueReportRows(reportId);

            } else if (response.data.status === 401) {
                dispatch(logoutWithJWT());
            } else {
                rowData = []
            }
            // dispatch({ type: FETCH_REVENUE_REPORT, revenueReportData: rowData })
            dispatch({ type: FETCH_REVENUE_REPORT_DETAILS, revenueReportDetails: rowData })
            dispatch({ type: FETCH_REVENUE_REPORT_ROWS, revenueReportRows: true })
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
    }
}
export const onGetRevenueReportDetails = (reportId) => {
    return async dispatch => {
        RevenueService.getRevenueDetails(reportId).then(response => {
            let rowData
            if (response.data.status === 200) {
                rowData = response.data.result;
            } else if (response.data.status === 401) {
                dispatch(logoutWithJWT());
            } else {
                rowData = []
            }
            dispatch({ type: FETCH_REVENUE_REPORT_DETAILS, revenueReportDetails: rowData })
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
    }
}
export const onGetRevenueReportRows = (reportId) => {
    return async dispatch => {
        RevenueService.getRevenueRows(reportId).then(response => {
            let rowData
            if (response.data.status === 200) {
                rowData = response.data.result;
            } else if (response.data.status === 401) {
                dispatch(logoutWithJWT());
            } else {
                rowData = []
            }
            dispatch({ type: FETCH_REVENUE_REPORT_ROWS, revenueReportRows: rowData })
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
    }
}

export const setRevenueFetchState = state => ({
    type: SET_FETCH_STATE,
    isFetchData: state
})

let initialState = {
    revenueData: [],
    revenueReportDetails: [],
    revenueReportRows: [],
    isFetchData: false,
}

export default function RevenueReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_REVENUE: {
            return { ...state, revenueData: action.revenueData }
        }
        case FETCH_REVENUE_REPORT_DETAILS: {
            return { ...state, revenueReportDetails: action.revenueReportDetails }
        }
        case FETCH_REVENUE_REPORT_ROWS: {
            return { ...state, revenueReportRows: action.revenueReportRows }
        }
        case SET_FETCH_STATE: {
            return { ...state, isFetchData: action.isFetchData }
        }
        default: {
            return state
        }
    }
}
  