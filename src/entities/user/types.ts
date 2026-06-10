export type User = {
  id: string;
  email: string;
  displayName?: string;
  createdAt: string;
};

export type UserSession = {
  user: User;
  accessToken: string;
};
