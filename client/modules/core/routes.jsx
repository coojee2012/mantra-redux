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
export default function (injectDeps, {Meteor,Store}) {
  //const store = ReduxState.Store();
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
            <Route path="search/:key" component={SearchCustomer}/>
          </Route>
        </Router>
      </Provider>, document.body
    );
  });
}

/*export default function (injectDeps, {FlowRouter,ReduxState},actions) {
 console.log('actions:',actions);
 const MainLayoutCtx = injectDeps(MainLayout);
 const store = ReduxState.Store();

 FlowRouter.route('/', {
 name: 'posts.list',
 action() {
 mount(MainLayoutCtx, {
 store:store,
 content: () => (<PostList />)
 });
 }
 });

 FlowRouter.route('/post/:postId', {
 name: 'posts.single',
 action({postId}) {
 mount(MainLayoutCtx, {
 store:store,
 content: () => (<Post postId={postId}/>)
 });
 }
 });

 FlowRouter.route('/new-post', {
 name: 'newpost',
 action() {
 mount(MainLayoutCtx, {
 store:store,
 content: () => (<NewPost/>)
 });
 }
 });

 FlowRouter.route('/welcome/:name', {
 name: 'welcome',
 action({name}) {
 mount(MainLayoutCtx, {
 store:store,
 content: () => (<Welcome name={name}/>)
 });
 }
 });

 FlowRouter.route('/todos', {
 name: 'todos',
 action() {
 mount(MainLayoutCtx, {
 store:store,
 content: () => (<Todo />)
 });
 }
 });
 }*/
