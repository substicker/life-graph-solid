import { createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Aside from './components/Aside'
import Life from './components/Life'

function App() {
 
  return (
    <div class="flex">
      <Aside />
      <Life />
    </div>
  )
}

export default App
