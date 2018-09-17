import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import Addresses from './pages/Addresses/Addresses';
import Address from './pages/Address/Address';
import Keys from './pages/Keys/Keys';

export const ROUTES = {
    KEYS: { path: '/keys' },
    ADDRESSES: { path: '/addresses' },
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
        <Route path={`${ROUTES.ADDRESSES.path}/:address`} component={Address} />
    </Switch>
);

export default Routes;