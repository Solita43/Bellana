import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import projects from './projects';
import boards from './boards';
import cards from './cards';
import myTasks from './myTasks';
import boardTasks from './boardTasks';
import users from './users';

const rootReducer = combineReducers({
  session,
  users,
  projects,
  myTasks,
  boards,
  cards,
  boardTasks
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
