import React from 'react';
import { Button } from 'react-bootstrap';
import './action_button.css';

const ActionButton = ({ type, title, handleClick }) => {
	return (
		<Button className="button" type={type} onClick={handleClick}>
			{title}
		</Button>
	);
};

export default ActionButton;
