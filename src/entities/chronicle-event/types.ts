import type { MediaRef } from '@/entities/media/types';

/** Участник события (духовенство, регент и т. п.). */
export type EventParticipant = {
  name: string;
  role: string;
};

/** Ссылка на внешний источник новости (сайт епархии и т. п.). */
export type EventSource = {
  title: string;
  url: string;
};

/**
 * Событие летописи обители — современная хроника: приезды архиерея,
 * престольные праздники, крестные ходы. Лента пополняется со временем
 * (источники — обычно сайт Кузнецкой епархии).
 */
export type ChronicleEvent = {
  id: string;
  slug: string;
  /** Дата события, ISO (YYYY-MM-DD). */
  date: string;
  title: string;
  /** Краткое описание для карточки в ленте. */
  summary: string;
  /** Полный текст события (абзацы разделены \n\n). */
  body: string;
  participants: EventParticipant[];
  /** Обложка для карточки и шапки страницы события. */
  cover: MediaRef;
  /** Полная фотогалерея события. */
  gallery: MediaRef[];
  /** Откуда взят материал. */
  source?: EventSource;
};
