import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { ConnectedRouter as Router } from 'react-router-redux';
import { OidcProvider } from 'redux-oidc';
import history from '../history';
import Navigation from './Navigation';
import App from './App';
import RetailerDemList from '../containers/RetailerDemList';
import RetailerDemLists from '../containers/RetailerDemLists';
import Callback from '../containers/Callback';
import userManager from '../helpers/userManager';

class Root extends Component {
    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <OidcProvider store={store} userManager={userManager}>
                <Router history={history}>
                    <div>
                        <Navigation />

                        <Route path="/" render={() => { document.title = 'Dem Stock'; return false; }} />
                        <Route exact path="/" render={() => <Redirect to="/retailers/dem-stock" />} />
                        <Route exact path="/retailers/dem-stock/signin-oidc-client" component={Callback} />
                        <Route exact path="/retailers/dem-stock/last-reviewed" component={RetailerDemLists} />
                        <Route exact path="/retailers/dem-stock" component={App} />
                        <Route exact path="/retailers/:retailerId/dem-stock" component={RetailerDemList} />
                    </div>
                </Router>
                </OidcProvider>
            </Provider>      
        );

    }
}

export default Root;