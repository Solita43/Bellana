import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	console.log(errors)

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length) return

		dispatch(signUp(username, email, password, firstName, lastName)).then(data => {
			if (data) {
				setErrors(data.errors);
			} else {
				closeModal();
			}
		})
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<label>
					First Name
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					Last Name
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label>
					Email
					<input
						type="email"
						value={email}
						onChange={(e) => {
							if (!e.target.value.trim().includes('@') || !e.target.value.trim().includes('.')) {
								setErrors(prev => {
									let err = { ...prev }
									err.email = "Please enter a valid email address."
									return err;
								})
							} else {
								setErrors(prev => {
									let err = { ...prev }
									delete err.email
									return err
								})

							}
							setEmail(e.target.value.trim())
						}}
						required
					/>
				</label>
				{errors.email ? <p className="errors">* {errors.email}</p> : null}
				<label>
					Username
					<input
						type="text"
						value={username}
						maxLength={30}
						onChange={(e) => {
							if (e.target.value.trim().length < 6) {
								setErrors(prev => {
									const err = { ...prev };
									err.username = "Username must be at least 6 characters."
									return err;
								})
							} else {
								setErrors(prev => {
									const err = { ...prev }
									delete err.username;
									return err;
								})
							}
							setUsername(e.target.value.trim())
						}}
						required
					/>
				</label>
				{errors.username ? <p className="errors">* {errors.username}</p> : null}
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => {
							if (e.target.value.trim().length < 8) {
								setErrors(prev => {
									const err = { ...prev };
									err.passwordLength = "Password must be 8 characters or more."
									return err;
								})
							} else {
								setErrors(prev => {
									const err = { ...prev }
									delete err.passwordLength;
									return err;
								})
							}
							if (confirmPassword && confirmPassword !== e.target.value.trim()) {
								setErrors(prev => {
									const err = { ...prev }
									err.confirmPassword = "Confirm Password field must match the Password field"
									return err;
								});
							} else if (confirmPassword && confirmPassword === e.target.value.trim()) {
								setErrors(prev => {
									const err = { ...prev }
									delete err.confirmPassword;
									return err;
								})
							}
							setPassword(e.target.value.trim())
						}}
						required
					/>
				</label>
				{errors.passwordLength ? <p className="errors">* {errors.passwordLength}</p> : null}
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => {
							if (password !== e.target.value.trim()) {
								setErrors(prev => {
									const err = { ...prev }
									err.confirmPassword = "Confirm Password field must match the Password field"
									return err;
								});
							} else {
								setErrors(prev => {
									const err = { ...prev }
									delete err.confirmPassword;
									return err;
								})
							}
							setConfirmPassword(e.target.value.trim())
						}}
						required
					/>
				</label>
				{errors.confirmPassword ? <p className="errors">* {errors.confirmPassword}</p> : null}

				<button type="submit" className="login-form">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;