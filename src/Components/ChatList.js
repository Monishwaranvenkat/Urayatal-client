import React from "react";
import { Avatar } from "@mui/material";
import "./ChatList.css";
import Avatar13 from "../img/Avatar13.png";
import {setSelected } from "../redux/slice";
import { useDispatch } from "react-redux";
function ChatList(props) {
	const dispatch = useDispatch();
	const { user, lastMessage,roomId } = props;
	const handleClick = (e) => {
		dispatch(setSelected(roomId));
	};

  return (
		<>
			<div className='chat-item' onClick={handleClick}>
				<Avatar src={Avatar13} />
				<div className='userchat-info'>
					<h2>{user}</h2>
					<p>{lastMessage}</p>
				</div>
				<span>3</span>
			</div>
		</>
	);
}

export default ChatList;
