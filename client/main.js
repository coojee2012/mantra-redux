import {createApp} from 'mantra-core';
import initContext from './configs/context';
import { createStore } from 'redux';
// modules
import coreModule from './modules/core';
import commentsModule from './modules/comments';
import todoModule from './modules/todos';
// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(commentsModule);
app.loadModule(todoModule);

app.init();
