import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LocalStorageService from '../../Services/LocalStorageService';
import './sidebar_layout.css';
import ActionButton from '../../Components/Buttons/ActionButton';

const SidebarLayout = ({ playerProps, operatorProps, children }) => {
	return (
		<React.Fragment>
			<div className="sidebar-layout">
				{playerProps && (
					<PlayerSidebar
						hasOperator={operatorProps !== undefined}
						{...playerProps}
					/>
				)}
				<Main>{children}</Main>
				{operatorProps && <OperatorSidebar {...operatorProps} />}
			</div>
		</React.Fragment>
	);
};

export default SidebarLayout;
// Sidebar.js
const PlayerSidebar = ({
	username,
	balance,
	onPlayGame,
	onRestartGame,
	onExitGame,
	winningNumbers,
	operatorWinningNumbers,
	simulateDraw,
	prize,
	hasOperator,
	winningSlipsCount,
}) => {
	const navigate = useNavigate();

	const changeUser = () => {
		// Clear player data from localStorage
		onExitGame();
		LocalStorageService.deleteAll();
		// Navigate to the home page
		navigate('/');
	};
	return (
		<div className="user-sidebar">
			<div className="data-card">
				<h3>
					<u>{username}</u>
				</h3>
				<div className="user-total-hits">
					<span>TOTAL SLIP HITS:</span>
					<span>{winningSlipsCount} Pcs</span>
				</div>
				<div className="user-balance">
					<span>BALANCE:</span>
					<span>
						{balance} {balance === 0 ? 'Credit' : 'Credits'}
					</span>
				</div>
				<div className="user-prize">
					<span>PRIZE:</span>
					<span>
						{prize} {prize === 0 ? 'Credit' : 'Credits'}
					</span>
				</div>
				<ActionButton title="Add Game Slip" handleClick={onPlayGame} />
			</div>
			<div>
				{hasOperator ? (
					<div className="numbers-container">
						{operatorWinningNumbers &&
							operatorWinningNumbers.map((number, index) => (
								<span className="number" key={index}>
									{number}
								</span>
							))}
					</div>
				) : (
					<div className="numbers-container">
						{winningNumbers &&
							winningNumbers.map((number, index) => (
								<span className="number" key={index}>
									{number}
								</span>
							))}
					</div>
				)}
				{!hasOperator && (
					<div className="number-generator">
						<ActionButton title="DRAW" handleClick={simulateDraw} />
					</div>
				)}
				{hasOperator && (
					<div>
						<ActionButton title="RESTART" handleClick={onRestartGame} />
					</div>
				)}
				<div className="mt-2">
					<ActionButton title="CHANGE USER" handleClick={changeUser} />
				</div>
			</div>
		</div>
	);
};

const OperatorSidebar = ({
	username,
	balance,
	onPlayGame,
	winningNumbers,
	simulateDraw,
	prize,
	loss,
	winningSlipsCount,
}) => {
	const [numberOfSections, setNumberOfSections] = useState(0);

	const handleSubmit = (event) => {
		event.preventDefault();
		onPlayGame(numberOfSections);
	};

	return (
		<div className="user-sidebar">
			<div className="data-card">
				<h3>
					<u>{username}</u>
				</h3>
				<div className="user-total-hits">
					<span>TOTAL SLIP HITS:</span>
					<span>{winningSlipsCount} Pcs</span>
				</div>
				<div className="user-balance">
					<span>BALANCE:</span>
					<span>
						{balance} {balance === 0 ? 'Credit' : 'Credits'}
					</span>
				</div>
				<div className="user-prize">
					<span>PRIZE:</span>
					<span>
						{prize} {prize === 0 ? 'Credit' : 'Credits'}
					</span>
				</div>
				<div className="user-loss">
					<span>LOSS:</span>
					<span>
						{loss} {loss === 0 ? 'Credit' : 'Credits'}
					</span>
				</div>
				<Form onSubmit={handleSubmit} className="number-form">
					<Form.Group controlId="formUserName">
						<Form.Control
							type="number"
							placeholder="Username"
							value={numberOfSections}
							onChange={(e) => setNumberOfSections(e.target.value)}
						/>
					</Form.Group>
					<ActionButton title="Generate Sections" />
				</Form>
			</div>
			<div></div>
			<div></div>

			<div className="numbers-container">
				{winningNumbers &&
					winningNumbers.map((number, index) => (
						<span className="number" key={index}>
							{number}
						</span>
					))}
			</div>
			<div className="number-generator">
				<ActionButton title="DRAW" handleClick={simulateDraw} />
			</div>
		</div>
	);
};

// MainContent.js
const Main = ({ children }) => {
	return <div className="main">{children}</div>;
};
