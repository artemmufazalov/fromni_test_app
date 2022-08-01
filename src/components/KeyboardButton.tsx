// Libs
import React from 'react';

// Types
import { TChannel, TKeyboardButton } from '../types';

// Redux
import { removeButton } from '../redux/formsSlice';
import { useAppDispatch } from '../redux/store';

interface IButtonProps extends TKeyboardButton {
	id: number;
	channel: TChannel;
}

const KeyboardButton: React.FC<IButtonProps> = ({
	message,
	type,
	isLink,
	id,
	channel,
}) => {
	const dispatch = useAppDispatch();

	const onDelete = () => {
		dispatch(removeButton({ channel, id }));
	};

	return (
		<div className="keyboardButton">
			<div className="keyboardButton__typeBox">
				<span>
					<span className="keyboardButton__linkIcon">
						{isLink && (
							<img
								src={`${process.env.PUBLIC_URL}/assets/link.svg`}
								alt="Кнопка-ссылка"
							/>
						)}
					</span>
					<span className="keyboardButton__type">
						{type === 'inline' ? 'Inline' : 'Стандартная'}
					</span>
				</span>

				<span onClick={(_) => onDelete()}>
					<img
						className="keyboardButton__delete"
						src={`${process.env.PUBLIC_URL}/assets/cross.svg`}
						alt="Удалить кнопку"
					/>
				</span>
			</div>
			<div className="keyboardButton__text">{message}</div>
		</div>
	);
};

export default KeyboardButton;
