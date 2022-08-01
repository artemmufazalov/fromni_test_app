// Libs
import React from 'react';

// Components
import { Draft } from '../components';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchAllCampaigns } from '../redux/thunks';
import { selectAllDrafts, selectFetchAllStatus } from '../redux/selectors';

const Drafts = () => {
	const dispatch = useAppDispatch();

	const status = useAppSelector(selectFetchAllStatus),
		drafts = useAppSelector(selectAllDrafts);

	React.useState(() => {
		const fetch = async () => {
			dispatch(fetchAllCampaigns(''));
		};
		fetch();
	});

	return (
		<div className="draftsContainer">
			{status === 'error' && (
				<div>
					Что-то пошло не так. Попробуйте обновить страницу или
					вернуться позднее
				</div>
			)}

			{status === 'pending' && <div>Загрузка</div>}
			{status === 'success' && (
				<span className="draft">
					<span className="draft__cell">ID</span>
					<span className="draft__cell">Каналы</span>
				</span>
			)}
			{status === 'success' &&
				drafts.map((d) => <Draft form={d} key={d._id} />)}
		</div>
	);
};

export default Drafts;
