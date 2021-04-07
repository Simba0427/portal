import { logoutWithJWT } from "../../../redux/actions/auth/loginActions"
import OfficeService from '../../../services/OfficeService';

const SET_CURRENT_OFFICE = 'SideMenu/SET_CURRENT_OFFICE';
const FETCH_OFFICES = 'Offices/FETCH_OFFICES';
const FETCH_COMPANIES = 'Companies/FETCH_COMPANIES';
const SET_FETCH_STATE = 'Companies/SET_FETCH_STATE';

export const onSetCurrentOffice = (office) => ({
    type: SET_CURRENT_OFFICE,
    currentOffice: office
})

export const onGetOffices = () => {
    return async dispatch => {
        OfficeService.getAllOffices().then(response => {
            let rowData = [
                {
                    value: "",
                    label: "All locations"
                }
            ];
            if (response.data.status === 200) {
                let resData = response.data.result;
                for (let i = 0; i < resData.length; i++) {
                    let payload = {
                        value: resData[i]._id,
                        label: resData[i].name,
                    }
                    rowData = [...rowData, payload];
                }
            } else if (response.data.status === 401) {
                dispatch(logoutWithJWT());
            } else {
                rowData = []
            }
            dispatch({ type: FETCH_OFFICES, officesData: rowData })
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

export const onGetCompanyByFilter = (payload) => {
    return async dispatch => {
        OfficeService.getAllTeams(payload).then(response => {
            let rowData
            if (response.data.status === 200) {
                rowData = response.data.result;
            } else if (response.data.status === 401) {
                dispatch(logoutWithJWT());
            } else {
                rowData = []
            }
            dispatch({ type: FETCH_COMPANIES, companiesData: rowData })
            dispatch({ type: SET_FETCH_STATE, isFetchData: true })
        })
    }
}

export const setOfficeFetchState = state => ({
    type: SET_FETCH_STATE,
    isFetchData: state
})

let initialState = {
    officesData: [],
    companiesData: [],
    currentOffice: "",
    isFetchData: false,
}

export default function filterReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_OFFICE: {
            return { ...state, currentOffice: action.currentOffice }
        }
        case FETCH_OFFICES: {
            return { ...state, officesData: action.officesData }
        }
        case FETCH_COMPANIES: {
            return { ...state, companiesData: action.companiesData }
        }
        case SET_FETCH_STATE: {
            return { ...state, isFetchData: action.isFetchData }
        }
        default: {
            return state
        }
    }
}
  