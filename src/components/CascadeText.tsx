import { useState } from 'react';

interface CascadeTextProps {
  text: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  as?: 'a' | 'button' | 'div';
  id?: string;
  children?: React.ReactNode;
}

export default function CascadeText({
  text,
  style,
  onClick,
  as: Tag = 'a',
  id,
  children,
}: CascadeTextProps) {
  const [hovered, setHovered] = useState(false);
  const chars = [...text];

  return (
    <Tag
      id={id}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: 0,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'inline-flex',
          height: '1em',
          overflow: 'hidden',
          clipPath: 'inset(0)',
          lineHeight: 1,
        }}
      >
        {chars.map((ch, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              position: 'relative',
              textShadow: '0 1em currentColor',
              transitionProperty: 'transform',
              transitionDuration: '250ms',
              transitionTimingFunction: 'ease-in-out',
              transitionDelay: `${i * 28}ms`,
              transform: hovered ? 'translateY(-1em)' : 'translateY(0)',
            }}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </span>
      {children}
    </Tag>
  );
}
