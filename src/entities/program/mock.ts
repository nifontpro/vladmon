import type { MediaRef } from '@/entities/media/types';
import type { Program } from '@/entities/program/types';

/**
 * ВРЕМЕННЫЕ моковые данные целевых программ для предпросмотра UI.
 * Будут заменены ответом `GET /api/programs` после подключения бэкенда.
 * Обложки/фото — существующие снимки из `public/photos/` как заглушки;
 * пустой `key` показывает плашку «ФОТО ТРЕБУЕТСЯ».
 */
function staticMedia(path: string, alt: string, width = 1600, height = 1067): MediaRef {
  return { id: path, key: path, width, height, blurhash: '', alt, status: 'ready' };
}

function placeholder(id: string, alt: string): MediaRef {
  return { id, key: '', width: 0, height: 0, blurhash: '', alt, status: 'ready' };
}

export const PROGRAMS: Program[] = [
  {
    id: 'prog-kotelnaya',
    slug: 'kotelnaya',
    title: 'Новая котельная для обители',
    summary:
      'Старое оборудование отслужило свой срок. Меняем котельную, чтобы храмы и братский корпус были тёплыми зимой.',
    description:
      'Обитель отапливается изношенной котельной, которой более двадцати лет. Зимой братия и паломники мёрзнут, а аварийные остановки грозят разморозить систему отопления храмов.\n\nМы устанавливаем новое котельное оборудование с автоматикой: это надёжное тепло для Владимирского собора, братского корпуса и трапезной, а также безопасность в морозы. Каждое пожертвование приближает обитель к тёплой зиме — мы публикуем фотоотчёты на каждом этапе работ.',
    goalKopecks: 1_200_000_00,
    raisedKopecks: 468_000_00,
    status: 'active',
    cover: staticMedia('/photos/history/vyas-obshchy-vid.jpg', 'Большевьясский монастырь, общий вид'),
    gallery: [
      staticMedia('/photos/history/vyas-1967.jpg', 'Корпус обители'),
      placeholder('kotelnaya-now-1', 'Существующая котельная'),
      placeholder('kotelnaya-now-2', 'Изношенное оборудование'),
    ],
    updates: [
      {
        id: 'upd-kotelnaya-2',
        date: '2026-05-28',
        title: 'Демонтировали старое оборудование',
        body: 'Бригада разобрала отслужившие котлы и подготовила помещение под монтаж новой системы. Спаси Господи всех, кто помог на этом этапе.',
        photos: [
          staticMedia('/photos/history/vladimirsky-sobor-angel-freska.jpg', 'Ход работ'),
          placeholder('upd2-photo-2', 'Демонтаж оборудования'),
        ],
      },
      {
        id: 'upd-kotelnaya-1',
        date: '2026-05-10',
        title: 'Начали подготовку площадки',
        body: 'Заключили договор на поставку оборудования и приступили к подготовке помещения котельной.',
        photos: [],
      },
    ],
    startedAt: '2026-05-01',
  },
  {
    id: 'prog-krovlya',
    slug: 'krovlya-trapeznoy',
    title: 'Кровля трапезного храма',
    summary:
      'Протекающая кровля разрушает своды трапезного храма. Собираем средства на полную замену покрытия.',
    description:
      'Кровля трапезного храма пришла в негодность: вода проникает под покрытие и постепенно разрушает кладку и роспись сводов. Необходима полная замена кровельного покрытия и ремонт стропильной системы.',
    goalKopecks: 800_000_00,
    raisedKopecks: 152_000_00,
    status: 'active',
    cover: staticMedia('/photos/history/vladimirsky-sobor-angel-freska.jpg', 'Фреска ангела, Владимирский собор'),
    gallery: [placeholder('krovlya-now-1', 'Состояние кровли')],
    updates: [],
    startedAt: '2026-04-15',
  },
];

export function findProgram(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}
