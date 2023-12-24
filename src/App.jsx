import { createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Week from './components/Week'
import Aside from './components/Aside'

function App() {
 
  return (
    <div class="flex">
      <Aside />
      <Week />
    </div>
  )
}

export default App
