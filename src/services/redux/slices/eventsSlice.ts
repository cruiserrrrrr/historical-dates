import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IEventsSlice {
	event: number;
}

const initialState: IEventsSlice = {
	event: 0,
};

const eventsSlice = createSlice({
	name: 'eventsSlice',
	initialState,
	reducers: {
		setCurrentEvent(state, action: PayloadAction<number>) {
			state.event = action.payload;
		},
	},
});

export const { setCurrentEvent } = eventsSlice.actions;

export const getCurrentEvent = (state: RootState): number => state.events.event;

export default eventsSlice.reducer;


