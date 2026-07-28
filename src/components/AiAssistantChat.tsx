import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

const SYSTEM_PROMPT = `Você é o Assistente Virtual Oficial do 'Relatório Técnico - Operação Integrada de Marketing' da agência Fábrica Publicidade para o cliente Azul Veículos (Data: Julho de 2026).
Seu objetivo é ajudar quem está lendo o relatório a encontrar informações rapidamente.

CONTEXTO DO RELATÓRIO:
1. Modelo Operacional (5 pilares): Estratégia, Criação, Tecnologia, Performance, Suporte Operacional.
2. Atendimento: A jornada flui em Atendimento Diário -> Gestão de Demandas -> Aprovações -> Reuniões. Interface com Diretoria, Vendedores e Bancos.
3. Produção Criativa & Design: KV (Key Visual), Logotipos, Campanhas, Posts, Stories, Carrosséis, Jornalzinhos, Email Marketing, Materiais Institucionais, Banners, Mockups.
4. Produção Audiovisual: Planejamento, Roteiros (10/mês), Gravações, Filmmaker (4/mês), Mobile Makers (6 a 8/mês), Motion Graphics, Reels, Stories.
5. Tecnologia: Atualizações e correções do site (azulveiculos.com.br), Landing Pages, Integrações com CRM/WhatsApp.
6. Mídia / Tráfego: Mais de 60 anúncios gerenciados via Google Ads e Meta Ads. Segmentação, Remarketing, relatórios mensais.
7. Resumo de Entregas (Mensais): +160 Stories, +70 Peças para feed, 30 Jornalzinhos promocionais, 6 Banners de Site, 16 Materiais institucionais, 10 Roteiros, 12 conteúdos individuais por loja.
8. Conclusão: Operação contínua e escalável, altamente flexível para trocas de ofertas e urgências.

REGRAS:
- Seja prestativo, claro, profissional e conciso (máximo de 1 a 2 parágrafos por resposta).
- Responda apenas perguntas relacionadas à operação de marketing, ao relatório e à Azul Veículos/Fábrica Publicidade.
- Se não souber algo, diga que essa informação não consta no resumo executivo do relatório.`;

export const AiAssistantChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Olá! Sou o assistente de IA deste relatório. Posso tirar dúvidas sobre a operação de marketing da Azul Veículos, métricas ou processos descritos aqui. O que deseja saber?'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY || '';
      if (!apiKey) {
        // Fallback response if GEMINI_API_KEY is not defined locally
        setTimeout(() => {
          let botReply = 'Com base no relatório da Azul Veículos, operamos 5 pilares: Estratégia, Criação, Tecnologia, Performance e Suporte. Temos entregas mensais de +160 stories, +70 peças de feed, 30 jornalzinhos e +60 anúncios ativos.';
          if (currentInput.toLowerCase().includes('audiovisual') || currentInput.toLowerCase().includes('vídeo') || currentInput.toLowerCase().includes('reels')) {
            botReply = 'Na área Audiovisual, produzimos mensalmente 6 a 8 vídeos Mobile Makers, 4 vídeos de campanha com Filmmaker profissional e elaboramos cerca de 10 roteiros.';
          } else if (currentInput.toLowerCase().includes('tráfego') || currentInput.toLowerCase().includes('ads') || currentInput.toLowerCase().includes('mídia')) {
            botReply = 'Gerenciamos mais de 60 anúncios ativos no Google Ads e Meta Ads com segmentação regional, remarketing e monitoramento diário.';
          } else if (currentInput.toLowerCase().includes('site') || currentInput.toLowerCase().includes('tecnologia')) {
            botReply = 'A tecnologia engloba a plataforma azulveiculos.com.br, landing pages de conversão, integrações com CRM/WhatsApp e atualizações contínuas de ofertas.';
          }
          
          setMessages((prev) => [
            ...prev,
            { id: (Date.now() + 1).toString(), sender: 'bot', text: botReply }
          ]);
          setIsLoading(false);
        }, 600);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nPergunta do usuário: ${currentInput}` }] }
        ]
      });

      const botReply = response.text || 'Desculpe, não consegui obter essa resposta no momento.';
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'bot', text: botReply }
      ]);
    } catch (error) {
      console.error('Error querying Gemini:', error);
      setMessages((prev) => [
        ...prev,
        { 
          id: (Date.now() + 1).toString(), 
          sender: 'bot', 
          text: 'Entendi a sua dúvida! Na operação da Azul Veículos executamos mídia paga, produção gráfica, audiovisual e desenvolvimento web com entregas contínuas.' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start no-print">
      {/* Chat Window Popup */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[460px] bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#0a1c6a] text-white p-3.5 px-4 flex items-center justify-between font-bold text-xs tracking-wide">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-300" />
              <span>Assistente IA do Relatório</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-md transition-colors text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-gray-50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#0a1c6a] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-cyan-300" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#0a1c6a] text-white rounded-br-none shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm font-sans'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start items-center text-slate-400 italic text-[11px] pl-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0a1c6a]" />
                <span>Analisando o relatório...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-2.5 bg-white border-t border-slate-200 flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Faça uma pergunta sobre o relatório..."
              className="flex-1 bg-gray-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#0a1c6a] font-sans text-slate-800"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 bg-[#0a1c6a] hover:bg-[#1d3fb5] disabled:opacity-40 text-white rounded-lg transition-colors shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-13 h-13 rounded-full bg-[#0a1c6a] hover:bg-[#1d3fb5] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-white/20 group"
        title="Assistente IA - Pergunte sobre o relatório"
      >
        <Sparkles className="w-6 h-6 text-cyan-300 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};
