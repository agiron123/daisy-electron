import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  // Setup a simple mock user here.
  const user = {
    email: 'email@email.com',
    name: 'User'
  }

  const handleLogout = () => {
    console.log('handleLogout clicked')
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="avatar placeholder mb-4">
            <div className="bg-neutral text-neutral-content rounded-full w-16">
              <span className="text-2xl">{user.email.charAt(0).toUpperCase()}</span>
            </div>
          </div>
          
          <h2 className="card-title text-3xl mb-2">Welcome!</h2>
          <p className="text-sm opacity-70 mb-4">{user.email}</p>
          
          <div className="badge badge-primary badge-lg mb-6">
            Using daisyUI + Tailwind CSS
          </div>

          <div className="stats shadow mb-6">
            <div className="stat">
              <div className="stat-title">Current count</div>
              <div className="stat-value text-primary">{count}</div>
            </div>
          </div>

          <div className="card-actions flex-wrap justify-center gap-2">
            <button 
              className="btn btn-primary"
              onClick={() => setCount(prevState => prevState + 1)}
            >
              Increment
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setCount(prevState => prevState - 1)}
            >
              Decrement
            </button>
            <button 
              className="btn btn-accent"
              onClick={() => setCount(0)}
            >
              Reset
            </button>
          </div>

          <div className="divider"></div>

          <button 
            className="btn btn-outline btn-error btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

