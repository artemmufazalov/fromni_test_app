// Libs
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
	const { pathname } = useLocation();

	return (
		<div className="header">
			<Link to="/">
				<span className={pathname === '/' ? 'active' : ''}>
					Новая кампания
				</span>
			</Link>
			<Link to="/drafts">
				<span className={pathname.includes('/drafts') ? 'active' : ''}>
					Сохраненные
				</span>
			</Link>
		</div>
	);
};

export default Header;
