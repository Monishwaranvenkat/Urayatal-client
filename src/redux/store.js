import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./slice";

export const store = configureStore({
	reducer: {
		rooms: roomsReducer,
	},
});
