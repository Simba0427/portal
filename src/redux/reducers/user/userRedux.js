import UserService from '../../../services/UserService';

const FETCH_USER = 'User/FETCH_USER';
const SET_FETCH_STATE = 'User/SET_FETCH_STATE';

export const onGetUsersByFilter = filterData => {
    return async dispatch => {
        UserService.getAll(filterData).then(response => {
            dispatch({ type: FETCH_USER, userData: response.data })
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

export const setUserFetchState = state => ({
    type: SET_FETCH_STATE,
    isFetchData: state
})

let initialState = {
    userData: [],
    isFetchData: false,
}

export default function ReportReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER: {
            return { ...state, userData: action.userData }
        }
        case SET_FETCH_STATE: {
            return { ...state, isFetchData: action.isFetchData }
        }
        default: {
            return state
        }
    }
}
  