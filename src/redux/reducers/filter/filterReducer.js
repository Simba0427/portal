import { logoutWithJWT } from "../../../redux/actions/auth/loginActions"

import MemberService from '../../../services/MemberService';
import MembershipService from '../../../services/MembershipService';
import BillingService from '../../../services/BillingService';

const FETCH_PLANS = 'Filter/FETCH_PLANS';
const FETCH_ACCOUNTS = 'Filter/FETCH_ACCOUNTS';
const FETCH_PLANTYPES = 'Filter/FETCH_PLANTYPES';
const FETCH_MEMBER = 'MembershipFilter/FETCH_MEMBER';
const FETCH_MEMBERSHIP = 'MembershipFilter/FETCH_MEMBERSHIP';
const FETCH_BILLING = 'BillingFilter/FETCH_BILLING';
const SET_FETCH_STATE = 'Filter/SET_FETCH_STATE';

export const onGetPlans = () => {
    return async dispatch => {
        MembershipService.getPlans().then(response => {
            let rowData = [];
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
            dispatch({ type: FETCH_PLANS, plansData: rowData })
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

export const onGetAccounts = () => {
    return async dispatch => {
        MembershipService.getAccounts().then(response => {
            let rowData = [];
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
            dispatch({ type: FETCH_ACCOUNTS, accountsData: rowData })
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

export const onGetPlanTypes = () => {
    return async dispatch => {
        MembershipService.getPlanTypes().then(response => {
            let rowData = [];
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
            dispatch({ type: FETCH_PLANTYPES, planTypesData: rowData })
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

export const onGetMemberByFilter = filterData => {
    return async dispatch => {
        MemberService.getAll(filterData).then(response => {
            let rowData
            if (response.data.status === 200) {
                rowData = response.data.result;
            } else if (response.data.status === 401) {
                dispatch(logoutWithJWT());
            } else {
                rowData = []
            }
            dispatch({ type: FETCH_MEMBER, memberData: rowData })
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

export const onGetMembershipByFilter = filterData => {
    return async dispatch => {
        MembershipService.getAll(filterData).then(response => {
            let rowData
            if (response.data.status === 200) {
                rowData = response.data.result;
            } else if (response.data.status === 401) {
                dispatch(logoutWithJWT());
            } else {
                rowData = []
            }
            dispatch({ type: FETCH_MEMBERSHIP, membershipData: rowData });
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

export const onGetBillingByFilter = filterData => {
    return async dispatch => {
        BillingService.getAll(filterData).then(response => {
            let rowData
            if (response.data.status === 200) {
                rowData = response.data.result;
            } else if (response.data.status === 401) {
                dispatch(logoutWithJWT());
            } else {
                rowData = []
            }
            dispatch({ type: FETCH_BILLING, billingData: rowData })
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

export const setFilterFetchState = state => ({
    type: SET_FETCH_STATE,
    isFetchData: state
})

let initialState = {
    memberData: [],
    membershipData: [],
    billingData: [],
    plansData: [],
    accountsData: [],
    planTypesData: [],
    isFetchData: false,
}

export default function filterReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MEMBER: {
            return { ...state, memberData: action.memberData }
        }
        case FETCH_MEMBERSHIP: {
            return { ...state, membershipData: action.membershipData }
        }
        case FETCH_BILLING: {
            return { ...state, billingData: action.billingData }
        }
        case FETCH_PLANS: {
            return { ...state, plansData: action.plansData }
        }
        case FETCH_ACCOUNTS: {
            return { ...state, accountsData: action.accountsData }
        }
        case FETCH_PLANTYPES: {
            return { ...state, planTypesData: action.planTypesData }
        }
        case SET_FETCH_STATE: {
            return { ...state, isFetchData: action.isFetchData }
        }
        default: {
            return state
        }
    }
}
  