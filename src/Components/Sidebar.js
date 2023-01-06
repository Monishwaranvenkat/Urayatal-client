import React, { useRef,useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Avatar, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatList from "./ChatList";
import SearchItem from "./SearchItem";
import { useNavigate } from "react-router-dom";
import Avatar1 from "../img/Avatar1.png";
import "./Sidebar.css";
import { useSelector } from "react-redux";

export default function SideBar() {
	let navigate = useNavigate();
	const [searchResult, setSearchresult] = useState([]);
	const rooms = useSelector((state) => state.rooms !==null?state.rooms.value:null);
	const searchRef = useRef();
	const userName = localStorage.getItem('userName');
	
	
	const logout = (e) => {
		localStorage.clear();
		navigate("/");
	};
	// console.log("Sidebar")
	const closeSearchCard = () => {
		searchRef.current.value = "";
		setSearchresult([]);
	};
	const searchUser = (e)=>{
				e.preventDefault()
				if(e.target.value==="")
				{
					setSearchresult([]);
					return;
				}
				let result = rooms.filter((room)=>{
					let name = room.user1UserName !== userName
						? room.user1UserName
						: room.user2UserName;
					return (
						name.includes(e.target.value)
					);
				})
				setSearchresult(result);
	}

	

	

	return (
		<>
			<div className='sidebar'>
				<div className='sidebar-header'>
					<div className='user-info'>
						<Avatar src={Avatar1} />
						<span>{userName}</span>
					</div>
					<div>
						<IconButton onClick={logout}>
							<LogoutIcon sx={{ color: "#a7a5a5" }}></LogoutIcon>
						</IconButton>
					</div>
				</div>
				<div className='sidebar-search'>
					<div className='searchcontainer'>
						<SearchOutlinedIcon />
						<input
							placeholder='Search User'
							onChange={searchUser}
							type='text'
							ref={searchRef}
						></input>
					</div>
					<div className='searchResult'>
						{searchResult.length <= 0
							? null
							: searchResult.map((result) => (
									<SearchItem
										key={result.roomId}
										roomId={result.roomId}
										user={
											result.user1UserName !== userName
												? result.user1UserName
												: result.user2UserName
										}
										closeCard={closeSearchCard}
									/>
							  ))}
					</div>
				</div>

				<div className='chatlist'>
					{rooms === null ? (
						<p>Not rooms</p>
					) : (
						rooms.map((room) => (
							<ChatList
								key={room.roomId}
								roomId={room.roomId}
								user={
									room.user1UserName !== userName
										? room.user1UserName
										: room.user2UserName
								}
								lastMessage={
									room.messages.length - 1 >= 0
										? room.messages[room.messages.length - 1].data
										: ""
								}
							/>
						))
					)}
				</div>
			</div>
		</>
	);
}
