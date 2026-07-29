import re

path = 'src/components/SlideRenderer.tsx'
with open(path, 'r') as f:
    text = f.read()

# Fix 'process_stakeholders'
text = text.replace(
    '{(slide.id === 6 || slide.id === 7 || slide.id === 8 || slide.id === 10 || slide.id === 11 || slide.id === 13 || slide.layoutType === \'process_stakeholders\') && (',
    '{(slide.layoutType === \'process_stakeholders\') && ('
)

# Fix 'dual_matrix'
text = text.replace(
    '{(slide.id === 6 || (slide.category === \'estrategia\' && slide.layoutType === \'dual_matrix\')) && (',
    '{(slide.layoutType === \'dual_matrix\') && ('
)
# Wait, there's another 'dual_matrix' check in the file?
# {slide.layoutType === 'dual_matrix' && slide.id !== 5 && slide.id !== 6 && slide.id !== 13 && slide.id !== 16 && (
text = re.sub(
    r'\{slide\.layoutType === \'dual_matrix\' && slide\.id !== \d+ && slide\.id !== \d+ && slide\.id !== \d+ && slide\.id !== \d+ && \(',
    '{false && (', # Let's see if this is a duplicate.
    text
)

# Fix 'organogram'
text = text.replace(
    '{(slide.id === 5 || slide.layoutType === \'organogram\') && (',
    '{(slide.layoutType === \'organogram\') && ('
)

# Fix 'connected_flow'
text = text.replace(
    '{(slide.id === 4 || (slide.layoutType === \'connected_flow\' && slide.id !== 3)) && (',
    '{(slide.layoutType === \'connected_flow\') && ('
)

# Fix 'natureza_operacao'
text = text.replace(
    '{(slide.id === 3 || slide.layoutType === \'natureza_operacao\') && (',
    '{(slide.layoutType === \'natureza_operacao\') && ('
)

# Fix 'design_keyvisual'
text = text.replace(
    '{(slide.id === 10 || slide.layoutType === \'design_keyvisual\') && (',
    '{(slide.layoutType === \'design_keyvisual\') && ('
)

# Fix 'site_performance'
text = text.replace(
    '{(slide.id === 13 || slide.layoutType === \'site_performance\') && (',
    '{(slide.layoutType === \'site_performance\') && ('
)

# Check for indicators_table
text = text.replace(
    '{slide.layoutType === \'indicators_table\' && slide.id !== 5 && (',
    '{(slide.layoutType === \'indicators_table\') && ('
)

with open(path, 'w') as f:
    f.write(text)
