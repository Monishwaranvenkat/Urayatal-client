import React,{useState} from "react";
import FormInput from "../Components/FormInput";
import "./form.css";

function Signup() {

	const [values,setValues] = useState(
		{
			userName:"",
			email:"",
			phone:"",
			gender:"",
			dob:"",
			password:"",
			confirmPassword:""
		}
	);
	
	const inputs = [
		{
			id: 1,
			name: "userName",
			type: "text",
			placeholder: "Username",
			required: "true",
			pattern: "^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$",
			errorMessage:
				"Password must contain at least one digit ,one lowercase,one uppercase, one special character,min 8 characters and a maximum of 20 char",
		},
		{
			id: 2,
			name: "email",
			type: "email",
			placeholder: "email",
			pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
			required: "true",
			errorMessage: "Enter vaild email address",
		},
		{
			id: 3,
			name: "phone",
			type: "tele",
			placeholder: "Phone number",
			required: "true",
			pattern: "^[6-9]d{9}$",
			errorMessage: "Enter vaild Phone",
		},
		{
			id: 4,
			name: "dob",
			type: "date",
			placeholder: "DOB",
			required: "true",
			pattern:
				"^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$",
			errorMessage: "Enter vaild DOB",
		},
		{
			id: 5,
			name: "gender",
			type: "text",
			placeholder: "Gender",
			required: "true",
			pattern:
				"^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$",
			errorMessage: "Enter vaild gender must be deleted",
		},
		{
			id: 6,
			name: "password",
			type: "password",
			placeholder: "Password",
			required: "true",
			pattern: '/^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/',
			errorMessage: "Enter vaild password",
		},
		{
			id: 7,
			name: "confirmPassword",
			type: "password",
			placeholder: "Confirm Password",
		},
	];

	

	const onChange = (e) =>
	{
		if (e.target.name === "userName")
		{
			// errorMessages.current = {
			// 	...errorMessages.current,
			// 	[e.target.name]: e.target.value,
			// };
			// console.log(errorMessages.current);
				
		}
			setValues({ ...values, [e.target.name]: e.target.value });
		
	}
	const handlesubmit = (e) => {
		e.preventDefault();
		console.log("form submited");
	};
	
	return (
		<>
			<div className='form-container'>
				<form onSubmit={handlesubmit}>
					<div className='form'>
						<h1>Signup</h1>

						{inputs.map((input) => (
							<FormInput
								key={input.id}
								{...input}
								value={values[input.name]}
								onChange={onChange}
								
							/>
						))}
						<button className='submit-button' type={"submit"}>
							Signup
						</button>
						<a href='/login'>Have an account?Login here</a>
					</div>
				</form>
			</div>
		</>
	);
}

export default Signup;
