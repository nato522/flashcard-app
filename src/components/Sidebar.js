import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { addDeck, showAddDeck, hideAddDeck } from '../actions';

const ENTER_KEY = 13;
/*
	decks={state.decks}
	addingDeck={state.addingDeck}

	addDeck={name => store.dispatch(addDeck(name))}
	showAddDeck={() => store.dispatch(showAddDeck())}
	hideAddDeck={() => store.dispatch(hideAddDeck())}
*/

const mapStateToProps = ({ decks, addingDeck }) => ({
	decks,
	addingDeck,
});

const mapDispatchToProps = dispatch => ({
	addDeck: name => dispatch(addDeck(name)),
	showAddDeck: () => dispatch(showAddDeck()),
	hideAddDeck: () => dispatch(hideAddDeck()),
});

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
						<li key={i}>
							<Link to={`/deck/${deck.id}`}>{deck.name}</Link>
						</li>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);