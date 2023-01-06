import { createSlice } from "@reduxjs/toolkit";

const sort = (state,roomId)=>{
		state.value.sort(function (x, y) {
			return x.roomId === roomId || state.selected === x.roomId
				? -1
				: y.roomId === roomId
				? 1
				: 0;
		});
}

const initialState = {
	value:null,
	selected: null,
};


export const roomSlice = createSlice({
	name: "rooms",
	initialState,
	reducers: {
		addNewMessage: (state, action) => {
			let newMessage = action.payload;
			let room = state.value.find((room) => {
				return room.roomId === newMessage.chatRoomRoomId ? room : null;
			});
			room.messages.push(newMessage);
			sort(state, room.roomId);
		},
		setSelected: (state, action) => {
			state.selected = action.payload;
			sort(state, action.payload);
		},
		loadRoom: (state, action) => {
			state.value = action.payload;
			console.log("State load room",state.value);
			state.selected = state.value.length > 0 ? state.value[0].roomId : null;
		},
		addRoom:(state, action)=>{
			state.value.push(action.payload);
		}
	},
});


export const { loadRoom, addNewMessage, setSelected } = roomSlice.actions;

export default roomSlice.reducer;
