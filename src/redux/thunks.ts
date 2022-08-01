// Libs
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
import { IForms } from '../types';
import { RootState } from './store';

// Redux
import { setDrafts } from './draftsSlice';
import { setCurrentForm } from './formsSlice';

export const saveNewCampaign = createAsyncThunk<
	IForms,
	any,
	{ state: RootState }
>('drafts/saveNewCampaign', async (forms: IForms, { getState }) => {
	const url = getState().drafts.baseUrl;
	let data;

	if (forms._id) {
		const res = await axios.put(`${url}/campaign/update/${forms._id}`, {
			forms,
		});
		data = res.data;
	} else {
		const res = await axios.post(`${url}/campaign/create`, { forms });
		data = res.data;
	}
	return data.item;
});

export const fetchAllCampaigns = createAsyncThunk<
	IForms[],
	any,
	{ state: RootState }
>('drafts/fetchAll', async (_, { getState, dispatch }) => {
	const url = getState().drafts.baseUrl;
	const { data } = await axios.get(`${url}/campaign/all`);

	dispatch(setDrafts(data.items));

	return data.items;
});

export const fetchSingleCampaign = createAsyncThunk<
	IForms,
	string,
	{ state: RootState }
>('drafts/fetchSingleCampaign', async (id, { getState, dispatch }) => {
	const url = getState().drafts.baseUrl;
	const { data } = await axios.get(`${url}/campaign/${id}`);

	dispatch(setCurrentForm(data.item));

	return data.item;
});

export const deleteCampaign = createAsyncThunk<
	void,
	string,
	{ state: RootState }
>('drafts/deleteCampaign', async (id, { getState }) => {
	const url = getState().drafts.baseUrl;

	await axios.delete(`${url}/campaign/${id}`);
});
