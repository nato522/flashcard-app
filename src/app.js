import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { addDeck, showAddDeck, hideAddDeck } from './actions';
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

	ReactDOM.render((<App>
		<Sidebar
			decks={state.decks}
			addingDeck={state.addingDeck}

			addDeck={name => store.dispatch(addDeck(name))}
			showAddDeck={() => store.dispatch(showAddDeck())}
			hideAddDeck={() => store.dispatch(hideAddDeck())}
		/>
	</App>), document.getElementById('root'));
}

run();

store.subscribe(run);

window.show = () => store.dispatch(showAddDeck());
window.hide = () => store.dispatch(hideAddDeck());
window.add = () => store.dispatch(addDeck(new Date().toString()));