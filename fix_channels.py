with open('src/components/FabricaAzulLandingPage.tsx', 'r') as f:
    content = f.read()

# Let's replace the channel cards grid block
old_grid_start = content.find('{/* ================= SECTION: DIGITAL (SLIDE 13) ================= */')
if old_grid_start == -1:
    old_grid_start = content.find('id="digital"')

print("Digital section index:", old_grid_start)
