import { TAB_SELECTED, TAB_SHOWED } from '../actions/tabActions';

const INITIAL_STATE = { selected: '', visible: {} };

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TAB_SELECTED:
      return {
        ...state,
        selected: action.payload,
      };

    case TAB_SHOWED:
      return {
        ...state,
        visible: action.payload,
      };

    default:
      return state;
  }
}
