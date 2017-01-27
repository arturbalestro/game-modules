import 'babel-polyfill';

import App from './components/App';
import * as app from './components/App';
import TokenList from './components/TokenList';
import * as tokenList from './components/TokenList';
import Stage from './components/Stage';
import * as stage from './components/Stage';

import AppHomeRoute from './routes/AppHomeRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { applyRouterMiddleware, Router, Redirect, Route, hashHistory } from 'react-router';
import useRelay from 'react-router-relay';
import { Panel } from 'react-bootstrap';

const renderFailure = () => <Panel/>;

/**
 * Query called when entering this view, used by ReactRouterRelay.
 *
 * @returns {{viewer: Function}}
 */
export function routeQuery() {
  return {
    game: () => Relay.QL`query RootQuery { game }`,
  };
}

/**
 * Describes application routes
 *
 */
const routes = (
  <Router history={hashHistory} render={applyRouterMiddleware(useRelay)} environment={Relay.Store}>
    {/* / ----> /game */}
    <Redirect
      from="/"
      to={app.path()}
      renderFailure={renderFailure}
    />

    {/* /game */}
    <Route
      path={app.path()}
      component={App}
      queries={routeQuery()}
      renderFailure={renderFailure}
    />

    {/* /token-list */}
    <Route
      path={tokenList.path()}
      component={TokenList}
      queries={routeQuery()}
      renderFailure={renderFailure}
    />

    {/* /stage */}
    <Route
      path={stage.path()}
      component={Stage}
      queries={routeQuery()}
      renderFailure={renderFailure}
    />

    {/*  /orders  */}
    {/* <Route
      path={orderList.path()}
      component={OrderListView}
      queryParams={['pageNum', 'orderState', 'orderId', 'customerName', 'customerEmail']}
      onEnter={Authentication.require}
      prepareParams={prepareParams}
      queries={routeQuery()}
      renderFailure={renderFailure}
    /> */}

  </Router>
);

// ReactDOM.render(
//   <Relay.Renderer
//     environment={Relay.Store}
//     Container={App}
//     queryConfig={new AppHomeRoute()}
//   />,
//   document.getElementById('root')
// );

// Render Application
ReactDOM.render(routes, document.getElementById('root'));
