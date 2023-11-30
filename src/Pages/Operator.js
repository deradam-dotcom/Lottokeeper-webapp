import React from 'react';
import SidebarLayout from '../Layouts/SidebarLayout/SidebarLayout';
import GameSection from '../Components/Game/GameSection/GameSection';
import { useLottoContext } from '../Contexts/LottoContext';

const Operator = () => {
	const {
		operator,
		player,
		startOperatorDraw,
		playerGame,
		operatorGame,
		restartOperatorGame,
	} = useLottoContext();

	const operatorData = {
		username: operator.name,
		balance: operator.balance,
		prize: operator.prize,
		loss: operator.loss,
		winningSlipsCount: operator.winningSlipsCount,
		onPlayGame: operatorGame,
		winningNumbers: operator.winningNumbers,
		simulateDraw: startOperatorDraw,
	};

	const playerData = {
		username: 'Player',
		balance: player.balance,
		prize: player.prize,
		winningSlipsCount: player.winningSlipsCount,
		onPlayGame: playerGame,
		onRestartGame: restartOperatorGame,
	};

	return (
		<React.Fragment>
			<SidebarLayout playerProps={playerData} operatorProps={operatorData}>
				<div className="main">
					<GameSection
						player={player}
						operator={operator}
						simulateDraw={startOperatorDraw}
					/>
				</div>
			</SidebarLayout>
		</React.Fragment>
	);
};

export default Operator;
