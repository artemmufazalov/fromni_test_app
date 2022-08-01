// Libs
import React from 'react';

// Types
import { TButtonTypes, TChannel } from '../types';

// MetaData
import channelsMetaData from '../metaData';

// Redux
import { addButton } from '../redux/formsSlice';
import { selectChannelFormData } from '../redux/selectors';
import { useAppDispatch, useAppSelector } from '../redux/store';

interface IAddMediaProps {
	channel: TChannel;
}

const AddAnswerButton: React.FC<IAddMediaProps> = ({ channel }) => {
	const chData = useAppSelector(selectChannelFormData(channel));

	const idRef = React.useRef(0);
	const dispatch = useAppDispatch();

	const [error, setError] = React.useState('');
	const [type, setType] = React.useState<'standart' | 'inline'>('standart');
	const [isLink, setIsLink] = React.useState(false);
	const [message, setMessage] = React.useState('');

	const maxMsgLength =
		channel !== 'sms'
			? channelsMetaData[channel].buttons?.[type].maxLength
			: false;

	const onTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setType(event.target.value as TButtonTypes);
	};
	const onIsLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let val = event.target.checked;
		setIsLink(val);
	};
	const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (maxMsgLength && message.length >= maxMsgLength) {
			setError(
				`Длина кнопки не может превышать ${maxMsgLength} символов!`
			);
			if (event.target.value.length < message.length) {
				setMessage(event.target.value);
			}
		} else {
			setError('');
			setMessage(event.target.value);
		}
	};

	const onAdd = () => {
		if (channel === 'sms') {
			return;
		}
		if (message.length === 0) {
			setError(`Нельзя добавить кнопку без сообщения!`);
			return;
		}

		if (maxMsgLength && message.length > maxMsgLength) {
			setError(
				`Длина кнопки не может превышать ${maxMsgLength} символов!`
			);
			return;
		}

		if (type === 'inline') {
			const qInline = chData.buttons?.filter(
					(bt) => bt.type === 'inline'
				).length,
				qInlineLinks = chData.buttons?.filter(
					(bt) => bt.type === 'inline' && bt.isLink
				).length,
				maxQInline =
					channelsMetaData[channel].buttons?.inline.maxQuantity,
				maxQInlineLinks =
					channelsMetaData[channel].buttons?.inline.maxWithLink;

			if (maxQInline && qInline && qInline >= maxQInline) {
				setError(
					`Количество Inline кнопок не может превышать ${maxQInline}`
				);
				return;
			}

			if (
				maxQInlineLinks &&
				qInlineLinks &&
				qInlineLinks >= maxQInlineLinks
			) {
				setError(
					`Количество Inline кнопок с ссылками не может превышать ${maxQInlineLinks}`
				);
				return;
			}
		}
		if (type === 'standart') {
			const qStandart = chData.buttons?.filter(
					(bt) => bt.type === 'standart'
				).length,
				qStandartLinks = chData.buttons?.filter(
					(bt) => bt.type === 'standart' && bt.isLink
				).length,
				maxQStandart =
					channelsMetaData[channel].buttons?.standart.maxQuantity,
				maxQStandartLinks =
					channelsMetaData[channel].buttons?.standart.maxQuantity;

			if (maxQStandart && qStandart && qStandart >= maxQStandart) {
				setError(
					`Количество стандартных кнопок не может превышать ${maxQStandart}`
				);
				return;
			}

			if (
				maxQStandartLinks &&
				qStandartLinks &&
				qStandartLinks >= maxQStandartLinks
			) {
				setError(
					`Количество стандартных кнопок с ссылками не может превышать ${maxQStandartLinks}`
				);
				return;
			}
		}

		dispatch(
			addButton({
				channel,
				button: { id: idRef.current, message, type, isLink },
			})
		);
		setError('');
		setMessage('');
		idRef.current = idRef.current + 1;
	};

	return (
		<div className="addAnswerButton">
			<div className="addAnswerButton__title">Новая кнопка</div>
			<div className="addAnswerButton__label">Сообщение:</div>
			<div>
				<textarea value={message} onChange={onMessageChange} />
			</div>
			{maxMsgLength && (
				<div className="addAnswerButton__lengthLimit">
					{message.length}/{maxMsgLength}
				</div>
			)}
			<div className="addAnswerButton__label">
				Тип (Стандартная или Inline):
			</div>
			<select
				name="type"
				id="type"
				onChange={(event) => onTypeChange(event)}>
				<option value="standart">Стандартная</option>
				<option value="inline">Inline</option>
			</select>
			<div>
				<span className="addAnswerButton__label">Кнопка ссылка:</span>
				<input
					type="checkbox"
					onChange={onIsLinkChange}
					checked={isLink}
					disabled={
						!channelsMetaData[channel].buttons?.[type].isLinkAllowed
					}
				/>
			</div>

			<div className="addAnswerButton__error">{error}</div>
			<div className="addAnswerButton__addButton">
				<img
					src={`${process.env.PUBLIC_URL}/assets/plus.svg`}
					alt="Добавить кнопку"
				/>
				<button onClick={onAdd}>Добавить кнопку</button>
			</div>
		</div>
	);
};

export default AddAnswerButton;
