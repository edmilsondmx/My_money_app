import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import { OAPI_URL } from '../Constants/baseUrl';

export const USER_FETCHED = 'USER_FETCHED';
export const LOADER = 'LOADER';
export const TOKEN_VALIDATED = 'TOKEN_VALIDATED';

export const login = (values) => {
  return [{ type: LOADER, payload: true }, submit(values, `${OAPI_URL}/login`)];
};

export const signup = (values) => {
  return submit(values, `${OAPI_URL}/signup`);
};

const submit = (values, url) => {
  return (dispatch) => {
    axios
      .post(url, values)
      .then((resp) => {
        dispatch([{ type: USER_FETCHED, payload: resp.data }]);
      })
      .catch((e) => {
        dispatch([{ type: LOADER, payload: false }]);
        e.response.data.errors.forEach((error) => toastr.error('Erro', error));
      });
  };
};

export const logout = () => {
  return { type: TOKEN_VALIDATED, payload: false };
};

export const validateToken = (token) => {
  return (dispatch) => {
    if (token) {
      axios
        .post(`${OAPI_URL}/validateToken`, { token })
        .then((resp) => {
          dispatch({ type: TOKEN_VALIDATED, payload: resp.data.valid });
        })
        .catch((e) => dispatch({ type: TOKEN_VALIDATED, payload: false }));
    } else {
      dispatch({ type: TOKEN_VALIDATED, payload: false });
    }
  };
};
