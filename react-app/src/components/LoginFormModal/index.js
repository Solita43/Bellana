import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors("Invalid Credentials");
    } else {
        history.push('/dashboard')
        closeModal()
    }
  };

  const loginDemo = async (e) => {
    e.preventDefault()

    dispatch(login("marnie@aa.io", "password")).then(data => {
      if (data) {
        setErrors("An error occured, please try again.");
      } else {
        history.push("/dashboard");
        closeModal();
      }
    })
  }

  return (
    <>
      <h1>Welcome Back!</h1>
      <form onSubmit={handleSubmit}>
        {errors && <p className="errors">*{errors}</p>}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="login-form">Log In</button>
      </form>
      <button className="login-demo" onClick={loginDemo}>Login as Demo User</button>
    </>
  );
}

export default LoginFormModal;
