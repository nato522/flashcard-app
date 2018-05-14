(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ENTER_KEY = 13;

var _addDeck = function _addDeck(name) {
	return {
		type: 'ADD_DECK',
		data: name
	};
};

var _showAddDeck = function _showAddDeck() {
	return {
		type: 'SHOW_ADD_DECK'
	};
};

var _hideAddDeck = function _hideAddDeck() {
	return {
		type: 'HIDE_ADD_DECK'
	};
};

var cards = function cards(state, action) {
	switch (action.type) {
		case 'ADD_CARD':
			var newCard = Object.assign({}, action.data, {
				score: 1,
				id: +new Date()
			});

			return state.concat([newCard]);
		default:
			return state || [];
	}
};

var decks = function decks(state, action) {
	switch (action.type) {
		case 'ADD_DECK':
			var newDeck = {
				name: action.data,
				id: +new Date()
			};

			return state.concat([newDeck]);
		default:
			return state || [];
	}
};

var addingDeck = function addingDeck(state, action) {
	switch (action.type) {
		case 'SHOW_ADD_DECK':
			return true;
		case 'HIDE_ADD_DECK':
			return false;
		default:
			return !!state; // double negative --> if it's true returns true; if it's false or undefined returns false
	}
};

var store = Redux.createStore(Redux.combineReducers({
	cards: cards,
	decks: decks,
	addingDeck: addingDeck
}));

store.subscribe(function () {
	console.log(store.getState());
});

var App = function App(props) {
	return React.createElement(
		'div',
		{ className: 'app' },
		props.children
	);
};

var Sidebar = function (_React$Component) {
	_inherits(Sidebar, _React$Component);

	function Sidebar() {
		_classCallCheck(this, Sidebar);

		return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
	}

	_createClass(Sidebar, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var props = this.props;

			return React.createElement(
				'div',
				{ className: 'sidebar' },
				React.createElement(
					'h2',
					null,
					'All Decks'
				),
				React.createElement(
					'button',
					{ onClick: function onClick(e) {
							return _this2.props.showAddDeck();
						} },
					'New Deck'
				),
				React.createElement(
					'ul',
					null,
					props.decks.map(function (deck, i) {
						return React.createElement(
							'li',
							{ key: i },
							deck.name
						);
					})
				),
				props.addingDeck && React.createElement('input', { ref: 'add', onKeyPress: this.createDeck.bind(this) })
			);
		}
	}, {
		key: 'createDeck',
		value: function createDeck(evt) {
			if (evt.which !== ENTER_KEY) return;
			var name = ReactDOM.findDOMNode(this.refs.add).value;
			this.props.addDeck(name);
			this.props.hideAddDeck();
		}
	}]);

	return Sidebar;
}(React.Component);

function run() {
	var state = store.getState();

	ReactDOM.render(React.createElement(
		App,
		null,
		React.createElement(Sidebar, {
			decks: state.decks,
			addingDeck: state.addingDeck,

			addDeck: function addDeck(name) {
				return store.dispatch(_addDeck(name));
			},
			showAddDeck: function showAddDeck() {
				return store.dispatch(_showAddDeck());
			},
			hideAddDeck: function hideAddDeck() {
				return store.dispatch(_hideAddDeck());
			}
		})
	), document.getElementById('root'));
}

run();

store.subscribe(run);

window.show = function () {
	return store.dispatch(_showAddDeck());
};
window.hide = function () {
	return store.dispatch(_hideAddDeck());
};
window.add = function () {
	return store.dispatch(_addDeck(new Date().toString()));
};

},{}]},{},[1]);
