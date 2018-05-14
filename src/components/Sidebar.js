import React from 'react';
import ReactDOM from 'react-dom';

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
};

export default Sidebar;