const REVENUE_START_DATE = 'RevenueFilter/REVENUE_START_DATE';
const REVENUE_END_DATE = 'RevenueFilter/REVENUE_END_DATE';
const REVENUE_PLANS = 'RevenueFilter/REVENUE_PLANS';
const REVENUE_ACCOUNTS = 'RevenueFilter/REVENUE_ACCOUNTS';
const REVENUE_PLAN_TYPES = 'RevenueFilter/REVENUE_PLAN_TYPES';

export const selectRevenueStartDate = revenueStartDate => ({
    type: REVENUE_START_DATE,
    revenueStartDate,
});

export const selectRevenueEndDate = revenueEndDate => ({
    type: REVENUE_END_DATE,
    revenueEndDate,
});

export const selectRevenuePlans = revenuePlans => ({
    type: REVENUE_PLANS,
    revenuePlans,
});

export const selectRevenueAccounts = revenueAccounts => ({
    type: REVENUE_ACCOUNTS,
    revenueAccounts,
});

export const selectRevenuePlanTypes = revenuePlanTypes => ({
    type: REVENUE_PLAN_TYPES,
    revenuePlanTypes,
});

const initialState = {
    revenueStartDate: "",
    revenueEndDate: "",
    revenuePlans: "",
    revenueAccounts: "",
    revenuePlanTypes: "",
}

export const revenueFilter = (state = initialState, action) => {
    switch (action.type) {
        case "REVENUE_START_DATE": {
            return { ...state, revenueStartDate: action.revenueStartDate }
        }
        case "REVENUE_END_DATE":
            return { ...state, revenueEndDate: action.revenueEndDate }
        case "REVENUE_PLANS": {
            return { ...state, revenuePlans: action.revenuePlans }
        }
        case "REVENUE_ACCOUNTS": {
            return { ...state, revenueAccounts: action.revenueAccounts }
        }
        case "REVENUE_PLAN_TYPES": {
            return { ...state, revenuePlanTypes: action.revenuePlanTypes }
        }
        default: {
            return state
        }
    }
}
  