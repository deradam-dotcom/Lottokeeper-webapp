import React, { useEffect } from 'react';
import LocalStorageService from '../Services/LocalStorageService';
import SidebarLayout from '../Layouts/SidebarLayout/SidebarLayout';
import GameSection from '../Components/Game/GameSection/GameSection';
import { useLottoContext } from '../Contexts/LottoContext';

const Player = () => {
	const { player, setPlayerState, startPlayerDraw, exitGame, playerGame } =
		useLottoContext();

	useEffect(() => {
		const storedPlayerData = LocalStorageService.getUserState('player');
		// Check if there is stored player data in localStorage
		if (storedPlayerData) {
			// Use setPlayerState to update the player state in the context
			setPlayerState(storedPlayerData);
		}
	}, []);

	useEffect(() => {
		// Save player state when navigating away
		const savePlayerData = () => {
			LocalStorageService.saveUserState('player', player);
		};

		window.addEventListener('beforeunload', savePlayerData);
		// Cleanup function to remove the event listener when the component is unmounted
		return () => {
			window.removeEventListener('beforeunload', savePlayerData);
		};
	});

	const playerData = {
		username: player.name,
		balance: player.balance,
		prize: player.prize,
		winningSlipsCount: player.winningSlipsCount,
		onPlayGame: playerGame,
		winningNumbers: player.winningNumbers,
		simulateDraw: startPlayerDraw,
		onExitGame: exitGame,
	};

	return (
		<React.Fragment>
			<SidebarLayout playerProps={playerData}>
				<GameSection player={player} />
			</SidebarLayout>
		</React.Fragment>
	);
};

export default Player;
