import React, { useState } from "react";
import FormInput from "../Components/FormInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./form.css";

function Login() {
	const [errmsg, seterrMsg] = useState(false);
	let navigate = useNavigate();

	const [values, setValues] = useState({
		userName: "",
		password: "",
	});

	const inputs = [
		{
			id: 1,
			name: "userName",
			type: "text",
			placeholder: "Username",
			required: true,
		},
		{
			id: 2,
			name: "password",
			type: "password",
			placeholder: "Password",
			required: true,
		},
	];

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handlesubmit = (e) => {
		e.preventDefault();
		if (values.Username !== "" && values.password !== "") {
			localStorage.clear();
			axios
				.post("http://localhost:8080/login", values)
				.then((res) => {
					console.log(res.data);
					if (res.data.status === "SUCCESS") {

						seterrMsg(false);
						localStorage.setItem("userName", res.data.result.userName);
						localStorage.setItem("jwtToken", res.data.result.jwtToken);
						localStorage.setItem("channel", res.data.result.channelId);

						navigate("/chat");
					} else {
						seterrMsg(true);
					}
				})
				.catch((err) => {
					seterrMsg(true);
				});
		} else {
			seterrMsg(true);
		}
	};

	return (
		<>
			<div className='form-container'>
				<form onSubmit={handlesubmit}>
					<div className='form'>
						<h1>Login</h1>
						{inputs.map((input) => (
							<FormInput
								key={input.id}
								{...input}
								value={values[input.name]}
								onChange={onChange}
							/>
						))}
						<span className={errmsg ? "err-msg" : "hide"}>
							Username or password is incorrect {errmsg}
						</span>
						<button className='submit-button' type='submit'>
							Login
						</button>
						<a href='/signup'>No account?signup here</a>
					</div>
				</form>
			</div>
		</>
	);
}

export default Login;
