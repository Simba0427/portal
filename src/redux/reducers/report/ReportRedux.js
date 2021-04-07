import ReportService from '../../../services/ReportService';

const FETCH_REPORT = 'Report/FETCH_REPORT';
const SET_FETCH_STATE = 'Report/SET_FETCH_STATE';

export const onGetReportsByFilter = filterData => {
    return async dispatch => {
        ReportService.getAll(filterData).then(response => {
            dispatch({ type: FETCH_REPORT, reportData: response.data })
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

export const setReportFetchState = state => ({
    type: SET_FETCH_STATE,
    isFetchData: state
})

let initialState = {
    reportData: [],
    isFetchData: false,
}

export default function ReportReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_REPORT: {
            return { ...state, reportData: action.reportData }
        }
        case SET_FETCH_STATE: {
            return { ...state, isFetchData: action.isFetchData }
        }
        default: {
            return state
        }
    }
}
  