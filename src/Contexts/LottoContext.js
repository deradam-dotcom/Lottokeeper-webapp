import React, { createContext, useState, useContext } from 'react';

// Create the context
const LottoContext = createContext();

// Provider component
export const LottoProvider = ({ children }) => {
	// State for player
	const [player, setPlayer] = useState({
		name: '',
		balance: 10000,
		prize: 0,
		gameSlips: [],
		awardedSlips: [],
		winningSlipsCount: 0,
		winningNumbers: [],
	});
	// State for operator
	const [operator, setOperator] = useState({
		name: '',
		balance: 0,
		prize: 0,
		loss: 0,
		gameSlips: [],
		awardedSlips: [],
		winningSlipsCount: 0,
		winningNumbers: [],
	});
	// Add SET methods
	const setPlayerState = (newPlayerState) => {
		setPlayer({
			name: newPlayerState.name ?? '',
			balance: newPlayerState.balance ?? 0,
			prize: newPlayerState.prize ?? 0,
			gameSlips: newPlayerState.gameSlips ?? [],
			awardedSlips: newPlayerState.awardedSlips ?? [],
			winningSlipsCount: newPlayerState.winningSlipsCount ?? 0,
			winningNumbers: newPlayerState.winningNumbers ?? [],
		});
	};

	const setOperatorState = (newOperatorState) => {
		setOperator({
			name: newOperatorState.name ?? '',
			balance: newOperatorState.balance ?? 0,
			prize: newOperatorState.prize ?? 0,
			loss: newOperatorState.loss ?? 0,
			gameSlips: newOperatorState.gameSlips ?? [],
			awardedSlips: newOperatorState.awardedSlips ?? [],
			winningSlipsCount: newOperatorState.winningSlipsCount ?? 0,
			winningNumbers: newOperatorState.winningNumbers ?? [],
		});
	};
	// update user names
	const updatePlayerName = (userName) => {
		if (player.name === '') {
			setPlayer((prevPlayer) => ({
				...prevPlayer,
				name: userName,
			}));
		} else {
			alert('The Player name has already setted');
		}
	};

	const updateOperatorName = (userName) => {
		if (operator.name === '') {
			setOperator((prevOperator) => ({
				...prevOperator,
				name: userName,
			}));
		} else {
			alert('The Operator name has already setted');
		}
	};
	// Generating the game slips for the users
	const playerGame = () => {
		if (player.balance >= 500) {
			// Check if player has enough balance
			const newSlip = generateGameSlip(); // Generate a new game slip
			addPlayerSlip(newSlip); // Add the new slip to the player's slips
		} else {
			alert('Not enough balance to play');
		}
	};

	const operatorGame = (numberOfSections) => {
		// Step 1: Generate Game Slips
		const newSlips = generateGameSections(numberOfSections);
		addOperatorSlip(newSlips);
		// Deduct the price of the generated sections from the operator's balance
		const sectionPrice = 1000; // Define the price per section
		const totalPrice = numberOfSections * sectionPrice;
		setOperator((prevOperator) => ({
			...prevOperator,
			balance: prevOperator.balance + totalPrice,
		}));
	};
	// Function to add a game slip for a player
	const addPlayerSlip = (slip) => {
		setPlayer((prevPlayer) => {
			return {
				...prevPlayer,
				balance: prevPlayer.balance - 200,
				gameSlips: [...prevPlayer.gameSlips, slip],
			};
		});
	};
	// Function to add a game slip for an operator
	const addOperatorSlip = (slip) => {
		setOperator((prevOperator) => {
			return {
				...prevOperator,
				gameSlips: [...prevOperator.gameSlips, ...slip],
			};
		});
	};
	// Crediting awards to the operator
	const awardOperatorCredits = (operator, winningNumbers) => {
		let winningSlipsCount = 0;
		// Initialize counters for each match category
		const updatedSlips = operator.gameSlips.map((slip) => {
			const matches = checkMatches(slip, winningNumbers);
			let isWinner = slip.isWinner;
			let totalAward = slip.totalAward || 0;
			if (matches >= 2 && matches <= 5 && !isWinner) {
				winningSlipsCount += 1;
				isWinner = true;
			}
			switch (matches) {
				case 2:
					totalAward += 200;
					break;
				case 3:
					totalAward += 300;
					break;
				case 4:
					totalAward += 400;
					break;
				case 5:
					totalAward += 500;
					break;
				default:
					break;
			}

			return {
				...slip,
				matches: isWinner ? matches : 0,
				totalAward: isWinner ? totalAward : 0,
				isWinner: isWinner,
			};
		});
		// Add only the new winning slips to the awardedSlips array in operator state
		const newWinningSlips = updatedSlips.filter(
			(slip) => slip.isWinner && !operator.awardedSlips.includes(slip)
		);
		// Update operator balance with the total award
		setOperator((prevOperator) => {
			// Filter out only the slips that haven't won
			const newWinningSlipIds = newWinningSlips.map((slip) => slip.id);
			const remainingGameSlips = prevOperator.gameSlips.filter(
				(slip) => !newWinningSlipIds.includes(slip.id)
			);
			const totalAward = newWinningSlips.reduce(
				(acc, slip) => acc + slip.totalAward,
				0
			);

			return {
				...prevOperator,
				balance: prevOperator.balance + totalAward,
				prize: prevOperator.prize + totalAward,
				gameSlips: remainingGameSlips,
				awardedSlips: [...prevOperator.awardedSlips, ...newWinningSlips],
				winningSlipsCount: prevOperator.winningSlipsCount + winningSlipsCount,
			};
		});
	};
	// Crediting awards to the player
	const awardPlayerCredits = (player, winningNumbers) => {
		let winningSlipsCount = 0;
		// Initialize counters for each match category
		const updatedSlips = player.gameSlips.map((slip) => {
			const matches = checkMatches(slip, winningNumbers);
			let isWinner = slip.isWinner;
			let totalAward = slip.totalAward || 0;
			if (matches >= 2 && matches <= 5 && !isWinner) {
				winningSlipsCount += 1;
				isWinner = true;
			}
			switch (matches) {
				case 2:
					totalAward += 200;
					break;
				case 3:
					totalAward += 300;
					break;
				case 4:
					totalAward += 400;
					break;
				case 5:
					totalAward += 500;
					break;
				default:
					break;
			}

			return {
				...slip,
				matches: isWinner ? matches : 0,
				totalAward: isWinner ? totalAward : 0,
				isWinner: isWinner,
			};
		});
		// Add only the new winning slips to the awardedSlips array in player state
		const newWinningSlips = updatedSlips.filter(
			(slip) => slip.isWinner && !player.awardedSlips.includes(slip)
		);
		const totalAward = newWinningSlips.reduce(
			(acc, slip) => acc + slip.totalAward,
			0
		);
		// Update player balance with the total award
		setOperator((prevOperator) => {
			const updatedBalance = prevOperator.balance - totalAward;
			const updatedLoss = prevOperator.loss + totalAward;

			return {
				...prevOperator,
				balance: updatedBalance,
				loss: updatedLoss,
			};
		});

		setPlayer((prevPlayer) => {
			// Filter out only the slips that haven't won
			const newWinningSlipIds = newWinningSlips.map((slip) => slip.id);
			const remainingGameSlips = prevPlayer.gameSlips.filter(
				(slip) => !newWinningSlipIds.includes(slip.id)
			);

			return {
				...prevPlayer,
				balance: prevPlayer.balance + totalAward,
				prize: prevPlayer.prize + totalAward,
				gameSlips: remainingGameSlips,
				awardedSlips: [...prevPlayer.awardedSlips, ...newWinningSlips],
				winningSlipsCount: prevPlayer.winningSlipsCount + winningSlipsCount,
			};
		});
	};
	// Start DRAW as an individual Player
	const startPlayerDraw = () => {
		if (player.balance >= 300 && player.gameSlips.length > 0) {
			const winningNumbers = generateWinningNumbers();
			setPlayer((prevPlayer) => ({
				...prevPlayer,
				winningNumbers: winningNumbers,
				balance: prevPlayer.balance - 300,
			}));
			awardPlayerCredits(player, winningNumbers);
		} else {
			alert('Not enough balance to play or you have no GameSlip yet');
		}
	};
	// Start DRAW as an Operator
	const startOperatorDraw = () => {
		if (player.gameSlips.length > 0 || operator.gameSlips.length > 0) {
			const winningNumbers = generateWinningNumbers();
			setOperator((prevOperator) => ({
				...prevOperator,
				winningNumbers: winningNumbers,
			}));
			awardOperatorCredits(operator, winningNumbers);
			awardPlayerCredits(player, winningNumbers);
		} else {
			alert('No GameSlip has provided yet');
		}
	};
	// Functions to generate a random game slips
	const generateGameSlip = ({ isPlayer = true, isOperator = false } = {}) => {
		const numbers = [];
		while (numbers.length < 5) {
			const randomNumber = Math.floor(Math.random() * 39) + 1;
			if (!numbers.includes(randomNumber)) {
				numbers.push(randomNumber);
			}
		}

		return {
			id: generateUniqueId(),
			numbers,
			isWinner: false,
			isPlayer: isPlayer,
			isOperator: isOperator,
		};
	};
	// Function to generate sections for the Operator
	const generateGameSections = (
		numberOfSections,
		{ isPlayer = false } = {}
	) => {
		// Logic to generate game slips based on the given number of sections
		const gameSlips = [];
		for (let i = 0; i < numberOfSections; i++) {
			const isOperator = !isPlayer; // Determine if it's an operator-generated slip
			const gameSlip = generateGameSlip({ isPlayer, isOperator }); // You need to implement generateGameSlip function
			gameSlips.push(gameSlip);
		}

		return gameSlips;
	};
	// Function to generate a unique ID
	const generateUniqueId = () => {
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
	};
	//Function to generate random winning numbers
	const generateWinningNumbers = () => {
		const numbers = new Set();
		while (numbers.size < 5) {
			numbers.add(Math.floor(Math.random() * 39) + 1);
		}
		return Array.from(numbers);
	};
	// Function to determine the number of hits
	const checkMatches = (slip, winningNumbers) => {
		return slip.numbers.filter((number) => winningNumbers.includes(number))
			.length;
	};
	// Function to restart a game as an Operator
	const restartOperatorGame = () => {
		setPlayer({
			balance: 10000,
			prize: 0,
			gameSlips: [],
			awardedSlips: [],
			winningSlipsCount: 0,
			winningNumbers: [],
		});

		setOperator({
			balance: 0,
			prize: 0,
			gameSlips: [],
			awardedSlips: [],
			winningSlipsCount: 0,
			winningNumbers: [],
		});
	};
	// Function to Exit from the current Game or change User
	const exitGame = () => {
		setPlayer({
			name: '',
			balance: 10000,
			prize: 0,
			gameSlips: [],
			awardedSlips: [],
			winningSlipsCount: 0,
			winningNumbers: [],
		});

		setOperator({
			name: '',
			balance: 0,
			prize: 0,
			gameSlips: [],
			awardedSlips: [],
			winningSlipsCount: 0,
			winningNumbers: [],
		});
	};

	return (
		<LottoContext.Provider
			value={{
				player,
				operator,
				setPlayer,
				setOperator,
				updatePlayerName,
				updateOperatorName,
				setPlayerState,
				setOperatorState,
				addPlayerSlip,
				addOperatorSlip,
				playerGame,
				operatorGame,
				generateWinningNumbers,
				awardPlayerCredits,
				awardOperatorCredits,
				startPlayerDraw,
				startOperatorDraw,
				restartOperatorGame,
				exitGame,
			}}
		>
			{children}
		</LottoContext.Provider>
	);
};
// Hook for easy context usage
export const useLottoContext = () => useContext(LottoContext);
