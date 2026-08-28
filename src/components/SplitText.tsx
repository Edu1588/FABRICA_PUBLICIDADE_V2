import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // ms per char/word stagger
  duration?: number; // duration in seconds
  ease?: any;
  splitType?: 'chars' | 'words' | 'lines';
  from?: { opacity?: number; y?: number; x?: number; scale?: number; rotate?: number };
  to?: { opacity?: number; y?: number; x?: number; scale?: number; rotate?: number };
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  tag?: keyof HTMLElementTagNameMap | React.ComponentType<any>;
  onLetterAnimationComplete?: () => void;
  style?: React.CSSProperties;
}

export default function SplitText({
  text,
  className = '',
  delay = 35,
  duration = 0.65,
  ease = [0.22, 1, 0.36, 1],
  splitType = 'chars',
  from = { opacity: 0, y: 35 },
  to = { opacity: 1, y: 0 },
  textAlign = 'left',
  tag: Tag = 'span',
  onLetterAnimationComplete,
  style = {}
}: SplitTextProps) {
  // If splitType is words, split into words
  const words = useMemo(() => {
    if (!text) return [];
    return text.split(' ');
  }, [text]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: from.opacity !== undefined ? from.opacity : 0,
      y: from.y !== undefined ? from.y : 30,
      x: from.x !== undefined ? from.x : 0,
      scale: from.scale !== undefined ? from.scale : 1,
      rotate: from.rotate !== undefined ? from.rotate : 0
    },
    visible: {
      opacity: to.opacity !== undefined ? to.opacity : 1,
      y: to.y !== undefined ? to.y : 0,
      x: to.x !== undefined ? to.x : 0,
      scale: to.scale !== undefined ? to.scale : 1,
      rotate: to.rotate !== undefined ? to.rotate : 0,
      transition: {
        duration,
        ease
      }
    }
  };

  if (splitType === 'words') {
    return (
      <motion.span
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`inline-block ${className}`}
        style={{ textAlign, ...style }}
        onAnimationComplete={onLetterAnimationComplete}
      >
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
            <motion.span
              variants={itemVariants}
              className="inline-block"
              style={{ willChange: 'transform, opacity' }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    );
  }

  // Character split (preserving spaces and words so text wraps properly)
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`inline-block ${className}`}
      style={{ textAlign, ...style }}
      onAnimationComplete={onLetterAnimationComplete}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
          {word.split('').map((char, charIdx) => (
            <motion.span
              key={charIdx}
              variants={itemVariants}
              className="inline-block"
              style={{ willChange: 'transform, opacity' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
