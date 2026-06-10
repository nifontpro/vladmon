import { motion } from 'motion/react';

type Props = {
  /** Имя символа из SVG-спрайта. По умолчанию плетёнка-band. */
  symbol?: 'orn-knot-band' | 'orn-vine' | 'orn-hairline';
  className?: string;
  ariaLabel?: string;
};

const VIEWBOX: Record<NonNullable<Props['symbol']>, string> = {
  'orn-knot-band': '0 0 1200 140',
  'orn-vine': '0 0 600 40',
  'orn-hairline': '0 0 400 32',
};

export function OrnamentBand({ symbol = 'orn-knot-band', className, ariaLabel }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
      className={className}
      style={{ width: '100%' }}
    >
      <svg
        viewBox={VIEWBOX[symbol]}
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="auto"
        role={ariaLabel ? 'img' : 'presentation'}
        aria-label={ariaLabel}
      >
        <use href={`#${symbol}`} />
      </svg>
    </motion.div>
  );
}
