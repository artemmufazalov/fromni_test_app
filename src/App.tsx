// Libs
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Styles
import './styles/app.scss';

// Pages
import { NewCampaign, Drafts } from './pages';

// Components
import { Header } from './components';

const App = () => {
	return (
		<div>
			<Header />
			<Routes>
				<Route path={''} element={<NewCampaign />} />
				<Route path={'drafts'} element={<Drafts />} />
			</Routes>
		</div>
	);
};

export default App;
