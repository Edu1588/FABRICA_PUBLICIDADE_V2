import re

path = 'src/components/SlideRenderer.tsx'
with open(path, 'r') as f:
    text = f.read()

# First occurrence of 'slide.id === 16 && (' after SLIDE 14: MARKETING DIGITAL
text = text.replace('SLIDE 14: MARKETING DIGITAL ==================== */}\n          {slide.id === 16 && (', 'SLIDE 14: MARKETING DIGITAL ==================== */}\n          {slide.id === 14 && (')

# Second occurrence of 'slide.id === 16 && (' after SLIDE 14: GESTÃO DE TRÁFEGO (let's rename comment to SLIDE 15)
text = text.replace('SLIDE 14: GESTÃO DE TRÁFEGO ==================== */}\n          {slide.id === 16 && (', 'SLIDE 15: GESTÃO DE TRÁFEGO ==================== */}\n          {slide.id === 15 && (')

# Third occurrence of 'slide.id === 16 && (' after SLIDE 15: TECNOLOGIA (let's rename comment to SLIDE 16)
text = text.replace('SLIDE 15: TECNOLOGIA ==================== */}\n          {slide.id === 16 && (', 'SLIDE 16: TECNOLOGIA ==================== */}\n          {slide.id === 16 && (')

# Also fix the text label inside MARKETING DIGITAL which was "14 / Ativações Futuras"
text = text.replace('14 / Ativações Futuras\n              </div>', '14 / Marketing Digital\n              </div>')

# Wait, I also need to fix `slide.id === 13 || slide.layoutType === 'process_stakeholders'` 
# Because Slide 14 is now Ativações Futuras, which has layoutType process_stakeholders.
# Actually `process_stakeholders` catches slide 14 anyway. 
# But wait, slide 14 is Marketing Digital in SlideRenderer?
# Oh my god. 
# In `slidesData.ts`:
# Slide 11: MARKETING DIGITAL E SOCIAL MEDIA (layoutType: process_stakeholders)
# Slide 12: TECNOLOGIA E PLATAFORMA (layoutType: tech_web)
# Slide 13: A IMPORTÂNCIA DA VELOCIDADE (layoutType: site_performance)
# Slide 14: RECURSOS PRONTOS PARA ATIVAÇÃO (layoutType: process_stakeholders)
# Slide 15: FLEXIBILIDADE OPERACIONAL (layoutType: dual_matrix)
# Slide 16: RESUMO EXECUTIVO E MÉTRICAS (layoutType: executive_summary)

# Wait, none of these match the hardcoded blocks in `SlideRenderer.tsx` except the layoutTypes!
# Slide 14 in SlideRenderer is a custom block for Marketing Digital (which is already covered by Slide 11 in data??).
# Yes! The previous developer probably had two different slides for Marketing Digital or abandoned the custom block in favor of `process_stakeholders`. 
# We should probably just leave it or let `layoutType` handle it. 
# Let's check if the generic layout handlers are what's being used.
