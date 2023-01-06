import React from "react";
import { Avatar } from "@mui/material";
import "./Searchitem.css";
import Avatar13 from "../img/Avatar13.png";
import { setSelected } from "../redux/slice";
import { useDispatch } from "react-redux";
function SearchItem(props) {
	const dispatch = useDispatch();
	const { user, roomId, closeCard } = props;
	const handleClick = (e) => {
		dispatch(setSelected(roomId));
        closeCard();
	};

	return (
		<>
			<div className='search-item' onClick={handleClick}>
				<Avatar src={Avatar13} />
				<div className='searchuser-info'>
					<h2>{user}</h2>
					
				</div>
			</div>
		</>
	);
}

export default SearchItem;
