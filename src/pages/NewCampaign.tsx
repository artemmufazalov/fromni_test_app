// Libs
import React from 'react';
import { Link } from 'react-router-dom';

// Components
import AddChannel from '../components/AddChannel';
import InputForm from '../components/InputForm';

// Types
import { TChannel } from '../types';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addChannel, resetForm } from '../redux/formsSlice';
import { resetSaveCampaingStatus } from '../redux/draftsSlice';
import { saveNewCampaign } from '../redux/thunks';
import {
	selectActiveChannels,
	selectForms,
	selectSaveStatus,
} from '../redux/selectors';

const NewCampaign = () => {
	const dispatch = useAppDispatch();

	const activeChannels: TChannel[] = useAppSelector(selectActiveChannels),
		forms = useAppSelector(selectForms),
		status = useAppSelector(selectSaveStatus);

	const onSave = async () => {
		dispatch(saveNewCampaign(forms));
	};

	const onReset = () => {
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
					<h3>Кампания успешно сохранена</h3>
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
							{/* <button>Запустить</button> */}
							<button onClick={onSave}>Сохранить</button>
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
