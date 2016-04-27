import React from 'react';
import {mount} from 'react-mounter';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import MainLayout from './containers/main_layout';
import Main from './containers/main';
import SearchCustomer from '../customer/containers/searchCustomer';
import CreateCustomer from '../customer/containers/createCustomer';
import CreateTicket from '../tickets/containers/createTicket';

export default function (injectDeps, {Meteor,Store}) {
  const history = syncHistoryWithStore(browserHistory, Store);
  const MainLayoutCtx = injectDeps(MainLayout);
  Meteor.startup(() => {
    ReactDOM.render(
      <Provider store={Store}>
        <Router history={history}>
          <Route path="/" component={MainLayoutCtx}>
            <IndexRoute component={Main}/>
            <Route path="search(/:key)(/:auto)" component={SearchCustomer}/>
            <Route path="customer/create" component={CreateCustomer} />
            <Route path="ticket(/:cid)" components={CreateTicket}/>
          </Route>
        </Router>
      </Provider>, document.body
    );
  });
}
