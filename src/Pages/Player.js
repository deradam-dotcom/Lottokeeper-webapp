import React from 'react';
import SidebarLayout from '../Layouts/SidebarLayout/SidebarLayout';
import GameSection from '../Components/Game/GameSection/GameSection';
import { useLottoContext } from '../Contexts/LottoContext';

const Player = () => {
	const { player, startPlayerDraw, playerGame } = useLottoContext();

	const playerData = {
		username: player.name,
		balance: player.balance,
		prize: player.prize,
		winningSlipsCount: player.winningSlipsCount,
		onPlayGame: playerGame,
		winningNumbers: player.winningNumbers,
		simulateDraw: startPlayerDraw,
	};

	return (
		<React.Fragment>
			<SidebarLayout playerProps={playerData}>
				<div className="main">
					<GameSection player={player} />
				</div>
			</SidebarLayout>
		</React.Fragment>
	);
};

export default Player;
