
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Agendar from './views/agendar.jsx';
import Agendamentos from './views/agendamentos.jsx';
import Cadastro from './views/cadastros.jsx'
import Teste from './views/teste.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Agendar />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
        <Route path="/teste" element={<Teste />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

