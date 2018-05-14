(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var addDeck = exports.addDeck = function addDeck(name) {
  return { type: 'ADD_DECK', data: name };
};
var showAddDeck = exports.showAddDeck = function showAddDeck() {
  return { type: 'SHOW_ADD_DECK' };
};
var hideAddDeck = exports.hideAddDeck = function hideAddDeck() {
  return { type: 'HIDE_ADD_DECK' };
};

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actions = require('./actions');

var _reducers = require('./reducers');

var reducers = _interopRequireWildcard(_reducers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ENTER_KEY = 13;

var store = Redux.createStore(Redux.combineReducers(reducers));

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
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var el = ReactDOM.findDOMNode(this.refs.add);
			if (el) el.focus();
		}
	}, {
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
				return store.dispatch((0, _actions.addDeck)(name));
			},
			showAddDeck: function showAddDeck() {
				return store.dispatch((0, _actions.showAddDeck)());
			},
			hideAddDeck: function hideAddDeck() {
				return store.dispatch((0, _actions.hideAddDeck)());
			}
		})
	), document.getElementById('root'));
}

run();

store.subscribe(run);

window.show = function () {
	return store.dispatch((0, _actions.showAddDeck)());
};
window.hide = function () {
	return store.dispatch((0, _actions.hideAddDeck)());
};
window.add = function () {
	return store.dispatch((0, _actions.addDeck)(new Date().toString()));
};

},{"./actions":1,"./reducers":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var cards = exports.cards = function cards(state, action) {
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

var decks = exports.decks = function decks(state, action) {
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

var addingDeck = exports.addingDeck = function addingDeck(state, action) {
	switch (action.type) {
		case 'SHOW_ADD_DECK':
			return true;
		case 'HIDE_ADD_DECK':
			return false;
		default:
			return !!state; // double negative --> if it's true returns true; if it's false or undefined returns false
	}
};

},{}]},{},[2]);
