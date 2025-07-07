<<<<<<< HEAD
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Agendar from './views/agendar.jsx';
import Agendamentos from './views/agendamentos.jsx';
import Cadastro from './views/cadastros.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Agendar />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
=======
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
>>>>>>> 054ac04000930f9c319adac57cc65b2c20b09541
