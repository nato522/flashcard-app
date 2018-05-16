import React from 'react';
import { Router, Route }  from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from './Sidebar';
import VisibleCards from './VisibleCards';
import Toolbar from './Toolbar';

const mapStateToProps = (props, { params: { deckId} } ) => ({
	deckId
});

const App = ({deckId}) => {
	return (
		<div className="app">
			<Toolbar deckId={deckId} />
			<Sidebar />
			<Route path='/deck/:deckId' component={VisibleCards}/>
		</div>
	);
};

export default connect(mapStateToProps, null)(App);