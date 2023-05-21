import axios from 'axios';
import { BASE_URL } from '../../Constants/baseUrl';
import { toastr } from 'react-redux-toastr';
import { initialize } from 'redux-form';
import { selectTab, showTabs } from './tabActions';

export const BILLING_CYCLES_FETCHED = 'BILLING_CYCLES_FETCHED';
export const BILLING_CYCLES_FETCHED_PER_PAGE = 'BILLING_CYCLES_FETCHED_PER_PAGE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const BILLING_CYCLE_COUNT = 'BILLING_CYCLE_COUNT';

const INITIAL_VALUES = { credits: [{}], debts: [{}] };

export const getList = () => {
  const request = axios.get(`${BASE_URL}`);
  return {
    type: BILLING_CYCLES_FETCHED,
    payload: request,
  };
};

export const getListPag = (skip, limit) => {
  skip = `?skip=${skip}`;
  limit = `&limit=${limit}`;
  const request = axios.get(`${BASE_URL}${skip}${limit}`);
  return {
    type: BILLING_CYCLES_FETCHED_PER_PAGE,
    payload: request,
  };
};

export const create = (values) => {
  return submit(values, 'post');
};

export const update = (values) => {
  return submit(values, 'put');
};

export const remove = (values) => {
  return submit(values, 'delete');
};

const submit = (values, method) => {
  return (dispatch) => {
    const id = values._id ? values._id : '';
    axios[method](`${BASE_URL}/${id}`, values)
      .then((resp) => {
        toastr.success('Sucesso', 'Operação realizada com sucesso');
        dispatch(init());
      })
      .catch((e) => {
        e.response.data.errors.forEach((error) => {
          toastr.error('Erro', error);
        });
      });
  };
};

export const showUpdate = (billingCycle) => {
  return [showTabs('tabUpdate'), selectTab('tabUpdate'), initialize('billingCycleForm', billingCycle)];
};

export const showRemove = (billingCycle) => {
  return [showTabs('tabDelete'), selectTab('tabDelete'), initialize('billingCycleForm', billingCycle)];
};

export const init = () => {
  return [
    showTabs('tabList', 'tabCreate'),
    selectTab('tabList'),
    // getList(),
    initialize('billingCycleForm', INITIAL_VALUES),
  ];
};

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const getCount = () => {
  const request = axios.get(`${BASE_URL}/count`);
  return {
    type: BILLING_CYCLE_COUNT,
    payload: request,
  };
};
