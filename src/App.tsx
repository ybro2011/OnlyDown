import { useState } from 'react'
import './App.css'
import UnityGame from './components/unity/UnityGame'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Unity Game Website</h1>
        <p>Welcome to my interactive Unity game website</p>
      </header>
      
      <main className="app-main">
        <section className="game-section">
          <UnityGame gameTitle="My Awesome Unity Game" />
        </section>
        
        <section className="info-section">
          <h2>About This Game</h2>
          <p>
            This is where you can add information about your Unity game.
            Describe gameplay, controls, and any other relevant details.
          </p>
          
          <div className="controls-info">
            <h3>Controls</h3>
            <ul>
              <li>WASD or Arrow Keys: Movement</li>
              <li>Space: Jump/Action</li>
              <li>Mouse: Look around</li>
              <li>Click: Interact</li>
            </ul>
          </div>
        </section>
      </main>
      
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} My Unity Game Website. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
