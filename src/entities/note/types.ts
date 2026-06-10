export type NoteKind = 'health' | 'repose';

export type NotePeriod = 'liturgy' | 'sorokoust' | 'month' | 'half-year' | 'year';

export type Note = {
  id?: string;
  kind: NoteKind;
  names: string[];
  period: NotePeriod;
  note?: string;
};

export const NOTE_KIND_LABEL: Record<NoteKind, string> = {
  health: 'О здравии',
  repose: 'О упокоении',
};

export const NOTE_PERIOD_LABEL: Record<NotePeriod, string> = {
  liturgy: 'Разовое поминовение на Литургии',
  sorokoust: 'Сорокоуст (40 дней)',
  month: 'Месячное поминовение',
  'half-year': 'Полугодовое поминовение',
  year: 'Годовое поминовение',
};
