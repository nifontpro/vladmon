import { createBrowserRouter } from 'react-router';
import { SiteLayout } from './layout';
import { ROUTES } from '@/shared/config/routes';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: SiteLayout,
    children: [
      {
        index: true,
        lazy: async () => {
          const m = await import('@/pages/home/home-page');
          return { Component: m.HomePage };
        },
      },
      {
        path: ROUTES.history.slice(1),
        lazy: async () => {
          const m = await import('@/pages/history/history-page');
          return { Component: m.HistoryPage };
        },
      },
      {
        path: ROUTES.historyFoundation.slice(1),
        lazy: async () => {
          const m = await import('@/pages/history/foundation/foundation-page');
          return { Component: m.FoundationPage };
        },
      },
      {
        path: ROUTES.historyHeyday.slice(1),
        lazy: async () => {
          const m = await import('@/pages/history/heyday/heyday-page');
          return { Component: m.HeydayPage };
        },
      },
      {
        path: ROUTES.historyPersecution.slice(1),
        lazy: async () => {
          const m = await import('@/pages/history/persecution/persecution-page');
          return { Component: m.PersecutionPage };
        },
      },
      {
        path: ROUTES.historyRevival.slice(1),
        lazy: async () => {
          const m = await import('@/pages/history/revival/revival-page');
          return { Component: m.RevivalPage };
        },
      },
      {
        path: ROUTES.historyIcon.slice(1),
        lazy: async () => {
          const m = await import('@/pages/history/icon/icon-page');
          return { Component: m.IconPage };
        },
      },
      {
        path: ROUTES.today.slice(1),
        lazy: async () => {
          const m = await import('@/pages/today/today-page');
          return { Component: m.TodayPage };
        },
      },
      {
        path: ROUTES.schedule.slice(1),
        lazy: async () => {
          const m = await import('@/pages/schedule/schedule-page');
          return { Component: m.SchedulePage };
        },
      },
      {
        path: ROUTES.notes.slice(1),
        lazy: async () => {
          const m = await import('@/pages/notes/notes-page');
          return { Component: m.NotesPage };
        },
      },
      {
        path: ROUTES.programs.slice(1),
        lazy: async () => {
          const m = await import('@/pages/programs/programs-page');
          return { Component: m.ProgramsPage };
        },
      },
      {
        path: `${ROUTES.programs.slice(1)}/:slug`,
        lazy: async () => {
          const m = await import('@/pages/programs/program-page');
          return { Component: m.ProgramPage };
        },
      },
      {
        path: ROUTES.contacts.slice(1),
        lazy: async () => {
          const m = await import('@/pages/contacts/contacts-page');
          return { Component: m.ContactsPage };
        },
      },
      {
        path: '*',
        lazy: async () => {
          const m = await import('@/pages/not-found');
          return { Component: m.NotFoundPage };
        },
      },
    ],
  },
]);
