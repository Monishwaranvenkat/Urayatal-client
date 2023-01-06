import React, {  useEffect, useRef} from "react";
import { Avatar, IconButton } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import avatar2 from "../img/Avatar2.png"
import {useDispatch } from "react-redux";
import { addNewMessage} from "../redux/slice";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Chat.css";

function Chat() {
	const room = useSelector((state) =>{
		if (state.rooms != null && state.rooms.selected != null) {
			return state.rooms.value.find((room) => {
				return room.roomId === state.rooms.selected ? room : null;
			});
		}
		return null; 
	}
	
	);
	const userName = localStorage.getItem("userName");
	const inputRef = useRef();
	const messagesEndRef = useRef(null);
	const dispatch = useDispatch();
	

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
	};

	


	useEffect(scrollToBottom, [room]);


	const handleSubmit = (e) => {
		e.preventDefault();

		let data = inputRef.current.value;
		if(data==="")
		{return}
		let to = room.user1UserName === userName ? room.user2UserName : room.user1UserName;

		let newMessage = {
			data: data,
			messageTo: to,
			messageFrom: userName,
			type: "Text",
			timestamp: new Date().toISOString(),
			status: "UNREAD",
			chatRoomRoomId: room.roomId,
		};
		axios
			.post("http://localhost:8080/sendMessage", newMessage)
			.then((res) => {
				if (res.data.status === "SUCCESS") {
					dispatch(addNewMessage(res.data.result));
				} else {
				}
			})
			.catch((err) => {});
		
		inputRef.current.value="";
	};
	
	//console.log("chat");
	return (
		<>
			<div className='chat-container'>
				<div className='chat-header'>
					{room !== null ? (
						<>
							<div className='chatuser-info'>
								<Avatar src={avatar2} />
								<h3>
									{room.user1UserName !== userName
										? room.user1UserName
										: room.user2UserName}
								</h3>
							</div>
							<div className=''>
								<VideocamIcon />
							</div>{" "}
						</>
					) : (
						""
					)}
				</div>
				<div className='chat-body'>
					{room !== null ? (
						room.messages.map((chat, index) => (
							<p
								key={index}
								className={`chat-messages ${
									chat.messageFrom === userName ? "chat-reciver" : ""
								}`}
							>
								<span className='chat-name'>{chat.messageFrom}</span>
								{chat.data}
								<br></br>
								<span className='chat-timestamp'>
									{new Date(chat.timestamp).toLocaleString()}
								</span>
							</p>
						))
					) : (
						<p>No Chats to display</p>
					)}
					<div ref={messagesEndRef} />
				</div>

				<div className='chat-footer'>
					<IconButton>
						<EmojiEmotionsIcon sx={{ color: "#a7a5a5" }} />
					</IconButton>
					<IconButton>
						<AttachFileIcon sx={{ color: "#a7a5a5" }} />
					</IconButton>

					<form action='#' onSubmit={handleSubmit} return='false'>
						<input placeholder='Enter your message' ref={inputRef} />
						<IconButton type='submit'>
							<SendIcon />
						</IconButton>
					</form>
				</div>
			</div>
		</>
	);
}
export default Chat;
