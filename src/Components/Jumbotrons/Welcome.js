import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './welcome.css';

const Welcome = () => {
	return (
		<Container fluid className="my-jumbotron">
			<Row className="justify-content-md-center">
				<Col md={8} className="text-center">
					<h1>
						<u>WELCOME TO THE LOTTOKEEPER</u>
					</h1>
				</Col>
			</Row>
		</Container>
	);
};

export default Welcome;
