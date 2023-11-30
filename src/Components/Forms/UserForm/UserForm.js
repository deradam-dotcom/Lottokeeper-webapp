import React, { useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLottoContext } from '../../../Contexts/LottoContext';
import ActionButton from '../../Buttons/ActionButton';
import './user_form.css';

const UserForm = () => {
	const { updatePlayerName, updateOperatorName } = useLottoContext();

	const [userName, setUserName] = useState('');
	const [role, setRole] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		if (userName && role) {
			// Update player and operator names after a successful login
			if (role === 'Player') {
				updatePlayerName(userName);
			} else if (role === 'Operator') {
				updateOperatorName(userName);
			}
			// Navigate to the respective dashboard based on the role
			navigate(`/${role.toLowerCase()}`);
		} else {
			// Handle the case where form data is missing
			alert('Please enter your NAME');
		}
	};
	return (
		<Container
			fluid
			className="min-vh-100 d-flex align-items-start mt-4 justify-content-center"
		>
			<Row className="justify-content-lg-center">
				<Col>
					<Form onSubmit={handleSubmit} className="custom-form">
						<Form.Group controlId="formUserName">
							<Form.Label className="mb-4">Login</Form.Label>
							<Form.Control
								type="text"
								placeholder="Username"
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
							/>
						</Form.Group>
						<Row>
							<Form.Group className="custom-radio-button mt-4 mb-4">
								<Form.Check
									type="radio"
									label="Player"
									name="roleRadios"
									id="radioPlayer"
									value="Player"
									checked={role === 'Player'}
									onChange={(e) => setRole(e.target.value)}
								/>

								<Form.Check
									type="radio"
									label="Operator"
									name="roleRadios"
									id="radioOperator"
									value="Operator"
									checked={role === 'Operator'}
									onChange={(e) => setRole(e.target.value)}
								/>
							</Form.Group>
						</Row>
						<ActionButton type="submit" title="Dashboard" />
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default UserForm;
