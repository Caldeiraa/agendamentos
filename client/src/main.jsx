import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import Agendamentos from './views/tela-agendamento.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Agendamentos />
  </StrictMode>,
)
