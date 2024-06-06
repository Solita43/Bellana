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
	const [image, setImage] = useState(null)
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();
	const [isLoading, setIsLoading] = useState(false)



	const handleSubmit = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length) return

		const formData = new FormData();
		if (image) formData.append("image", image);
		formData.append("username", username);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("firstName", firstName);
		formData.append("lastName", lastName)
		setIsLoading(true)

		dispatch(signUp(formData)).then(data => {
			if (data) {
				setErrors(data);
				setIsLoading(false);
			} else {
				closeModal();
			}
		})
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<label className="image-label">
					<div className="image-upload">
						{image ? <img id="preview-image" src={URL.createObjectURL(image)} ></img> : (
							<>
								<i className="fa-regular fa-image"></i>
								<p>Upload</p>
								<div className="image-dot"><p>+</p></div>
							</>
						)}
					</div>
					<input
						type="file"
						className="image-upload-input"
						accept="image/*"
						onChange={(e) => setImage(e.target.files[0])}
					/>
				</label>
				<label>
					First Name
					<input
						type="text"
						value={firstName}
						minLength={2}
						maxLength={30}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					Last Name
					<input
						type="text"
						value={lastName}
						minLength={2}
						maxLength={30}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label>
					Email
					<input
						type="email"
						value={email}
						maxLength={55}
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
						maxLength={60}
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
						maxLength={60}
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