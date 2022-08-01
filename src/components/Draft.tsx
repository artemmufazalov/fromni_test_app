// Libs
import React from 'react';

// Types
import { IForms } from '../types';

type TDraftProps = {
	form: IForms;
};

const Draft: React.FC<TDraftProps> = ({ form }) => {
	return (
		<div className="draft">
			<span className="draft__cell">{form._id}</span>{' '}
			<span className="draft__cell">
				{form.activeChannels.join(', ')}
			</span>
		</div>
	);
};

export default Draft;
