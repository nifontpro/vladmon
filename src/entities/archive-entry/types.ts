import type { MediaRef } from '@/entities/media/types';

export type ArchiveCategory = 'documents' | 'maps' | 'memoirs' | 'press' | 'photos';

export const ARCHIVE_CATEGORY_LABEL: Record<ArchiveCategory, string> = {
  documents: 'Документы обители',
  maps: 'Карты и планы',
  memoirs: 'Свидетельства и воспоминания',
  press: 'Газетные публикации',
  photos: 'Фотохроника',
};

/** Раздел текстовой расшифровки документа. */
export type ArchiveSection = {
  heading?: string;
  /** Абзацы текста. */
  paragraphs: string[];
};

/**
 * Единица архива обители: фотография/скан исторического документа
 * с текстовой расшифровкой. Сканы лежат статикой в public/photos/archive/<slug>.
 * Оригиналы — в raw/archive/<slug> (immutable).
 */
export type ArchiveEntry = {
  id: string;
  slug: string;
  category: ArchiveCategory;
  title: string;
  /** Дата/период документа — вольный текст («1910 год», «1911»). */
  date: string;
  /** Архивный источник: «ГАПО, ф. 182 оп. 1 д. 2641». */
  source: string;
  /** Краткое описание для каталога. */
  summary: string;
  /** Обложка для карточки каталога. */
  cover: MediaRef;
  /** Сканы документа (галерея с зумом). */
  scans: MediaRef[];
  /** Текстовая расшифровка по разделам. */
  body: ArchiveSection[];
  /** Комментарий редактора (контекст, оговорки о чтении). */
  notes?: string;
};
