import type { CSSProperties, ReactNode } from 'react';
import './ornament-frame.css';

/**
 * OrnamentFrame — рамка страницы, целиком собранная из трёх SVG-«кирпичей»:
 *
 *   ┌─[ tile-h ]─┐    corner.svg ставится в 4 угла (симметричен по 4 осям);
 *   │            │    tile-h.svg тайлится по горизонтали (период 160×80) — seamless,
 *   │ ↕  tile-v  │    потому что левый и правый край рисуются как половины узла-четырёхлистника;
 *   │            │    tile-v.svg тайлится по вертикали (период 80×160) тем же узлом.
 *   └─[ tile-h ]─┘
 *
 * Все три кирпича используют одну палитру (бумага, золото, зелёная лоза,
 * бирюза, карминовая сердцевина, коралл) и общие мотивы (розетка ↔ узел),
 * поэтому горизонталь, вертикаль и углы выглядят одной фреской.
 */

type Props = {
  /** Толщина рамки в px на десктопе. На мобильных уменьшается через CSS @media. */
  thickness?: number;
  /** На узких устройствах можно убрать боковины и оставить только верх/низ. */
  sidesOnly?: 'horizontal' | 'full';
  className?: string;
  children: ReactNode;
};

const CORNER = '/ornaments/svg/corner.svg';
const TILE_H = '/ornaments/svg/tile-h.svg';
const TILE_V = '/ornaments/svg/tile-v.svg';

export function OrnamentFrame({
  thickness,
  sidesOnly = 'full',
  className,
  children,
}: Props) {
  const rootStyle: CSSProperties = {};
  if (thickness) {
    (rootStyle as Record<string, string>)['--orn-th'] = `${thickness}px`;
  }

  return (
    <div className={`ornament-frame${className ? ` ${className}` : ''}`} style={rootStyle}>
      <div
        className="ornament-frame__band ornament-frame__band--top"
        style={{ backgroundImage: `url(${TILE_H})` }}
        aria-hidden
      />
      <div
        className="ornament-frame__band ornament-frame__band--bottom"
        style={{ backgroundImage: `url(${TILE_H})` }}
        aria-hidden
      />

      {sidesOnly === 'full' && (
        <>
          <div
            className="ornament-frame__column ornament-frame__column--left"
            style={{ backgroundImage: `url(${TILE_V})` }}
            aria-hidden
          />
          <div
            className="ornament-frame__column ornament-frame__column--right"
            style={{ backgroundImage: `url(${TILE_V})` }}
            aria-hidden
          />
        </>
      )}

      <CornerMedallion corner="tl" />
      <CornerMedallion corner="tr" />
      <CornerMedallion corner="bl" />
      <CornerMedallion corner="br" />

      <div className="ornament-frame__content">{children}</div>
    </div>
  );
}

function CornerMedallion({ corner }: { corner: 'tl' | 'tr' | 'bl' | 'br' }) {
  return (
    <img
      src={CORNER}
      alt=""
      className={`ornament-frame__corner ornament-frame__corner--${corner}`}
      aria-hidden
      draggable={false}
    />
  );
}
