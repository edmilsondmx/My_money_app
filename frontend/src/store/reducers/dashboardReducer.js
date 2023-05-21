import { BILLING_SUMMARY_FETCHED, BILLING_YEAR_FETCHED } from '../actions/dashboardActions';

const INITIAL_STATE = {
  summary: {
    credit: 0,
    debt: 0,
  },
  year: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BILLING_SUMMARY_FETCHED:
      return {
        ...state,
        summary: action.payload.data,
      };

    case BILLING_YEAR_FETCHED:
      return {
        ...state,
        year: action.payload.data,
      };

    default:
      return state;
  }
}
