// Libs
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import { IForms, TFetchStatus } from '../types';

// Thunks
import { deleteCampaign, fetchAllCampaigns, saveNewCampaign } from './thunks';

interface IDraftsSlice {
	baseUrl: string;
	fetchAllStatus: TFetchStatus;
	saveCampaingStatus: TFetchStatus;
	drafts: IForms[];
}

const initialState: IDraftsSlice = {
	baseUrl: 'http://localhost:3001',
	fetchAllStatus: 'idle',
	saveCampaingStatus: 'idle',
	drafts: [],
};

export const draftsSlice = createSlice({
	name: 'drafts',
	initialState,
	reducers: {
		setDrafts: (state, action: PayloadAction<IForms[]>) => {
			state.drafts = action.payload;
		},
		resetSaveCampaingStatus: (state) => {
			state.saveCampaingStatus = 'idle';
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllCampaigns.pending, (state) => {
			state.fetchAllStatus = 'pending';
		});
		builder.addCase(fetchAllCampaigns.fulfilled, (state, action) => {
			state.fetchAllStatus = 'success';
		});
		builder.addCase(fetchAllCampaigns.rejected, (state) => {
			state.fetchAllStatus = 'error';
		});
		builder.addCase(saveNewCampaign.pending, (state) => {
			state.saveCampaingStatus = 'pending';
		});
		builder.addCase(saveNewCampaign.fulfilled, (state) => {
			state.saveCampaingStatus = 'success';
		});
		builder.addCase(saveNewCampaign.rejected, (state) => {
			state.saveCampaingStatus = 'error';
		});
		builder.addCase(deleteCampaign.pending, (state) => {
			state.saveCampaingStatus = 'pending';
		});
		builder.addCase(deleteCampaign.fulfilled, (state) => {
			state.saveCampaingStatus = 'success';
		});
		builder.addCase(deleteCampaign.rejected, (state) => {
			state.saveCampaingStatus = 'error';
		});
	},
});

export const { setDrafts, resetSaveCampaingStatus } = draftsSlice.actions;

export default draftsSlice.reducer;
