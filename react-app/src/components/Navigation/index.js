import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './logo2.png'
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();

	return (
		<div className='top-nav'>
			<img src={logo} alt='logo' id='logo_img' onClick={(e) => history.push('/dashboard')}></img>
			{isLoaded && (
				<div>
					{sessionUser ? <ProfileButton user={sessionUser} /> : (
						<>
							<OpenModalButton
								buttonText="Log In"
								modalComponent={<LoginFormModal />}
							/>

							<OpenModalButton
								buttonText="Sign Up"
								modalComponent={<SignupFormModal />}
							/>
						</>
					)}
				</div>
			)}
		</div>
	);
}

export default Navigation;