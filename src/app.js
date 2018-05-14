const ENTER_KEY = 13;

const addDeck = name => ({
	type: 'ADD_DECK',
	data: name
});

const showAddDeck = () => ({
	type: 'SHOW_ADD_DECK'
});

const hideAddDeck = () => ({
	type: 'HIDE_ADD_DECK'
});

const cards = (state, action) => {
	switch (action.type) {
		case 'ADD_CARD':
			let newCard = Object.assign({}, action.data, {
				score: 1,
				id: +new Date(),
			});

			return state.concat([newCard]);
		default:
			return state || [];
	}
};

const decks = (state, action) => {
	switch (action.type){
		case 'ADD_DECK':
			let newDeck= {
				name: action.data,
				id: +new Date()
			};
		
			return state.concat([newDeck]);
		default:
			return state || [];
	}
};

const addingDeck = (state, action) => {
	switch (action.type){
		case 'SHOW_ADD_DECK': return true;
		case 'HIDE_ADD_DECK': return false;
		default: return !!state; // double negative --> if it's true returns true; if it's false or undefined returns false
	}
};

const store = Redux.createStore(Redux.combineReducers({
	cards,
	decks,
	addingDeck
}));

store.subscribe(() => {
	console.log(store.getState());
});

const App = (props) => {
	return (
		<div className="app">
			{props.children}
		</div>
	);
}

class Sidebar extends React.Component {
	render() {
		let props = this.props;

		return (
			<div className="sidebar">
				<h2>All Decks</h2>
				<button onClick={ e => this.props.showAddDeck() }>New Deck</button>
				<ul>
					{props.decks.map((deck, i) =>
						<li key={i}>{deck.name}</li>
					)}
				</ul>
				{ props.addingDeck && <input ref='add' onKeyPress={this.createDeck.bind(this)} /> }
			</div>
		);
	}

	createDeck(evt){
		if (evt.which !== ENTER_KEY) return;
		var name = ReactDOM.findDOMNode(this.refs.add).value;
		this.props.addDeck(name);
		this.props.hideAddDeck();
	}
}

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