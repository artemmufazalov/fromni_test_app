// Libs
import React from 'react';
import { Link } from 'react-router-dom';

// Types
import { IForms } from '../types';

type TDraftProps = {
	form: IForms;
};

const Draft: React.FC<TDraftProps> = ({ form }) => {
	return (
		<div className="draft">
			<span className="draft__cell">
				<Link to={`/?id=${form._id}`}>{form._id}</Link>
			</span>{' '}
			<span className="draft__cell">
				{form.activeChannels.join(', ')}
			</span>
		</div>
	);
};

export default Draft;
