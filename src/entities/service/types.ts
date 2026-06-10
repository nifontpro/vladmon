export type ServiceType = 'liturgy' | 'vespers' | 'matins' | 'molieben';

export type Service = {
  time: string;
  title: string;
  type: ServiceType;
};

export type ServiceDay = {
  day: string;
  date: string;
  services: Service[];
};
