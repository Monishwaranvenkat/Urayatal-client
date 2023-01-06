import React from 'react'
import "./FormInput.css";

export default function FormInput(props) {
	const { id, errorMessage, onChange, ...inputProps } = props;
	
  return (
		<div className='formInput'>
			<input {...inputProps} onChange={onChange} />
			<span>{errorMessage}</span>
		</div>
	);
}
