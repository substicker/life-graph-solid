/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import App from './App'
import { AppProvider } from './context/AppContext'

const root = document.getElementById('root')

render(() => 
  <AppProvider value={{}}>
    <App />
  </AppProvider>
, root)
