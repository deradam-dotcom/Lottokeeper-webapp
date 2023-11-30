import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function CenteredLayout({ children }) {
	return (
		<Container fluid>
			<Row>
				<Col className="text-center center">{children}</Col>
			</Row>
		</Container>
	);
}

export default CenteredLayout;
