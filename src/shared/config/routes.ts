export const ROUTES = {
  home: '/',
  history: '/history',
  historyFoundation: '/history/foundation',
  historyHeyday: '/history/heyday',
  historyPersecution: '/history/persecution',
  historyRevival: '/history/revival',
  historyIcon: '/history/icon',
  today: '/today',
  schedule: '/schedule',
  notes: '/notes',
  programs: '/programs',
  contacts: '/contacts',
} as const;

export type RouteKey = keyof typeof ROUTES;

export const NAV_ITEMS: Array<{ key: RouteKey; label: string; to: string }> = [
  { key: 'home', label: 'Главная', to: ROUTES.home },
  { key: 'history', label: 'История', to: ROUTES.history },
  { key: 'today', label: 'Современность', to: ROUTES.today },
  { key: 'schedule', label: 'Расписание', to: ROUTES.schedule },
  { key: 'notes', label: 'Записки', to: ROUTES.notes },
  { key: 'programs', label: 'Помощь обители', to: ROUTES.programs },
  { key: 'contacts', label: 'Контакты', to: ROUTES.contacts },
];

export const HISTORY_SECTIONS: Array<{
  key: RouteKey;
  to: string;
  period: string;
  title: string;
  summary: string;
}> = [
  {
    key: 'historyFoundation',
    to: ROUTES.historyFoundation,
    period: '1691 – 1764',
    title: 'Основание обители',
    summary:
      'Старцы Иоанн и Тихон приносят Владимирскую икону на источник реки Вьяс. Указ Петра I 1713 года и пожалование графа Головкина. Век борьбы за выживание после секуляризации Екатерины II.',
  },
  {
    key: 'historyHeyday',
    to: ROUTES.historyHeyday,
    period: '1801 – 1917',
    title: 'Расцвет пустыни',
    summary:
      'Игумен Киприан и эпоха возрождения. Графиня Софья Борх и царствующий дом — благотворители каменного Владимирского собора и храма Иоанна Предтечи. Полная ведомость 1914 года: 51 насельник, 4 каменных корпуса, ярмарочная площадь.',
  },
  {
    key: 'historyPersecution',
    to: ROUTES.historyPersecution,
    period: '1918 – 1990',
    title: 'Гонения и разорение',
    summary:
      'Архимандрит Геронтий (Титов) и его попытка сохранить обитель. Записки Саранскому ГПУ, артель из братии. Разгон 1925 года, разрушение стен с 1931, школа крестьянской молодёжи. Расстрел схиархимандрита Викентия в 1938 году. Спасение чудотворной иконы.',
  },
  {
    key: 'historyRevival',
    to: ROUTES.historyRevival,
    period: '1996 – наши дни',
    title: 'Возрождение',
    summary:
      'Анатолий Захаров обустраивает источник, начинается восстановление храма. Первая литургия 2002 года. Игумен Христофор находит спасённую икону в 2010-м, крестный ход 2011-го возвращает её на исконное место. С 2012 года — мужской монастырь Кузнецкой и Никольской епархии.',
  },
  {
    key: 'historyIcon',
    to: ROUTES.historyIcon,
    period: 'XII век – наши дни',
    title: 'Чудотворная Владимирская икона',
    summary:
      'Древний список греческого стиля, более трёх веков пребывающий во Вьясе. Крестный ход 1830 года остановил эпидемию холеры в Пензе. Документированные чудеса 1836–1857 годов. «Спор об иконе» 1856-го с Саранским Петропавловским монастырём. Утрата и обретение восьмидесятилетней разлуки.',
  },
];
