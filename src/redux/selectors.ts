// Types
import { IForms, TChannel, TChannelData, TFetchStatus } from '../types';
import { RootState } from './store';

// FormsSlice
export const selectActiveChannels = (state: RootState): TChannel[] =>
	state.forms.activeChannels;

export const selectChannelFormData =
	(channel: TChannel) =>
	(state: RootState): TChannelData =>
		state.forms[channel];

export const selectForms = (state: RootState): IForms => state.forms;

// DraftsSlice
export const selectFetchAllStatus = (state: RootState): TFetchStatus =>
	state.drafts.fetchAllStatus;

export const selectSaveStatus = (state: RootState): TFetchStatus =>
	state.drafts.saveCampaingStatus;

export const selectAllDrafts = (state: RootState): IForms[] =>
	state.drafts.drafts;
