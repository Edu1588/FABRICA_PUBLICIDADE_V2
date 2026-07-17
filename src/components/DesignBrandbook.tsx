import React, { useState } from 'react';
import { Palette, Download, Upload, Plus, Trash2, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AppClient } from '../types';

export const DesignBrandbook = ({ client }: { client: AppClient }) => {
  const [colors, setColors] = useState<string[]>(['#FF7A00', '#18120e', '#ffffff']);
  const [fonts, setFonts] = useState<{name: string, url: string}[]>([
    { name: 'Space Grotesk', url: 'https://fonts.google.com/specimen/Space+Grotesk' },
    { name: 'Inter', url: 'https://fonts.google.com/specimen/Inter' }
  ]);
  const [moodboard, setMoodboard] = useState<string[]>(['https://pinterest.com/']);

  return (
    <div className="bg-[#0c0c10] border border-white/5 rounded-2xl p-8 max-w-4xl space-y-8 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7A00]/20 to-[#C46A1A]/5 border border-[#C46A1A]/30 flex items-center justify-center text-[#FF7A00]">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-light tracking-wide uppercase text-white" style={{ fontFamily: 'var(--font-admin-heading)' }}>
              Design & Brandbook
            </h3>
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest mt-1">
              Diretrizes visuais para {client.name}
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-[#18120e] hover:bg-white/5 border border-white/5 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-widest text-white/70 transition-colors">
          <Download className="w-4 h-4" />
          Exportar PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cores */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-mono uppercase tracking-widest text-white/70">Paleta de Cores</h4>
            <button className="text-xs text-[#FF7A00] hover:text-white transition-colors"><Plus className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {colors.map((color, idx) => (
              <div key={idx} className="group relative">
                <div 
                  className="w-full h-16 rounded-lg border border-white/10 shadow-inner mb-2"
                  style={{ backgroundColor: color }}
                />
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-white/50">{color}</span>
                  <button className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tipografia */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-mono uppercase tracking-widest text-white/70">Tipografia</h4>
            <button className="text-xs text-[#FF7A00] hover:text-white transition-colors"><Plus className="w-4 h-4" /></button>
          </div>
          <div className="space-y-3">
            {fonts.map((font, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5 group">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-serif text-white">Aa</span>
                  <div>
                    <div className="text-sm text-white/90">{font.name}</div>
                    <a href={font.url} target="_blank" rel="noreferrer" className="text-[10px] font-mono text-[#FF7A00] hover:underline flex items-center gap-1 mt-0.5">
                      <LinkIcon className="w-3 h-3" /> Google Fonts
                    </a>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Moodboard */}
      <div className="pt-6 border-t border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-mono uppercase tracking-widest text-white/70">Moodboard / Referências</h4>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[#E60023]/10 flex items-center justify-center text-[#E60023] mb-2">
            <LinkIcon className="w-6 h-6" />
          </div>
          <div>
            <h5 className="text-white font-medium mb-1">Moodboard no Pinterest</h5>
            <p className="text-xs text-white/50 mb-4 max-w-sm mx-auto">
              As referências visuais e o moodboard desta marca estão organizados em um painel do Pinterest.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full max-w-md">
            <input 
              type="text" 
              placeholder="Cole o link do Pinterest aqui..." 
              value={moodboard[0] || ""}
              onChange={(e) => setMoodboard([e.target.value])}
              className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF7A00]/50 transition-colors"
            />
            <a 
              href={moodboard[0] || "#"} 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#E60023] hover:bg-[#E60023]/80 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
            >
              Acessar Painel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
