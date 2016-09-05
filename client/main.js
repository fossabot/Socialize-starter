import {createApp} from 'mantra-core';
import initContext from './configs/context';
// Redux
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// modules
import coreModule from './modules/core';
import usersModule from './modules/users';
import messagingModule from './modules/messaging';
import pagesModule from './modules/pages';

// Combine Reducers
const reducer = combineReducers({
  ...coreModule.reducer,
  ...usersModule.reducer,
  ...messagingModule.reducer,
  ...pagesModule.reducer,
  routing: routerReducer
});

// init context
const context = initContext({reducer});

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(usersModule);
app.loadModule(messagingModule);
app.loadModule(pagesModule);
app.init();
