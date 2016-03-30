import {createApp} from 'mantra-core';
import initContext from './configs/context';
import { createStore } from 'redux';

// Redux
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
// modules
import coreModule from './modules/core';
import customerModule from './modules/customer';
import ticketModule from './modules/tickets';
// Combine Reducers
const reducer = combineReducers({
  ...coreModule.reducers,
  ...customerModule.reducers,
  ...ticketModule.reducers,
  form: formReducer,
  routing: routerReducer
});


// Init Context
const context = initContext({reducer});

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(customerModule);
app.loadModule(ticketModule);

app.init();
