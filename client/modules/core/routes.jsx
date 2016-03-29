import React from 'react';
import {mount} from 'react-mounter';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import MainLayout from './components/main_layout.jsx';
import PostList from './containers/postlist';
import Post from './containers/post';
import NewPost from './containers/newpost';
import Welcome from './containers/welcome';
import Todo from '../todos/containers/App';
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
            <IndexRoute component={PostList}/>
            <Route path="post/:postId" component={Post}/>
            <Route path="todo" component={Todo}/>
            <Route path="search(/:key)" component={SearchCustomer}/>
            <Route path="customer/create" component={CreateCustomer}>
            </Route>
            <Route path="ticket(/:cid)" components={{customer:CreateCustomer,ticket:CreateTicket}}/>
          </Route>
        </Router>
      </Provider>, document.body
    );
  });
}
