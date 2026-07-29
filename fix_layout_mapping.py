import re

path = 'src/components/SlideRenderer.tsx'
with open(path, 'r') as f:
    text = f.read()

# Slide 1: CAPA
text = text.replace('{slide.id === 1 && (', '{(slide.id === 1 || slide.layoutType === \'hero_title\') && (')

# Slide 2: INTRODUÇÃO
text = text.replace('{slide.id === 2 && (', '{(slide.id === 2 || slide.layoutType === \'split_text_image\') && (')

# MARKETING DIGITAL
text = text.replace('{slide.id === 14 && (', '{(slide.layoutType === \'marketing_digital\') && (')
# Wait, my previous script messed up the IDs. There are two "slide.id === 16 && (" that I didn't fix properly yet.
# Let's just use regex to replace the specific block headers!

# MARKETING DIGITAL Block
#   {/* ==================== SLIDE 14: MARKETING DIGITAL ==================== */}
#   {slide.id === 16 && (
text = re.sub(
    r'\{/\*\s*====================\s*SLIDE 14: MARKETING DIGITAL\s*====================\s*\*/\}\s*\{slide\.id === \d+ && \(',
    '{/* ==================== MARKETING DIGITAL ==================== */}\n          {(slide.layoutType === \'marketing_digital\') && (',
    text
)

# GESTÃO DE TRÁFEGO Block
text = re.sub(
    r'\{/\*\s*====================\s*SLIDE 15: GESTÃO DE TRÁFEGO\s*====================\s*\*/\}\s*\{slide\.id === \d+ && \(',
    '{/* ==================== GESTÃO DE TRÁFEGO ==================== */}\n          {(slide.layoutType === \'traffic_management\') && (',
    text
)
# Wait, I didn't rename it to SLIDE 15: GESTÃO DE TRÁFEGO in my last script, I named it SLIDE 14 or SLIDE 15. Let me just match GESTÃO DE TRÁFEGO
text = re.sub(
    r'\{/\*\s*====================\s*SLIDE \d+: GESTÃO DE TRÁFEGO\s*====================\s*\*/\}\s*\{slide\.id === \d+ && \(',
    '{/* ==================== GESTÃO DE TRÁFEGO ==================== */}\n          {(slide.layoutType === \'traffic_management\') && (',
    text
)

# TECNOLOGIA Block
text = re.sub(
    r'\{/\*\s*====================\s*SLIDE \d+: TECNOLOGIA\s*====================\s*\*/\}\s*\{slide\.id === \d+ && \(',
    '{/* ==================== TECNOLOGIA ==================== */}\n          {(slide.layoutType === \'tech_web\') && (',
    text
)

# COMUNICAÇÃO OFFLINE Block
text = re.sub(
    r'\{/\*\s*====================\s*SLIDE 16: COMUNICAÇÃO OFFLINE\s*====================\s*\*/\}\s*\{\(slide\.id === 16 \|\| slide\.title === "COMUNICAÇÃO OFFLINE"\) && \(',
    '{/* ==================== COMUNICAÇÃO OFFLINE ==================== */}\n          {(slide.layoutType === \'offline_communication\') && (',
    text
)

# RESUMO EXECUTIVO Block
text = re.sub(
    r'\{/\*\s*====================\s*SLIDE 19: RESUMO EXECUTIVO \(METRICS\)\s*====================\s*\*/\}\s*\{slide\.id === 19 && \(',
    '{/* ==================== RESUMO EXECUTIVO (METRICS) ==================== */}\n          {(slide.layoutType === \'executive_summary\') && (',
    text
)

# CONCLUSÃO Block
text = re.sub(
    r'\{/\*\s*====================\s*SLIDE 20: CONCLUSÃO\s*====================\s*\*/\}\s*\{slide\.id === 20 && \(',
    '{/* ==================== CONCLUSÃO ==================== */}\n          {(slide.layoutType === \'conclusion\') && (',
    text
)

with open(path, 'w') as f:
    f.write(text)
