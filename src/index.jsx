/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import App from './App'
import { OptionProvider } from './context/OptionsContext'

const root = document.getElementById('root')

render(() => 
  <OptionProvider value={{}}>
    <App />
  </OptionProvider>
, root)
