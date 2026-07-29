import re

path = 'src/data/slidesData.ts'
with open(path, 'r') as f:
    text = f.read()

s14 = r'''  // SLIDE 13: Recursos Prontos para Ativação \(14/16\) - Adaptado para o estilo de cartões do Slide 7 \(Sintetizado do PDF p\.8\)
  \{
    id: 14,
    slideNumber: "14 / 16",
    category: "fisica",
    categoryLabel: "14 / Ativações Futuras",
    title: "RECURSOS PRONTOS PARA ATIVAÇÃO",
    subtitle: "RECURSOS PRONTOS QUE DEPENDEM APENAS DE DECISÃO",
    layoutType: "process_stakeholders",
    stepItems: \[
      \{ number: "1", title: "Selo Vistoriado", description: "Selo de laudo nos cards de veículo para reforçar segurança\." \},
      \{ number: "2", title: "Rolagem Infinita", description: "Navegação contínua no showroom em vez de paginação\." \},
      \{ number: "3", title: "Preço com Acréscimo", description: "Opção de valor diferenciado para vendedores logados\." \},
      \{ number: "4", title: "Feed de Catálogo", description: "Anúncios dinâmicos de estoque para Meta e Instagram\." \}
    \],
    presenterNotes: "Recursos prontos na plataforma\."
  \},'''

s13 = r'''    // SLIDE 13: Performance do Site \(13/16\)
  \{
    id: 13,
    slideNumber: "13 / 16",
    category: "tecnologia",
    categoryLabel: "13 / Performance",
    title: "A IMPORTÂNCIA DA VELOCIDADE",
    subtitle: "SITE LENTO VS SITE NOTA A",
    layoutType: "site_performance",
    presenterNotes: "Um site rápido converte mais\."
  \},'''

text = re.sub(s14, '', text)
text = re.sub(s13, '', text)

# Now insert 13 then 14 after 12
s12_end = r'''    presenterNotes: "Infraestrutura tecnológica de ponta\."
  \},'''

s13_real = '''
  // SLIDE 13: Performance do Site (13/16)
  {
    id: 13,
    slideNumber: "13 / 16",
    category: "tecnologia",
    categoryLabel: "13 / Performance",
    title: "A IMPORTÂNCIA DA VELOCIDADE",
    subtitle: "SITE LENTO VS SITE NOTA A",
    layoutType: "site_performance",
    presenterNotes: "Um site rápido converte mais."
  },'''

s14_real = '''
  // SLIDE 14: Recursos Prontos para Ativação (14/16)
  {
    id: 14,
    slideNumber: "14 / 16",
    category: "fisica",
    categoryLabel: "14 / Ativações Futuras",
    title: "RECURSOS PRONTOS PARA ATIVAÇÃO",
    subtitle: "RECURSOS PRONTOS QUE DEPENDEM APENAS DE DECISÃO",
    layoutType: "process_stakeholders",
    stepItems: [
      { number: "1", title: "Selo Vistoriado", description: "Selo de laudo nos cards de veículo para reforçar segurança." },
      { number: "2", title: "Rolagem Infinita", description: "Navegação contínua no showroom em vez de paginação." },
      { number: "3", title: "Preço com Acréscimo", description: "Opção de valor diferenciado para vendedores logados." },
      { number: "4", title: "Feed de Catálogo", description: "Anúncios dinâmicos de estoque para Meta e Instagram." }
    ],
    presenterNotes: "Recursos prontos na plataforma."
  },'''

text = text.replace(s12_end, s12_end + s13_real + s14_real)

with open(path, 'w') as f:
    f.write(text)

