import { Outlet, ScrollRestoration } from 'react-router';
import { SiteHeader } from '@/widgets/site-header/site-header';
import { SiteFooter } from '@/widgets/site-footer/site-footer';
import { OrnamentFrame } from '@/widgets/ornament-frame/ornament-frame';
import { SvgSprite } from '@/shared/icons/sprite';

export function SiteLayout() {
  return (
    <>
      <SvgSprite />
      <SiteHeader />
      <main>
        <OrnamentFrame>
          <Outlet />
        </OrnamentFrame>
      </main>
      <SiteFooter />
      <ScrollRestoration />
    </>
  );
}
