import React from 'react';
import { Router, Route }  from 'react-router-dom';

import Sidebar from './Sidebar';
import VisibleCards from './VisibleCards';

// const mapStateToProps = (props, { params: { deckId} } ) => ({
// 	deckId
// });

const App = () => {
	return (
		<div className="app">
			<Sidebar />
			<Route path='/deck/:deckId' component={VisibleCards}/>
		</div>
	);
};

export default App;