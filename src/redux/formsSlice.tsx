// Libs
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import { TChannel, TChannelData, TKeyboardButton } from '../types';

interface IFormsSlice {
	activeChannels: TChannel[];
	vk: TChannelData;
	telegram: TChannelData;
	whatsApp: TChannelData;
	sms: TChannelData;
}

const initialState: IFormsSlice = {
	activeChannels: [],
	vk: {
		message: '',
		buttons: [],
	},
	telegram: {
		message: '',
		buttons: [],
	},
	whatsApp: {
		message: '',
		buttons: [],
	},
	sms: {
		message: '',
	},
};

export const formsSlice = createSlice({
	name: 'forms',
	initialState,
	reducers: {
		addChannel: (state, action: PayloadAction<TChannel>) => {
			if (!state.activeChannels.includes(action.payload)) {
				state.activeChannels.push(action.payload);
			}
		},
		removeChannel: (state, action: PayloadAction<TChannel>) => {
			state.activeChannels = state.activeChannels.filter(
				(ch) => ch !== action.payload
			);
			state[action.payload].message = '';
			if (state[action.payload].buttons) {
				state[action.payload].buttons = [];
			}
		},
		addButton: (
			state,
			action: PayloadAction<{
				channel: TChannel;
				button: TKeyboardButton;
			}>
		) => {
			let ch = action.payload.channel,
				bt = action.payload.button;
			if (ch !== 'sms') {
				state[ch].buttons?.push(bt);
			}
		},
		removeButton: (
			state,
			action: PayloadAction<{
				channel: TChannel;
				id: number;
			}>
		) => {
			let ch = action.payload.channel,
				id = action.payload.id;

			console.log(action.payload.id);
			if (ch !== 'sms') {
				state[ch].buttons = state[ch].buttons?.filter(
					(b) => b.id !== id
				);
			}
		},
		setMessage: (
			state,
			action: PayloadAction<{ channel: TChannel; message: string }>
		) => {
			let ch = action.payload.channel,
				mg = action.payload.message;

			state[ch].message = mg;
		},
	},
});

export const {
	addChannel,
	removeChannel,
	addButton,
	removeButton,
	setMessage,
} = formsSlice.actions;

export default formsSlice.reducer;
