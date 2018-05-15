import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Switch, Route }  from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './reducers';
reducers.routing = routerReducer;

import App from './components/App';
import VisibleCards from './components/VisibleCards';

const store = createStore(combineReducers(reducers));
const history = syncHistoryWithStore(createBrowserHistory(), store);

store.subscribe(() => {
	console.log(store.getState());
});

function run(){
	let state = store.getState();

	ReactDOM.render((
		<Provider store={store}>
			<Router history={history}>
				<Switch>
					<Route exact path='/' component={App}>
						<Route path='/deck/:deckId' component={VisibleCards}></Route>
					</Route>
				</Switch>
			</Router>
		</Provider>
	), document.getElementById('root'));
}

run();

store.subscribe(run);

window.show = () => store.dispatch(showAddDeck());
window.hide = () => store.dispatch(hideAddDeck());
window.add = () => store.dispatch(addDeck(new Date().toString()));