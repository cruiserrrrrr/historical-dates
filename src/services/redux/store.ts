import { configureStore } from '@reduxjs/toolkit';
import eventsSlice from './slices/eventsSlice';

export const store = configureStore({
	reducer: {
		events: eventsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

