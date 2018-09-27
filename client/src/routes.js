import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import Addresses from './pages/Addresses/Addresses';
import Inputs from './pages/Inputs/Inputs';
import Keys from './pages/Keys/Keys';

export const ROUTES = {
    KEYS: { path: '/keys' },
    ADDRESSES: { path: '/addresses' },
    INPUTS: { path: '/inputs' },
};

const Routes = () => (
    <Switch>
        <Route
            exact
            path="/"
            render={() => <Redirect to={ROUTES.ADDRESSES.path} />}
        />
        <Route exact path={ROUTES.KEYS.path} component={Keys} />
        <Route exact path={ROUTES.ADDRESSES.path} component={Addresses} />
        <Route exact path={ROUTES.INPUTS.path} component={Inputs} />
    </Switch>
);

export default Routes;