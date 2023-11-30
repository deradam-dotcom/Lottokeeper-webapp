import React, { useState } from 'react';
import ActionButton from '../../Buttons/ActionButton';
import './game_section.css';

const GameSection = ({ player, operator, simulateDraw }) => {
	const [sortedSlips, setSortedSlips] = useState([]);
	const [sortOrder, setSortOrder] = useState('NONE');

	const flatOperator = operator && operator.gameSlips.flat();

	const sortAwardedSlips = () => {
		if (sortOrder === 'ASC') {
			const sorted = player.awardedSlips
				.slice()
				.sort((a, b) => b.matches - a.matches);
			setSortedSlips(sorted);
			setSortOrder('DESC');
		} else {
			const sorted = player.awardedSlips
				.slice()
				.sort((a, b) => a.matches - b.matches);
			setSortedSlips(sorted);
			setSortOrder('DESC');
		}
	};

	return (
		<React.Fragment>
			<div className="game-slips">
				{player.gameSlips.map((slip, index) => (
					<div key={index} className="game-slip">
						{operator && (
							<u>
								<span className="user-slip-info">PLAYER SLIP</span>
							</u>
						)}
						<div className="game-slip-numbers">
							{Array.from({ length: 39 }).map((_, number) => (
								<div
									key={number}
									className={`number-cell ${
										slip.numbers.includes(number + 1) ? 'selected' : ''
									}`}
								>
									{number + 1}
								</div>
							))}
						</div>
					</div>
				))}
				{flatOperator &&
					flatOperator.map((slip, index) => (
						<div key={index} className="game-slip">
							<u>
								<span className="user-slip-info">OPERATOR SLIP</span>
							</u>
							<div className="game-slip-numbers">
								{Array.from({ length: 39 }).map((_, number) => (
									<div
										key={number}
										className={`number-cell ${
											slip.numbers.includes(number + 1) ? 'selected' : ''
										}`}
									>
										{number + 1}
									</div>
								))}
							</div>
						</div>
					))}
			</div>
			{player.gameSlips.length > 0 && <div className="line"></div>}
			<div className="game-slips">
				{player &&
					(sortedSlips.length !== 0 ? sortedSlips : player.awardedSlips).map(
						(winnerSlip, index) => (
							<div
								key={index}
								className={`game-slip ${winnerSlip.isWinner && 'winner'}`}
							>
								{operator && (
									<>
										{winnerSlip.isPlayer ? (
											<u>
												<span className="user-slip-info">PLAYER SLIP</span>
											</u>
										) : (
											<u>
												<span className="user-slip-info">OPERATOR SLIP</span>
											</u>
										)}
									</>
								)}
								<div className="game-slip-numbers">
									{Array.from({ length: 39 }).map((_, number) => (
										<div
											key={number}
											className={`number-cell ${
												winnerSlip.numbers.includes(number + 1)
													? 'selected'
													: ''
											}`}
										>
											{number + 1}
										</div>
									))}
								</div>
								<div className="match-info">
									{/* Display match information */}
									{winnerSlip.matches && (
										<span className={`match-${winnerSlip.matches}`}>
											{winnerSlip.matches} Match
										</span>
									)}
									{winnerSlip.totalAward && (
										<span className={`match-${winnerSlip.matches}`}>
											{winnerSlip.totalAward} Credit
										</span>
									)}
								</div>
							</div>
						)
					)}
				{operator &&
					operator.awardedSlips.map((winnerSlip, index) => (
						<div
							key={index}
							className={`game-slip ${winnerSlip.isWinner && 'winner'}`}
						>
							{winnerSlip.isPlayer ? (
								<u>{<span className="user-slip-info">PLAYER SLIP</span>}</u>
							) : (
								<u>
									<span className="user-slip-info">OPERATOR SLIP</span>
								</u>
							)}
							<div className="game-slip-numbers">
								{Array.from({ length: 39 }).map((_, number) => (
									<div
										key={number}
										className={`number-cell ${
											winnerSlip.numbers.includes(number + 1) ? 'selected' : ''
										}`}
									>
										{number + 1}
									</div>
								))}
							</div>
							<div className="match-info">
								{/* Display match information */}
								{winnerSlip.matches && (
									<span className={`match-${winnerSlip.matches}`}>
										{winnerSlip.matches} Match
									</span>
								)}
								{winnerSlip.totalAward && (
									<span className={`match-${winnerSlip.matches}`}>
										{winnerSlip.totalAward} Credit
									</span>
								)}
							</div>
						</div>
					))}
			</div>
			<div className="sort-button">
				{!operator && (
					<ActionButton
						handleClick={sortAwardedSlips}
						title={
							sortOrder === 'ASC' ? 'Sort Matches(Desc)' : 'Sort Matches (Asc)'
						}
					/>
				)}
			</div>
		</React.Fragment>
	);
};

export default GameSection;
