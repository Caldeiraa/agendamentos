
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

