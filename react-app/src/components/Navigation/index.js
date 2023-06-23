import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './logo2.png'
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { projectsGet } from "../../store/projects";
import CreateProjectModal from '../CreateProjectModal';
import { myTasksGet } from '../../store/myTasks';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();


	useEffect(() => {
		if (!sessionUser) return;

		dispatch(projectsGet())
		dispatch(myTasksGet())
		
	})
	





	return (
		<div className='top-nav'>
			<img src={logo} alt='logo' id='logo_img' onClick={(e) => history.push('/dashboard')}></img>
			{isLoaded && (
				<div className='top-right'>
					{sessionUser ? (
						<div className='nav-right'>
							<OpenModalButton className="create-project-button" buttonText={(<><i className="fa-solid fa-plus nav-plus"></i> Create</>)} modalComponent={<CreateProjectModal />} />
							<ProfileButton user={sessionUser} />
						</div>
					) : (
						<>
							<OpenModalButton
								buttonText="Log In"
								className="login"
								modalComponent={<LoginFormModal />}
							/>

							<OpenModalButton
								buttonText="Sign Up"
								className="signup"
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