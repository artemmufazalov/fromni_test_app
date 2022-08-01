// Libs
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
import { IForms } from '../types';
import { RootState } from './store';

// Redux
import { setDrafts } from './draftsSlice';

export const saveNewCampaign = createAsyncThunk<
	IForms,
	any,
	{ state: RootState }
>('drafts/saveNewCampaign', async (forms: IForms, { getState }) => {
	const url = getState().drafts.baseUrl;

	const { data } = await axios.post(`${url}/campaign/create`, { forms });

	return data.item;
});

export const fetchAllCampaigns = createAsyncThunk<
	IForms,
	any,
	{ state: RootState }
>('drafts/fetchAll', async (_, { getState, dispatch }) => {
	const url = getState().drafts.baseUrl;
	const { data } = await axios.get(`${url}/campaign/all`);

	dispatch(setDrafts(data.items));

	return data.items;
});
