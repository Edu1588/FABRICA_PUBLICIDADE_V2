const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

const target1 = `  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(1);`;
const replace1 = `  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });`;

code = code.replace(target1, replace1);

const target2 = `  const activeSlide = slides[activeSlideIndex];`;
const replace2 = `  const activeSlide = slides[activeSlideIndex];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !activeSlide) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    updateActiveSlideField('posX', (activeSlide.posX || 0) + dx);
    updateActiveSlideField('posY', (activeSlide.posY || 0) + dy);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };`;

code = code.replace(target2, replace2);
fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Fixed mouse handlers");
