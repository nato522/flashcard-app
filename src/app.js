import { addDeck, showAddDeck, hideAddDeck } from './actions';
import * as reducers from './reducers';

const ENTER_KEY = 13;

const store = Redux.createStore(Redux.combineReducers(reducers));

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

	componentDidUpdate(){
		var el = ReactDOM.findDOMNode(this.refs.add);
		if (el) el.focus();
	}

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