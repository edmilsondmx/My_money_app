import axios from 'axios';
import { BASE_URL } from '../../Constants/baseUrl';

export const BILLING_SUMMARY_FETCHED = 'BILLING_SUMMARY_FETCHED';
export const BILLING_YEAR_FETCHED = 'BILLING_YEAR_FETCHED';

export const getSummary = () => {
  const request = axios.get(`${BASE_URL}/summary`).catch((e) => {
    e.response.data.errors.forEach((error) => {
      console.error('Erro', error);
    });
  });
  return {
    type: BILLING_SUMMARY_FETCHED,
    payload: request,
  };
};

export const getByYear = (year = '') => {
  year = year ? `?year=${year}` : '';
  const request = axios.get(`${BASE_URL}/${year}`).catch((e) => {
    e.response.data.errors.forEach((error) => {
      console.error('Erro', error);
    });
  });
  return {
    type: BILLING_YEAR_FETCHED,
    payload: request,
  };
};
