// Libs
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';

// Components
import AddChannel from '../components/AddChannel';
import InputForm from '../components/InputForm';

// Types
import { TChannel } from '../types';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addChannel, resetForm } from '../redux/formsSlice';
import { resetSaveCampaingStatus } from '../redux/draftsSlice';
import {
	deleteCampaign,
	fetchSingleCampaign,
	saveNewCampaign,
} from '../redux/thunks';
import {
	selectActiveChannels,
	selectForms,
	selectSaveStatus,
} from '../redux/selectors';

const NewCampaign = () => {
	const dispatch = useAppDispatch(),
		navigate = useNavigate();

	const { search } = useLocation();
	const id =
		qs.parse(search)['id'] ||
		qs.parse(search)['?id'] ||
		qs.parse(search)['&id'];

	const [addCampaignError, setAddCampaignError] = React.useState('');

	React.useEffect(() => {
		const fetchSingle = async () => {
			dispatch(fetchSingleCampaign(id as string));
		};
		if (id) {
			fetchSingle();
		}
	}, [id, dispatch]);

	React.useEffect(() => {
		dispatch(resetSaveCampaingStatus());
	}, [id, dispatch]);

	const activeChannels: TChannel[] = useAppSelector(selectActiveChannels),
		forms = useAppSelector(selectForms),
		status = useAppSelector(selectSaveStatus);

	const onSave = async () => {
		if (
			activeChannels.filter((name) => forms[name].message.length > 0)
				.length === activeChannels.length
		) {
			dispatch(saveNewCampaign(forms));
			dispatch(resetForm());
		} else {
			setAddCampaignError(
				'Сообщения для выбранных каналов не могут быть пустыми!'
			);
		}
	};

	const onDelete = async () => {
		if (forms._id) {
			dispatch(deleteCampaign(forms._id));
		}
	};

	const onReset = () => {
		navigate('/');
		dispatch(resetForm());
		dispatch(resetSaveCampaingStatus());
	};

	return (
		<div>
			{status === 'pending' && <div>Загрузка</div>}
			{status === 'error' && (
				<div>Что-то пошло не так. Попробуйте снова</div>
			)}
			{status === 'success' && (
				<div className="newCampaign__success">
					<h3>Кампания успешно обновлена</h3>
					<Link to="/drafts">Ко всем кампаниям</Link>
					<span onClick={onReset}>Новая кампания</span>
				</div>
			)}

			{status === 'idle' && (
				<div className="newCampaign">
					<div className="newCampaign__formsWrapper">
						{activeChannels.map((ch, idx) => (
							<InputForm channel={ch} key={idx} />
						))}
						<div className="newCampaign__error">
							{addCampaignError}
						</div>
					</div>

					{activeChannels.length >= 4 ? (
						''
					) : (
						<AddChannel
							activeChannels={activeChannels}
							addChannel={(channel: TChannel) =>
								dispatch(addChannel(channel))
							}
						/>
					)}
					{activeChannels.length > 0 ? (
						<span className="newCampaign__buttons">
							<button onClick={onReset}>Новая</button>
							<button onClick={onSave}>Сохранить</button>
							{forms._id && (
								<button onClick={onDelete}>Удалить</button>
							)}
						</span>
					) : (
						''
					)}
				</div>
			)}
		</div>
	);
};

export default NewCampaign;
