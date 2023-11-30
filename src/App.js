import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Player from './Pages/Player';
import Operator from './Pages/Operator';
import Home from './Pages/Home';
import { LottoProvider } from './Contexts/LottoContext';
import './App.css';

function App() {
	return (
		<Router>
			<Container fluid className="App">
				<LottoProvider>
					<Routes>
						<Route path="/player" element={<Player />} />
						<Route path="/operator" element={<Operator />} />
						<Route path="/" element={<Home />} />
					</Routes>
				</LottoProvider>
			</Container>
		</Router>
	);
}

export default App;
