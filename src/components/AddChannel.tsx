// Libs
import React from 'react';

// Types
import { TChannel } from '../types';

// MetaData
import { channelsNames } from '../metaData';

interface IAddMediaProps {
	activeChannels: string[];
	addChannel: (name: TChannel) => void;
}

const AddChannel: React.FC<IAddMediaProps> = ({
	activeChannels,
	addChannel,
}) => {
	const options = channelsNames.filter(
		(opt) => !activeChannels.includes(opt[0])
	);

	const [selected, setSelected] = React.useState(options[0][0]);

	const changeChannel = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelected(event.target.value);
	};

	const onAdd = () => {
		addChannel(selected as TChannel);
		if (options.length > 1) {
			setSelected(options[1][0]);
		} else {
			setSelected(options[0][0]);
		}
	};

	// Нужно, чтобы добавить дополнительное обновление компонента
	// Без него не обновляется ссылка на иконку социальной сети
	React.useEffect(() => {}, [activeChannels]);

	return (
		<div className="addChannel">
			<img
				src={`${process.env.PUBLIC_URL}/assets/${selected}.svg`}
				alt={selected}
				className={'addChannel__channelIcon'}></img>
			<select
				name="channel"
				id="channel"
				value={selected}
				onChange={changeChannel}>
				{options.map((opt) => (
					<option value={opt[0]} key={opt[0]}>
						{opt[1]}
					</option>
				))}
			</select>
			<span className="addChannel__addButton">
				<img
					src={`${process.env.PUBLIC_URL}/assets/plus.svg`}
					alt="Добавить канал"
					className={'addChannel__addButton__plusIcon'}
				/>
				<button onClick={onAdd}>Добавить канал</button>
			</span>
		</div>
	);
};

export default AddChannel;
