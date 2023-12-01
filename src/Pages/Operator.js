import React, { useEffect } from "react";
import LocalStorageService from "../Services/LocalStorageService";
import SidebarLayout from "../Layouts/SidebarLayout/SidebarLayout";
import GameSection from "../Components/Game/GameSection/GameSection";
import { useLottoContext } from "../Contexts/LottoContext";

const Operator = () => {
  const {
    operator,
    player,
    setPlayerState,
    setOperatorState,
    startOperatorDraw,
    playerGame,
    operatorGame,
    restartOperatorGame,
    exitGame,
  } = useLottoContext();

  useEffect(() => {
    const storedPlayerData = LocalStorageService.getUserState("player");
    const storedOperatorData = LocalStorageService.getUserState("operator");
    // Check if there is stored player data in localStorage
    if (storedPlayerData) {
      // Use setPlayerState to update the player state in the context
      setPlayerState(storedPlayerData);
    }
    // Check if there is stored operator data in localStorage
    if (storedOperatorData) {
      // Use setOperatorState to update the player state in the context
      setOperatorState(storedOperatorData);
    }
  }, []);

  useEffect(() => {
    // Save player state when navigating away
    const savePlayerData = () => {
      LocalStorageService.saveUserState("player", player);
    };
    // Save operator state when navigating away
    const saveOperatorData = () => {
      LocalStorageService.saveUserState("operator", operator);
    };

    window.addEventListener("beforeunload", savePlayerData);
    window.addEventListener("beforeunload", saveOperatorData);

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", savePlayerData);
      window.removeEventListener("beforeunload", saveOperatorData);
    };
  });

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
    username: "Player",
    balance: player.balance,
    prize: player.prize,
    winningSlipsCount: player.winningSlipsCount,
    onPlayGame: playerGame,
    onRestartGame: restartOperatorGame,
    onExitGame: exitGame,
  };

  return (
    <React.Fragment>
      <SidebarLayout playerProps={playerData} operatorProps={operatorData}>
        <GameSection player={player} operator={operator} />
      </SidebarLayout>
    </React.Fragment>
  );
};

export default Operator;
