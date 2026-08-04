import re

path = 'src/pages/HomeV2.tsx'
with open(path, 'r') as f:
    text = f.read()

import_pattern = r'import Section3V2 from \'../components/V2/Section3V2\';'
new_imports = '''import Section3V2 from '../components/V2/Section3V2';
import Section4V2 from '../components/V2/Section4V2';
import Section5V2 from '../components/V2/Section5V2';
import Section6V2 from '../components/V2/Section6V2';'''

text = text.replace(import_pattern, new_imports)

sections_pattern = r'<Section3V2 />'
new_sections = '''<Section3V2 />
          <Section4V2 />
          <Section5V2 />
          <Section6V2 />'''

text = text.replace(sections_pattern, new_sections)

with open(path, 'w') as f:
    f.write(text)

