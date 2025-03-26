import { HelloWorld } from './components/HelloWorld'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Cloudflare Fullstack Starter
        </h1>
        <HelloWorld />
      </div>
    </div>
  )
}

export default App
