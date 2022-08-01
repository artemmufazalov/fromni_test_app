// Libs
import React from 'react';

// Components
import KeyboardButton from './KeyboardButton';
import AddAnswerButton from './AddAnswerButton';

// Types
import { TChannel } from '../types';

// MetaData
import channelsMetaData, { channelsNames } from '../metaData';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setMessage, removeChannel } from '../redux/formsSlice';
import { selectChannelFormData } from '../redux/selectors';

interface IInputFormProps {
	channel: TChannel;
}

const InputForm: React.FC<IInputFormProps> = ({ channel }) => {
	const dispatch = useAppDispatch();

	const chData = useAppSelector(selectChannelFormData(channel));

	const [messageFormError, setMessageFormError] = React.useState<string>();

	const onInputFormChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		let currMessage = event.target.value,
			limit = channelsMetaData[channel].maxLength;

		if (limit && currMessage.length > limit) {
			setMessageFormError(
				`Длина сообщения не может быть больше ${limit} символов!`
			);
			if (currMessage.length < chData.message.length) {
				dispatch(setMessage({ channel, message: event.target.value }));
			}
		} else {
			setMessageFormError('');
			dispatch(setMessage({ channel, message: event.target.value }));
		}
	};

	return (
		<div className="inputForm">
			<div className="inputForm__top">
				<span>
					<h2>Канал:</h2>
					<img
						src={`${process.env.PUBLIC_URL}/assets/${channel}.svg`}
						alt={channel}
					/>
					<h2>
						{
							channelsNames.filter(
								(tpl) => tpl[0] === channel
							)[0][1]
						}
					</h2>
				</span>
				<img
					className="inputForm__top__delete"
					src={`${process.env.PUBLIC_URL}/assets/cross.svg`}
					alt="Удалить канал"
					onClick={() => dispatch(removeChannel(channel))}
				/>
			</div>

			<h3>Сообщение</h3>
			<div className="inputForm__mainMessage">
				<textarea value={chData.message} onChange={onInputFormChange} />
			</div>

			{channelsMetaData[channel].maxLength && (
				<span className="inputForm__mainMessageSymbolsCount">
					{chData.message.length}/
					{channelsMetaData[channel].maxLength}
				</span>
			)}
			<div className="inputForm__mainMessageError">
				{messageFormError}
			</div>
			{channel !== 'sms' && (
				<div>
					<h3>Кнопки</h3>
					<div className="inputForm__keyboardButtonsContainer">
						{channelsMetaData[channel].buttons &&
							chData.buttons?.map((bt, idx) => (
								<KeyboardButton
									{...bt}
									key={idx}
									channel={channel}
								/>
							))}
					</div>
					<AddAnswerButton channel={channel} />
				</div>
			)}
		</div>
	);
};

export default InputForm;
