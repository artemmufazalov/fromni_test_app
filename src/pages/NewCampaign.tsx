// Libs
import React from 'react';

// Components
import AddChannel from '../components/AddChannel';
import InputForm from '../components/InputForm';

// Types
import { TChannel } from '../types';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addChannel } from '../redux/formsSlice';
import { selectActiveChannels } from '../redux/selectors';

const NewCampaign = () => {
	const dispatch = useAppDispatch();

	const activeChannels: TChannel[] = useAppSelector(selectActiveChannels);

	const onSave = () => {
		// Save form to Database
	};

	return (
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
	);
};

export default NewCampaign;
