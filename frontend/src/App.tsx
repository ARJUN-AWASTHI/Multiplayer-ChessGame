
import { Route, Routes } from 'react-router-dom'
import './App.css'

import LandingPage from './routes/LandingPage'
import GamePage from './routes/GamePage'

function App() {
	return (

		<div className='w-screen h-screen bg-mist-800'>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/game" element={<GamePage />} />
			</Routes>
		</div>
	)

}

export default App
