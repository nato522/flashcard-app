import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './reducers';
reducers.routing = routerReducer;

import * as localStore from './localStore';

import App from './components/App';
import VisibleCards from './components/VisibleCards';

const store = createStore(combineReducers(reducers), localStore.get());
const history = syncHistoryWithStore(createBrowserHistory(), store);

store.subscribe(() => {
	console.log(store.getState());
});

function run(){
	let state = store.getState();

	localStore.set(state, ['decks', 'cards']);

	ReactDOM.render((
		<Provider store={store}>
			<BrowserRouter history={history}>
				<Route path='/' component={App}/>
			</BrowserRouter>
		</Provider>
	), document.getElementById('root'));
}

run();

store.subscribe(run);

window.show = () => store.dispatch(showAddDeck());
window.hide = () => store.dispatch(hideAddDeck());
window.add = () => store.dispatch(addDeck(new Date().toString()));