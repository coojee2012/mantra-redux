import React from 'react';
import {mount} from 'react-mounter';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {tokenLogin} from 'meteor/unicall:unicall-token-login';
import {Logger} from '../tools';

import MainLayout from './containers/main_layout';
import Main from './containers/main';
import SearchCustomer from '../customer/containers/searchCustomer';
import CreateCustomer from '../customer/containers/createCustomer';
import CreateTicket from '../tickets/containers/createTicket';

export default function (injectDeps, {Meteor, Store}) {
  const history = syncHistoryWithStore(browserHistory, Store);
  const MainLayoutCtx = injectDeps(MainLayout);
  const tryLogin = ()=> {
    if(Meteor.settings.public.debug){
      Logger('Mock login');
      tokenLogin('127.0.0.1:5005', '33333333');
    }else{
      UnicallPlugin.get('Agent.info', {token: true}, (result)=> {
        if (result) {
          Logger('Ready for login', result);
          tokenLogin(result.group, result.token);
        }
      }).catch(function (err) {
        Logger('Auto login error:',err);
        let retry = Session.get('loginRetry') == undefined ? 0 : Session.get('loginRetry');
        if (!Meteor.userId() && retry < 5) {
          Meteor.setTimeout(tryLogin, 1000);
          Session.set('loginRetry', retry + 1);
        }
      });
    }

  };

  //自动登录
  Meteor.startup(()=> {
    Tracker.autorun((c)=> {
      if (!Meteor.userId()) {
        tryLogin();
      } else {
        c.stop();
        ReactDOM.render(
          <Provider store={Store}>
            <Router history={history}>
              <Route path="/" component={MainLayoutCtx}>
                <IndexRoute component={Main}/>
                <Route path="search(/:key)(/:auto)" component={SearchCustomer}/>
                <Route path="customer/create" component={CreateCustomer}/>
                <Route path="ticket(/:cid)" components={CreateTicket}/>
              </Route>
            </Router>
          </Provider>, document.body
        );
      }
    });
  });

  Meteor.startup(() => {
  });
}
