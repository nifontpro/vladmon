import type { MediaRef } from '@/entities/media/types';

export type ProgramStatus = 'active' | 'completed' | 'paused';

/** Фотоотчёт о ходе целевой программы. */
export type ProgramUpdate = {
  id: string;
  date: string; // ISO
  title: string;
  body: string;
  photos: MediaRef[];
};

/** Целевая программа сбора пожертвований (напр. «Котельная»). */
export type Program = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  goalKopecks: number;
  raisedKopecks: number;
  status: ProgramStatus;
  cover: MediaRef;
  gallery: MediaRef[];
  updates: ProgramUpdate[];
  startedAt: string;
  completedAt?: string;
};

export const PROGRAM_STATUS_LABEL: Record<ProgramStatus, string> = {
  active: 'Идёт сбор',
  completed: 'Завершено',
  paused: 'Приостановлено',
};
