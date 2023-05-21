import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

import DashboardReducer from '../store/reducers/dashboardReducer';
import TabReducer from '../store/reducers/tabReducer';
import BillingCycleReducer from '../store/reducers/billingCicleReducer';
import AuthReducer from '../auth/authReducer';

const rootReducer = combineReducers({
  dashboard: DashboardReducer,
  tab: TabReducer,
  billingCycle: BillingCycleReducer,
  form: formReducer,
  toastr: toastrReducer,
  auth: AuthReducer,
});

export default rootReducer;
