with open('src/components/FabricaAzulLandingPage.tsx', 'r') as f:
    content = f.read()

start_marker = '<section id="digital"'
end_marker = '{/* Financial Partner Banks */}'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker, start_idx)

if start_idx != -1 and end_idx != -1:
    new_section = '''<section id="digital" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#0f172a]/30 rounded-3xl my-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display">
            CANAIS DO ECOSSISTEMA DIGITAL & TRÁFEGO PAGO
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Estratégia multicanal conectando redes sociais, busca patrocinada no Google, anúncios na Meta e automação de leads.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Instagram */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-pink-500/40 relative group transition-all" style={{ backgroundImage: `linear-gradient(to bottom, rgba(10,12,24,0.9), rgba(8,21,56,0.95)), url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=60')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <InstagramLogo />
                  <div>
                    <h3 className="text-base font-extrabold text-white uppercase">INSTAGRAM</h3>
                    <div className="text-[10px] font-mono text-pink-300">Conteúdo Diário & Reels</div>
                  </div>
                </div>
                <span className="bg-pink-500/20 text-pink-300 border border-white/10 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Relacionamento
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                Canal principal de engajamento, apresentação de veículos do estoque, enquetes interativas em Stories e Reels de alto impacto.
              </p>
              <div className="text-[11px] text-cyan-300 font-semibold pt-2 flex items-center justify-between border-t border-white/10">
                <span>Frequência: Diária</span>
                <span className="text-slate-300 font-mono font-bold">+160 Posts / Mês</span>
              </div>
            </div>
          </div>

          {/* Facebook */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-blue-500/40 relative group transition-all" style={{ backgroundImage: `linear-gradient(to bottom, rgba(10,12,24,0.9), rgba(13,34,82,0.95)), url('https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=60')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <FacebookLogo />
                  <div>
                    <h3 className="text-base font-extrabold text-white uppercase">FACEBOOK</h3>
                    <div className="text-[10px] font-mono text-blue-300">Audiência Sênior & Família</div>
                  </div>
                </div>
                <span className="bg-blue-500/20 text-blue-300 border border-white/10 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Alcance Família
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                Comunicação voltada a perfis de compradores de veículos seminovos de maior valor agregado e ofertas de financiamento bancário.
              </p>
              <div className="text-[11px] text-cyan-300 font-semibold pt-2 flex items-center justify-between border-t border-white/10">
                <span>Atração Local</span>
                <span className="text-slate-300 font-mono font-bold">100% Sincronizado</span>
              </div>
            </div>
          </div>

          {/* Google Ads */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-emerald-500/40 relative group transition-all" style={{ backgroundImage: `linear-gradient(to bottom, rgba(10,12,24,0.9), rgba(10,43,36,0.95)), url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <GoogleAdsLogo />
                  <div>
                    <h3 className="text-base font-extrabold text-white uppercase">GOOGLE ADS</h3>
                    <div className="text-[10px] font-mono text-emerald-300">Rede de Pesquisa & Busca</div>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-white/10 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Intenção de Compra
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                Anúncios de busca ativados exatamente quando o cliente procura por "comprar carro seminovo", palavras-chave de modelos e termos regionais.
              </p>
              <div className="text-[11px] text-cyan-300 font-semibold pt-2 flex items-center justify-between border-t border-white/10">
                <span>Conversão Direta</span>
                <span className="text-slate-300 font-mono font-bold">Alta Qualidade</span>
              </div>
            </div>
          </div>

          {/* Meta Ads */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-blue-500/40 relative group transition-all" style={{ backgroundImage: `linear-gradient(to bottom, rgba(10,12,24,0.9), rgba(12,40,96,0.95)), url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <MetaLogo />
                  <div>
                    <h3 className="text-base font-extrabold text-white uppercase">META ADS</h3>
                    <div className="text-[10px] font-mono text-cyan-300">Tráfego Pago & Leads</div>
                  </div>
                </div>
                <span className="bg-cyan-500/20 text-cyan-300 border border-white/10 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Leads no ZAP
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                Gestão de orçamentos patrocinados com direcionamento dos cliques direto para o WhatsApp das equipes de vendas de cada loja.
              </p>
              <div className="text-[11px] text-cyan-300 font-semibold pt-2 flex items-center justify-between border-t border-white/10">
                <span>Segmentação Local</span>
                <span className="text-slate-300 font-mono font-bold">Otimização Diária</span>
              </div>
            </div>
          </div>

          {/* RD Station */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-amber-500/40 relative group transition-all" style={{ backgroundImage: `linear-gradient(to bottom, rgba(10,12,24,0.9), rgba(58,37,10,0.95)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <RDStationLogo />
                  <div>
                    <h3 className="text-base font-extrabold text-white uppercase">RD STATION</h3>
                    <div className="text-[10px] font-mono text-amber-300">Inbound & CRM Sync</div>
                  </div>
                </div>
                <span className="bg-amber-500/20 text-amber-300 border border-white/10 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Inbound CRM
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                Captura de cadastros provenientes das Landing Pages de feirões, automação de emails e nutrição da base de contatos.
              </p>
              <div className="text-[11px] text-cyan-300 font-semibold pt-2 flex items-center justify-between border-t border-white/10">
                <span>Nutrição Automática</span>
                <span className="text-slate-300 font-mono font-bold">CRM Integrado</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Vendas */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-emerald-500/40 relative group transition-all" style={{ backgroundImage: `linear-gradient(to bottom, rgba(10,12,24,0.9), rgba(11,43,36,0.95)), url('https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=500&auto=format&fit=crop&q=60')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white uppercase">WHATSAPP VENDAS</h3>
                    <div className="text-[10px] font-mono text-emerald-300">Conversão de Atendimento</div>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-white/10 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Atendimento Rápido
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                Envio imediato do lead capturado no tráfego para os consultores de plantão da Azul Veículos, reduzindo o tempo de resposta.
              </p>
              <div className="text-[11px] text-cyan-300 font-semibold pt-2 flex items-center justify-between border-t border-white/10">
                <span>Canal Oficial</span>
                <span className="text-slate-300 font-mono font-bold">100% Direto</span>
              </div>
            </div>
          </div>
        </div>
        
        '''
    
    content = content[:start_idx] + new_section + content[end_idx:]
    with open('src/components/FabricaAzulLandingPage.tsx', 'w') as f:
        f.write(content)
    print("Cleaned and updated digital section successfully!")
