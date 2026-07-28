/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeV2 from './pages/HomeV2';
import Admin from './pages/Admin';
import Outgrid from './pages/Outgrid';
import ApresentacaoFabricaAzul from './pages/ApresentacaoFabricaAzul';
import { LanguageProvider } from './contexts/LanguageContext';

function Construction() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-sans">
      <h1 className="text-white text-2xl md:text-4xl font-light tracking-widest uppercase">Em construção</h1>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Construction />} />
          <Route path="/home" element={<HomeV2 />} />
          <Route path="/v2" element={<HomeV2 />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/outgrid" element={<Outgrid />} />
          <Route path="/apresentacao-fabrica-azul" element={<ApresentacaoFabricaAzul />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
