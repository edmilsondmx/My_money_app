import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Dashboard from '../dashboard/Dashboard';
import BillingCycle from '../billingCycle/BillingCycle';

const Routes = (props) => {
  return (
    <div className="content-wrapper">
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/billingCycles" component={BillingCycle} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>

    // <Router history={hashHistory}>
    //   <Route path="/" component={AuthOrApp}>
    //     <IndexRoute component={Dashboard} />
    //     <Route path="billingCycles" component={BillingCycle} />
    //   </Route>
    //   {/* <Route path="/" component={Dashboard} /> */}
    //   <Redirect from="*" to="/" />
    // </Router>
  );
};

export default Routes;
