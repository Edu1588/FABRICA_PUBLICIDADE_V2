/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeV2 from './pages/HomeV2';
import Admin from './pages/Admin';
import ApresentacaoFabricaAzul from './pages/ApresentacaoFabricaAzul';
import ApresentacaoBrotas from './pages/ApresentacaoBrotas';
import { LanguageProvider } from './contexts/LanguageContext';

function Construction() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center p-6">
      <h1 
        className="text-[#F5F2EC] text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.25em] uppercase transition-all duration-500" 
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Em construção
      </h1>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomeV2 />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/apresentacao-azul" element={<ApresentacaoFabricaAzul />} />
          <Route path="/apresentacao-brotas" element={<ApresentacaoBrotas />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
