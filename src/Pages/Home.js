import React from 'react';
import CenteredLayout from '../Layouts/CenteredLayout';
import UserForm from '../Components/Forms/UserForm/UserForm';
import Welcome from '../Components/Jumbotrons/Welcome';

const Home = () => {
	return (
		<CenteredLayout>
			<Welcome />
			<UserForm />
		</CenteredLayout>
	);
};

export default Home;
