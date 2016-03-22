import {createApp} from 'mantra-core';
import initContext from './configs/context';
import { createStore } from 'redux';

// Redux
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// modules
import coreModule from './modules/core';
import commentsModule from './modules/comments';
import todoModule from './modules/todos';
import customerModule from './modules/customer';
// Combine Reducers
const reducer = combineReducers({
  ...coreModule.reducers,
  ...todoModule.reducers,
  ...customerModule.reducers,
  routing: routerReducer
});

// Init Context
const context = initContext({reducer});

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(commentsModule);
app.loadModule(todoModule);
app.loadModule(customerModule);


app.init();
