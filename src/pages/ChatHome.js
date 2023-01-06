import "./ChatHome.css";
import { useState,useEffect } from "react";
import SideBar from "../Components/Sidebar"
import Chat from "../Components/Chat"
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadRoom, addNewMessage } from "../redux/slice";
import Ably from "ably/promises";
import { configureAbly, useChannel, usePresence } from "@ably-labs/react-hooks";

export default function ChatHome() {

	//const apiURL = process.env.API_URL;
	var ably = null;
	const [loading, setLoading] = useState(true);
	// const axios = require("axios");
	const dispatch = useDispatch();
	
	//const ably = ;
	

	// const connectAbly = async ()=>{ 

	// 	let JWT = localStorage.getItem("jwtToken");
	// 	let ably = await new Ably.Realtime({
	// 		token: JWT,
	// 	});
	// 		ably.connection.on("connected", () => {
	// 			//setAbly(ably);
	// 			console.log("Connected to Ably!", ably);
	// 		});
	// 		ably.connection.on("failed", () => {
	// 			console.log(ably.connection.errorReason);
	// 		});


	// 		const [channel] = useChannel("your-channel-name", (message) => {
	// 			updateMessages((prev) => [...prev, message]);
	// 		});
	// }



	const loadData = async ()=>{

			let userName = localStorage.getItem("userName");
			await axios
				.get("http://localhost:8080/getChats", {
					params: { userName: userName },
				})
				.then(function (response) {
					console.log("response", response);
					if (response.data.status !== "SUCCESS") {
						alert("Something went wrong ? (: ");
						setLoading(false);
					} else {
						dispatch(loadRoom(response.data.result));
						setLoading(false);
					}
				})
				.catch(function (error) {
					console.error(error);
					alert("Something went wrong ? (: ");
					setLoading(false);
				});
	}

	
	useEffect(() => {
		  loadData();
		  
	}, []);
		//console.log("ChatHome")
	 configureAbly({ token: localStorage.getItem("jwtToken") });
		const [channel] = useChannel(localStorage.getItem("channel"), (message) => {
		dispatch(addNewMessage(JSON.parse(message.data)));
		});

	
	
		const [presenceData] = usePresence("Presence", "active");

	

	return (
		<>
			{loading ? (
				<div className='loader-container'>
					<div className='loadingio-spinner-ellipsis-3r89ten24b4'>
						<div className='ldio-q2o31whp93r'>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				</div>
			) : (
				<div className='chatroot'>
					<SideBar />
					<Chat />
				</div>
			)}
		</>
	);
}
