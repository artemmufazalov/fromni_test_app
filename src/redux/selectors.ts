// Types
import { TChannel, TChannelData } from '../types';
import { RootState } from './store';

export const selectActiveChannels = (state: RootState): TChannel[] =>
	state.forms.activeChannels;

export const selectChannelFormData =
	(channel: TChannel) =>
	(state: RootState): TChannelData =>
		state.forms[channel];
