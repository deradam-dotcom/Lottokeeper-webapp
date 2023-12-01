import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import localStorageService from "./Services/LocalStorageService";
import Player from "./Pages/Player";
import Operator from "./Pages/Operator";
import Home from "./Pages/Home";
import { LottoProvider } from "./Contexts/LottoContext";
import "./App.css";

function App() {
  return (
    <Router>
      <RedirectOnLoad />
      <Container fluid className="App">
        <LottoProvider>
          <Routes>
            <Route path="/player" element={<Player />} />
            <Route path="/operator" element={<Operator />} />
            <Route path="/" exact element={<Home />} />
          </Routes>
        </LottoProvider>
      </Container>
    </Router>
  );
}

export default App;

const RedirectOnLoad = () => {
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!redirected) {
      // Check if there is stored game data for the player
      const playerData = localStorageService.getUserState("player");
      if (playerData) {
        // Navigate to the player page and set up the game state
        navigate("/player");
        setRedirected(true);
      }

      // Check if there is stored game data for the operator
      const operatorData = localStorageService.getUserState("operator");
      if (operatorData) {
        // Navigate to the operator page and set up the game state
        navigate("/operator");
        setRedirected(true);
      }
    }
  }, [navigate, redirected]);

  return null; // This component doesn't render anything
};
