import { TOKEN_VALIDATED, USER_FETCHED, LOADER } from './authActions';

const userKey = '_mymoney_user';
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem(userKey)),
  validToken: false,
  loader: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOKEN_VALIDATED:
      if (action.payload) {
        return { ...state, validToken: true, loader: false };
      } else {
        localStorage.removeItem(userKey);
        return { ...state, validToken: false, user: null };
      }

    case USER_FETCHED:
      localStorage.setItem(userKey, JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        validToken: true,
        loader: false,
      };

    case LOADER:
      return {
        ...state,
        loader: action.payload,
      };

    default:
      return state;
  }
}
