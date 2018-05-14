import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from './reducers';
import App from './components/App';
import Sidebar from './components/Sidebar';

const ENTER_KEY = 13;

const store = createStore(combineReducers(reducers));

store.subscribe(() => {
	console.log(store.getState());
});

function run(){
	let state = store.getState();

	ReactDOM.render((
		<Provider store={store}>
			<App>
				<Sidebar/>
			</App>
		</Provider>
	), document.getElementById('root'));
}

run();

store.subscribe(run);

window.show = () => store.dispatch(showAddDeck());
window.hide = () => store.dispatch(hideAddDeck());
window.add = () => store.dispatch(addDeck(new Date().toString()));