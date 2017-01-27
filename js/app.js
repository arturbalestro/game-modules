import 'babel-polyfill';

import App from './components/App';
import * as app from './components/App';
import TokenList from './components/TokenList';
import * as tokenList from './components/TokenList';

//Importing stages
import Stage from './components/Stage';
import * as stage from './components/Stage';

import PowerPlant from './components/stages/PowerPlant';
import * as powerPlant from './components/stages/PowerPlant';
import ViridianForest from './components/stages/ViridianForest';
import * as viridianForest from './components/stages/ViridianForest';
import CinnabarIsland from './components/stages/CinnabarIsland';
import * as cinnabarIsland from './components/stages/CinnabarIsland';
import SeafoamIslands from './components/stages/SeafoamIslands';
import * as seafoamIslands from './components/stages/SeafoamIslands';
import RockTunnel from './components/stages/RockTunnel';
import * as rockTunnel from './components/stages/RockTunnel';
import SafariZone from './components/stages/SafariZone';
import * as safariZone from './components/stages/SafariZone';
import MtMoon from './components/stages/MtMoon';
import * as mtMoon from './components/stages/MtMoon';
import UndergroundPath from './components/stages/UndergroundPath';
import * as undergroundPath from './components/stages/UndergroundPath';
import LavenderTower from './components/stages/LavenderTower';
import * as lavenderTower from './components/stages/LavenderTower';
import VictoryRoad from './components/stages/VictoryRoad';
import * as victoryRoad from './components/stages/VictoryRoad';

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
