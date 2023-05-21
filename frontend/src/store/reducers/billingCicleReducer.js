import {
  BILLING_CYCLES_FETCHED,
  BILLING_CYCLES_FETCHED_PER_PAGE,
  SET_CURRENT_PAGE,
  BILLING_CYCLE_COUNT,
} from '../actions/billingCycleActions';

const INITIAL_STATE = {
  list: [],
  currentPage: '0',
  itemsPerPage: 8,
  count: 0,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BILLING_CYCLES_FETCHED:
      return {
        ...state,
        list: action.payload.data,
      };

    case BILLING_CYCLES_FETCHED_PER_PAGE:
      return {
        ...state,
        list: action.payload.data,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case BILLING_CYCLE_COUNT:
      return {
        ...state,
        count: action.payload.data.value,
      };

    default:
      return state;
  }
}
